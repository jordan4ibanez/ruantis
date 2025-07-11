import { afterPlayerJoins, whenPlayerJoins } from "../logic/player";
import { Entity, registerEntity, spawnEntity } from "../utility/entity";
import { EntityVisual } from "../utility/enums";
import { Vec3 } from "../utility/vector";

//! In case it's not obvioius, this is a debugging entity.
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
		print(this.object.get_pos());

		const pos = new Vec3();
		pos.copyFrom(this.object.get_pos());
		pos.x += 0.5;
		pos.y -= 0.5;
		pos.z += 0.5;

		core.add_particle({
			pos: pos,
			velocity: new Vec3(0, 2, 0),
			acceleration: new Vec3(0, 0, 0),
			expirationtime: 5,
			size: 1,
			texture: "smile.png",
		});
	}
}
registerEntity(Cuboid);

class Player {
	name: string;
	position: Vec3 = new Vec3();

	private visualEntity: ObjectRef | null = null;

	constructor(name: string) {
		this.name = name;
	}

	setPosition(pos: Vec3): void {
		this.position.copyFrom(pos);
	}

	getEntity(): ObjectRef {
		if (this.visualEntity == null) {
			const newVisual = spawnEntity(this.position, Cuboid);

			if (newVisual == null) {
				throw new Error(`Failed to add visual entity to ${this.name}`);
			}
			this.visualEntity = newVisual;
		}
		return this.visualEntity;
	}
}

export function deployPlayerEntity(): void {
	afterPlayerJoins((player) => {
		// So this is the player entity.
		const playerEntity = spawnEntity(new Vec3(0, 1, 0), Cuboid);

		// Then the camera would be treated like a yaw and pitch, along with zoom.
		const cameraYaw = 0;
		const cameraPitch = -math.pi / 2;
		const zoom = 1;

		player.set_pos(new Vec3(3, 6, 3));

		for (const x of $range(-10, 10)) {
			for (const z of $range(-10, 10)) {
				core.set_node(new Vec3(x, 0, z), { name: "debug" });
			}
		}

		// core.add_entity(new Vec3(0, 0, 2), "undefined");
	});
}
