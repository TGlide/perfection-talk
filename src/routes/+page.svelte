<script lang="ts">
	import Counter from "$lib/components/Counter.svelte";
	import Slide from "$lib/components/Slide.svelte";
	import { presentation } from "$lib/presentation.svelte";
	import { blur, draw, fade, scale } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import { svelteShape } from "./svelte-shape";
	import { expand, fix, mergeTransitions } from "$lib/transitions.svelte";
	import { dev } from "$app/environment";
	import FrameworkComparison from "./(slides)/framework-comparison.svelte";

	$effect(() => {
		// Always edit the last one, easier for creating stuff
		presentation.slideIdx = presentation.totalSlides - 1;
	});
</script>

<div class="presentation" style="translate: {presentation.slideIdx * -100}vw 0">
	<Slide steps={5} class="grid place-items-center">
		{#snippet children({ step })}
			{#if step >= 2 && step < 4}
				<div
					class="flex items-center justify-center gap-6 text-8xl font-black
					transition duration-500 {step > 2 ? 'opacity-50' : ''}"
					in:blur={{ duration: 500 }}
					out:blur={{ duration: 300 }}
				>
					<Counter value={12} />
					anos atrás
				</div>
			{/if}
			{#if step >= 3 && step < 4}
				<img
					class="absolute left-1/2 top-1/2 size-[240px] -translate-x-1/2 -translate-y-1/2
					transition-all duration-500 {step > 3 ? 'opacity-50' : ''}"
					src="/ractive.svg"
					alt="ractive"
					in:scale={{ duration: 500 }}
					out:fade={{ duration: 200 }}
				/>
			{/if}
			{#if step >= 4}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 103 124"
					class="absolute left-1/2 top-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2"
				>
					<g out:fade={{ duration: 200 }}>
						<path
							in:fix={(el) => expand(el, { duration: 200, delay: 1400, easing: quintOut })}
							style="stroke: #ff3e00; fill: #ff3e00; stroke-width: 50;"
							d={svelteShape.outer}
						/>
						<path
							in:mergeTransitions={(node) => {
								return [
									draw(node, { duration: 1000, delay: 300 }),
									fade(node, { duration: 200, delay: 200 }),
								];
							}}
							style="stroke:#ff3e00; stroke-width: 3; fill: white"
							d={svelteShape.inner}
						/>
					</g>
				</svg>
			{/if}
			{#if step >= 5}
				<img
					class="absolute left-1/2 top-1/2 h-[160px] translate-x-[100px] translate-y-[120px] rounded-xl"
					src="/pt.png"
					alt="bandeira de portugal"
					transition:scale
				/>
			{/if}
		{/snippet}
	</Slide>

	<!-- Presentation name -->
	<!--
<Slide steps={2}>
	{#snippet children({ step })}
		<div class="grid h-screen w-screen place-items-center">hi</div>
	{/snippet}
</Slide>
-->

	<Slide class="grid place-content-center" steps={3}>
		{#snippet children({ step })}
			<h1
				class="absolute left-1/2 {step > 1
					? 'top-8 text-6xl'
					: 'top-1/2 -translate-y-1/2 text-9xl'} -translate-x-1/2 text-center font-bold
				transition-all duration-500"
			>
				🎯 Objetivos
			</h1>

			{#if step > 2}
				<p transition:blur class="relative text-7xl font-bold">
					1. Ferramentas para apps interativas
				</p>
				<p transition:blur class="mt-12 text-7xl font-bold">2. Gerar código otimizado</p>
			{/if}
		{/snippet}
	</Slide>

	<FrameworkComparison />
</div>

{#if dev}
	<div class="fixed bottom-4 right-4 rounded-md bg-black/50 p-1 font-mono text-white">
		<p>Slide: {presentation.slideIdx + 1}</p>
		<p>Step: {presentation.currSlide.step} / {presentation.currSlide.totalSteps}</p>
	</div>
{/if}

<style>
	.presentation {
		width: min-content;
		height: 100vh;
		background: black;

		display: flex;
		transition: translate 0.5s 0.25s ease;
	}
</style>
