<script lang="ts">
	import { type Snippet } from "svelte";
	import { presentation } from "./presentation.svelte";
	import { watch } from "runed";

	const {
		children,
		steps = 1,
		class: klass,
	}: { class?: string; children?: Snippet<[{ step: number }]>; steps?: number } = $props();

	const slide = presentation.registerSlide(steps);

	let animating = $state(false);
	watch(
		() => presentation.slideIdx,
		() => {
			animating = true;
			const timeout = setTimeout(() => {
				animating = false;
			}, 750);

			return () => clearTimeout(timeout);
		},
		{ lazy: true },
	);
</script>

<div class={klass} data-animating={animating}>
	{@render children?.({ step: slide.step })}
</div>

<style>
	div {
		background: #171717;
		width: 100vw;
		height: 100vh;
		flex-shrink: 0;

		transition: 0.25s;
	}

	[data-animating="true"] {
		scale: 0.95;
		border-radius: 1rem;
	}
</style>
