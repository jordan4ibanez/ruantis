let data: number = 0;

/**
 * Get a new UUID. This automatically creates the next UUID internally.
 * @returns A new UUID.
 */
export function getUUID(): number {
	const ret = data + 1;
	data++;
	return ret;
}
