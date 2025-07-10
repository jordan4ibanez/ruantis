import { registerClientTickFunction } from "../logic/tick";
import { Vec2 } from "../utility/vector";

const displayResolutions = new Map<string, Vec2>();

export function deployInventory(player: ObjectRef): void {
	assert(player.is_player());

	player.set_inventory_formspec("");

	const name = player.get_player_name();

	registerClientTickFunction((player: ObjectRef, delta: number) => {
		const windowInfo = core.get_player_window_information(name);
		if (windowInfo == null) {
			print("going again");
			return;
		}

		print("done");

		return true;
	});

	// print(name);

	// core.register_globalstep(() => {

	// 	print(dump(windowInfo));
	// });
}
