<script lang="ts">
	import { Interval } from "$lib/Interval.svelte";
	import Slide from "$lib/components/Slide.svelte";
	import { randomBetween } from "$lib/math";

	let features = $state(0.4);
	const efficiency = $derived(1 - features);

	new Interval(() => {
		features = randomBetween(0.1, 0.9);
	}, 1000);
</script>

<Slide class="flex items-center justify-around" steps={2}>
	{#snippet children({ step })}
		<div class="flex flex-col items-center gap-16">
			<div class="relative size-[300px]">
				<img
					class="absolute left-[125px] top-[-7px] size-[164px]"
					src="/angular.svg"
					alt="angular"
				/>
				<img class="absolute left-[10px] top-[100px] size-[164px]" src="/vue.svg" alt="vue" />
				<img class="absolute left-[100px] top-[140px] size-[164px]" src="/react.svg" alt="react" />
			</div>

			<div class="flex gap-16 text-xl font-bold">
				<div class="flex flex-col items-center gap-4 text-center">
					<div class="flex h-[500px] flex-col justify-end">
						<div
							class="w-24 rounded-2xl bg-cyan-500 outline-solid outline-2 outline-cyan-700 transition-all duration-500"
							style:height="{features * 500}px"
						></div>
					</div>
					<p>Features</p>
				</div>
				<div class="flex flex-col items-center gap-4 text-center">
					<div class="flex h-[500px] flex-col justify-end">
						<div
							class="w-24 rounded-2xl bg-teal-500 outline-solid outline-2 outline-teal-700 transition-all duration-500"
							style:height="{efficiency * 500}px"
						></div>
					</div>
					<p>Efficiency</p>
				</div>
			</div>
		</div>

		<div class="flex flex-col items-center gap-16 font-bold transition" style:opacity={step >= 2 ? 1 : 0}>
			<img src="/svelte.svg" alt="svelte" class="relative size-[300px]" />
			<div class="flex items-end gap-8 text-xl">
				<div class="flex flex-col items-center gap-4 text-center">
					<div class="flex h-[500px] flex-col justify-end">
						<div
							class="w-24 rounded-2xl bg-[#FF3E01] transition-all delay-300 duration-1000"
							style:height="{step >= 2 ? 500 : 30}px"
						></div>
					</div>
					<p>Features</p>
				</div>
				<span>❤️</span>
				<div class="flex flex-col items-center gap-4 text-center">
					<div class="flex h-[500px] flex-col justify-end">
						<div
							class="w-24 rounded-2xl bg-[#FF3E01] transition-all delay-300 duration-1000"
							style:height="{step >= 2 ? 500 : 30}px"
						></div>
					</div>
					<p>Efficiency</p>
				</div>
			</div>
		</div>
	{/snippet}
</Slide>
