<script lang="ts">
	const { value, class: klass }: { value: number; class?: string } = $props();

	function transform(node: HTMLElement, value: number) {
		async function update(value: number) {
			const height = Number(getComputedStyle(node).fontSize.replace("px", ""));

			// await new Promise(resolve => setTimeout(resolve, 1000))
			const childNode = [...node.children].find((child) => child.innerHTML === String(value));
			if (!childNode) return;

			const charWidth = childNode.getBoundingClientRect().width;
			node.style.transform = `translateY(-${value * 100}%)`;
			node.style.width = `${charWidth}px`;
			node.style.height = `${height}px`;
			node.style.lineHeight = `${height}px`;
		}

		update(value);

		return { update };
	}
</script>

<div class={klass}>
	<div class="wrapper">
		{#each value?.toString() as char, index (index)}
			{#if Number.isNaN(Number(char))}
				<span>{char}</span>
			{:else}
				<div class="list" use:transform={Number(char)}>
					<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
					{#each { length: 10 } as _, i}
						<span>{i}</span>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.wrapper {
		display: inline-flex;
		overflow: hidden;
		position: relative;
		padding-block: 60px;
		margin-block: -60px;
		mask-image: linear-gradient(
			to bottom,
			transparent,
			transparent 27.5%,
			black 35%,
			black 65%,
			transparent 72.5%,
			transparent
		);
	}

	.list {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 0.75rem;
		line-height: 0.75rem;
		transition:
			transform 1s 0ms ease,
			width 0s;

		list-style: none;
		padding: 0;
	}
</style>
