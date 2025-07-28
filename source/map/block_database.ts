import { ShallowVector3 } from "../../minetest-api";
import { whenClientJoins, whenClientLeaves } from "../logic/client_join_leave";
import { registerClientTickFunction, serverTickRate } from "../logic/tick";
import { getControls } from "../player/controls";
import { Drawtype, LogLevel, PointedThingType } from "../utility/enums";
import { Vec3 } from "../utility/vector";
import { BlockDef } from "./block_def";
import { loadOutside } from "./floor/outside";

//! This file is mainly for invisible shapes.

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

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadBlockDatabase(): void {}
