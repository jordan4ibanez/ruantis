import { ShallowVector3 } from "../../minetest-api";
import { LogLevel, PointedThingType } from "../utility/enums";
import { Vec3 } from "../utility/vector";

const clickCheck = new Vec3(0, 1, 0);

function tileClick(
	position: ShallowVector3,
	node: NodeTable,
	puncher: ObjectRef | null,
	pointedThing: PointedThing
) {
	if (puncher == null) {
		return;
	}
	if (pointedThing.type != PointedThingType.node) {
		throw new Error("Logic error.");
	}

	const above = new Vec3().copyFrom(pointedThing.above!);
	const below = new Vec3().copyFrom(pointedThing.under!);

	const diff = above.subtractImmutable(below);

	const name = puncher.get_player_name();

	if (!diff.equals(clickCheck)) {
		core.log(LogLevel.warning, `Player ${name} is clicking under the map.`);
		return;
	}

	const targetPos = new Vec3().copyFrom(position).add(clickCheck);

	print(targetPos.toString());
}

// todo: make this into a ghost tile or something.
core.register_node(":debug", {
	tiles: ["ground.png"],
	on_punch: tileClick,
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
