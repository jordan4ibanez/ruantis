import { whenPlayerJoins } from "../logic/player";
import { registerClientTickFunction } from "../logic/tick";
import { Vec2 } from "../utility/vector";

const displayResolutions = new Map<string, Vec2>();

core.register_on_player_receive_fields((player, formname) => {
	// todo: force the inventory back open.
});

export function deployInventoryHandling(): void {
	whenPlayerJoins((player: ObjectRef) => {
		deployInventory(player);
	});
}

function deployInventory(player: ObjectRef): void {
	assert(player.is_player());

	player.set_inventory_formspec("");

	const name = player.get_player_name();

	// print(name);

	// core.register_globalstep(() => {

	// 	print(dump(windowInfo));
	// });
}
