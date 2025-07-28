import { Drawtype, Nodeboxtype } from "../../utility/enums";
import { registerBlock } from "../block_database";

registerBlock({
	name: "ore",
	drawtype: Drawtype.mesh,
	mesh: "ore.gltf",
	tiles: ["ore_base.png", "blank.png"],
	collision_box: {
		type: Nodeboxtype.fixed,
		fixed: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
	},
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadOre(): void {}
