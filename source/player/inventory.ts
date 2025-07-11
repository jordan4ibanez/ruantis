import { fma, normalize } from "../utility/math";
import { registerWindowSizeChangeFunction } from "./window";

core.register_on_player_receive_fields((player, formname, fields) => {
	print("hmm", "[", formname, "]", dump(fields));
});

// todo: maybe keep track of this? Could make movable windows in a horrific manor.

export function deployInventoryHandling(): void {
	registerWindowSizeChangeFunction((player, windowInfo) => {
		const name = player.get_player_name();

		//? I just kept testing things until something worked.
		const magicNormalizedMultiplier = windowInfo.guiScale * 0.55;
		const magicNumber = 96 * magicNormalizedMultiplier;

		const width = windowInfo.size.x / magicNumber;
		const height = windowInfo.size.y / magicNumber;

		// Attempt to put a button in the middle of the screen.

		const xPos = windowInfo.size.x / 2 / magicNumber;
		const yPos = windowInfo.size.y / 2 / magicNumber;

		//attempt to put a 1 pixel button on the screen

		let hackjob =
			"formspec_version[9]" +
			`size[${width},${height},true]` +
			"position[0.5,0.5]" +
			"anchor[0.5,0.5]" +
			"no_prepend[]" +
			"real_coordinates[true]" +
			"padding[0,0]" +
			// "allow_close[false]" +
			"button[0,0;1,1;test;]" +
			`button[${xPos},${yPos};1,1;test;]`;

		core.show_formspec(name, "current_player", hackjob);
	});
}
