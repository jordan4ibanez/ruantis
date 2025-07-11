import { afterPlayerJoins, whenPlayerJoins } from "../logic/player";
import { registerClientTickFunction } from "../logic/tick";
import { Entity, registerEntity, spawnEntity } from "../utility/entity";
import { EntityVisual } from "../utility/enums";
import { Vec3 } from "../utility/vector";

// core.register_on_player_receive_fields((player, formname, fields) => {
// 	print("hmm", "[", formname, "]", dump(fields));
// });

// todo: maybe keep track of this? Could make movable windows in a horrific manor.

class Cuboid extends Entity {
	initial_properties: ObjectProperties = {
		visual: EntityVisual.mesh,
		mesh: "cube.gltf",
		textures: ["smile.png"],
		static_save: false,
		glow: 10,
		visual_size: new Vec3(1, 1, 1),
	};

	on_activate(staticData: string, delta: number): void {
		print("hello!");
		print(this.object.get_pos());
	}
}
registerEntity(Cuboid);

export function deployInventoryHandling(): void {
	afterPlayerJoins((player) => {
		player.set_pos(new Vec3(0, 0, 0));

		player.set_physics_override({
			speed: 0,
			jump: 0,
			gravity: 0,
			speed_climb: 0,
			speed_crouch: 0,
			liquid_fluidity: 0,
			liquid_fluidity_smooth: 0,
			liquid_sink: 0,
			acceleration_default: 0,
			acceleration_air: 0,
			sneak: false,
		});

		// core.after(0, () => {
		spawnEntity(new Vec3(0, 0, 2), Cuboid, (obj) => {
			print(obj.is_valid(), "v");
			// print(core.load_area(new Vec3(0, 0, 2), new Vec3(0, 0, 2)));
		});
		// });
		// core.add_entity(new Vec3(0, 0, 2), "undefined");
	});

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
}
