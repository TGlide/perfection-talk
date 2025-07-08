<script>
	import Counter from "$lib/components/counter.svelte";
	import { svelteShape } from "../svelte-shape";
	import { blur, draw, fade, scale } from "svelte/transition";
	import { expand, fix, mergeTransitions } from "$lib/spells/transitions.svelte";
	import { quintOut } from "svelte/easing";
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";

	const slide = presentation.registerSlide(6);
</script>

<div {...slide.attrs} class={cn(slide.attrs.class, "grid place-items-center")}></div>
