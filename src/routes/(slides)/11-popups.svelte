<script lang="ts">
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";
	import { animate } from "motion";

	const slide = presentation.registerSlide(3);
</script>

<div
	{...slide.attrs}
	class={cn(slide.attrs.class, "relative flex flex-col items-center justify-center gap-16 p-8")}
>
	<h1 class="text-center text-8xl font-bold text-white">Popups & Consent</h1>
	<div class="flex items-center justify-center">
		<a href="https://plausible.io/" target="_blank" rel="noreferrer">
			<img
				src="/imgs/plausible.png"
				alt="plausible"
				class="size-0"
				{@attach (node) => {
					animate(node, {
						width: slide.step < 2 ? 0 : 128,
						height: slide.step < 2 ? 0 : 128,
					});
				}}
			/>
		</a>
		<a href="https://c15t.com/" target="_blank" rel="noreferrer">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="0"
				height="0"
				viewBox="0 0 446 445"
				fill="none"
				{@attach (node: SVGSVGElement) => {
					animate(node, {
						width: slide.step < 3 ? 0 : 128,
						height: slide.step < 3 ? 0 : 128,
						marginLeft: slide.step < 3 ? 0 : 24,
					});
				}}
				><path
					fill="currentColor"
					d="M223.178.313c39.064 0 70.732 31.668 70.732 70.732-.001 39.064-31.668 70.731-70.732 70.731-12.181 0-23.642-3.079-33.649-8.502l-55.689 55.689a70.267 70.267 0 0 1 5.574 13.441h167.531c8.695-29.217 35.762-50.523 67.804-50.523 39.064 0 70.731 31.668 70.731 70.732s-31.668 70.732-70.731 70.732c-32.042 0-59.108-21.306-67.803-50.523H139.413a70.417 70.417 0 0 1-7.886 17.396l54.046 54.046c10.893-6.851 23.786-10.815 37.605-10.815 39.064 0 70.732 31.669 70.732 70.733 0 39.064-31.668 70.731-70.732 70.731s-70.732-31.667-70.732-70.731c0-10.518 2.296-20.499 6.414-29.471l-57.78-57.78c-8.972 4.117-18.952 6.414-29.47 6.414-39.063 0-70.731-31.668-70.732-70.732 0-39.064 31.669-70.732 70.733-70.732 12.18 0 23.642 3.079 33.649 8.502l55.688-55.688c-5.423-10.007-8.502-21.469-8.502-33.65 0-39.064 31.668-70.733 70.732-70.733Zm0 343.555c-16.742 0-30.314 13.572-30.314 30.314 0 16.741 13.572 30.313 30.314 30.313s30.314-13.572 30.314-30.313c0-16.742-13.572-30.314-30.314-30.314ZM71.611 192.299c-16.742 0-30.315 13.572-30.315 30.314s13.573 30.314 30.315 30.314c16.741 0 30.313-13.572 30.313-30.314 0-16.741-13.572-30.314-30.313-30.314Zm303.138 0c-16.729 0-30.294 13.551-30.315 30.275l.001.039-.001.038c.021 16.725 13.586 30.276 30.315 30.276 16.741 0 30.313-13.572 30.313-30.314 0-16.741-13.572-30.314-30.313-30.314ZM223.178 40.73c-16.742 0-30.314 13.573-30.314 30.315s13.573 30.313 30.314 30.313c16.742 0 30.313-13.572 30.314-30.313 0-16.742-13.572-30.314-30.314-30.315Z"
				/></svg
			>
		</a>
	</div>

	<p class="absolute bottom-4 left-4 text-xl text-neutral-400">just stop</p>
</div>
