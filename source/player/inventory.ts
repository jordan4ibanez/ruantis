import { whenPlayerJoins } from "../logic/player";
import { registerServerTickFunction } from "../logic/tick";
import { Vec2 } from "../utility/vector";
import { getPlayerWindowInfo } from "./display";
import { getAllPlayers } from "./tracker";

core.register_on_player_receive_fields((player, formname) => {
	// todo: force the inventory back open.
});

// todo: maybe keep track of this? Could make movable windows in a horrific manor.

export function deployInventoryHandling(): void {
	whenPlayerJoins((player: ObjectRef) => {
		deployInventory(player);
	});

	registerServerTickFunction(() => {
		for (const player of getAllPlayers()) {
			createNewInventoryHackjob(player);
		}
	});
}

function deployInventory(player: ObjectRef): void {
	assert(player.is_player());
	createNewInventoryHackjob(player);
}

function createNewInventoryHackjob(player: ObjectRef): void {

	print("hacking and jobbing")
	player.set_inventory_formspec("fart");

	const name = player.get_player_name();

	const windowInfo = getPlayerWindowInfo(name);

	// Cannot create an inventory if the window info does not exist.
	if (windowInfo == null) {
		return;
	}

	// No need to update.
	if (!windowInfo.changed) {
		return;
	}
}
