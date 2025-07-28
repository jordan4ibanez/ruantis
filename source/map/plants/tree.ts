import { Drawtype, Nodeboxtype } from "../../utility/enums";
import { registerBlock } from "../block_database";

const treeCbox: NodeBox = {
	type: Nodeboxtype.fixed,
	fixed: [-0.5, -0.5, -0.5, 0.5, 3, 0.5],
};

registerBlock({
	name: "tree",
	drawtype: Drawtype.mesh,
	mesh: "tree.gltf",
	tiles: ["tree.png"],
	pointable: true,
	collision_box: treeCbox,
	selection_box: treeCbox,
});

/**
 * Tree-shake removal function. (but there's still trees in here!)
 *
 * Never use this!
 */
export function loadTrees(): void {}
