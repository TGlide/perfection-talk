<script>
	import Slide from "$lib/components/Slide.svelte";
	import { blur } from "svelte/transition";
</script>

<Slide class="grid place-content-center" steps={3}>
	{#snippet children({ step })}
		<h1
			class="absolute left-1/2 {step > 1
				? 'top-8 text-6xl'
				: 'top-1/2 -translate-y-1/2 text-9xl'} -translate-x-1/2 text-center font-bold
				transition-all duration-500"
		>
			🎯 Objetivos
		</h1>

		{#if step > 2}
			<p transition:blur class="relative text-7xl font-bold">
				1. Ferramentas para apps interativas
			</p>
			<p transition:blur class="mt-12 text-7xl font-bold">2. Gerar código otimizado</p>
		{/if}
	{/snippet}
</Slide>
