<script lang="ts">
	import { type Snippet } from "svelte";
	import { presentation } from "./presentation.svelte";

	const { children, steps = 1 }: { children?: Snippet<[{ currentStep: number }]>; steps?: number } =
		$props();

	const slide = presentation.registerSlide(steps);
</script>

{#if presentation.isCurrent(slide)}
	{@render children?.({ currentStep: slide.currentStep })}
{/if}
