import { useEventListener, watch } from "runed";
import { cn } from "../style";

export class Slide {
	step = $state(1);
	totalSteps = $state(0);

	constructor(idx: number, totalSteps: number) {
		this.totalSteps = totalSteps;
	}

	get attrs() {
		return {
			class: cn(
				"relative h-screen w-screen shrink-0 bg-[#171717] transition",
				presentation.animating && "scale-95 rounded-xl",
			),
		};
	}
}

class Presentation {
	slideIdx = $state(0);

	#slides: Array<Slide | null> = $state([]);
	currSlide = $derived(this.#slides[this.slideIdx]);
	totalSlides = $derived(this.#slides.length);

	animating = $state(false);

	init() {
		useEventListener(
			() => document,
			"keydown",
			(e) => {
				if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;
				if (!this.currSlide) return;
				e.stopPropagation();

				const hasNextSlide = this.slideIdx < this.totalSlides - 1;
				const hasNextStep = this.currSlide.step < this.currSlide.totalSteps;
				const hasPrevSlide = this.slideIdx > 0;
				const hasPrevStep = this.currSlide.step > 1;

				if (e.key === "ArrowRight") {
					if (hasNextStep) this.currSlide.step++;
					else if (hasNextSlide) this.slideIdx++;
				} else if (e.key === "ArrowLeft") {
					if (hasPrevStep) this.currSlide.step--;
					else if (hasPrevSlide) this.slideIdx--;
				}
			},
		);

		watch(
			() => this.slideIdx,
			() => {
				this.animating = true;
				const timeout = setTimeout(() => {
					this.animating = false;
				}, 750);

				return () => clearTimeout(timeout);
			},
			{ lazy: true },
		);
	}

	registerSlide(totalSteps: number) {
		// const idx should be equal to the length of the array if
		// the array has no null values, otherwise it should be the
		// index of the first null value
		// This is to fix inconsistentincies with HMR
		const nullIdx = this.#slides.findIndex((slide) => slide === null);
		const idx = nullIdx === -1 ? this.#slides.length : nullIdx;

		const slide = new Slide(this.#slides.length, totalSteps);
		this.#slides.splice(idx, 1, slide);

		$effect(() => {
			return () => {
				this.#slides[idx] = null;
			};
		});

		return slide;
	}

	isCurrent(slide: Slide) {
		return this.currSlide === slide;
	}
}

export const presentation = new Presentation();
