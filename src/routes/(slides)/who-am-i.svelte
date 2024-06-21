<script lang="ts">
	import Slide from "$lib/components/Slide.svelte";
	import Ticket from "$lib/components/Ticket.svelte";
	import { Star, Download } from "phosphor-svelte";
</script>

{#snippet repo({src, alt, stars, downloads}: {src: string; alt: string; stars: string; downloads: string})}
	<div class="relative w-72 overflow-hidden rounded-xl">
		<img {src} {alt} />
		<div class="absolute bottom-1 right-1 flex gap-2 font-mono text-xs">
			<div class="flex items-center gap-1">
				<Star weight="fill" />
				{stars}
			</div>
			<div class="flex items-center gap-1">
				<Download weight="fill" />
				{downloads} weekly
			</div>
		</div>
	</div>
{/snippet}

<Slide class="flex items-center justify-center gap-64">
	<Ticket />
	<div class="flex flex-col gap-8">
		<ul class="flex list-disc flex-col gap-4 text-4xl font-bold">
			<li>Svelte Ambassador</li>
			<li>Ex-Significa 🥚</li>
			<li>Open source maintainer</li>
		</ul>
		<div class="flex items-center gap-8">
			{@render repo({src: "/melt.png", alt: "melt", stars: "3k", downloads: "80k"})}
			{@render repo({src: "/runed.png", alt: "runed", stars: "281", downloads: "1k"})}
		</div>
	</div>
</Slide>
