<script lang="ts">
	import Slide from "$lib/components/Slide.svelte";
	import { presentation } from "$lib/presentation.svelte";
	import { dev } from "$app/environment";
	import FrameworkComparison from "./(slides)/framework-comparison.svelte";
	import Experience from "./(slides)/experience.svelte";
	import Intro from "./(slides)/intro.svelte";
	import Objectives from "./(slides)/objectives.svelte";
	import WhoAmI from "./(slides)/who-am-i.svelte";

	$effect(() => {
		presentation.slideIdx  = 1
	});
</script>

<div class="presentation" style="translate: {presentation.slideIdx * -100}vw 0">
	<Intro />
	<WhoAmI />
	<Objectives />
	<FrameworkComparison />
	<Experience />

	<Slide class="grid place-content-center">
		<iframe
			class="aspect-video w-[1600px] rounded-2xl shadow"
			src="https://www.youtube.com/embed/AdNJ3fydeao?si=m98hR27Wr29hgMaL"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	</Slide>

	<Slide>
		<iframe
			class="absolute left-1/2 top-1/2 aspect-video w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow"
			src="https://rethinking-reactivity.surge.sh/#slide=29"
			title="Rethinking Reactivity"
		>
		</iframe>
	</Slide>
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
