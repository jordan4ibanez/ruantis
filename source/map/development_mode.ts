//? Developer mode is a very specific feature to this game.
//?
//? It allows automated regeneration of map chunks that become modified during development.
//?
//? If you're reading this and wondering how I designed this.
//?
//? I hand crafted everything you see and experience for you to enjoy.
//?

import { afterClientJoins } from "../logic/client_join_leave";
import { HudElementType } from "../utility/enums";

//? ~jordan4ibanez
const devMode = true;

if (devMode) {
	afterClientJoins((client) => {
		client.hud_add({
			type: HudElementType.text,
			text: "DEVELOPER MODE",
		});
	});
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadDevelopmentMode(): void {}
