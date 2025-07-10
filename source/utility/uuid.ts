export class UuidTicker {
	private data: number = 0;
	constructor() {}
	/**
	 * Get a new UUID. This automatically creates the next UUID internally.
	 * @returns A new UUID.
	 */
	get(): number {
		const ret = this.data + 1;
		this.data++;
		return ret;
	}
}
