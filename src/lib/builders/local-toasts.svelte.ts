import { autoUpdate, computePosition, flip, type Placement } from "@floating-ui/dom";
import { Toaster, type ToasterProps } from "melt/builders";
import { createAttachmentKey } from "svelte/attachments";
import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";

type ToastData = {
	content: string;
};

export class LocalToasts {
	id: string;
	toaster: Toaster<ToastData>;

	constructor(props: ToasterProps & { id: string }) {
		this.id = props.id;
		this.toaster = new Toaster<ToastData>(props);
	}

	get addToast() {
		return this.toaster.addToast;
	}

	get trigger() {
		return {
			"data-local-toast-trigger": this.id,
		} as const satisfies HTMLButtonAttributes;
	}

	#attachment = {
		[createAttachmentKey()]: (node: HTMLElement) => {
			let placement: Placement = $state("top");

			const triggerEl = document.querySelector(`[data-local-toast-trigger=${this.id}]`);
			if (!triggerEl) return;

			const compute = () =>
				computePosition(triggerEl, node, {
					strategy: "absolute",
					placement: "top",
					middleware: [flip({ fallbackPlacements: ["left"] })],
				}).then(({ x, y, placement: _placement }) => {
					placement = _placement;
					Object.assign(node.style, {
						left: placement === "top" ? `${x}px` : `${x - 4}px`,
						top: placement === "top" ? `${y - 6}px` : `${y}px`,
					});
				});

			return autoUpdate(triggerEl, node, compute);
		},
	};

	get toasts() {
		const original = this.toaster?.toasts;

		return original.map((toast) => {
			const attrs = {
				"data-local-toast": "",
				...this.#attachment,
				style: `
		/* Float on top of the UI */
		position: absolute;

		/* Avoid layout interference */
		width: max-content;
		top: 0;
		left: 0;
`,
			} as const satisfies HTMLAttributes<HTMLElement>;

			return Object.assign(toast, {
				attrs,
			});
		});
	}
}
