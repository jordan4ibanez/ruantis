//? Developer mode is a very specific feature to this game.
//?
//? It allows automated regeneration of map chunks that become modified during development.
//?
//? If you're reading this and wondering how I designed this.
//?
//? I hand crafted everything you see and experience for you to enjoy.
//?
//? ~jordan4ibanez

import { ShallowVector3 } from "../../minetest-api";
import { afterClientJoins } from "../logic/client_join_leave";
import { HudElementType } from "../utility/enums";
import { Vec3 } from "../utility/vector";

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
		});
	});

	core.register_chatcommand("save", {
		params: "",
		description: "",
		privs: { server: true },
		func: function (
			name: string,
			param: string
		): LuaMultiReturn<[boolean, string]> | void {
			const worker = new Vec3();

			// Create the __auto_chunk_data.ts file.
			const saveString: string[] = [
				`import { Vec3 } from "../../utility/vector";
import { Chunk } from "./chunk";
import { ____automation_internal_only_add_chunk } from "./chunks_database";

export function ____automation_internal_only_automate_set_up_chunks() {
`,
			];

			for (const cPosHash of __live_map_chunks) {
				const chunkPosRoot: ShallowVector3 = core.deserialize(cPosHash);

				if (chunkPosRoot == null) {
					throw new Error("Serialization error?");
				}

				for (const x of $range(0, 15)) {
					for (const y of $range(0, 15)) {
						for (const z of $range(0, 15)) {
							worker.x = x + chunkPosRoot.x;
							worker.y = y + chunkPosRoot.y;
							worker.z = z + chunkPosRoot.z;

							const dat: NodeTable = core.get_node(worker);
						}
					}
				}
			}
			saveString.push("}");

			print(saveString.join(""));

			// print(saveString);
		},
	});

	function modCheck(pos: ShallowVector3) {
		pos.x = math.floor(pos.x / 16);
		pos.y = math.floor(pos.y / 16);
		pos.z = math.floor(pos.z / 16);

		const cPosStr = core.serialize(new Vec3().copyFrom(pos));

		if (!__live_map_chunks.has(cPosStr)) {
			print(`Detected modification at ${pos}`);
		}

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
