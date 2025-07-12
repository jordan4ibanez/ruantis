import { afterPlayerJoins, whenPlayerJoins } from "../logic/player_join_leave";
import {
	registerClientTickFunction,
	registerServerTickFunction,
} from "../logic/tick";
import { getDatabase } from "../utility/database";
import { Entity, registerEntity, spawnEntity } from "../utility/entity";
import { EntityVisual } from "../utility/enums";
import { Vec3 } from "../utility/vector";
import { getAllPlayerNames, getPlayer } from "./tracker";

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
		// print(this.object.get_pos());

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
	private name: string;
	private ltPlayer: ObjectRef;
	private position: Vec3 = new Vec3();
	private cameraPosition: Vec3 = new Vec3();
	private visualEntity: ObjectRef | null = null;

	constructor(ltPlayer: ObjectRef) {
		this.name = ltPlayer.get_player_name();
		this.ltPlayer = ltPlayer;
		this.visualEntity = spawnEntity(this.position, Cuboid);
	}

	setPosition(pos: Vec3): void {
		print(pos);
		this.visualEntity?.add_pos(
			new Vec3().copyFrom(pos).subtractImmutable(this.position)
		);
		this.position.copyFrom(pos);
	}

	getPosition(): Vec3 {
		return this.position.clone();
	}

	moveCamera(): void {
		if (this.ltPlayer == null) {
			throw new Error(
				`Object for player ${this.name} was not cleaned up.`
			);
		}

		// This is a random hardcode for now.

		this.cameraPosition.x = this.position.x + 3;
		this.cameraPosition.y = this.position.y + 6;
		this.cameraPosition.z = this.position.z + 3;

		this.ltPlayer.add_pos(
			this.cameraPosition.subtractImmutable(this.ltPlayer.get_pos())
		);

		// player.move_to(this.cameraPosition);
	}

	getEntity(): ObjectRef {
		if (this.visualEntity == null) {
			const newVisual = spawnEntity(this.position, Cuboid);

			if (newVisual == null || !newVisual.is_valid()) {
				throw new Error(`Failed to add visual entity to ${this.name}`);
			}
			this.visualEntity = newVisual;
		}
		return this.visualEntity;
	}

	getLuaEntity(): Cuboid {
		const luaEntity = this.getEntity().get_luaentity();
		if (luaEntity == null) {
			throw new Error(`LuaEntity for player ${this.name} is gone.`);
		}
		return luaEntity as Cuboid;
	}
}

const players = new Map<string, Player>();

afterPlayerJoins((ltPlayer) => {
	// todo: get from database.
	// getDatabase()

	const name = ltPlayer.get_player_name();
	const pData = new Player(ltPlayer);

	pData.setPosition(new Vec3(0, 1, 0));

	players.set(name, pData);

	// Then the camera would be treated like a yaw and pitch, along with zoom.
	// const cameraYaw = 0;
	// const cameraPitch = -math.pi / 2;
	// const zoom = 1;

	for (const x of $range(-10, 10)) {
		for (const z of $range(-10, 10)) {
			core.set_node(new Vec3(x, 0, z), { name: "debug" });
		}
	}
});

//! Debugging.
registerClientTickFunction((player) => {
	const name = player.get_player_name();
	const pData = players.get(name);
	if (pData == null) {
		return;
	}

	// pData.setPosition(pData.getPosition().addImmutable(new Vec3(0.05, 0, 0)));
});

registerClientTickFunction((player) => {
	const name = player.get_player_name();

	const pData = players.get(name);

	// Player might be one tick late.
	if (pData == null) {
		return;
	}

	pData.moveCamera();
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function deployPlayerEntity(): void {}
