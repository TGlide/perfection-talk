<script lang="ts">
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";
	import MdiTwitter from "~icons/mdi/twitter";
	import LogosBluesky from "~icons/logos/bluesky";
	import MdiGithub from "~icons/mdi/github";
	import TablerWorldHeart from "~icons/tabler/world-heart";

	const slide = presentation.registerSlide(1);
</script>

<div
	{...slide.attrs}
	class={cn(slide.attrs.class, "relative flex flex-col items-center justify-center gap-16 p-8")}
>
	<h1 class="font-devil-serif text-center text-8xl text-white">thank you.</h1>
	<ul class="flex flex-col items-center justify-center gap-4 font-semibold">
		<li class="flex items-center gap-2 text-2xl">
			<TablerWorldHeart class="text-red-400" /> thomasglopes.com
		</li>
		<li class="flex items-center gap-2 text-2xl">
			<LogosBluesky /> @thomas.rocks
		</li>
		<li class="flex items-center gap-2 text-2xl">
			<MdiTwitter class="text-blue-400" /> @thomasglopes
		</li>
		<li class="flex items-center gap-2 text-2xl">
			<MdiGithub /> @tglide
		</li>
	</ul>
</div>
