import { ____automation_internal_only_automate_set_up_chunks } from "./__auto_chunk_data";

function deployWorld() {
	core.after(0, () => {
		print("RUNNING");
		____automation_internal_only_automate_set_up_chunks();
	});
}
core.register_on_mods_loaded(deployWorld);

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadChunkBarrel(): void {}
