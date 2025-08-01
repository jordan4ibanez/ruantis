import { afterClientJoins } from "../logic/client_join_leave";
import { registerClientTickFunction } from "../logic/tick";
import { Entity, registerEntity, spawnEntity } from "../utility/entity";
import { EntityVisual } from "../utility/enums";
import { Vec2, Vec3 } from "../utility/vector";
import { getControls } from "./controls";

/**
 * Animations:
 *
 * 0-1 idle
 * 2-3 walk
 * 4-5 run
 */

export class PlayerAnimation {
	private readonly __v = new Vec2();
	private constructor(min: number, max: number) {
		this.__v.x = min;
		this.__v.y = max;
	}

	public static readonly idle = new PlayerAnimation(0, 1);
	public static readonly walk = new PlayerAnimation(2, 3);
	public static readonly run = new PlayerAnimation(4, 5);

	value(): Vec2 {
		return this.__v;
	}
}

class DebugPlayerModel extends Entity {
	// Set to walk so it immediately changes.
	private currentAnim: PlayerAnimation = PlayerAnimation.walk;

	initial_properties: ObjectProperties = {
		visual: EntityVisual.mesh,
		mesh: "player.gltf",
		textures: ["player.png"],
		static_save: false,
	};

	public setAnimation(animation: PlayerAnimation): void {
		if (this.currentAnim.value().equals(animation.value())) {
			return;
		}
		this.object.set_animation(animation.value(), 1, 1, true);
		this.currentAnim = animation;
	}
}
registerEntity(DebugPlayerModel);

afterClientJoins((client) => {
	const ent = spawnEntity(client.get_pos(), DebugPlayerModel);
	if (ent == null) {
		throw new Error("wat");
	}
	ent.set_attach(client, "", new Vec3(), new Vec3(), true);

	client.set_properties({ textures: ["blank.png"] });
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function deployPlayerAnimation(): void {}
