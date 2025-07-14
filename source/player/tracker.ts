import { LogLevel } from "../utility/enums";

const clientList: ObjectRef[] = [];
const clientMap = new Map<string, ObjectRef>();
const nameList: string[] = [];

core.register_on_joinplayer((player: ObjectRef) => {
	clientList.push(player);
	clientMap.set(player.get_player_name(), player);
	nameList.push(player.get_player_name());
});

core.register_on_leaveplayer((player: ObjectRef) => {
	clientMap.delete(player.get_player_name());
	{
		let found = false;
		let index = 0;
		for (const p of clientList) {
			if (p == player) {
				found = true;
				break;
			}
			index++;
		}
		// If this is ever hit, I accidentally found a bug in the engine.
		if (!found) {
			core.log(
				LogLevel.error,
				`Player ${player.get_player_name()} is a ghost player now. Please report this issue. [1]`
			);
		} else {
			delete clientList[index];
		}
	}
	{
		const name = player.get_player_name();

		let found = false;
		let index = 0;
		for (const n of nameList) {
			if (n == name) {
				found = true;
				break;
			}
			index++;
		}
		if (!found) {
			core.log(
				LogLevel.error,
				`Player ${name} is a ghost player for now. Please report this issue. [2]`
			);
			return;
		} else {
			delete nameList[index];
		}
	}
});

/**
 * Gets all players currently online.
 * @returns All players currently online.
 */
export function getAllClients(): readonly ObjectRef[] {
	return clientList;
}

/**
 * Try to get a player by name.
 * @param name The player's name.
 * @returns The player. Or null.
 */
export function getClient(name: string): ObjectRef | null {
	return clientMap.get(name) || null;
}

/**
 * Get all player's names which are currently online.
 * @returns The list of all currently online player names.
 */
export function getAllClientNames(): readonly string[] {
	return nameList;
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function deployClientTracker(): void {}
