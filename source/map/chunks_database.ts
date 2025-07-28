import { afterClientJoins } from "../logic/client_join_leave";
import { Drawtype } from "../utility/enums";
import { Vec3 } from "../utility/vector";
import { setBlock } from "./block_database";

interface PlacementData {
	pos: Vec3;
	block: string;
}

interface Chunk {
	pos: Vec3;
	bocks: PlacementData[];
}

const chunkDatabase = new Map<Vec3, Chunk>();

function add(chunk: Chunk) {
	chunkDatabase.set(chunk.pos, chunk);
}

function setUpData() {
	const c_0_0: Chunk = {
		pos: new Vec3(0, 0, 0),
		bocks: [],
	};

	for (const x of $range(0, 15)) {
		for (const z of $range(0, 15)) {
			c_0_0.bocks.push({
				pos: new Vec3(x, 0, z),
				block: "i_grass",
			});
		}
	}
	add(c_0_0);
}

function processData() {
	for (const c of chunkDatabase.values()) {
		const root = new Vec3();
		root.x = c.pos.x * 16;
		root.y = c.pos.y * 16;
		root.z = c.pos.z * 16;

		const work = new Vec3();

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

		for (const b of c.bocks) {
			work.x = root.x + b.pos.x;
			work.y = root.y + b.pos.y;
			work.z = root.z + b.pos.z;

			// print(dump(work));

			// print(dump(work));
			setBlock(work, b.block, b.param2);
			// print(dump(b));
		}

		core.forceload_free_block(root, false);

		// print(dump(c));
	}
}

function deployWorld() {
	core.after(0, () => {
		setUpData();
		processData();
	});
}

core.register_on_mods_loaded(deployWorld);

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadChunks(): void {}
