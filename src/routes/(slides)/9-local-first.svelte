<script lang="ts">
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";
	import { animate } from "motion";
	import type { Attachment } from "svelte/attachments";

	const slide = presentation.registerSlide(3);
	const springOpts = { duration: 0.5, bounce: 0.2, type: "spring" } as const;

	type AnimateLogoProps = {
		step: number;
		size: number;
	};
	function animateLogo({ step, size }: AnimateLogoProps): Attachment<HTMLElement> {
		return (node) => {
			animate(
				node,
				{
					width: slide.step >= step ? size : 0,
					height: slide.step >= step ? size : 0,
				},
				springOpts,
			);
		};
	}
</script>

<div
	{...slide.attrs}
	class={cn(slide.attrs.class, "relative flex items-center justify-center p-8")}
>
	<div class="flex items-center justify-center gap-16">
		<!-- Linear Logo - Step 2 -->
		<img
			src="/imgs/linear.svg"
			alt="Linear"
			class="h-0 w-0 rounded-2xl"
			{@attach animateLogo({ step: 2, size: 128 })}
		/>

		<!-- Zero Logo - Step 3 -->
		<img
			src="/imgs/zero.svg"
			alt="Zero by Rocicorp"
			class="h-0 w-0"
			{@attach animateLogo({ step: 3, size: 96 })}
		/>
	</div>
</div>
