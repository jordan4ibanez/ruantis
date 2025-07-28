import { Drawtype, Nodeboxtype, TextureAlpha } from "../../utility/enums";
import { registerBlock } from "../block_database";

registerBlock({
	name: "ore",
	drawtype: Drawtype.mesh,
	mesh: "ore.gltf",
	use_texture_alpha: TextureAlpha.clip,
	tiles: ["ore_base.png", "blank.png"],
	collision_box: {
		type: Nodeboxtype.fixed,
		fixed: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
	},
});

registerBlock({
	name: "ore_coal",
	drawtype: Drawtype.mesh,
	mesh: "ore.gltf",
	tiles: ["ore_base.png", "ore_coal.png"],
	collision_box: {
		type: Nodeboxtype.fixed,
		fixed: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
	},
	pointable: true,
});

registerBlock({
	name: "ore_copper",
	drawtype: Drawtype.mesh,
	mesh: "ore.gltf",
	tiles: ["ore_base.png", "ore_copper.png"],
	collision_box: {
		type: Nodeboxtype.fixed,
		fixed: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
	},
	pointable: true,
});

registerBlock({
	name: "ore_tin",
	drawtype: Drawtype.mesh,
	mesh: "ore.gltf",
	tiles: ["ore_base.png", "ore_tin.png"],
	collision_box: {
		type: Nodeboxtype.fixed,
		fixed: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
	},
	pointable: true,
});

registerBlock({
	name: "ore_iron",
	drawtype: Drawtype.mesh,
	mesh: "ore.gltf",
	tiles: ["ore_base.png", "ore_iron.png"],
	collision_box: {
		type: Nodeboxtype.fixed,
		fixed: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
	},
	pointable: true,
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadOre(): void {}
