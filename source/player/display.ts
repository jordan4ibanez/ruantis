import { whenPlayerJoins } from "../logic/player";
import {
	registerServerTickFunction,
	registerTargetedTemporaryClientTickFunction,
} from "../logic/tick";
import { getAllPlayers } from "./tracker";

class DisplayInformation {}

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

				print(windowInfo.size.x * 2);

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

			print(dump(windowInfo.size));
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
