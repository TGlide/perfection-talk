export class BroadcastState<T> {
	#state = $state(undefined as T);
	#channel: BroadcastChannel;

	constructor(name: string, value: T) {
		this.#state = value;
		this.#channel = new BroadcastChannel(name);
		this.#channel.addEventListener("message", (e) => {
			console.log("Receiving", e.data);
			this.#state = e.data;
		});
	}

	get current() {
		return this.#state;
	}

	set current(value: T) {
		this.#state = value;
		this.#channel.postMessage(this.#state);
	}
}
