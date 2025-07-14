import { afterClientJoins, whenClientJoins } from "../logic/client_join_leave";
import { registerClientTickFunction } from "../logic/tick";
import { Entity, registerEntity, spawnEntity } from "../utility/entity";
import { EntityVisual } from "../utility/enums";
import { Vec3 } from "../utility/vector";

// core.register_on_player_receive_fields((player, formname, fields) => {
// 	print("hmm", "[", formname, "]", dump(fields));
// });

// todo: maybe keep track of this? Could make movable windows in a horrific manor.

registerClientTickFunction((player, delta) => {
	// player.set_look_horizontal(0);
	// player.set_look_vertical(0);
	// print(player.get_player_control().movement_x);
});

// registerWindowSizeChangeFunction((player, windowInfo) => {
// const name = player.get_player_name();
// //? I just kept testing things until something worked.
// const magicNormalizedMultiplier = windowInfo.guiScale * 0.55;
// const magicNumber = 96 * magicNormalizedMultiplier;
// const width = windowInfo.size.x / magicNumber;
// const height = windowInfo.size.y / magicNumber;
// // Attempt to put a button in the middle of the screen.
// const centerXPos = windowInfo.size.x / 2 / magicNumber;
// const centerYPos = windowInfo.size.y / 2 / magicNumber;
// //attempt to put a 1 pixel button on the screen
// const pixel1 = math.floor((1 / magicNumber + 0.001) * 100) / 100;
// let hackjob: string[] = [];
// hackjob.push(
// 	"formspec_version[9]" +
// 		`size[${width},${height},true]` +
// 		"position[0.5,0.5]" +
// 		"anchor[0.5,0.5]" +
// 		"no_prepend[]" +
// 		"real_coordinates[true]" +
// 		"padding[0,0]" +
// 		"button[0,0;1,1;test;]" +
// 		"box[0,0;1,1;test;]"
// 	// "allow_close[false]" +
// );
// // print("started");
// // for (const x of $range(-100, 100)) {
// // 	for (const y of $range(-100, 100)) {
// // 		hackjob.push(
// // 			`button[${
// // 				math.floor((centerXPos + x * pixel1) * 100) / 100
// // 			},${
// // 				math.floor((centerYPos + y * pixel1) * 100) / 100
// // 			};${pixel1},${pixel1};${x},${y};]`
// // 		);
// // 	}
// // }
// // print("ended");
// const output = hackjob.join("");
// // print(output);
// core.show_formspec(name, "current_player", output);
// });

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function deployInventoryHandling(): void {}
