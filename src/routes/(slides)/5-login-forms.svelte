<script lang="ts">
	import { presentation } from "$lib/spells/presentation.svelte";
	import { cn } from "$lib/style";
	import { animate } from "motion";
	import type { Attachment } from "svelte/attachments";

	const slide = presentation.registerSlide(1);

	let email = $state("");
	let password = $state("");
	let isAutofilled = $state(false);
	let showPasswordManager = $state(false);

	// Simulate the bug: button is disabled even when autofilled
	const isButtonDisabled = $derived(() => {
		if (isAutofilled) {
			// Bug: autofilled values don't trigger change events, so button stays disabled
			return true;
		}
		return !email.trim() || !password.trim();
	});

	const simulateAutofill = () => {
		// Simulate password manager autofill
		const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
		const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;

		if (emailInput && passwordInput) {
			// Set values directly (like password managers do)
			emailInput.value = "user@example.com";
			passwordInput.value = "securepassword123";

			// Add autofill styling (dark mode)
			emailInput.style.backgroundColor = "#1e293b";
			passwordInput.style.backgroundColor = "#1e293b";

			isAutofilled = true;
			showPasswordManager = false;
		}
	};

	const handleManualInput = (field: "email" | "password", value: string) => {
		if (field === "email") {
			email = value;
		} else {
			password = value;
		}

		// Manual input fixes the autofill bug
		if (isAutofilled) {
			isAutofilled = false;
			const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
			const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
			if (emailInput) emailInput.style.backgroundColor = "";
			if (passwordInput) passwordInput.style.backgroundColor = "";
		}
	};

	const animatePasswordManager: Attachment<HTMLElement> = (node) => {
		animate(
			node,
			{
				opacity: showPasswordManager ? 1 : 0,
				scale: showPasswordManager ? 1 : 0.95,
				y: showPasswordManager ? 0 : -10,
			},
			{
				duration: 0.2,
				type: "spring",
				bounce: 0.1,
			},
		);
	};
</script>

<div {...slide.attrs} class={cn(slide.attrs.class, "relative overflow-hidden")}>
	<div class="flex h-full items-center justify-center p-8">
		<div class="w-full max-w-md space-y-8">
			<!-- Header -->
			<div class="text-center">
				<h2 class="text-3xl font-semibold tracking-tight text-white">Sign In</h2>
				<p class="mt-2 text-sm text-neutral-400">Welcome back! Please sign in to your account</p>
			</div>

			<!-- Login Form -->
			<div class="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm">
				<form class="space-y-6" onsubmit={(e) => e.preventDefault()}>
					<div class="space-y-2">
						<label for="email" class="text-sm font-medium text-neutral-200">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="off"
							required
							class="flex h-10 w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-50 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
							placeholder="Enter your email"
							value={email}
							oninput={(e) => handleManualInput("email", e.currentTarget.value)}
						/>
					</div>

					<div class="space-y-2">
						<label for="password" class="text-sm font-medium text-neutral-200">Password</label>
						<div class="relative">
							<input
								id="password"
								name="password"
								type="password"
								autocomplete="off"
								data-lpignore="true"
								data-protonpass-ignore
								data-bwignore
								required
								class="flex h-10 w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-50 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
								placeholder="Enter your password"
								value={password}
								oninput={(e) => handleManualInput("password", e.currentTarget.value)}
							/>

							<!-- Password Manager Popup -->
							<div
								class="absolute inset-x-0 top-12 z-10 rounded-lg border border-neutral-700 bg-neutral-800 p-3 shadow-xl"
								{@attach animatePasswordManager}
							>
								<div class="flex items-center space-x-3">
									<div class="flex h-8 w-8 items-center justify-center rounded bg-neutral-600">
										<svg class="h-4 w-4 text-neutral-200" fill="currentColor" viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
												clip-rule="evenodd"
											/>
										</svg>
									</div>
									<div class="flex-1">
										<p class="text-sm font-medium text-neutral-100">Password Manager</p>
										<p class="text-xs text-neutral-400">user@example.com</p>
									</div>
								</div>
								<button
									type="button"
									class="mt-3 inline-flex h-9 w-full items-center justify-center rounded-md bg-neutral-50 px-3 text-sm font-medium text-neutral-900 hover:bg-neutral-200 focus:ring-1 focus:ring-neutral-400 focus:outline-none"
									onclick={simulateAutofill}
								>
									Use saved password
								</button>
							</div>
						</div>
					</div>

					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								class="h-4 w-4 rounded border-neutral-600 bg-neutral-950 text-neutral-50 focus:ring-neutral-400 focus:ring-offset-neutral-900"
							/>
							<label for="remember-me" class="text-sm text-neutral-200">Remember me</label>
						</div>

						<div class="text-sm">
							<a href="#" class="font-medium text-neutral-400 hover:text-neutral-300"
								>Forgot your password?</a
							>
						</div>
					</div>

					<button
						type="submit"
						disabled={isButtonDisabled()}
						class={cn(
							"inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:ring-1 focus:ring-neutral-400 focus:outline-none",
							isButtonDisabled()
								? "cursor-not-allowed bg-neutral-700 text-neutral-500"
								: "bg-neutral-50 text-neutral-900 hover:bg-neutral-200",
						)}
					>
						Sign in
					</button>
				</form>
			</div>

			<!-- Demo Controls -->
			<div class="flex justify-center gap-3">
				<button
					type="button"
					class="inline-flex h-9 items-center justify-center rounded-md border border-neutral-700 bg-neutral-800 px-4 text-sm font-medium text-neutral-200 hover:bg-neutral-700 focus:ring-1 focus:ring-neutral-400 focus:outline-none"
					onclick={() => (showPasswordManager = !showPasswordManager)}
				>
					{showPasswordManager ? "Hide" : "Show"} Password Manager
				</button>
			</div>
		</div>
	</div>
</div>
