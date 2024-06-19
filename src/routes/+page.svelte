<script lang="ts">
	import Counter from "$lib/Counter.svelte";
	import Slide from "$lib/Slide.svelte";
	import { presentation } from "$lib/presentation.svelte";
	import { fade, scale } from "svelte/transition";
</script>

<Slide steps={4}>
	{#snippet children({ currentStep })}
		<div class="grid h-screen w-screen place-items-center bg-black text-white">
			<div
				class="flex items-center justify-center gap-6 text-8xl font-black
				transition duration-500 {currentStep > 1 ? 'opacity-50' : ''}"
			>
				<Counter value={5} />
				anos atrás
			</div>
			{#if currentStep >= 2}
				<img
					class="absolute left-1/2 top-1/2 size-[240px] -translate-x-1/2 -translate-y-1/2
					transition-all duration-500"
					src="/ractive.svg"
					alt="ractive"
					transition:scale={{ duration: 500 }}
				/>
			{/if}
			{#if currentStep >= 3}
				<img
					class="absolute left-1/2 top-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2"
					src="/svelte.svg"
					alt="svelte"
					transition:scale={{ duration: 500 }}
				/>
			{/if}
			{#if currentStep >= 4}
				<img
					class="absolute left-1/2 top-1/2 h-[80px] translate-x-[80px] translate-y-[120px] rounded-md"
					src="/pt.png"
					alt="bandeira de portugal"
					transition:fade
				/>
			{/if}
		</div>
	{/snippet}
</Slide>

<Slide>2</Slide>

<div class="fixed bottom-4 right-4 rounded-md bg-black/50 p-1 font-mono text-white">
	<p>Slide: {presentation.slideIdx + 1}</p>
	<p>Step: {presentation.currentSlide.currentStep} / {presentation.currentSlide.totalSteps}</p>
</div>
