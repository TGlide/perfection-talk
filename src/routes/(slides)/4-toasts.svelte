<script lang="ts">
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";
	import { animate } from "motion";
	import { scale } from "svelte/transition";
	import LogosYoutubeIcon from "~icons/logos/youtube-icon";

	const slide = presentation.registerSlide(3);
	const springOpts = { duration: 0.5, bounce: 0.2, type: "spring" } as const;
</script>

<div {...slide.attrs} class={cn(slide.attrs.class, "grid place-items-center")}>
	<div class="flex w-full items-center justify-center">
		<img
			src="/imgs/toast.png"
			alt="toast"
			class="h-80 shrink-0"
			transition:scale
			{@attach (node) => {
				animate(
					node,
					{
						rotate: slide.step < 3 ? 0 : -12,
						scale: slide.step < 2 ? 0.8 : 1,
						y: slide.step < 2 ? 100 : 0,
						opacity: slide.step < 2 ? 0 : 1,
					},
					{ ...springOpts, duration: slide.step < 3 ? 0.3 : 0.6 },
				);
			}}
		/>

		<a href="https://www.youtube.com/watch?v=p00EF6_b5pI" target="_blank" rel="noreferrer">
			<LogosYoutubeIcon
				class="-ml-12 size-0"
				{@attach (node: HTMLElement) => {
					const size = 256;
					animate(
						node,
						{
							width: slide.step < 3 ? 0 : size,
							height: slide.step < 3 ? 0 : size,
						},
						springOpts,
					);
				}}
			/>
		</a>
	</div>
</div>
