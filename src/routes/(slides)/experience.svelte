<script lang="ts">
	import Slide from "$lib/components/Slide.svelte";
	import { Slide as SlideClass, presentation } from "$lib/presentation.svelte";

	const INITIAL_DELAY = 1000;
	let delay = INITIAL_DELAY;

	$effect(() => {
		delay = INITIAL_DELAY;
	});

	let slide: SlideClass | null = $state(null);

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
<Slide bind:slide class="grid place-items-center">
	<p class="text-center text-[#FF3E01]">
		<span class="font-black uppercase">
			<span class="text-[8.4rem] leading-[7.5rem]" use:delayed={300}>Developer</span>
			<br />
			<span class="text-9xl" use:delayed={300}>Experience</span>
		</span>
		<br />
		<span class="text-8xl font-thin" use:delayed={900}>sem sacrificar</span>
		<br />
		<br />
		<span class="font-black uppercase">
			<span class="text-[19rem] leading-[16rem]" use:delayed={600}>User</span>
			<br />
			<span class="text-9xl" use:delayed={300}>Experience</span>
		</span>
	</p>
</Slide>
