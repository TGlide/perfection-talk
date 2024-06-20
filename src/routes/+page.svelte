<script lang="ts">
	import Slide from "$lib/components/Slide.svelte";
	import { presentation } from "$lib/presentation.svelte";
	import { dev } from "$app/environment";
	import FrameworkComparison from "./(slides)/framework-comparison.svelte";
	import Experience from "./(slides)/experience.svelte";
	import Intro from "./(slides)/intro.svelte";
	import Objectives from "./(slides)/objectives.svelte";
	import WhoAmI from "./(slides)/who-am-i.svelte";
	import { AnimationFrames } from "runed";
	import { Link, TwitterLogo } from "phosphor-svelte";

	const DEBUG = true;

	// Uncomment to always see last slide
	// $effect(() => {
	// presentation.slideIdx = presentation.totalSlides - 1;
	// });

	const start = Date.now();
	let now = $state(Date.now());

	new AnimationFrames(() => {
		now = Date.now();
	});

	const delta = $derived(now - start);
	const seconds = $derived(delta / 1000);
	const minutes = $derived(seconds / 60);
	const hours = $derived(minutes / 60);
	const elapsed = $derived(
		`${hours.toFixed(0).padStart(2, "0")}:${minutes.toFixed(0).padStart(2, "0")}:${seconds.toFixed(0).padStart(2, "0")}`,
	);
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
		<p>Elapsed: {elapsed}</p>
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
