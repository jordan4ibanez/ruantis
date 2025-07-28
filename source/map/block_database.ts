import { ShallowVector3 } from "../../minetest-api";
import { whenClientJoins, whenClientLeaves } from "../logic/client_join_leave";
import { registerClientTickFunction, serverTickRate } from "../logic/tick";
import { getControls } from "../player/controls";
import { Drawtype, LogLevel, PointedThingType } from "../utility/enums";
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



export interface BlockDef extends NodeDefinition {
	name: string;
}

const blockDatabase = new Map<string, BlockDef>();

export function registerBlock(def: BlockDef): void {
	if (blockDatabase.has(def.name)) {
		throw new Error(`${def.name} already exists.`);
	}

	def.drop = "";
	if (def.pointable == null) {
		def.pointable = false;
	}

	core.register_node(":" + def.name, def);
	blockDatabase.set(def.name, def);
}

export function getBlockDef(name: string): BlockDef {
	const out = blockDatabase.get(name);
	if (out == null) {
		throw new Error(`Block ${name} does not exist.`);
	}
	return out;
}

export function setBlock(pos: ShallowVector3, name: string): void {
	core.set_node(pos, { name: name });
}

loadOutside();

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadNodes(): void {}
