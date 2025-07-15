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

	// Generate flame layers with different quantities and heights
	const generateFlames = (count: number, color: string, layer: number, width: number) => {
		return Array.from({ length: count }, (_, i) => {
			const baseHeight = 200 - layer * 50; // Each layer gets progressively shorter
			const heightVariation = randomBetween(-25, 25); // Small random variation
			const maxHeight = baseHeight + heightVariation;

			return {
				id: `${layer}-${i}`,
				width,
				maxHeight: Math.max(maxHeight, 60), // Minimum height to avoid too short flames
				color,
				duration: randomBetween(2000, 3000),
				delay: randomBetween(0, 1000),
			};
		});
	};

	const flameLayers = $derived({
		red: generateFlames(Math.ceil(winSize.w / 64) || 30, "#e20f00", 0, 64),
		orange: generateFlames(Math.ceil(winSize.w / 64) || 30, "#ff9c00", 1, 64),
		yellow: generateFlames(Math.ceil(winSize.w / 64) || 30, "#ffeb6e", 2, 64),
		white: generateFlames(Math.ceil(winSize.w / 48) || 40, "#fef1d9", 3, 48),
	});
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

	<!-- Low Poly Flames -->
	<div
		class={[
			"flames-container absolute inset-x-0 bottom-0",
			"transition-all duration-1000",
			slide.step === 3 ? "scale-y-100 opacity-100" : "scale-y-50 opacity-0",
		]}
	>
		<!-- Red flames (bottom layer) -->
		<div class="absolute right-0 bottom-0 left-0 flex items-end justify-center opacity-80">
			{#each flameLayers.red as flame}
				<div
					class="flame pointer-events-none"
					style="
						width: {flame.width}px;
						background: {flame.color};
						animation-duration: {flame.duration}ms;
						animation-delay: {flame.delay}ms;
						--max-height: {flame.maxHeight}px;
						box-shadow: 0 0 80px 18px rgba(226,15,0,0.4);
					"
				></div>
			{/each}
		</div>

		<!-- Orange flames -->
		<div class="absolute right-0 bottom-0 left-0 flex items-end justify-center opacity-80">
			{#each flameLayers.orange as flame}
				<div
					class="flame pointer-events-none"
					style="
						width: {flame.width}px;
						background: {flame.color};
						animation-duration: {flame.duration}ms;
						animation-delay: {flame.delay}ms;
						--max-height: {flame.maxHeight}px;
						box-shadow: 0 0 80px 18px rgba(255,156,0,0.4);
					"
				></div>
			{/each}
		</div>

		<!-- Yellow flames -->
		<div class="absolute right-0 bottom-0 left-0 flex items-end justify-center opacity-80">
			{#each flameLayers.yellow as flame}
				<div
					class="flame pointer-events-none"
					style="
						width: {flame.width}px;
						background: {flame.color};
						animation-duration: {flame.duration}ms;
						animation-delay: {flame.delay}ms;
						--max-height: {flame.maxHeight}px;
						box-shadow: 0 0 80px 18px rgba(255,235,110,0.4);
					"
				></div>
			{/each}
		</div>

		<!-- White flames (top layer) -->
		<div class="absolute right-0 bottom-0 left-0 flex items-end justify-center opacity-80">
			{#each flameLayers.white as flame}
				<div
					class="flame pointer-events-none"
					style="
						width: {flame.width}px;
						background: {flame.color};
						animation-duration: {flame.duration}ms;
						animation-delay: {flame.delay}ms;
						--max-height: {flame.maxHeight}px;
						box-shadow: 0 0 80px 18px rgba(254,241,217,0.4);
					"
				></div>
			{/each}
		</div>
	</div>

	<!-- Flame Sparks -->
	<div
		class={[
			"sparks-container transition-opacity duration-1000",
			slide.step === 3 ? "opacity-100 delay-500" : "opacity-0",
		]}
	>
		{#each sparks as spark}
			<div
				class="fade-in pointer-events-none absolute"
				style="left: {spark.x}px; top: {spark.y}px; animation-duration: {spark.delay}ms;"
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
	</div>
</div>

<style>
	@keyframes sparkle {
		0%, 70% {
			opacity: 0;
			transform: scale(0) translateY(0px);
			background: hsl(16, 100%, 60%);
		}
		75% {
			opacity: 1;
			transform: scale(1) translateY(-10px);
			background: hsl(20, 100%, 65%);
		}
		85% {
			opacity: 0.8;
			transform: scale(0.8) translateY(-25px);
			background: hsl(28, 100%, 70%);
		}
		95% {
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

	@keyframes flicker {
		0% {
			transform: scaleY(1);
		}
		28% {
			transform: scaleY(0.85);
		}
		38% {
			transform: scaleY(0.9);
		}
		50% {
			transform: scaleY(0.8);
		}
		70% {
			transform: scaleY(0.95);
		}
		82% {
			transform: scaleY(0.88);
		}
		100% {
			transform: scaleY(1);
		}
	}

	.flame {
		height: var(--max-height);
		border-radius: 64px 64px 0 0;
		transform-origin: bottom center;
		animation: flicker infinite ease-in-out alternate;
		opacity: 0.9;
	}
</style>
