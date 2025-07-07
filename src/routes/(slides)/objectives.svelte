<script>
	import { presentation } from "$lib/presentation.svelte";
	import { cn } from "$lib/style";
	import { blur } from "svelte/transition";

	const slide = presentation.registerSlide(3);
</script>

<div {...slide.attrs} class={cn(slide.attrs.class, "grid place-content-center")}>
	<h1
		class="absolute left-1/2 {slide.step > 1
			? 'top-8 text-6xl'
			: 'top-1/2 -translate-y-1/2 text-8xl'} -translate-x-1/2 text-center font-bold
				transition-all duration-500"
	>
		🎯 Objectives
	</h1>

	{#if slide.step > 2}
		<p transition:blur class="relative text-7xl font-bold">1. Toolkit for interactive apps</p>
		<p transition:blur class="mt-12 text-7xl font-bold">2. Generate optimized code</p>
	{/if}
</div>
