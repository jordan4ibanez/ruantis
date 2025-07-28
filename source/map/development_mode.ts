//? Developer mode is a very specific feature to this game.
//?
//? It allows automated regeneration of map chunks that become modified during development.
//?
//? If you're reading this and wondering how I designed this.
//?
//? I hand crafted everything you see and experience for you to enjoy.
//?
//? ~jordan4ibanez

import { afterClientJoins } from "../logic/client_join_leave";
import { HudElementType } from "../utility/enums";

export const devMode = true;

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
			throw new Error("Function not implemented.");
		},
	});

	core.register_on_placenode((pos) => {
		pos.x = math.floor(pos.x / 16);
		pos.y = math.floor(pos.y / 16);
		pos.z = math.floor(pos.z / 16);

		print(pos);
	});
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadDevelopmentMode(): void {}
