<script lang="ts">
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";
	import { createFieldValidation } from "$lib/spells/create-field-validation.svelte";
	import { PinInput } from "melt/builders";

	const slide = presentation.registerSlide(1);

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
</script>

<div {...slide.attrs} class={cn(slide.attrs.class, "relative")}>
	<div class="grid grid-cols-2 gap-20 p-20">
		<form
			class="flex flex-col gap-2 rounded-lg border border-neutral-700
			bg-neutral-800/50 p-6 backdrop-blur-sm"
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
	</div>
</div>
