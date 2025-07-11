import { whenPlayerJoins } from "../logic/player";
import {
	registerServerTickFunction,
	registerTargetedTemporaryClientTickFunction,
} from "../logic/tick";
import { getAllPlayers } from "./tracker";

class DisplayInformation {}
const winInfoGet = core.get_player_window_information;
const windowSizes = new Map<string, WindowInfo>();

export function deployDisplayHandling(): void {
	whenPlayerJoins((player) => {
		// Get this data into memory as fast as possible.
		registerTargetedTemporaryClientTickFunction(
			player.get_player_name(),
			(player) => {
				const name = player.get_player_name();
				const windowInfo = core.get_player_window_information(name);
				if (windowInfo == null) {
					return false;
				}

				print(dump(windowInfo));

				//! note: This is the actual window resolution in pixels.
				print(windowInfo.size.x);

				return true;
			}
		);
	});

	// todo: convert this into a screen polling function.
	registerServerTickFunction((delta) => {
		for (const player of getAllPlayers()) {
			const name = player.get_player_name();
			const windowInfo = core.get_player_window_information(name);
			if (windowInfo == null) {
				continue;
			}

			print(dump(windowInfo.size.x * windowInfo.real_hud_scaling));
		}
	});
}

// registerClientTickFunction((player: ObjectRef, delta: number) => {
// 	// const windowInfo = core.get_player_window_information(name);
// 	// if (windowInfo == null) {
// 	// 	print("going again");
// 	// 	return;
// 	// }

// 	// print("done");

// 	return true;
// });
