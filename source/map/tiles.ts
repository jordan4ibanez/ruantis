import { ShallowVector3 } from "../../minetest-api";
import { whenClientJoins, whenClientLeaves } from "../logic/client_join_leave";
import { registerClientTickFunction, serverTickRate } from "../logic/tick";
import { getControls } from "../player/controls";
import { LogLevel, PointedThingType } from "../utility/enums";
import { Vec3 } from "../utility/vector";
import { loadOutside } from "./floor/outside";

const tickRate = serverTickRate;

//! This file is mainly for invisible shapes.

// This portion of code stops the server from exploding.
const clickTimeoutMap = new Map<string, number>();
whenClientJoins((player) => {
	clickTimeoutMap.set(player.get_player_name(), 0);
});
whenClientLeaves((player) => {
	clickTimeoutMap.delete(player.get_player_name());
});
registerClientTickFunction((player, delta) => {
	const name = player.get_player_name();
	let timer = clickTimeoutMap.get(name) || 0;
	if (timer > 0) {
		timer -= delta;
		if (timer < 0) {
			timer = 0;
		}
	}
	clickTimeoutMap.set(name, timer);
});
// End anti server explosion code.

const clickCheck = new Vec3(0, 1, 0);
export function tileClick(
	position: ShallowVector3,
	node: NodeTable,
	puncher: ObjectRef | null,
	pointedThing: PointedThing
) {
	if (puncher == null) {
		return;
	}
	const name = puncher.get_player_name();

	print(dump(getControls(name)));

	if (getControls(name).leftPressed) {
		print("press");
	}

	const timer = clickTimeoutMap.get(name) || 1;

	if (timer > 0) {
		return;
	}

	if (pointedThing.type != PointedThingType.node) {
		throw new Error("Logic error.");
	}

	const above = new Vec3().copyFrom(pointedThing.above!);
	const below = new Vec3().copyFrom(pointedThing.under!);

	const diff = above.subtractImmutable(below);

	if (!diff.equals(clickCheck)) {
		core.log(LogLevel.warning, `Player ${name} is clicking under the map.`);
		return;
	}

	const targetPos = new Vec3().copyFrom(position).add(clickCheck);

	print(targetPos.toString());
	clickTimeoutMap.set(name, tickRate);
}
core.register_on_punchnode(tileClick);

// todo: make this into a ghost tile or something.
core.register_node(":debug", {
	tiles: ["ground.png"],
});

interface Tile extends NodeDefinition {
	name: string;
}

const tileDatabase = new Map<string, Tile>();

export function registerTile(def: Tile): void {
	if (tileDatabase.has(def.name)) {
		throw new Error(`${def.name} already exists.`);
	}
	core.register_node(":" + def.name, def);
	tileDatabase.set(def.name, def);
}

export function getTile(name: string): Tile {
	const out = tileDatabase.get(name);
	if (out == null) {
		throw new Error(`Tile ${name} does not exist.`);
	}
	return out;
}

loadOutside();

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadNodes(): void {}
