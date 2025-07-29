import { afterClientJoins } from "../../logic/client_join_leave";
import { Drawtype, Nodeboxtype, ParamType2 } from "../../utility/enums";
import { Vec3 } from "../../utility/vector";
import { registerBlock, setBlock } from "../block_database";

const invCornerNodeBox: NodeBox = {
	type: Nodeboxtype.fixed,
};
const detail = 20;
let slT = [];
for (const i of $range(1, detail - 1)) {
	const notch = i / detail;
	const invNotch = 1 - notch;
	slT.push([-0.5, -0.5, -0.5 + notch, 0.5 - notch, 0.5 - invNotch, 0.5]);
}
invCornerNodeBox.fixed = slT;

const cornerNodeBox: NodeBox = {
	type: Nodeboxtype.fixed,
};
let sdr = [];
for (const i of $range(1, detail - 1)) {
	const notch = i / detail;
	const invNotch = 1 - notch;

	const halfNotch = notch / 2;

	sdr.push([
		-0.5,
		-0.5,
		-0.5 + halfNotch,
		0.5 - halfNotch,
		0.5 - invNotch,
		0.5,
	]);
}
cornerNodeBox.fixed = sdr;

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

//? Sloped grass block.

// Randomizer.
registerBlock({
	name: "i_grass_slope",
	drawtype: Drawtype.airlike,
	groups: { static: 1 },
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
		groups: { static: 1 },
		paramtype2: ParamType2["4dir"],
	});
}

//? Corner grass block.

// Randomizer.
registerBlock({
	name: "i_grass_corner",
	drawtype: Drawtype.airlike,
	groups: { static: 1 },
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
		groups: { static: 1 },
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
	groups: { static: 1 },
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
		groups: { static: 1 },
		paramtype2: ParamType2["4dir"],
		node_box: invCornerNodeBox,
		selection_box: invCornerNodeBox,
	});
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadOutside(): void {}
