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

if (devMode) {
	const modifiedChunks = new Set<string>();

	afterClientJoins((client) => {
		client.hud_add({
			type: HudElementType.text,
			text: "DEVELOPER MODE",
		});
	});

	let saveString = "";

	core.register_chatcommand("save", {
		params: "",
		description: "",
		privs: { server: true },
		func: function (
			name: string,
			param: string
		): LuaMultiReturn<[boolean, string]> | void {
			const worker = new Vec3();

			

			for (const cPosHash of modifiedChunks) {
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

			// throw new Error("Function not implemented.");
		},
	});

	function modCheck(pos: ShallowVector3) {
		pos.x = math.floor(pos.x / 16);
		pos.y = math.floor(pos.y / 16);
		pos.z = math.floor(pos.z / 16);

		const cPosStr = core.serialize(new Vec3().copyFrom(pos));

		if (!modifiedChunks.has(cPosStr)) {
			print(`Detected modification at ${pos}`);
		}

		modifiedChunks.add(cPosStr);

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
