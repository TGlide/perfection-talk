<script lang="ts">
	import Slide from "$lib/Slide.svelte";
	import { presentation } from "$lib/presentation.svelte";
	import { fade } from "svelte/transition";
</script>

Total: {presentation.totalSlides}
<br />

<Slide steps={2}>
	{#snippet children({ currentStep })}
		<h1 in:fade>Slide 1</h1>
		{#if currentStep === 1}
			<p in:fade>Step 1</p>
		{:else if currentStep === 2}
			<p in:fade>Step 2</p>
		{/if}
	{/snippet}
</Slide>

<Slide>2</Slide>
