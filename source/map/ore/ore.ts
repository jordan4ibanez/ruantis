import { Drawtype, Nodeboxtype, TextureAlpha } from "../../utility/enums";
import { Vec3 } from "../../utility/vector";
import { registerBlock } from "../block_database";

registerBlock({
	name: "ore",
	drawtype: Drawtype.mesh,
	mesh: "ore.gltf",
	use_texture_alpha: TextureAlpha.clip,
	tiles: ["ore_base.png", "blank.png"],
	collision_box: {
		type: Nodeboxtype.fixed,
		fixed: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
	},
});

const ORE_MINE = "ore_mine";

function on_dig(pos: Vec3) {
	const meta = core.get_meta(pos);
	let mine = meta.get_int(TREE_MINE);

	if (mine == 0) {
		mine = 10;
		meta.set_int(TREE_MINE, mine);
	}

	mine -= 1;
	meta.set_int(TREE_MINE, mine);

	core.sound_play("tree_chop", { pos: pos });

	// Could do an axe calculation here.
	if (math.random(1, 1000) > 900) {
		print("got logs");
	}

	if (mine == 1) {
		setBlock(pos, "tree_stump");
		core.get_node_timer(pos).start(serverTickRate * math.random(3, 10));
	}
}

registerBlock({
	name: "ore_coal",
	drawtype: Drawtype.mesh,
	mesh: "ore.gltf",
	tiles: ["ore_base.png", "ore_coal.png"],
	collision_box: {
		type: Nodeboxtype.fixed,
		fixed: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
	},
	pointable: true,
});

registerBlock({
	name: "ore_copper",
	drawtype: Drawtype.mesh,
	mesh: "ore.gltf",
	tiles: ["ore_base.png", "ore_copper.png"],
	collision_box: {
		type: Nodeboxtype.fixed,
		fixed: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
	},
	pointable: true,
});

registerBlock({
	name: "ore_tin",
	drawtype: Drawtype.mesh,
	mesh: "ore.gltf",
	tiles: ["ore_base.png", "ore_tin.png"],
	collision_box: {
		type: Nodeboxtype.fixed,
		fixed: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
	},
	pointable: true,
});

registerBlock({
	name: "ore_iron",
	drawtype: Drawtype.mesh,
	mesh: "ore.gltf",
	tiles: ["ore_base.png", "ore_iron.png"],
	collision_box: {
		type: Nodeboxtype.fixed,
		fixed: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
	},
	pointable: true,
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadOre(): void {}
