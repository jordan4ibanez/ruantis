import { afterClientJoins } from "../logic/client_join_leave";
import { Entity, registerEntity, spawnEntity } from "../utility/entity";
import { EntityVisual } from "../utility/enums";
import { Vec3 } from "../utility/vector";

/**
 * Animations:
 *
 * 0-1 idle
 * 1-2 walk
 * 3-4 run
 */

class DebugPlayerModel extends Entity {
	initial_properties: ObjectProperties = {
		visual: EntityVisual.mesh,
		mesh: "player.gltf",
		textures: ["player.png"],
		static_save: false,
	};
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
