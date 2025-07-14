<script lang="ts">
	import { Spring } from "svelte/motion";
	import { fade } from "svelte/transition";
	import BgRainbow from "../assets/ticket-bg-rainbow.svg";
	import Svelte from "../assets/svelte.svg";
	import type { Attachment } from "svelte/attachments";
	import { on } from "svelte/events";

	type ContributionsMatrix = number[][];
	function getMockContributions() {
		const result: ContributionsMatrix = [];
		for (let i = 0; i < 53; i++) {
			result.push([]);
			for (let j = 0; j < 7; j++) {
				result[i].push(Math.floor(Math.random() * 4));
			}
		}
		return result;
	}
	const contributions = getMockContributions();

	type TicketData = {
		name: string;
		tribe?: string | null;
		gh_user?: string;
		aw_email?: string;
		id: number;
		show_contributions?: boolean;
		is_pro?: boolean;
		contributions?: number[];
	};

	const variant = "rainbow";
	const { name, gh_user, show_contributions }: TicketData = {
		name: "Thomas G. Lopes",
		gh_user: "tglide",
		id: 1,
		show_contributions: true,
	};
	const bg = BgRainbow;

	/* Animation details */
	let removeDelay = $state(false);
	$effect(() => {
		if (!show_contributions) {
			removeDelay = true;
		}
	});

	const springR = { stiffness: 0.066, damping: 0.25 };

	let springRotate = new Spring({ x: 0, y: 0 }, springR);
	let springGlare = new Spring({ x: 50, y: 50, o: 0.25 }, springR);
	let springBackground = new Spring({ x: 50, y: 50 }, springR);
	let hovering = $state(false);

	const round = (num: number, fix = 3) => parseFloat(num.toFixed(fix));
	const clamp = (num: number, min = -20, max = 20) => Math.min(Math.max(num, min), max);
	const adjust = (
		value: number,
		fromMin: number,
		fromMax: number,
		toMin: number,
		toMax: number,
	) => {
		return round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
	};

	function isTouchEvent(e: MouseEvent | TouchEvent): e is TouchEvent {
		return e.type === "touchmove";
	}

	const mouse: Attachment<HTMLElement> = (node: HTMLElement) => {
		const offs = [
			on(node, "mousemove", (e: MouseEvent) => {
				const clientX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;
				const clientY = isTouchEvent(e) ? e.touches[0].clientY : e.clientY;

				const el = e.target as HTMLElement;
				const rect = el.getBoundingClientRect(); // get element's current size/position
				const absolute = {
					x: clientX - rect.left, // get mouse position from left
					y: clientY - rect.top, // get mouse position from right
				};
				const percent = {
					x: round((100 / rect.width) * absolute.x),
					y: round((100 / rect.height) * absolute.y),
				};
				const center = {
					x: percent.x - 50,
					y: percent.y - 50,
				};

				springRotate.stiffness = springR.stiffness;
				springRotate.damping = springR.damping;
				springRotate.set({
					x: round(-(center.x / 7)),
					y: round(center.y / 10),
				});

				springGlare.stiffness = springR.stiffness;
				springGlare.damping = springR.damping;
				springGlare.set({
					x: percent.x,
					y: percent.y,
					o: 1,
				});

				springBackground.stiffness = springR.stiffness;
				springBackground.damping = springR.damping;
				springBackground.set({
					x: adjust(percent.x, 0, 100, 37, 63),
					y: adjust(percent.y, 0, 100, 33, 67),
				});

				hovering = true;
			}),

			on(node, "mouseleave", () => {
				const snapStiff = 0.05;
				const snapDamp = 0.5;

				springRotate.stiffness = snapStiff;
				springRotate.damping = snapDamp;
				springRotate.set({ x: 0, y: 0 });

				springGlare.stiffness = snapStiff;
				springGlare.damping = snapDamp;
				springGlare.set({ x: 50, y: 50, o: 0 });

				springBackground.stiffness = snapStiff;
				springBackground.damping = snapDamp;
				springBackground.set({ x: 50, y: 50 }, { soft: 1 });

				hovering = false;
			}),
		];

		return () => {
			offs.forEach((off) => off());
		};
	};

	const styles = $derived(`
		--rx: ${springRotate.current.x}deg;
		--ry: ${springRotate.current.y}deg;
        --opacity: ${hovering ? 1 : 0};
        --mx: ${springGlare.current.x}%;
		--my: ${springGlare.current.y}%;
        --pointer-x: ${springGlare.current.x}%;
        --pointer-y: ${springGlare.current.y}%;
        --pointer-from-top: ${springGlare.current.y / 100};
        --pointer-from-left: ${springGlare.current.x / 100};
		--o: ${springGlare.current.o};
        --card-opacity: ${springGlare.current.o};
        --pointer-from-center: ${clamp(
					Math.sqrt(
						(springGlare.current.y - 50) * (springGlare.current.y - 50) +
							(springGlare.current.x - 50) * (springGlare.current.x - 50),
					) / 50,
					0,
					1,
				)};

        --background-x: ${springBackground.current.x}%;
        --background-y: ${springBackground.current.y}%;
	`);
</script>

<div class="wrapper font-significa">
	<div class="ticket" data-variant={variant} {@attach mouse} style={styles}>
		<img src={bg} alt="" class="bg" />
		<p class="web-title web-u-color-text-primary">{name?.trim() || "-"}</p>
		{#if gh_user}
			<p class="web-label">@{gh_user}</p>
		{/if}
		<div class="bottom-left flex flex-col">
			<!-- <img src={Logo} alt="init_" /> -->
			<span>JUL 17</span>
			<span>{"<frontend.OPO/>"}</span>
		</div>

		<img class="tribe" src={Svelte} alt="Svelte" />

		<div
			class="github"
			out:fade={{ duration: 100 }}
			data-remove-delay={removeDelay ? "" : undefined}
		>
			{#each contributions as row}
				<div class="row">
					{#each row as level, j}
						<div style:--index={row.length - j} data-level={level}></div>
					{/each}
				</div>
			{/each}
		</div>

		<div class="frufru">
			<svg viewBox="0 0 460 644" fill="none" xmlns="http://www.w3.org/2000/svg">
				<clipPath id="clip" clipPathUnits="objectBoundingBox">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M0,0.025 C0,0.011,0.016,0,0.035,0 H0.965 C0.984,0,1,0.011,1,0.025 V0.975 C1,0.989,0.984,1,0.965,1 H0.035 C0.016,1,0,0.989,0,0.975 V0.025 M0.413,0.031 C0.413,0.028,0.417,0.025,0.422,0.025 H0.578 C0.583,0.025,0.587,0.028,0.587,0.031 C0.587,0.034,0.583,0.037,0.578,0.037 H0.422 C0.417,0.037,0.413,0.034,0.413,0.031"
						fill="black"
					/>
				</clipPath>
			</svg>
			<div class="shine"></div>
			<div class="glare"></div>
		</div>
	</div>
</div>

<style lang="scss">
	@use "sass:math";

	$base-width: 28.75;

	@function adjusted($value) {
		@return #{$value}rem;
	}

	.frufru {
		position: absolute;
		inset: 0;

		svg {
			position: absolute;
			inset: 0;
		}
	}

	.shine,
	.glare {
		will-change:
			transform, opacity, background-image, background-size, background-position,
			background-blend-mode, filter;
		border-radius: adjusted(1);
		border-bottom-left-radius: adjusted(1.2);
		clip-path: url(#clip);
	}

	.shine {
		position: absolute;
		inset: 0;

		display: grid;
		transform: translateZ(1px);
		overflow: hidden;
		z-index: 3;
		background: transparent;
		background-size: cover;
		background-position: center;
		filter: brightness(0.85) contrast(2.75) saturate(0.65);
		mix-blend-mode: color-dodge;
		opacity: var(--card-opacity);
	}

	.glare {
		position: absolute;
		inset: 0;

		transform: translateZ(1px);
		z-index: 4;
		background: radial-gradient(
			farthest-corner circle at var(--mx) var(--my),
			rgba(255, 255, 255, 0.8) 10%,
			rgba(255, 255, 255, 0.65) 20%,
			rgba(0, 0, 0, 0.5) 90%
		);
		mix-blend-mode: overlay;
		opacity: calc(var(--o) * 0.2);
	}

	[data-variant="rainbow"] {
		.shine {
			--space: 4.5%;
			--angle: 15deg;
			--imgsize: 300% 400%;
			background-image: repeating-linear-gradient(
				var(--angle),
				hsla(283, 49%, 60%, 0.75) calc(var(--space) * 1),
				hsla(2, 74%, 59%, 0.75) calc(var(--space) * 2),
				hsla(53, 67%, 53%, 0.75) calc(var(--space) * 3),
				hsla(93, 56%, 52%, 0.75) calc(var(--space) * 4),
				hsla(176, 38%, 50%, 0.75) calc(var(--space) * 5),
				hsla(228, 100%, 77%, 0.75) calc(var(--space) * 6),
				hsla(283, 49%, 61%, 0.75) calc(var(--space) * 7)
			);
			background-blend-mode: color-dodge;
			background-size: var(--imgsize);
			background-position:
				0% calc(var(--background-y) * 1),
				var(--background-x) var(--background-y);
			filter: brightness(calc((var(--pointer-from-center) * 0.3) + 0.5)) contrast(2.3) saturate(1);

			&::after {
				position: absolute;
				inset: 0;

				content: "";
				background-image: radial-gradient(
					farthest-corner ellipse at calc(((var(--pointer-x)) * 0.5) + 25%)
						calc(((var(--pointer-y)) * 0.5) + 25%),
					hsl(0, 0%, 100%) 5%,
					hsla(300, 100%, 11%, 0.6) 40%,
					hsl(0, 0%, 22%) 120%
				);
				background-position: center center;
				background-size: 400% 500%;
				filter: brightness(calc((var(--pointer-from-center) * 0.2) + 0.4)) contrast(0.85)
					saturate(1.1);
				mix-blend-mode: hard-light;
			}
		}

		.glare {
			opacity: var(--o);

			background-image: radial-gradient(
				farthest-corner circle at var(--pointer-x) var(--pointer-y),
				hsla(0, 0%, 100%, 1) 10%,
				hsla(0, 0%, 100%, 0.6) 35%,
				hsla(180, 11%, 35%, 1) 60%
			);
			mix-blend-mode: soft-light;
		}
	}

	.wrapper {
		position: relative;
		font-size: var(--base-width, var(--base-width-default));
		overflow: visible;

		perspective: 600px;
	}

	.ticket {
		--base-width-default: 460px;
		width: var(--base-width, var(--base-width-default));
		aspect-ratio: 460 / 644;

		padding: adjusted(2);
		padding-block-start: adjusted(3.5);
		position: relative;
		border-radius: adjusted(1);
		overflow: hidden;

		transition: transform 100ms;
		-webkit-transform-origin: center;
		transform-origin: center;
		-webkit-transform: rotateY(var(--rx)) rotateX(var(--ry));
		transform: rotateY(var(--rx)) rotateX(var(--ry));
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
	}

	.bg {
		position: absolute;
		inset: 0;
		z-index: -1;
	}

	.web-title {
		font-size: adjusted(2.5);
		line-height: #{math.div(44, 40)}em;
		overflow-wrap: break-word;
	}

	.web-label {
		font-size: adjusted(1.5);
		line-height: #{math.div(28, 24)}em;
		margin-block-start: adjusted(0.5);
		font-family: var(--font-mono);
		font-weight: 200;
		opacity: 0.75;
	}

	.bottom-left {
		position: absolute;
		inset-block-end: adjusted(2);
		inset-inline-start: adjusted(2);

		display: flex;
		flex-direction: column;
		gap: adjusted(0.5);

		span {
			font-family: var(--font-mono);
			color: hsl(var(--web-color-primary));
			font-size: adjusted(0.875);
			font-style: normal;
			font-weight: 400;
			line-height: 114.286%;
		}
	}

	.tribe {
		position: absolute;
		inset-block-end: adjusted(-6);
		inset-inline-start: adjusted(-8);

		width: adjusted(28.75);
		/* Make it white */
		filter: brightness(0) invert(1);
		opacity: 0.04;

		[data-variant="rainbow"] & {
			opacity: 0.5;
		}
	}

	@keyframes fade-in {
		from {
			background-color: hsl(var(--bg-color) / 0);
			/* border: 1px solid hsl(var(--border-color, transparent) / 0); */
		}
		to {
			background-color: hsl(var(--bg-color) / 1);
			/* border: 1px solid hsl(var(--border-color, transparent) / 1); */
		}
	}

	.github {
		--delay: 700ms;
		display: flex;
		flex-direction: column;
		gap: adjusted(0.25);

		position: absolute;
		inset-block-start: 0;
		inset-inline-end: 0;

		mask-image: linear-gradient(to left, hsl(240, 3%, 14%), transparent);

		&[data-remove-delay] {
			--delay: 0ms;
		}

		.row {
			display: flex;
			gap: adjusted(0.25);

			div {
				--size: #{adjusted(0.5275)};
				width: var(--size);
				height: var(--size);

				border-radius: calc(var(--size) / 4);
				animation: fade-in 500ms ease calc(calc(75ms * var(--index)) + var(--delay)) forwards;

				&[data-level] {
					--bg-color: var(--web-color-accent);

					[data-variant="rainbow"] & {
						--bg-color: 0 0% 90%;
					}
				}

				&[data-level="0"] {
					opacity: 0;
				}

				&[data-level="1"] {
					opacity: 0.25;
				}

				&[data-level="2"] {
					opacity: 0.5;
				}

				&[data-level="3"] {
					opacity: 0.75;
				}

				&[data-level="4"] {
					opacity: 1;
				}
			}
		}
	}
</style>
