import { ShallowVector3 } from "../../minetest-api";
import { BlockDef } from "./block_def";

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
	def.light_source = 14;
	def.sunlight_propagates = true;

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

export function setBlock(
	pos: ShallowVector3,
	name: string,
	param2?: number
): void {
	core.set_node(pos, { name: name, param2: param2 });
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadBlockDatabase(): void {}
