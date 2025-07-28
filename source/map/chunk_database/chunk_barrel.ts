import { ____automation_internal_only_deploy_map_data } from "./auto_chunk_data";
import { __automation_internal_only_processData } from "./chunks_database";

function deployWorld() {
	core.after(0, () => {
		print("RUNNING");
		____automation_internal_only_deploy_map_data();
		__automation_internal_only_processData();
	});
}
core.register_on_mods_loaded(deployWorld);

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadChunkBarrel(): void {}
