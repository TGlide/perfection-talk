<script lang="ts">
	import Slide from "$lib/Slide.svelte";
	import Step from "$lib/Step.svelte";
	import { presentation } from "$lib/presentation.svelte";
	import { fade } from "svelte/transition";
</script>

Total: {presentation.totalSlides}
<br />

<Slide>
	<h1 in:fade>Slide 1</h1>
	<Step>Step 1</Step>
	<Step>Step 2</Step>
</Slide>

<Slide>2</Slide>
