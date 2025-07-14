//? This is a barrel file.

core.register_node(":debug", {
	tiles: ["ground.png"],
});

// export function registerTile(def: TileDefinition): void {
// 	core.register_node(":" + def.name);
// }

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadNodes(): void {}
