import { Drawtype, Nodeboxtype } from "../../utility/enums";
import { registerBlock } from "../block_database";

registerBlock({
	name: "fountain",
	drawtype: Drawtype.mesh,
	mesh: "fountain.gltf",
	tiles: ["fountain.png"],
	collision_box: {
		type: Nodeboxtype.fixed,
		fixed: [-1.5, -0.5, -1.5, 1.5, 0.5, 1.5],
	},
});

registerBlock({
	name: "log_sideways",
	drawtype: Drawtype.mesh,
	mesh: "log_sideways.gltf",
	tiles: ["log_sideways.png"],
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadDecorations(): void {}
