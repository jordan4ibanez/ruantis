import { whenPlayerJoins } from "../logic/player";
import {
	registerServerTickFunction,
	registerTargetedTemporaryClientTickFunction,
} from "../logic/tick";
import { Vec2 } from "../utility/vector";
import { getAllPlayers } from "./tracker";

const winInfoGet = core.get_player_window_information;

export class WindowInfo {
	size: Vec2 = new Vec2();
	changed: boolean;

	constructor(init: Vec2) {
		this.size.x = init.x;
		this.size.y = init.y;
		this.changed = true;
	}
}

const windowSizes = new Map<string, WindowInfo>();

export function deployDisplayHandling(): void {
	whenPlayerJoins((player) => {
		// Get this data into memory as fast as possible.
		registerTargetedTemporaryClientTickFunction(
			player.get_player_name(),
			(player) => {
				const name = player.get_player_name();

				const windowInfo = winInfoGet(name);

				if (windowInfo == null) {
					return false;
				}

				windowSizes.set(name, new WindowInfo(windowInfo.size));

				return true;
			}
		);
	});

	// todo: convert this into a screen polling function.
	registerServerTickFunction((delta) => {
		for (const player of getAllPlayers()) {
			const name = player.get_player_name();
			const windowInfo = winInfoGet(name);
			// Player's window info has not been submitted by the client.
			// If this starts hitting null randomly there is probably an issue with the client.
			if (windowInfo == null) {
				continue;
			}

			const sizeInfo = windowSizes.get(player.get_player_name());

			// Client info always
			if (sizeInfo == null) {
				continue;
			}

			const changed = windowInfo.size.equals;

			print(changed);

			// sizeInfo.x = windowInfo.size.x;
			// sizeInfo.y = windowInfo.size.y;
		}
	});
}

// registerClientTickFunction((player: ObjectRef, delta: number) => {
// 	// const windowInfo = winInfoGet(name);
// 	// if (windowInfo == null) {
// 	// 	print("going again");
// 	// 	return;
// 	// }

// 	// print("done");

// 	return true;
// });
