import { useEventListener } from "runed";

type ChangeSlide = (direction: "back" | "next") => void;

export class Slide {
	#currentStep = $state(0);
	#totalSteps = $state(0);

	constructor(isActive: () => boolean, changeSlide: ChangeSlide) {
		$effect.root(() => {
			useEventListener(
				() => document,
				"keydown",
				(e) => {
					if (!isActive()) return;

					if (e.key === "ArrowRight") {
						if (this.#currentStep >= this.#totalSteps - 1) {
							changeSlide("next");
							this.#currentStep = 0;
						} else {
							this.#currentStep++;
						}
					}
					if (e.key === "ArrowLeft") {
						if (this.#currentStep <= 0) {
							changeSlide("back");
						} else {
							this.#currentStep--;
						}
					}
				},
			);
		});
	}

	get totalSteps() {
		return this.#totalSteps;
	}

	registerStep() {
		const currStep = $derived(this.#currentStep);
		const step = this.totalSteps;
		this.#totalSteps++;

		$effect(() => {
			return () => {
				this.#totalSteps--;
			};
		});

		return {
			get isActive() {
				return currStep === step;
			},
			step,
		};
	}
}

class Presentation {
	#slideIdx = $state(0);
	#slides: Slide[] = $state([]);
	currentSlide = $derived(this.#slides[this.#slideIdx]);
	totalSlides = $derived(this.#slides.length);

	changeSlide: ChangeSlide = (direction) => {
		if (direction === "next") {
			this.#slideIdx = Math.min(this.#slideIdx + 1, this.totalSlides - 1);
		} else {
			this.#slideIdx = Math.max(this.#slideIdx - 1, 0);
		}
	};

	registerSlide() {
		const idx = this.totalSlides;
		const slide = new Slide(() => this.#slideIdx === idx, this.changeSlide);
		this.#slides.push(slide);

		$effect(() => {
			return () => {
				this.#slides.splice(this.#slideIdx, 1);
			};
		});

		return slide;
	}

	isCurrent(slide: Slide) {
		return this.currentSlide === slide;
	}
}

export const presentation = new Presentation();
