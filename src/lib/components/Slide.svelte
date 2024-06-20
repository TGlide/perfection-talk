<script lang="ts">
	import { type Snippet } from "svelte";
	import { watch } from "runed";
	import { Slide, presentation } from "$lib/presentation.svelte";
	import { cn } from "$lib/style";

	type SlideProps = {
		children?: Snippet<[{ step: number }]>;
		steps?: number;
		slide?: Slide | null;
		class?: string;
	};

	let {
		children,
		steps = 1,
		slide: slideProp = $bindable<Slide | null>(null),
		class: classProp,
	}: SlideProps = $props();

	const slide = presentation.registerSlide(steps);

	$effect(() => {
		slideProp = slide;
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

<div
	class={cn("relative h-screen w-screen shrink-0 bg-[#171717]", classProp)}
	data-animating={animating}
>
	{@render children?.({ step: slide.step })}
</div>

<style>
	div {
		transition: 0.25s;
	}

	[data-animating="true"] {
		scale: 0.95;
		border-radius: 1rem;
	}
</style>
