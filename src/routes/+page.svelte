<script lang="ts">
	import { dev } from "$app/environment";
	import { presentation } from "$lib/spells/presentation.svelte";
	import WhoAmI from "./(slides)/2-who-am-i.svelte";

	const DEBUG = true;

	// Uncomment to always see last slide
	// $effect(() => {
	// 	presentation.slideIdx = presentation.totalSlides - 1;
	// });
</script>

<div class="presentation" style="translate: {presentation.slideIdx * -100}vw 0">
	<WhoAmI />
</div>

{#if dev && DEBUG}
	<div class="fixed right-4 bottom-4 rounded-md bg-black/50 p-2 font-mono text-white">
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
