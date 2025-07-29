import { afterClientJoins } from "../../logic/client_join_leave";
import { Drawtype, ParamType2 } from "../../utility/enums";
import { Vec3 } from "../../utility/vector";
import { registerBlock, setBlock } from "../block_database";

//? Regular grass blocks.

// Randomizer.
registerBlock({
	name: "i_grass",
	drawtype: Drawtype.airlike,
	groups: { static: 1 },
	on_construct: (pos) => {
		const i = math.random(1, 3);
		setBlock(pos, `grass_${i}`);
	},
});

for (const i of $range(1, 3)) {
	registerBlock({
		name: `grass_${i}`,
		tiles: [`grass_${i}.png`],
		groups: { static: 1 },
	});
}

//? 1 angle grass block.

// Randomizer.
registerBlock({
	name: "i_grass_single_slope",
	drawtype: Drawtype.airlike,
	groups: { static: 1 },
	paramtype2: ParamType2["4dir"],
	on_construct: (pos) => {
		const i = math.random(1, 3);
		setBlock(pos, `grass_single_slope_${i}`, core.get_node(pos).param2);
	},
});

for (const i of $range(1, 3)) {
	registerBlock({
		name: `grass_single_slope_${i}`,
		drawtype: Drawtype.mesh,
		mesh: "grass_single_slope.gltf",
		tiles: [`grass_${i}.png`],
		groups: { static: 1 },
		paramtype2: ParamType2["4dir"],
	});
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadOutside(): void {}
