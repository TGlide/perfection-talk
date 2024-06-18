<script lang="ts">
	import { type Snippet } from "svelte";
	import { SlideCtx } from "./Slide.svelte";

	const { children }: { children?: Snippet } = $props();

	const slide = SlideCtx.get();
	const step = slide.registerStep();
</script>

{#if step.isActive}
	{@render children?.()}
{/if}
