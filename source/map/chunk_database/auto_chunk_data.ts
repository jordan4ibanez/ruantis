import { Vec3 } from "../../utility/vector";
import {
	____automation_internal_only_add_chunk,
	Chunk,
} from "./chunks_database";

export function ____automation_internal_only_automate_set_up_chunks() {
	const c_0_0: Chunk = {
		pos: new Vec3(0, 0, 0),
		blocks: [],
	};

	for (const x of $range(0, 15)) {
		for (const z of $range(0, 15)) {
			c_0_0.blocks.push({
				pos: new Vec3(x, 0, z),
				block: "i_grass",
			});
		}
	}

	c_0_0.blocks.push({
		pos: new Vec3(5, 1, 5),
		block: "fountain",
		param2: 2,
	});

	c_0_0.blocks.push({
		pos: new Vec3(10, 1, 5),
		block: "stone_stair",
		param2: 2,
	});

	c_0_0.blocks.push({
		pos: new Vec3(8, 1, 10),
		block: "tree",
	});

	c_0_0.blocks.push({
		pos: new Vec3(8, 1, 4),
		block: "ore",
	});

	c_0_0.blocks.push({
		pos: new Vec3(9, 1, 4),
		block: "ore_coal",
	});

	c_0_0.blocks.push({
		pos: new Vec3(10, 1, 4),
		block: "ore_copper",
	});

	c_0_0.blocks.push({
		pos: new Vec3(11, 1, 4),
		block: "ore_tin",
	});

	c_0_0.blocks.push({
		pos: new Vec3(12, 1, 4),
		block: "ore_iron",
	});

	____automation_internal_only_add_chunk(c_0_0);
}
