import { Drawtype, Nodeboxtype } from "../../utility/enums";
import { registerBlock } from "../block_database";

registerBlock({
	name: "tree",
	drawtype: Drawtype.mesh,
	mesh: "tree.gltf",
	tiles: ["tree.png"],
	collision_box: {
		type: Nodeboxtype.fixed,
		fixed: [-0.5, -0.5, -0.5, 0.5, 2.5, 0.5],
	},
});

/**
 * Tree-shake removal function. (but there's still trees in here!)
 *
 * Never use this!
 */
export function loadTrees(): void {}
