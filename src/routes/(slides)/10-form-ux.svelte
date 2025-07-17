<script lang="ts">
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";
	import { createFieldValidation } from "$lib/spells/create-field-validation.svelte";
	import { PinInput, Toaster } from "melt/builders";
	import { fly } from "svelte/transition";
	import { LocalToasts } from "$lib/builders/local-toasts.svelte";
	import { animate } from "motion";
	import { windowSize } from "$lib/spells/window-size.svelte";

	const slide = presentation.registerSlide(3);

	// Normally id just use a css class, sorryyy
	const inputClasses =
		"flex h-10 w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-50 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

	const name = createFieldValidation({
		validate: (v) => {
			if (!v) return "Name is required";
		},
	});

	const email = createFieldValidation({
		validate: (v) => {
			if (!v) return "Email is required";
			if (!v.includes("@")) return "Email must be valid";
		},
	});
	const disabled = $derived.by(() => {
		return [email.valid, name.valid, email.touched, name.touched].some((v) => !v);
	});

	const zeroWidthSpace = "\u200b";

	const pinInput = new PinInput();

	type ToastData = {
		title: string;
		description: string;
		variant: "success" | "warning" | "error";
	};

	const toastData: ToastData[] = [
		{
			title: "Success",
			description: "Congratulations! It worked!",
			variant: "success",
		},
		{
			title: "Warning",
			description: "Please check again.",
			variant: "warning",
		},
		{
			title: "Error",
			description: "Something did not work!",
			variant: "error",
		},
	];

	const toaster = new Toaster<ToastData>();

	function addRandomToast() {
		toaster.addToast({
			data: toastData[Math.floor(Math.random() * toastData.length)],
		});
	}

	const id = $props.id();
	const localToaster = new LocalToasts({ id, closeDelay: 2000 });
</script>

<div {...slide.attrs} class={cn(slide.attrs.class, "relative")}>
	<div class="grid h-full grid-cols-2 gap-20 p-20">
		<form
			class="flex flex-col gap-2 self-center rounded-lg border
			border-neutral-700 bg-neutral-800/50 p-6 backdrop-blur-sm"
		>
			<label class="space-y-2">
				<p class="text-sm font-medium text-neutral-200">
					Name <span class="text-red-400">*</span>
				</p>
				<input type="text" class={inputClasses} placeholder="John Doe" {...name.attrs} />
				<p class="text-xs text-red-400">{name.msg ?? zeroWidthSpace}</p>
			</label>

			<label class="space-y-2">
				<p class="text-sm font-medium text-neutral-200">
					Email <span class="text-red-400">*</span>
				</p>
				<input
					data-protonpass-ignore
					type="text"
					placeholder="john.doe@pm.me"
					class={inputClasses}
					{...email.attrs}
				/>
				<p class="text-xs text-red-400">{email.msg ?? zeroWidthSpace}</p>
			</label>
			<button
				type="submit"
				class={[
					"mt-8 inline-flex h-10 w-full items-center justify-center rounded-md bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors",
					!disabled &&
						"hover:bg-neutral-200 focus:ring-1 focus:ring-neutral-400 focus:outline-none",
					disabled && "cursor-not-allowed bg-neutral-700 text-neutral-500",
				]}
				{disabled}
			>
				Sign in
			</button>
		</form>

		<div class="flex flex-col items-center justify-center gap-4">
			<div {...pinInput.root} class="flex items-center justify-center gap-2 font-mono">
				{#each pinInput.inputs as input}
					<input
						class="focus:border-accent-500 size-12 rounded-xl border-2 border-gray-300 bg-white text-center
				transition outline-none hover:border-gray-400 disabled:cursor-not-allowed
				dark:border-gray-400/50 dark:bg-gray-900 dark:hover:border-gray-400 dark:focus:border-gray-300"
						{...input}
					/>
				{/each}
			</div>

			<input
				type="text"
				class={cn(inputClasses, "w-auto")}
				maxlength="4"
				placeholder="Enter your pin"
				bind:value={pinInput.value}
			/>
		</div>

		<div class="col-span-2 flex items-center justify-center gap-4">
			<button
				class="rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2
				transition hover:bg-neutral-700/50 active:scale-95"
				onclick={addRandomToast}
			>
				Send email 🍞
			</button>

			<button
				class="rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2
				transition hover:bg-neutral-700/50 active:scale-95"
				onclick={() =>
					localToaster.addToast({
						data: {
							content: "BANANZA 🍌",
						},
					})}
				{...localToaster.trigger}
			>
				Play Donkey Kong 🐒
			</button>

			{#each localToaster.toasts as toast (toast)}
				<div
					{...toast.attrs}
					class="rounded-xl bg-gray-700 px-4 py-2 text-sm opacity-0"
					out:fly={{ y: -6, duration: 200 }}
					{@attach (node) => {
						animate(
							node,
							{
								opacity: [0, 1],
								scale: [0.8, 1],
								y: [8, 0],
							},
							{
								type: "spring",
								duration: 0.3,
								bounce: 0.1,
							},
						);
					}}
				>
					{toast.data.content}
				</div>
			{/each}
		</div>
	</div>

	<div
		{...toaster.root}
		class="fixed !right-4 !bottom-4 flex w-[300px] flex-col"
		style:--toasts={toaster.toasts.length}
	>
		{#each toaster.toasts as toast, i (toast.id)}
			<div
				class="relative flex h-(--toast-height) w-full flex-col justify-center rounded-xl bg-white px-4 text-left transition dark:bg-gray-800"
				{...toast.content}
				style:--n={toaster.toasts.length - i}
				in:fly={{ y: 60, opacity: 0.9 }}
				out:fly={{ y: 20 }}
			>
				<h3 {...toast.title} class="text-sm font-medium whitespace-nowrap text-gray-100">
					{toast.data.title}
				</h3>

				{#if toast.data.description}
					<div {...toast.description} class="text-xs text-gray-700 dark:text-gray-300">
						{toast.data.description}
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<div
		class={[
			"absolute inset-0 flex items-center justify-center gap-16 bg-black/50 backdrop-blur-2xl",
			"transition",
			slide.step < 2 && "pointer-events-none opacity-0",
		]}
	>
		<ul class=" flex list-disc flex-col gap-8 text-6xl font-bold">
			<li>Constantly dog-food 🐶</li>
			<li>Prefer native components</li>
			<li>Othewise, prefer headless libraries</li>
		</ul>

		<img
			src="/imgs/a11y-is-hard.png"
			alt="a11y is hard"
			class="abs-center absolute w-[80vw]"
			{@attach (node) => {
				animate(
					node,
					{
						opacity: slide.step >= 3 ? 1 : 0,
						y: slide.step >= 3 ? 0 : windowSize.h,
					},
					{ duration: 0.5, bounce: 0.2, type: "spring" },
				);
			}}
		/>
	</div>
</div>

<style>
	:global([popover]) {
		inset: unset;
	}

	[data-melt-toaster-root] {
		--gap: 0.75rem;
		--hover-offset: 1rem;
		--toast-height: 4rem;
		--hidden-offset: 0.75rem;

		--hidden-toasts: calc(var(--toasts) - 1);

		overflow: visible;
		display: grid;
		grid-template-rows: var(--toast-height) repeat(var(--hidden-toasts), var(--hidden-offset));
		grid-template-columns: 1fr;
		gap: 0;
		background: unset;
		padding: 0;
	}

	[data-melt-toaster-root]:hover {
		grid-template-rows: var(--hidden-offset) var(--toast-height) repeat(
				var(--hidden-toasts),
				calc(var(--toast-height) + var(--gap))
			);
	}

	[data-melt-toaster-toast-content] {
		position: absolute;
		pointer-events: auto;
		bottom: 0;
		left: 0;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

		transform-origin: 50% 0%;
		transition: all 350ms ease;
	}

	:global([data-theme="dark"] [data-melt-toaster-toast-content]) {
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
	}

	[data-melt-toaster-toast-content]:nth-last-child(n + 4) {
		z-index: 1;
		scale: 0.925;
		opacity: 0;
		translate: 0 calc(-3 * var(--hidden-offset));
	}

	[data-melt-toaster-toast-content]:nth-last-child(-n + 3) {
		z-index: 2;
		scale: 0.95;
		translate: 0 calc(-2 * var(--hidden-offset));
	}

	[data-melt-toaster-toast-content]:nth-last-child(-n + 2) {
		z-index: 3;
		scale: 0.975;
		translate: 0 calc(-1 * var(--hidden-offset));
	}

	[data-melt-toaster-toast-content]:nth-last-child(-n + 1) {
		z-index: 4;
		scale: 1;
		translate: 0;
	}

	[data-melt-toaster-root]:hover [data-melt-toaster-toast-content] {
		scale: 1;
		opacity: 1;
		--toast-gap: calc(calc(var(--gap) * var(--n)) + var(--hover-offset));
		--percentage: calc(-100% * calc(var(--n) - 1));
		translate: 0 calc(var(--percentage) - var(--toast-gap));
	}
</style>
