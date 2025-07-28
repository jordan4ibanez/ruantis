import { Vec3 } from "../../utility/vector";
import { setBlock } from "../block_database";
import { ____acceptModifiedChunks } from "../development_mode";
import { ____automation_internal_only_automate_set_up_chunks } from "./__auto_chunk_data";
import { Chunk } from "./chunk";

export function ____automation_internal_only_add_chunk(c: Chunk) {
	const root = new Vec3();
	const work = new Vec3();

	____acceptModifiedChunks(c.pos);

	root.x = c.pos.x * 16;
	root.y = c.pos.y * 16;
	root.z = c.pos.z * 16;

	if (!core.forceload_block(root, false, -1)) {
		throw new Error(`Failed to force load chunk ${work.toString()}`);
	}

	for (const x of $range(0, 15)) {
		for (const y of $range(0, 15)) {
			for (const z of $range(0, 15)) {
				work.x = root.x + x;
				work.y = root.y + y;
				work.z = root.z + z;

				core.remove_node(work);
			}
		}
	}

	for (const b of c.blocks) {
		work.x = root.x + b.pos.x;
		work.y = root.y + b.pos.y;
		work.z = root.z + b.pos.z;

		setBlock(work, b.block, b.param2);
	}

	core.forceload_free_block(root, false);
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadChunkDatabase(): void {}
