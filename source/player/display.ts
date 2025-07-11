import { whenPlayerJoins, whenPlayerLeaves } from "../logic/player";
import {
	registerServerTickFunction,
	registerTargetedTemporaryClientTickFunction,
} from "../logic/tick";
import { LogLevel } from "../utility/enums";
import { Vec2 } from "../utility/vector";
import { getAllPlayers } from "./tracker";

const prototype__winInfoGet = core.get_player_window_information;

/**
 * Holds window size in pixels and if the resolution changed.
 */
export class WindowInfo {
	size: Vec2 = new Vec2();
	changed: boolean;

	constructor(init: Vec2) {
		this.size.x = init.x;
		this.size.y = init.y;
		this.changed = true;
	}
}

/**
 * Gets the window information for a player.
 */
function getWinInfo(name: string): WindowInfo | null {
	const data = prototype__winInfoGet(name);
	if (data == null) {
		return null;
	}
	return new WindowInfo(new Vec2(data.size.x, data.size.y));
}

const windowSizes = new Map<string, WindowInfo>();

export function deployDisplayHandling(): void {
	whenPlayerJoins((player) => {
		// Get this data into memory as fast as possible.
		registerTargetedTemporaryClientTickFunction(
			player.get_player_name(),
			(player) => {
				const name = player.get_player_name();

				const windowInfo = getWinInfo(name);

				if (windowInfo == null) {
					return false;
				}

				windowSizes.set(name, windowInfo);

				return true;
			}
		);
	});

	whenPlayerLeaves((player) => {
		windowSizes.delete(player.get_player_name());
	});

	// todo: convert this into a screen polling function.
	registerServerTickFunction((delta) => {
		for (const player of getAllPlayers()) {
			const name = player.get_player_name();

			const sizeInfo = windowSizes.get(player.get_player_name());

			// Client has to submit their display information before this can be run.
			if (sizeInfo == null) {
				continue;
			}

			const __rawWindowInfo = prototype__winInfoGet(name);

			// Player's window info has not been submitted by the client.
			// If this starts hitting null randomly there is probably an issue with the client.
			if (__rawWindowInfo == null) {
				core.log(
					LogLevel.warning,
					`Player ${name} submitted null window info.`
				);
				continue;
			}

			const changed = !sizeInfo.size.equals(__rawWindowInfo.size);

			if (changed) {
				sizeInfo.size.copyFrom(__rawWindowInfo.size);
			}

			sizeInfo.changed = changed;

			print(changed);
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
