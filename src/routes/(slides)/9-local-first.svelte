<script lang="ts">
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";
	import { animate } from "motion";
	import { codeToHtml } from "shiki";
	import type { Attachment } from "svelte/attachments";

	const slide = presentation.registerSlide(4);
	const springOpts = { duration: 0.5, bounce: 0.2, type: "spring" } as const;

	const snippets = {
		query: `// Get all todos
const todos = useQuery(z.query.todos);

// Do whatever with them!
todos.forEach((todo) => {
	console.log(todo.id)
});
`,
		mutation: `// Create a new todo
const todo = z.mutate.todo.insert({ id, title: "Finish slides" });

// Update an existing todo
z.mutate.todo.update({ id: todo.id, checked: true });

// Delete a todo
z.mutate.todo.delete(todo);
`,
	};

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
	<!-- Code Snippet - Step 4 -->
	<div
		class="absolute text-4xl leading-14 *:rounded-xl *:p-8"
		{@attach (node) => {
			animate(
				node,
				{
					opacity: slide.step >= 4 ? 1 : 0,
					scale: slide.step >= 4 ? 1 : 0.8,
				},
				springOpts,
			);
		}}
	>
		{#await codeToHtml(snippets.query, { lang: "typescript", theme: "rose-pine-moon" })}
			<!-- loading -->
		{:then highlightedCode}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html highlightedCode}
		{/await}
	</div>

	<!-- Logos -->
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
