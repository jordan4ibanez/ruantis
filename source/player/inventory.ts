import { registerWindowSizeChangeFunction } from "./window";

core.register_on_player_receive_fields((player, formname) => {
	print("hmm");
});

// todo: maybe keep track of this? Could make movable windows in a horrific manor.

export function deployInventoryHandling(): void {
	registerWindowSizeChangeFunction((player, windowInfo) => {
		const name = player.get_player_name();

		print(windowInfo.size.toString());

		const magicNumber = (96 * 2) / 1.5;

		let hackjob =
			"formspec_version[9]" +
			`size[${windowInfo.size.x / magicNumber},${
				windowInfo.size.y / magicNumber
			},true]` +
			"position[0,0]" +
			"anchor[0,0]" +
			"padding[0,0]" +
			"real_coordinates[true]" +
			"no_prepend[]" +
			"allow_close[false]" +
			"container[1,1]" +
			"button[0,0;1,1;test;]" +
			"container_end[]";

		// ;

		player.set_inventory_formspec(hackjob);
	});
}
