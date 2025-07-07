import { useEventListener, watch } from "runed";
import { clamp } from "./math";
import { cn } from "./style";
import { BroadcastState } from "./broadcast-state.svelte";

export class Slide {
	#step: BroadcastState<number>;
	// prettier-ignore
	get step() {	return this.#step.current	}
	// prettier-ignore
	set step(value) {	this.#step.current = value }

	totalSteps = $state(0);

	constructor(idx: number, totalSteps: number) {
		this.#step = new BroadcastState(`slide-${idx}-step`, 1);
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
	#slideIdx = new BroadcastState("slide-idx", 0);
	// prettier-ignore
	get slideIdx() {	return this.#slideIdx.current	}
	// prettier-ignore
	set slideIdx(value) {	this.#slideIdx.current = value }

	#slides: Slide[] = $state([]);
	currSlide = $derived(this.#slides[this.slideIdx]);
	totalSlides = $derived(this.#slides.length);

	animating = $state(false);

	init() {
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
		const slide = new Slide(this.#slides.length, totalSteps);
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
