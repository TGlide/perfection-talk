<script lang="ts">
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";
	import { Tooltip } from "melt/components";
	import { animate } from "motion";
	import PhChefHatFill from "~icons/ph/chef-hat-fill";

	const slide = presentation.registerSlide(3);
	const springOpts = { duration: 0.5, bounce: 0.2, type: "spring" } as const;
</script>

<div {...slide.attrs} class={cn(slide.attrs.class, "relative grid place-items-center")}>
	<iframe
		src="https://inclusive-components.design/tooltips-toggletips/"
		title="Inclusive Components: Tooltips and Toggletips"
		class="h-[80vh] w-[80vw] rounded-2xl"
		inert={slide.step >= 2}
	>
	</iframe>
	<div
		class={[
			"absolute inset-0 flex items-center justify-center gap-16 bg-black/50 opacity-0 backdrop-blur-2xl",
			slide.step < 2 ? "pointer-events-none" : "",
		]}
		{@attach (node) => {
			animate(
				node,
				{
					opacity: slide.step < 2 ? 0 : 1,
				},
				{ ...springOpts },
			);
		}}
	>
		<Tooltip
			floatingConfig={{ computePosition: { placement: "top" } }}
			openDelay={0}
			disableHoverableContent
			forceVisible
		>
			{#snippet children(tooltip)}
				<button
					type="button"
					class="grid size-24 place-items-center rounded-3xl bg-gray-200 text-4xl text-gray-900
					transition hover:bg-gray-300 active:bg-gray-400"
					aria-label="Add"
					{...tooltip.trigger}
					onfocus={() => {
						/* noop */
					}}
				>
					<PhChefHatFill aria-label="Plus"></PhChefHatFill>
				</button>

				<div
					{...tooltip.content}
					class="absolute block scale-90 rounded-3xl bg-white p-0 opacity-0 shadow-xl"
					{@attach (node) => {
						animate(
							node,
							{
								opacity: tooltip.open ? 1 : 0,
								scale: tooltip.open ? 1 : 0.9,
							},
							{ ...springOpts, bounce: 0.1, duration: 0.4 },
						);
					}}
				>
					<div {...tooltip.arrow} class="size-6 rounded-tl-xl"></div>
					<p class="px-12 py-4 text-4xl text-gray-700">Cook some pizza</p>
				</div>
			{/snippet}
		</Tooltip>

		<img
			src="/imgs/linear.svg"
			alt="linear"
			class="size-0 rounded-4xl shadow-xl"
			{@attach (node: HTMLElement) => {
				const size = 128;
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
	</div>
</div>

<style>
</style>
