import { PointedThingType } from "../utility/enums";
import { Vec3 } from "../utility/vector";

core.register_node(":debug", {
	tiles: ["ground.png"],
	on_punch(position, node, puncher, pointedThing) {
		if (pointedThing.type != PointedThingType.node) {
			throw new Error("Logic error.");
		}
		const above = new Vec3().copyFrom(pointedThing.above!);
		const below = new Vec3().copyFrom(pointedThing.under!);
	},
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
