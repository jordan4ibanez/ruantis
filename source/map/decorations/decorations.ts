import { Drawtype } from "../../utility/enums";
import { registerBlock } from "../block_database";

registerBlock({
	name: "fountain",
	drawtype: Drawtype.mesh,
	mesh: "fountain.gltf",
	tiles: ["fountain.png"],
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadDecorations(): void {}
