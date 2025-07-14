import { whenPlayerLeaves } from "../logic/client_join_leave";
import { registerServerTickFunction } from "../logic/tick";
import { Vec2 } from "../utility/vector";
import { getAllClients } from "./tracker";

const prototype__winInfoGet = core.get_player_window_information;

/**
 * Holds window size in pixels and if the resolution changed.
 */
export class WindowInfo {
	size: Vec2 = new Vec2();
	guiScale: number = 0;
}

const windowSizes = new Map<string, WindowInfo>();

function createPlayerWindowData(player: ObjectRef): WindowInfo {
	const name = player.get_player_name();
	const newData = windowSizes.set(name, new WindowInfo()).get(name) || null;
	if (newData == null) {
		throw new Error("Failed to create player window data.");
	}
	return newData;
}

whenPlayerLeaves((player) => {
	windowSizes.delete(player.get_player_name());
});

registerServerTickFunction(() => {
	for (const player of getAllClients()) {
		const name = player.get_player_name();

		const sizeInfo =
			windowSizes.get(player.get_player_name()) ||
			createPlayerWindowData(player);

		const __rawWindowInfo = prototype__winInfoGet(name);

		// Player's window info has not been submitted by the client.
		// If this starts hitting null randomly there is probably an issue with the client.
		if (__rawWindowInfo == null) {
			continue;
		}

		const changed =
			!sizeInfo.size.equals(__rawWindowInfo.size) ||
			sizeInfo.guiScale != __rawWindowInfo.real_gui_scaling;

		if (changed) {
			sizeInfo.size.copyFrom(__rawWindowInfo.size);
			sizeInfo.guiScale = __rawWindowInfo.real_gui_scaling;

			for (const func of windowChangeFuncs) {
				func(player, sizeInfo);
			}
		}
	}
});

/**
 * Get a player's window information. This changes twice per second.
 * @param name The player's name.
 * @returns Window resolution and max formspec size.
 */
export function getClientWindowInfo(name: string): WindowInfo | null {
	const data = windowSizes.get(name);
	if (data == null) {
		return null;
	}
	return data;
}

type windowChangeFunction = (player: ObjectRef, windowInfo: WindowInfo) => void;

const windowChangeFuncs: windowChangeFunction[] = [];

/**
 * Register a function to run when a window changes size.
 * @param func The function to run.
 */
export function registerWindowSizeChangeFunction(
	func: windowChangeFunction
): void {
	windowChangeFuncs.push(func);
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function deployWindowHandling(): void {}
