export class Interval {
	constructor(callback: () => void, delay: number) {
		$effect(() => {
			const interval = setInterval(callback, delay);
			return () => clearInterval(interval);
		});
	}
}
