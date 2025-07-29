import { registerBlock } from "../block_database";

registerBlock({
	name: "stone_brick",
	tiles: ["stone_brick.png"],
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadBuildingBlocks(): void {}
