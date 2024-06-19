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

	const blur = (_node: HTMLElement) => {
		return {
			delay: 150,
			duration: 500,
			css: (t: number, u: number) => `filter: blur(${u * 3}px); opacity: ${t * 1}`,
		};
	};
</script>

<div class={klass}>
	<div class="wrapper" transition:blur>
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
	}

	.wrapper::after {
		/* gradient */
		content: "";
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			black,
			black 27.5%,
			transparent 35%,
			transparent 65%,
			black 72.5%,
			black
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
