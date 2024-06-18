<script lang="ts">
	import Slide from "$lib/Slide.svelte";
	import { presentation } from "$lib/presentation.svelte";
	import { flip } from "svelte/animate";
	import { fade } from "svelte/transition";
</script>

Total: {presentation.totalSlides}
<br />

<Slide steps={2}>
	{#snippet children({ currentStep })}
		<h1 in:fade>Slide 1</h1>
		{#each currentStep === 1 ? [1, 2] : [2, 1] as i (i)}
			<p animate:flip>{i}</p>
		{/each}
	{/snippet}
</Slide>

<Slide>2</Slide>
