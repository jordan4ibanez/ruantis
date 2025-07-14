//? This is a barrel file.

import { loadDebugNodes } from "./debug_tiles";

interface TileDefinition {
	name: string;
	description?: string;
}

core.register_node(":debug", {
	tiles: ["ground.png"],
});

export function registerTile(def: TileDefinition): void {
	core.register_node(":" + def.name, def);
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadNodes(): void {
	loadDebugNodes();
}
