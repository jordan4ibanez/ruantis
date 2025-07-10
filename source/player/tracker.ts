const playerList: ObjectRef[] = [];
const playerMap = new Map<string, ObjectRef>();

export function deployTracker(): void {
	core.register_on_joinplayer((player: ObjectRef) => {
		playerList.push(player);
		playerMap.set(player.get_player_name(), player);

		print(dump(playerList));
	});

	core.register_on_leaveplayer((player: ObjectRef) => {
		const name = player.get_player_name();
		playerMap.delete(name);

		let found = false;
		let index = 0;
		for (const p of playerList) {
			if (p == player) {
				found = true;
				break;
			}
			index++;
		}
		if (found) {
			delete playerList[index];
		}

		print(dump(playerList));
	});
}
