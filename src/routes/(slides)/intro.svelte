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

<div {...slide.attrs} class={cn(slide.attrs.class, "grid place-items-center")}>
	{#if slide.step >= 2 && slide.step < 5}
		<div
			class="flex items-center justify-center gap-6 text-8xl font-black
					transition duration-500 {slide.step > 2 ? 'opacity-50' : ''}"
			in:blur={{ duration: 500 }}
			out:blur={{ duration: 300 }}
		>
			<Counter value={12} />
			years ago
		</div>
	{/if}
	<iframe
		class="{slide.step !== 3 ? 'scale-75 opacity-0' : 'scale-100 opacity-100'}
			absolute top-1/2 left-1/2 aspect-video w-[90vw] -translate-x-1/2 -translate-y-1/2
			rounded-2xl shadow transition-all"
		src="https://pudding.cool/2024/03/greatest-music/"
		title="pudding"
	></iframe>

	{#if slide.step >= 4 && slide.step < 5}
		<img
			class="absolute top-1/2 left-1/2 size-[240px] -translate-x-1/2 -translate-y-1/2
					transition-all duration-500 {slide.step > 4 ? 'opacity-50' : ''}"
			src="/ractive.svg"
			alt="ractive"
			in:scale={{ duration: 500 }}
			out:fade={{ duration: 200 }}
		/>
	{/if}
	{#if slide.step >= 5}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 103 124"
			class="absolute top-1/2 left-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2"
		>
			<g out:fade={{ duration: 200 }}>
				<path
					in:fix={(el) => expand(el, { duration: 200, delay: 1400, easing: quintOut })}
					style="stroke: #ff3e00; fill: #ff3e00; stroke-width: 50;"
					d={svelteShape.outer}
				/>
				<path
					in:mergeTransitions={(node) => {
						return [
							draw(node, { duration: 1000, delay: 300 }),
							fade(node, { duration: 200, delay: 200 }),
						];
					}}
					style="stroke:#ff3e00; stroke-width: 3; fill: white"
					d={svelteShape.inner}
				/>
			</g>
		</svg>
	{/if}
	{#if slide.step >= 6}
		<img
			class="absolute top-1/2 left-1/2 h-[160px] translate-x-[100px] translate-y-[120px] rounded-xl"
			src="/pt.png"
			alt="bandeira de portugal"
			transition:scale
		/>
	{/if}
</div>
