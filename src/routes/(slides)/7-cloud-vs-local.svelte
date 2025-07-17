<script lang="ts">
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";
	import { animate } from "motion";
	import type { Attachment } from "svelte/attachments";
	import DeviconNotion from "~icons/devicon/notion";
	import MaterialSymbolsCloud from "~icons/material-symbols/cloud";
	import LogosGooglePhotos from "~icons/logos/google-photos";
	import SimpleIconsGooglesheets from "~icons/simple-icons/googlesheets";
	import DeviconFigma from "~icons/devicon/figma";

	const slide = presentation.registerSlide(3);
	const springOpts = { duration: 0.5, bounce: 0.2, type: "spring" } as const;

	function animateCloudIcon(delay: number): Attachment<HTMLElement> {
		return (node) => {
			const size = 128;
			animate(
				node,
				{
					width: slide.step < 2 ? 0 : size,
					height: slide.step < 2 ? 0 : size,
				},
				{ ...springOpts, delay },
			);
		};
	}
</script>

<div {...slide.attrs} class={cn(slide.attrs.class, "relative ")}>
	<div class="flex h-full flex-col items-center justify-center gap-16">
		<MaterialSymbolsCloud
			class="size-64 text-white opacity-0"
			aria-label="cloud"
			{@attach (node: HTMLElement) => {
				animate(
					node,
					{
						opacity: slide.isCurrent ? 1 : 0,
						scale: slide.isCurrent ? 1 : 0.8,
					},
					{ ...springOpts, delay: 1.5 },
				);
			}}
		/>
		<div class="flex items-center gap-16">
			<DeviconNotion class="size-0" {@attach animateCloudIcon(0)} />
			<LogosGooglePhotos class="size-0" {@attach animateCloudIcon(0.5)} />
			<SimpleIconsGooglesheets class="size-0 text-green-400" {@attach animateCloudIcon(1.0)} />
			<DeviconFigma class="size-0" {@attach animateCloudIcon(1.5)} />
		</div>
	</div>

	<div
		class={[
			"absolute inset-0 flex items-center justify-center gap-16 bg-black/50 backdrop-blur-2xl",
			"transition",
			slide.step < 3 && "pointer-events-none opacity-0",
		]}
	>
		<ul class=" flex list-disc flex-col gap-8 text-6xl font-bold">
			<li>Latency</li>
			<li>Inconsistent data between client and server</li>
			<li>Depend on an internet connection to work</li>
		</ul>
	</div>
</div>
