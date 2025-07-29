import { afterClientJoins } from "../../logic/client_join_leave";
import { Drawtype, Nodeboxtype, ParamType2 } from "../../utility/enums";
import { Vec3 } from "../../utility/vector";
import { registerBlock, setBlock } from "../block_database";



//? Regular grass blocks.

// Randomizer.
registerBlock({
	name: "i_grass",
	drawtype: Drawtype.airlike,
	on_construct: (pos) => {
		const i = math.random(1, 3);
		setBlock(pos, `grass_${i}`);
	},
});

for (const i of $range(1, 3)) {
	registerBlock({
		name: `grass_${i}`,
		tiles: [`grass_${i}.png`],
	});
}

//? Sloped grass block.

// Randomizer.
registerBlock({
	name: "i_grass_slope",
	drawtype: Drawtype.airlike,
	paramtype2: ParamType2["4dir"],
	on_construct: (pos) => {
		const i = math.random(1, 3);
		setBlock(pos, `grass_slope_${i}`, core.get_node(pos).param2);
	},
});

for (const i of $range(1, 3)) {
	registerBlock({
		name: `grass_slope_${i}`,
		drawtype: Drawtype.mesh,
		mesh: "slope.gltf",
		tiles: [`grass_${i}.png`],
		paramtype2: ParamType2["4dir"],
		node_box: slopeNodeBox,
		selection_box: slopeNodeBox,
	});
}

//? Corner grass block.

// Randomizer.
registerBlock({
	name: "i_grass_corner",
	drawtype: Drawtype.airlike,
	paramtype2: ParamType2["4dir"],
	on_construct: (pos) => {
		const i = math.random(1, 3);
		setBlock(pos, `grass_corner_${i}`, core.get_node(pos).param2);
	},
});

for (const i of $range(1, 3)) {
	registerBlock({
		name: `grass_corner_${i}`,
		drawtype: Drawtype.mesh,
		mesh: "corner.gltf",
		tiles: [`grass_${i}.png`],
		paramtype2: ParamType2["4dir"],
		node_box: cornerNodeBox,
		selection_box: cornerNodeBox,
	});
}

//? Inverse corner grass block.

// Randomizer.
registerBlock({
	name: "i_grass_inverse_corner",
	drawtype: Drawtype.airlike,
	paramtype2: ParamType2["4dir"],
	on_construct: (pos) => {
		const i = math.random(1, 3);
		setBlock(pos, `grass_inverse_corner_${i}`, core.get_node(pos).param2);
	},
});

for (const i of $range(1, 3)) {
	registerBlock({
		name: `grass_inverse_corner_${i}`,
		drawtype: Drawtype.mesh,
		mesh: "inverse_corner.gltf",
		tiles: [`grass_${i}.png`],
		paramtype2: ParamType2["4dir"],
		node_box: invCornerNodeBox,
		selection_box: invCornerNodeBox,
	});
}

//? Stone path.

// Randomizer.
registerBlock({
	name: "i_stone_path",
	drawtype: Drawtype.airlike,

	on_construct: (pos) => {
		const i = math.random(1, 3);
		setBlock(pos, `stone_path_${i}`);
	},
});

for (const i of $range(1, 3)) {
	registerBlock({
		name: `stone_path_${i}`,
		tiles: [`stone_${i}.png`],
	});
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadOutside(): void {}
