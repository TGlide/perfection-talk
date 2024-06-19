import { cubicOut, linear } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

export function blur(_node: HTMLElement) {
	return {
		delay: 150,
		duration: 500,
		css: (t: number, u: number) => `filter: blur(${u * 3}px); opacity: ${t * 1}`,
	};
}

export function expand(
	node: HTMLElement | SVGElement,
	params: { delay?: number; duration?: number; easing?: (t: number) => number },
) {
	const { delay = 0, duration = 400, easing = cubicOut } = params;

	const w = parseFloat(getComputedStyle(node).strokeWidth);

	// set animation to forward
	node.style.animationFillMode = "forwards";

	return {
		delay,
		duration,
		easing,
		css: (t: number) => {
			return `opacity: ${t}; stroke-width: ${t * w}`;
		},
	};
}

function splitCssString(str: string) {
	return str
		.split(";")
		.map((s) => s.trim())
		.filter((s) => s.length > 0);
}

export function fix<El extends HTMLElement | SVGElement>(
	node: El,
	fn: (node: El) => TransitionConfig,
): TransitionConfig {
	const config = fn(node);
	if (!config.delay) return config;

	const easing = config.easing ?? linear;
	const delay = config.delay;
	const duration = config.duration ?? 0;
	const newDuration = duration + delay;

	const getTimingValues = (t: number) => {
		const transpired = t * newDuration;
		const withoutDelay = Math.max(0, transpired - delay);
		const actualT = withoutDelay / duration;
		const easedT = easing(actualT);

		return [easedT, 1 - easedT];
	};

	const css = (_t: number) => {
		const [t, u] = getTimingValues(_t);
		return config.css?.(t, u) ?? "";
	};

	const tick = (_t: number) => {
		const [t, u] = getTimingValues(_t);
		return config.tick?.(t, u) ?? Promise.resolve();
	};

	return {
		...config,
		delay: 0,
		duration: newDuration,
		css,
		tick,
		easing: linear,
	};
}

export function mergeTransitions<El extends HTMLElement | SVGElement>(
	node: El,
	fn: (node: El) => TransitionConfig[],
) {
	const configs = fn(node);

	// We always get the max delay and duration, but will interpolate for minor ones
	const maxDelay = configs.map((c) => c.delay ?? 0).reduce((a, b) => Math.max(a, b), 0);
	const maxDuration = configs.map((c) => c.duration ?? 0).reduce((a, b) => Math.max(a, b), 0);
	const newDuration = maxDuration + maxDelay;

	const merged = configs.reduce((acc, curr) => {
		const duration = curr.duration ?? 0;
		const delay = curr.delay ?? 0;
		const easing = curr.easing ?? linear;

		const getTimingValues = (t: number) => {
			const transpired = t * newDuration;
			const withoutDelay = Math.max(0, transpired - delay);
			const actualT = Math.min(withoutDelay / duration, 1);
			const easedT = easing(actualT);

			return [easedT, 1 - easedT];
		};

		const css = (_t: number, _u: number) => {
			const accCss = splitCssString(acc.css?.(_t, _u) ?? "");
			const [t, u] = getTimingValues(_t);
			const currCss = splitCssString(curr.css?.(t, u) ?? "");

			return [...accCss, ...currCss].join("; ");
		};

		const tick = (_t: number, _u: number) => {
			acc.tick?.(_t, _u);
			const [t, u] = getTimingValues(_t);
			curr.tick?.(t, u);
		};

		return {
			delay: 0,
			duration: newDuration,
			css,
			tick,
			easing: linear,
		};
	}, {} as TransitionConfig);

	return merged;
}
