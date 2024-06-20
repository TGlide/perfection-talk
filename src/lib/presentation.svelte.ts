import { useEventListener } from "runed";
import { clamp } from "./math";

export class Slide {
	step = $state(1);
	totalSteps = $state(0);

	constructor(totalSteps: number) {
		this.totalSteps = totalSteps;
	}
}

class Presentation {
	slideIdx = $state(0);
	#slides: Slide[] = $state([]);
	currSlide = $derived(this.#slides[this.slideIdx]);
	totalSlides = $derived(this.#slides.length);

	constructor() {
		$effect.root(() => {
			useEventListener(
				() => document,
				"keydown",
				(e) => {
					if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;
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
		});
	}

	registerSlide(totalSteps: number) {
		const slide = new Slide(totalSteps);
		this.#slides.push(slide);

		$effect(() => {
			return () => {
				this.slideIdx = clamp(0, this.slideIdx, this.totalSlides - 1);
				this.#slides.splice(this.slideIdx, 1);
			};
		});

		return slide;
	}

	isCurrent(slide: Slide) {
		return this.currSlide === slide;
	}
}

export const presentation = new Presentation();
