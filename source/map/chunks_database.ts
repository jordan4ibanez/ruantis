import { afterClientJoins } from "../logic/client_join_leave";
import { Drawtype } from "../utility/enums";
import { Vec3 } from "../utility/vector";

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
				block: "",
			});
		}
	}
	add(c_0_0);
}

function deployWorld() {
	setUpData();
}

core.register_on_mods_loaded(deployWorld);

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadChunks(): void {}
