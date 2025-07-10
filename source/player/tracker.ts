import { LogLevel } from "../utility/enums";

const playerList: ObjectRef[] = [];
const playerMap = new Map<string, ObjectRef>();

export function deployTracker(): void {
	core.register_on_joinplayer((player: ObjectRef) => {
		playerList.push(player);
		playerMap.set(player.get_player_name(), player);
	});

	core.register_on_leaveplayer((player: ObjectRef) => {
		playerMap.delete(player.get_player_name());
		let found = false;
		let index = 0;
		for (const p of playerList) {
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
				`Player ${player.get_player_name()} is a ghost player now. Please report this issue.`
			);
			return;
		}

		delete playerList[index];
	});
}

/**
 * Gets all players currently online.
 * @returns All players currently online.
 */
export function getAllPlayers(): readonly ObjectRef[] {
	return playerList;
}

/**
 * Try to get a player by name.
 * @param name The player's name.
 * @returns The player. Or null.
 */
export function getPlayer(name: string): ObjectRef | null {
	return playerMap.get(name) || null;
}
