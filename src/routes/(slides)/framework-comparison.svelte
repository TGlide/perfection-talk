<script lang="ts">
	import { Interval } from "$lib/spells/interval.svelte";
	import { randomBetween } from "$lib/math";
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";

	const slide = presentation.registerSlide(2);
	let features = $state(0.4);
	const efficiency = $derived(1 - features);

	new Interval(() => {
		features = randomBetween(0.1, 0.9);
	}, 1000);
</script>

<div {...slide.attrs} class={cn(slide.attrs.class, "flex items-center justify-around")}>
	<div class="flex flex-col items-center gap-16">
		<div class="relative size-[300px]">
			<img class="absolute top-[-7px] left-[125px] size-[164px]" src="/angular.svg" alt="angular" />
			<img class="absolute top-[100px] left-[10px] size-[164px]" src="/vue.svg" alt="vue" />
			<img class="absolute top-[140px] left-[100px] size-[164px]" src="/react.svg" alt="react" />
		</div>

		<div class="flex gap-16 text-xl font-bold">
			<div class="flex flex-col items-center gap-4 text-center">
				<div class="flex h-[500px] flex-col justify-end">
					<div
						class="w-24 rounded-2xl bg-cyan-500 outline-2 outline-cyan-700 transition-all duration-500 outline-solid"
						style:height="{features * 500}px"
					></div>
				</div>
				<p>Features</p>
			</div>
			<div class="flex flex-col items-center gap-4 text-center">
				<div class="flex h-[500px] flex-col justify-end">
					<div
						class="w-24 rounded-2xl bg-teal-500 outline-2 outline-teal-700 transition-all duration-500 outline-solid"
						style:height="{efficiency * 500}px"
					></div>
				</div>
				<p>Efficiency</p>
			</div>
		</div>
	</div>

	<div
		class="flex flex-col items-center gap-16 font-bold transition"
		style:opacity={slide.step >= 2 ? 1 : 0}
	>
		<img src="/svelte.svg" alt="svelte" class="relative size-[300px]" />
		<div class="flex items-end gap-8 text-xl">
			<div class="flex flex-col items-center gap-4 text-center">
				<div class="flex h-[500px] flex-col justify-end">
					<div
						class="w-24 rounded-2xl bg-[#FF3E01] transition-all delay-300 duration-1000"
						style:height="{slide.step >= 2 ? 500 : 30}px"
					></div>
				</div>
				<p>Features</p>
			</div>
			<span>❤️</span>
			<div class="flex flex-col items-center gap-4 text-center">
				<div class="flex h-[500px] flex-col justify-end">
					<div
						class="w-24 rounded-2xl bg-[#FF3E01] transition-all delay-300 duration-1000"
						style:height="{slide.step >= 2 ? 500 : 30}px"
					></div>
				</div>
				<p>Efficiency</p>
			</div>
		</div>
	</div>
</div>
