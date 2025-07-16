import { innerHeight, innerWidth } from "svelte/reactivity/window";

export const windowSize = {
	get w() {
		return innerWidth.current ?? 0;
	},
	get h() {
		return innerHeight.current ?? 0;
	},
};
