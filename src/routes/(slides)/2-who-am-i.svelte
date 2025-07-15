<script lang="ts">
	import Ticket from "$lib/components/ticket.svelte";
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";
	import { Star, Download } from "phosphor-svelte";
	import DeviconSvelte from "~icons/devicon/svelte";
	import OcticonMarkGithub16 from "~icons/octicon/mark-github-16";
	import LogosHuggingFaceIcon from "~icons/logos/hugging-face-icon";

	const slide = presentation.registerSlide(1);
</script>

{#snippet repo({
	src,
	alt,
	stars,
	downloads,
}: {
	src: string;
	alt: string;
	stars: string;
	downloads: string;
})}
	<div class="relative w-72 overflow-hidden rounded-xl">
		<img {src} {alt} />
		<div class="absolute right-1 bottom-1 flex gap-2 font-mono text-xs">
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

<div {...slide.attrs} class={cn(slide.attrs.class, "flex items-center justify-center gap-64")}>
	<Ticket />
	<div class="flex flex-col gap-8">
		<ul class="flex flex-col gap-4 text-4xl font-bold">
			<li class="flex items-center gap-4">
				<DeviconSvelte /> Svelte Ambassador
			</li>
			<li class="flex items-center gap-4">
				<LogosHuggingFaceIcon />
				Frontend Developer at Hugging Face
			</li>
			<li class="flex items-center gap-4">
				<OcticonMarkGithub16 />
				Open-source maintainer
			</li>
			<li class="flex items-center gap-4">💩 Also writes crappy software</li>
		</ul>
		<div class="flex items-center gap-8">
			{@render repo({ src: "/melt.png", alt: "melt", stars: "4k", downloads: "100k" })}
			{@render repo({ src: "/runed.png", alt: "runed", stars: "1.2k", downloads: "224k" })}
		</div>
	</div>
</div>
