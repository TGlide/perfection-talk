export function clamp(min: number, value: number, max: number) {
	return Math.max(min, Math.min(value, max));
}

export function randomBetween(min: number, max: number) {
	return Math.random() * (max - min) + min;
}
