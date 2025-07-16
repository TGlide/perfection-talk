<script lang="ts">
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";
	import { randomBetween } from "$lib/math";
	import { animate } from "motion";
	import type { Attachment } from "svelte/attachments";
	import { windowSize } from "$lib/spells/window-size.svelte";

	const slide = presentation.registerSlide(3);

	const popupContent = [
		{
			title: "Cookie Preferences",
			message: "We use cookies to enhance your browsing experience and analyze our traffic.",
			primaryButton: "Accept All",
			secondaryButton: "Manage",
			footer: "You can change your preferences at any time.",
		},
		{
			title: "Newsletter Signup",
			message: "Stay updated with our latest features and product announcements.",
			primaryButton: "Subscribe",
			secondaryButton: "Not now",
			footer: "Unsubscribe at any time. No spam, we promise.",
		},
		{
			title: "Enable Notifications",
			message: "Get notified about important updates and new messages.",
			primaryButton: "Allow",
			secondaryButton: "Maybe later",
			footer: "You can change this in your browser settings.",
		},
		{
			title: "Free Trial Available",
			message: "Try our premium features free for 14 days. No credit card required.",
			primaryButton: "Start Trial",
			secondaryButton: "Learn more",
			footer: "Cancel anytime during your trial period.",
		},
		{
			title: "Location Access",
			message: "Allow location access to show you relevant content and services nearby.",
			primaryButton: "Allow",
			secondaryButton: "Deny",
			footer: "This helps us provide better recommendations.",
		},
		{
			title: "App Download",
			message: "Get the best experience with our mobile app. Available on iOS and Android.",
			primaryButton: "Download",
			secondaryButton: "Go to browser",
			footer: "Rated 4.8 stars with over 10M downloads.",
		},
		{
			title: "Survey Feedback",
			message: "Help us improve by sharing your thoughts. Takes less than 2 minutes.",
			primaryButton: "Take Survey",
			secondaryButton: "Skip",
			footer: "Your feedback helps us build better products.",
		},
		{
			title: "Account Verification",
			message: "Please verify your email address to access all features and secure your account.",
			primaryButton: "Verify Email",
			secondaryButton: "Resend",
			footer: "Check your spam folder if you don't see the email.",
		},
	];

	// Generate random spark positions and properties
	const sparks = $derived(
		Array.from({ length: 100 }, (_, i) => ({
			id: i,
			x: randomBetween(20, windowSize.w - 20),
			y: randomBetween(20, windowSize.h - 20),
			size: randomBetween(2, 6),
			delay: randomBetween(1000, 10000),
			duration: randomBetween(5000, 12000),
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
		red: generateFlames(Math.ceil(windowSize.w / 64) || 30, "#e20f00", 0, 64),
		orange: generateFlames(Math.ceil(windowSize.w / 64) || 30, "#ff9c00", 1, 64),
		yellow: generateFlames(Math.ceil(windowSize.w / 64) || 30, "#ffeb6e", 2, 64),
		white: generateFlames(Math.ceil(windowSize.w / 48) || 40, "#fef1d9", 3, 48),
	});

	// Generate random pop-ups for step 3
	const popups = $derived(
		Array.from({ length: 32 }, (_, i) => {
			const width = randomBetween(300, 400);
			const padding = 64;
			const contentIndex = Math.floor(Math.random() * popupContent.length);
			return {
				id: i,
				x: randomBetween(padding, windowSize.w - width - padding),
				y: randomBetween(padding, windowSize.h - 200 - padding),
				width,
				delay: randomBetween(200, 5000),
				content: popupContent[contentIndex],
			};
		}),
	);

	const animatePopup: Attachment<HTMLElement> = (node) => {
		const popup = popups.find((p) => p.id.toString() === node.dataset.id);
		if (!popup) return;

		animate(
			node,
			{
				opacity: slide.step >= 3 ? 1 : 0,
				scale: slide.step >= 3 ? 1 : 0.8,
				y: slide.step >= 3 ? 0 : 20,
			},
			{
				duration: 0.4,
				delay: slide.step >= 3 ? popup.delay / 1000 : 0,
				type: "spring",
				bounce: 0.3,
			},
		);
	};
</script>

<div {...slide.attrs} class={cn(slide.attrs.class, "relative overflow-hidden")}>
	<div
		class={[
			"absolute inset-x-0 bottom-0 h-screen bg-gradient-to-b from-neutral-900 to-amber-800",
			"z-0 transition-all duration-500",
			slide.step < 3 ? "translate-y-full opacity-0" : "opacity-80",
		]}
		aria-hidden="true"
	></div>

	<img src="/imgs/ars.png" alt="ars" class="abs-center absolute z-10 w-[80vw] rounded-2xl shadow" />

	<img
		src="/imgs/roach-g.png"
		alt="ars"
		class={[
			"abs-center absolute h-[40vw] rounded-2xl shadow-xl shadow-amber-900",
			"z-10 transition-all duration-500",
			slide.step >= 2 ? "opacity-100" : "scale-90 opacity-0",
		]}
	/>

	<!-- Random Pop-ups for step 3 -->
	{#each popups as popup}
		<div
			class="absolute z-20 rounded-xl border border-neutral-200 bg-white/95 opacity-0 shadow-lg backdrop-blur-sm"
			style="left: {popup.x}px; top: {popup.y}px; width: {popup.width}px;"
			data-id={popup.id}
			{@attach animatePopup}
		>
			<div class="flex items-center justify-between px-4 py-3">
				<h3 class="text-sm font-semibold text-neutral-900">{popup.content.title}</h3>
				<button
					class="flex h-6 w-6 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<div class="space-y-4 px-4 pb-4">
				<p class="text-sm leading-relaxed text-neutral-600">
					{popup.content.message}
				</p>
				<div class="flex gap-2">
					<button
						class="flex-1 rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
					>
						{popup.content.primaryButton}
					</button>
					<button
						class="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
					>
						{popup.content.secondaryButton}
					</button>
				</div>
				<p class="text-xs text-neutral-500">{popup.content.footer}</p>
			</div>
		</div>
	{/each}

	<!-- Low Poly Flames -->
	<div
		class={[
			"flames-container absolute inset-x-0 bottom-0 z-30",
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
				class="fade-in pointer-events-none absolute z-30"
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
		0%,
		70% {
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
