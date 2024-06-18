<script lang="ts" context="module">
	const CTX_KEY = Symbol("slide");

	export const SlideCtx = {
		get() {
			return getContext<Slide>(CTX_KEY);
		},
		set(slide: Slide) {
			return setContext(CTX_KEY, slide);
		},
	};
</script>

<script lang="ts">
	import { getContext, setContext, type Snippet } from "svelte";
	import { presentation, type Slide } from "./presentation.svelte";

	const { children }: { children?: Snippet } = $props();

	const slide = presentation.registerSlide();
	SlideCtx.set(slide);
</script>

{#if presentation.isCurrent(slide)}
	{@render children?.()}
{/if}
