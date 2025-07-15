<script lang="ts">
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";
	import { randomBetween } from "$lib/math";
	import { innerHeight, innerWidth } from "svelte/reactivity/window";

	const slide = presentation.registerSlide(3);

	const winSize = $derived({ w: innerWidth.current ?? 0, h: innerHeight.current ?? 0 });

	// Generate random spark positions and properties
	const sparks = $derived(
		Array.from({ length: 20 }, (_, i) => ({
			id: i,
			x: randomBetween(20, winSize.w - 20),
			y: randomBetween(20, winSize.h - 20),
			size: randomBetween(2, 6),
			delay: randomBetween(1000, 10000),
			duration: randomBetween(2000, 10000),
			angle: randomBetween(0, 360),
		})),
	);
</script>

<div {...slide.attrs} class={cn(slide.attrs.class, "relative overflow-hidden")}>
	<div
		class={[
			"absolute inset-x-0 bottom-0 h-screen bg-gradient-to-b from-neutral-900 to-amber-800",
			"transition-all duration-500",
			slide.step === 1 ? "translate-y-full opacity-0" : "opacity-80",
		]}
		aria-hidden="true"
	></div>
	<img src="/imgs/ars.png" alt="ars" class="abs-center absolute w-[80vw] rounded-2xl shadow" />

	<!-- Flame Sparks -->
	{#if slide.step === 3}
		{#each sparks as spark}
			<div
				class="pointer-events-none absolute"
				style="left: {spark.x}px; top: {spark.y}px; animation-delay: {spark.delay}ms;"
			>
				<div
					class="spark text-red-500"
					style="
						width: {spark.size}px; 
						height: {spark.size}px;
						transform: rotate({spark.angle}deg);
						animation-duration: {spark.duration}ms;
					"
				></div>
			</div>
		{/each}
	{/if}
</div>

<style>
	@keyframes sparkle {
		0% {
			opacity: 0;
			transform: scale(0) translateY(0px);
			background: hsl(16, 100%, 60%);
		}
		20% {
			opacity: 1;
			transform: scale(1) translateY(-10px);
			background: hsl(20, 100%, 65%);
		}
		50% {
			opacity: 0.8;
			transform: scale(0.8) translateY(-25px);
			background: hsl(28, 100%, 70%);
		}
		80% {
			opacity: 0.4;
			transform: scale(0.4) translateY(-40px);
			background: hsl(36, 100%, 75%);
		}
		100% {
			opacity: 0;
			transform: scale(0) translateY(-60px);
			background: hsl(45, 100%, 85%);
		}
	}

	.spark {
		--spark-color: hsl(20, 100%, 75%);
		border-radius: 50%;
		animation: sparkle infinite ease-out;
		box-shadow:
			0 0 6px var(--spark-color),
			0 0 12px var(--spark-color),
			0 0 18px var(--spark-color);
	}

	.spark::before {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 200%;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--spark-color), transparent);
		transform: translate(-50%, -50%);
		border-radius: 1px;
	}

	.spark::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 2px;
		height: 200%;
		background: linear-gradient(0deg, transparent, var(--spark-color), transparent);
		transform: translate(-50%, -50%);
		border-radius: 1px;
	}
</style>
