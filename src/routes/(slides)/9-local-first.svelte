<script lang="ts">
	import { presentation } from "$lib/spells/presentation.svelte";
	import { windowSize } from "$lib/spells/window-size.svelte";
	import { cn } from "$lib/style";
	import { animate } from "motion";
	import { codeToHtml } from "shiki";
	import type { Attachment } from "svelte/attachments";

	const slide = presentation.registerSlide(6);
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

	const snippets = {
		query: await codeToHtml(
			`// Get all todos
const todos = useQuery(z.query.todos);

// Do whatever with them!
todos.forEach((todo) => {
	console.log(todo.id)
});
`,
			{ lang: "typescript", theme: "rose-pine-moon" },
		),
		mutation: await codeToHtml(
			`// Create a new todo
const todo = z.mutate.todo.insert({ 
	id,
	title: "Finish slides" 
});

// Update an existing todo
z.mutate.todo.update({ id: todo.id, checked: true });

// Delete a todo
z.mutate.todo.delete(todo);
`,
			{ lang: "typescript", theme: "rose-pine-moon" },
		),
		render: await codeToHtml(
			`${">tpircs<".split("").toReversed().join("")}
const todos = useQuery(z.current.query.todos);

function updateTodo(id, checked) {
	z.mutate.todo.update({ id, checked });
}
${">tpircs/<".split("").toReversed().join("")}

{#each todos as todo}
	<label>
		<input
			type="checkbox"
			bind:checked={
				() => todo.checked,
				(v) => updateTodo(todo.id, v)
			}
		/>
		{todo.title}
	</label>
{/each}
`,
			{ lang: "svelte", theme: "rose-pine-moon" },
		),
	};
</script>

<div
	{...slide.attrs}
	class={cn(slide.attrs.class, "relative flex items-center justify-center p-8")}
>
	<!-- Code Snippet - Step 4 -->
	<div
		class="absolute text-4xl leading-14 opacity-0 shadow *:rounded-xl *:p-8"
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
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html snippets.query}
	</div>

	<!-- Code Snippet - Step 5 -->
	<div
		class="absolute text-4xl leading-14 opacity-0 shadow *:rounded-xl *:p-8"
		{@attach (node) => {
			animate(
				node,
				{
					opacity: slide.step >= 5 ? 1 : 0,
					y: slide.step >= 5 ? 0 : windowSize.h,
				},
				springOpts,
			);
		}}
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html snippets.mutation}
	</div>

	<!-- Code Snippet - Step 6 -->
	<div
		class="absolute text-4xl leading-14 opacity-0 shadow *:rounded-xl *:p-8"
		{@attach (node) => {
			animate(
				node,
				{
					opacity: slide.step >= 6 ? 1 : 0,
					y: slide.step >= 6 ? 0 : windowSize.h,
				},
				springOpts,
			);
		}}
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html snippets.render}
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
