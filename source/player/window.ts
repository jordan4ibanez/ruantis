import { ShallowVector2 } from "../../minetest-api";
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
	formSpecSize: Vec2 = new Vec2();
	firstRun: boolean = true;

	constructor(init: ShallowVector2, formSpecSize: ShallowVector2) {
		this.size.copyFrom(init);
		this.formSpecSize.copyFrom(formSpecSize);
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
	return new WindowInfo(data.size, data.max_formspec_size);
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

	registerServerTickFunction(() => {
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

			if (changed || sizeInfo.firstRun) {
				sizeInfo.firstRun = false;
				sizeInfo.size.copyFrom(__rawWindowInfo.size);
			}
		}
	});
}

/**
 * Get a player's window information. This changes twice per second.
 * @param name The player's name.
 * @returns Window resolution and max formspec size.
 */
export function getPlayerWindowInfo(name: string): WindowInfo | null {
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
