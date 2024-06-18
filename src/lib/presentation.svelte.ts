import { useEventListener } from "runed";

type ChangeSlide = (direction: "back" | "next") => void;
type SlideArgs = {
	isCurrent: () => boolean;
	changeSlide: ChangeSlide;
	totalSteps: number;
};

export class Slide {
	#currentStep = $state(1);
	#totalSteps = $state(0);

	constructor({ isCurrent, changeSlide, totalSteps }: SlideArgs) {
		this.#totalSteps = totalSteps;

		$effect.root(() => {
			useEventListener(
				() => document,
				"keydown",
				(e) => {
					if (!isCurrent()) return;

					if (e.key === "ArrowRight") {
						if (this.#currentStep >= this.#totalSteps) {
							changeSlide("next");
							this.#currentStep = 1;
						} else {
							this.#currentStep++;
						}
					}
					if (e.key === "ArrowLeft") {
						if (this.#currentStep <= 1) {
							changeSlide("back");
							this.#currentStep = 1;
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

	get currentStep() {
		return this.#currentStep;
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

	registerSlide(totalSteps: number) {
		const idx = this.totalSlides;
		const slide = new Slide({
			isCurrent: () => this.#slideIdx === idx,
			changeSlide: this.changeSlide,
			totalSteps,
		});
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
