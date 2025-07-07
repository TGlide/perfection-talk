<script lang="ts">
	import Slide from "$lib/components/Slide.svelte";
	import { presentation } from "$lib/presentation.svelte";
	import { dev } from "$app/environment";
	import FrameworkComparison from "./(slides)/framework-comparison.svelte";
	import Experience from "./(slides)/experience.svelte";
	import Intro from "./(slides)/intro.svelte";
	import Objectives from "./(slides)/objectives.svelte";
	import WhoAmI from "./(slides)/who-am-i.svelte";
	import { Link, TwitterLogo } from "phosphor-svelte";

	const DEBUG = true;

	// Uncomment to always see last slide
	// $effect(() => {
	// 	presentation.slideIdx = 4;
	// });
</script>

<div class="presentation" style="translate: {presentation.slideIdx * -100}vw 0">
	<Intro />
	<WhoAmI />
	<Objectives />
	<FrameworkComparison />
	<Experience />

	<Slide class="grid place-content-center">
		{#snippet children({ isCurrent })}
			<iframe
				class="aspect-video w-[1600px] rounded-2xl shadow-sm"
				src="https://www.youtube.com/embed/AdNJ3fydeao?si=m98hR27Wr29hgMaL"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>

			<img src="/rich.png" alt="rich" class="absolute bottom-0 left-4 h-[80vh] {isCurrent ? 'delay-1000' : 'rotate-180 opacity-0'} transition-all duration-500 origin-bottom-left" />
		{/snippet}
	</Slide>

	<Slide>
		<iframe
			class="absolute left-1/2 top-1/2 aspect-video w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-sm"
			src="https://rethinking-reactivity.surge.sh/#slide=29"
			title="Rethinking Reactivity"
		>
		</iframe>
	</Slide>

	<Slide class="grid place-items-center">
		<a
			href="https://learn.svelte.dev"
			target="_blank"
			class="font-mono text-8xl font-bold underline">learn.svelte.dev</a
		>
	</Slide>

	<Slide class="grid place-items-center">
		<div class="flex flex-col items-center gap-8">
			<p class="text-center text-8xl font-bold">Obrigado!</p>
			<div class="flex items-center gap-8">
				<a
					href="thomasglopes.com"
					target="_blank"
					class="flex items-center gap-2 text-2xl underline"><Link /> thomasglopes.com</a
				>
				<a
					href="https://twitter.com/thomasglopes"
					target="_blank"
					class="flex items-center gap-2 text-2xl underline"
					><TwitterLogo class="text-blue-500" weight="fill" /> @thomasglopes</a
				>
			</div>
		</div>
	</Slide>
</div>

{#if dev && DEBUG}
	<div class="fixed bottom-4 right-4 rounded-md bg-black/50 p-2 font-mono text-white">
		<p>Slide: {presentation.slideIdx + 1} / {presentation.totalSlides}</p>
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
