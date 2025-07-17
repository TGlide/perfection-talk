<script lang="ts">
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";

	const slide = presentation.registerSlide(1);
</script>

<div {...slide.attrs} class={cn(slide.attrs.class, "relative flex flex-col justify-end p-8")}>
	<p class="font-devil-serif text-[12rem]">
		the <span class="text-red-500 italic">Devil</span>
	</p>
	<p class="font-devil-serif text-[12rem]">is in the details</p>
</div>
