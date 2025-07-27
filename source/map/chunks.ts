import { afterClientJoins } from "../logic/client_join_leave";
import { Drawtype } from "../utility/enums";
import { Vec3 } from "../utility/vector";

core.register_node(":chunk_template", {
	drawtype: Drawtype.mesh,
	mesh: "chunk_template.gltf",
	tiles: ["chunk_template.png"],
});

afterClientJoins(() => {
	core.set_node(new Vec3(0, 0, 0), { name: "chunk_template" });

	core.set_node(new Vec3(1, 0, 0), { name: "debug" });
	core.set_node(new Vec3(15, 0, 0), { name: "debug" });
	core.set_node(new Vec3(15, 0, 15), { name: "debug" });
	core.set_node(new Vec3(0, 0, 15), { name: "debug" });
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadChunks(): void {}
