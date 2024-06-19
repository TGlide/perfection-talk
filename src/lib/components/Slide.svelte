<script lang="ts">
	import { type Snippet } from "svelte";
	import { watch } from "runed";
	import { Slide, presentation } from "$lib/presentation.svelte";

	let {
		children,
		steps = 1,
		class: klass,
		slide: slideProp = $bindable<Slide | null>(null),
	}: {
		class?: string;
		slide?: Slide | null;
		children?: Snippet<[{ step: number }]>;
		steps?: number;
	} = $props();

	const slide = presentation.registerSlide(steps);

	$effect(() => {
		slideProp = slide
	});

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
		position: relative;

		transition: 0.25s;
	}

	[data-animating="true"] {
		scale: 0.95;
		border-radius: 1rem;
	}
</style>
