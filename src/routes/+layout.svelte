<script>
	import "../app.css";
	import "@fontsource/inter/100.css";
	import "@fontsource/inter/200.css";
	import "@fontsource/inter/300.css";
	import "@fontsource/inter/400.css";
	import "@fontsource/inter/500.css";
	import "@fontsource/inter/600.css";
	import "@fontsource/inter/700.css";
	import "@fontsource/inter/800.css";
	import "@fontsource/inter/900.css";
	import "@fontsource-variable/eb-garamond/wght-italic.css";
	import "@fontsource-variable/eb-garamond";

	import "@fontsource/fira-code/300.css";
	import "@fontsource/fira-code/400.css";
	import "@fontsource/fira-code/500.css";
	import "@fontsource/fira-code/600.css";
	import "@fontsource/fira-code/700.css";
	import { presentation } from "$lib/spells/presentation.svelte";

	presentation.init();

	const { children } = $props();
</script>

<svelte:head>
	<title>Porto Talk</title>
</svelte:head>

<svelte:boundary>
	<div class="h-screen w-screen overflow-hidden text-white">
		{@render children()}
	</div>

	{#snippet pending()}
		hi
	{/snippet}
</svelte:boundary>
