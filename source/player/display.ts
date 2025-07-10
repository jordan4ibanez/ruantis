import { whenPlayerJoins } from "../logic/player";
import { registerTargetedTemporaryServerTickFunction } from "../logic/tick";

class DisplayInformation {}

export function deployDisplayHandling(): void {
	whenPlayerJoins((player) => {
		registerTargetedTemporaryServerTickFunction(
			player.get_player_name(),
			(player) => {
				const name = player.get_player_name();
				const windowInfo = core.get_player_window_information(name);

				if (windowInfo == null) {
					print("not yet for", name);
					return false;
				}

				print("got name");

				return true;
			}
		);
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
