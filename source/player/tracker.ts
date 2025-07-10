import { LogLevel } from "../utility/enums";

const playerList: ObjectRef[] = [];

export function deployTracker(): void {
	core.register_on_joinplayer((player: ObjectRef) => {
		playerList.push(player);
	});

	core.register_on_leaveplayer((player: ObjectRef) => {
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

export function getPlayers(): readonly ObjectRef[] {
	return playerList;
}
