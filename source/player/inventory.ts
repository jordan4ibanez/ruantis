import { registerWindowSizeChangeFunction } from "./window";

core.register_on_player_receive_fields((player, formname) => {
	// todo: force the inventory back open.
});

// todo: maybe keep track of this? Could make movable windows in a horrific manor.

export function deployInventoryHandling(): void {
	registerWindowSizeChangeFunction((player, windowInfo) => {
		const name = player.get_player_name();

		let hackjob = "formspec_version[9]";

		print(windowInfo.size.toString());

		player.set_inventory_formspec(hackjob);
	});
}
