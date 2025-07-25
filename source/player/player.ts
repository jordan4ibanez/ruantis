import { afterClientJoins, whenClientJoins } from "../logic/client_join_leave";
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
	private readonly client: ObjectRef;

	private readonly currentPosition: Vec3 = new Vec3();
	private readonly targetPosition: Vec3 = new Vec3();
	private walkProgress: number = 0;

	private readonly camera: Camera = new Camera();
	private readonly ____visualObjectRef: ObjectRef;
	private readonly visualPosition: Vec3 = new Vec3();

	constructor(client: ObjectRef) {
		this.name = client.get_player_name();
		this.client = client;
		const vObjectRef = spawnEntity(this.visualPosition, PlayerVisualEntity);

		if (vObjectRef == null) {
			throw new Error(
				`Failed to spawn visual entity for player ${this.name}`
			);
		}

		this.____visualObjectRef = vObjectRef;
	}

	setPosition(pos: Vec3): void {
		this.currentPosition.copyFrom(pos);
		this.targetPosition.copyFrom(pos);
		this.walkProgress = 0;

		this.getObjectRef().add_pos(
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
			this.client,
			this.visualPosition,
			delta
		);
	}

	getObjectRef(): ObjectRef {
		if (!this.____visualObjectRef.is_valid()) {
			const newVisual = spawnEntity(
				this.visualPosition,
				PlayerVisualEntity
			);

			if (newVisual == null || !newVisual.is_valid()) {
				throw new Error(`Failed to add visual entity to ${this.name}`);
			}
			// Cast away the const because this is a facade.
			(this.____visualObjectRef as ObjectRef) = newVisual;
		}
		return this.____visualObjectRef;
	}

	getEntity(): PlayerVisualEntity {
		const entity =
			this.getObjectRef().get_luaentity() as PlayerVisualEntity | null;
		if (entity == null) {
			throw new Error(`LuaEntity for player ${this.name} is gone.`);
		}
		return entity;
	}
}

const players = new Map<string, Player>();

afterClientJoins((client) => {
	// todo: get from database.
	// getDatabase()

	//? The client becomes a player.

	const name = client.get_player_name();
	const pData = new Player(client);

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

	client.hud_add({
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

	pData.doCameraControls(getControls(name), delta);
});

/**
 * Get a player.
 * @param name The player's name.
 * @returns The player or null.
 */
export function getPlayer(name: string): Player | null {
	return players.get(name) || null;
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function deployPlayerEntity(): void {}
