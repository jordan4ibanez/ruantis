import { afterPlayerJoins, whenPlayerJoins } from "../logic/player_join_leave";
import {
	registerClientTickFunction,
	registerServerTickFunction,
} from "../logic/tick";
import { getDatabase } from "../utility/database";
import { Entity, registerEntity, spawnEntity } from "../utility/entity";
import { EntityVisual, HudElementType } from "../utility/enums";
import { Vec2, Vec3 } from "../utility/vector";
import { Camera } from "./camera";
import { Controls, getControls } from "./controls";

class PlayerVisualEntity extends Entity {
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
registerEntity(PlayerVisualEntity);

class Player {
	private readonly name: string;
	private readonly ltPlayer: ObjectRef;

	private readonly camera: Camera = new Camera();
	private readonly visualEntity: ObjectRef | null = null;
	private readonly visualPosition: Vec3 = new Vec3();

	constructor(ltPlayer: ObjectRef) {
		this.name = ltPlayer.get_player_name();
		this.ltPlayer = ltPlayer;
		this.visualEntity = spawnEntity(
			this.visualPosition,
			PlayerVisualEntity
		);
	}

	setPosition(pos: Vec3): void {
		this.visualEntity?.add_pos(
			new Vec3().copyFrom(pos).subtractImmutable(this.visualPosition)
		);
		this.visualPosition.copyFrom(pos);
		this.camera.triggerRecalculation();
	}

	getPosition(): Vec3 {
		return this.visualPosition.clone();
	}

	doCameraControls(control: Controls, delta: number): void {
		this.camera.doControls(
			control,
			this.ltPlayer,
			this.visualPosition,
			delta
		);
	}

	getEntity(): ObjectRef {
		if (this.visualEntity == null) {
			const newVisual = spawnEntity(
				this.visualPosition,
				PlayerVisualEntity
			);

			if (newVisual == null || !newVisual.is_valid()) {
				throw new Error(`Failed to add visual entity to ${this.name}`);
			}
			this.visualEntity = newVisual;
		}
		return this.visualEntity;
	}

	getLuaEntity(): PlayerVisualEntity {
		const luaEntity = this.getEntity().get_luaentity();
		if (luaEntity == null) {
			throw new Error(`LuaEntity for player ${this.name} is gone.`);
		}
		return luaEntity as PlayerVisualEntity;
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

	// for (const x of $range(-10, 10)) {
	// 	for (const z of $range(-10, 10)) {
	// 		core.set_node(new Vec3(x, 0, z), { name: "debug" });
	// 	}
	// }

	ltPlayer.hud_add({
		type: HudElementType.text,
		text: "Caution: Garbage area. Use caution.",
		offset: new Vec2(264, 12),
		position: new Vec2(0, 0),
	});
});

registerClientTickFunction((player, delta) => {
	const name = player.get_player_name();
	const pData = players.get(name);

	// Player might be one tick late.
	if (pData == null) {
		return;
	}

	if (player.get_player_control().jump) {
		pData.setPosition(pData.getPosition().add(new Vec3(0.1, 0.0)));
	}

	pData.doCameraControls(getControls(name), delta);

	// pData.setPosition(pData.getPosition().addImmutable(new Vec3(0.05, 0, 0)));
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function deployPlayerEntity(): void {}
