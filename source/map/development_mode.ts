//? Developer mode is a very specific feature to this game.
//?
//? It allows automated regeneration of map chunks that become modified during development.

import { ShallowVector3 } from "../../minetest-api";
import { afterClientJoins } from "../logic/client_join_leave";
import { HudElementType, LogLevel } from "../utility/enums";
import { Vec2, Vec3 } from "../utility/vector";

export const devMode = true;

const __live_map_chunks = new Set<string>();

export function ____acceptModifiedChunks(chunkRoot: Vec3) {
	__live_map_chunks.add(core.serialize(chunkRoot));
}

if (devMode) {
	afterClientJoins((client) => {
		client.hud_add({
			type: HudElementType.text,
			text: "DEVELOPER MODE",
			offset: new Vec2(100, 100),
			number: 0xffffff,
			style: 2,
		});
	});

	function gfunc(
		name: string,
		param: string
	): LuaMultiReturn<[boolean, string]> | void {
		const pos = core.get_player_by_name(name)!.get_pos();

		pos.x = math.floor(pos.x / 16) * 16;
		pos.y = math.floor(pos.y / 16) * 16;
		pos.z = math.floor(pos.z / 16) * 16;

		for (const x of $range(0, 15)) {
			for (const z of $range(0, 15)) {
				core.place_node(new Vec3(x + pos.x, 0.5, z + pos.z), {
					name: "i_grass",
				});
			}
		}
	}

	core.register_chatcommand("floor", {
		params: "",
		description: "",
		privs: { server: true },
		func: gfunc,
	});

	core.register_chatcommand("ground", {
		params: "",
		description: "",
		privs: { server: true },
		func: gfunc,
	});

	core.register_chatcommand("save", {
		params: "",
		description: "",
		privs: { server: true },
		func: function (
			name: string,
			param: string
		): LuaMultiReturn<[boolean, string]> | void {
			const mp = core.get_modpath("ruantis");
			for (const cPosHash of __live_map_chunks) {
				const chunkPosRoot: ShallowVector3 = core.deserialize(cPosHash);

				if (chunkPosRoot == null) {
					throw new Error("Serialization error?");
				}

				if (!core.forceload_block(chunkPosRoot, false, -1)) {
					throw new Error(
						`Failed to force load chunk ${chunkPosRoot.toString()}`
					);
				}

				const min = new Vec3(
					chunkPosRoot.x * 16,
					chunkPosRoot.y * 16,
					chunkPosRoot.z * 16
				);

				const max = new Vec3().copyFrom(min).add(new Vec3(16, 16, 16));

				core.create_schematic(
					min,
					max,
					null,
					`${mp}/schematics/chunks/testing.mts`,
					null
				);

				core.forceload_free_block(chunkPosRoot, false);
			}
		},
	});

	function modCheck(pos: ShallowVector3) {
		pos.x = math.floor(pos.x / 16);
		pos.y = math.floor(pos.y / 16);
		pos.z = math.floor(pos.z / 16);

		const cPosStr = core.serialize(new Vec3().copyFrom(pos));

		// if (!__live_map_chunks.has(cPosStr)) {
		print(`Detected modification at ${pos}`);
		// }

		__live_map_chunks.add(cPosStr);

		// print(dump(modifiedChunks));
	}

	core.register_on_placenode(modCheck);
	core.register_on_dignode(modCheck);
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadDevelopmentMode(): void {}
