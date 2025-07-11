// Due to the way that TS modules work, this only runs once with multiple imports.
// Or it's tree shaken out if this is never imported, never running.
// It should be noted that I only want this running once, it's a mega mod.
const meta: MetaRef = core.get_mod_storage();

/**
 * Get mod storage.
 * @returns The mod storage instance.
 */
export function getStorage(): MetaRef {
	return meta;
}
