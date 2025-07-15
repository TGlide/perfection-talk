<script lang="ts">
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";

	const slide = presentation.registerSlide(3);
</script>

<div {...slide.attrs} class={cn(slide.attrs.class, "relative")}>
	<div
		class={[
			"absolute inset-x-0 bottom-0 h-screen bg-gradient-to-b from-neutral-900 to-amber-800",
			"transition-all duration-500",
			slide.step === 1 ? "translate-y-full opacity-0" : "opacity-80",
		]}
		aria-hidden="true"
	></div>
	<img src="/imgs/ars.png" alt="ars" class="abs-center absolute w-[80vw] rounded-2xl shadow" />
</div>
