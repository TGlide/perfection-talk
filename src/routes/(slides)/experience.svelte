<script lang="ts">
	import { presentation } from "$lib/presentation.svelte";
	import { cn } from "$lib/style";

	const INITIAL_DELAY = 1000;
	let delay = INITIAL_DELAY;

	$effect(() => {
		delay = INITIAL_DELAY;
	});

	const slide = presentation.registerSlide(1);

	function delayed(node: HTMLElement, duration: number) {
		delay += duration;
		const currDelay = delay;

		node.style.opacity = "0";

		$effect(() => {
			if (!slide || !presentation.isCurrent(slide)) {
				return;
			}
			node.style.opacity = "0";

			const timeout = setTimeout(() => {
				node.style.opacity = "1";
			}, currDelay);

			return () => clearTimeout(timeout);
		});
	}
</script>

<!-- brincar com cores -->
<div {...slide.attrs} class={cn(slide.attrs.class, "grid place-items-center")}>
	<p class="text-center text-[#FF3E01]">
		<span class="font-black uppercase">
			<span class="text-[8.4rem] leading-30" use:delayed={300}>Developer</span>
			<br />
			<span class="text-9xl" use:delayed={300}>Experience</span>
		</span>
		<br />
		<span class="text-8xl font-thin" use:delayed={900}>without sacrificing</span>
		<br />
		<br />
		<span class="font-black uppercase">
			<span class="text-[19rem] leading-64" use:delayed={600}>User</span>
			<br />
			<span class="text-9xl" use:delayed={300}>Experience</span>
		</span>
	</p>
</div>
