import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				significa: ["Significa Sans", "sans-serif"],
				mono: ["Fira Code", "monospace"],
			},
		},
	},

	plugins: [],
} as Config;
