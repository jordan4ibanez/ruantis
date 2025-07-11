import { afterPlayerJoins, whenPlayerJoins } from "../logic/player";
import { Entity, registerEntity, spawnEntity } from "../utility/entity";
import { EntityVisual } from "../utility/enums";
import { Vec3 } from "../utility/vector";

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
	on_step(delta: number, moveResult: MoveResult | null): void {
		print("hi");

		core.add_particle({
			pos: this.object.get_pos(),
			velocity: new Vec3(0, 1, 0),
			acceleration: new Vec3(0, 0, 0),
			expirationtime: 0,
			size: 1,
			texture: "smile.png",
		});
	}
}
registerEntity(Cuboid);

export function deployPlayerEntity(): void {
	whenPlayerJoins((player) => {
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
	});

	afterPlayerJoins((player) => {
		// core.after(0, () => {
		// spawnEntity(new Vec3(0, 0, 2), Cuboid, (obj) => {
		// 	player.set_attach(
		// 		obj,
		// 		"",
		// 		new Vec3(0, 20, 0),
		// 		new Vec3(0, 20, 0),
		// 		true
		// 	);

		// 	print("wat");

		// 	// print(core.load_area(new Vec3(0, 0, 2), new Vec3(0, 0, 2)));
		// });

		// });
		// core.add_entity(new Vec3(0, 0, 2), "undefined");
	});
}
