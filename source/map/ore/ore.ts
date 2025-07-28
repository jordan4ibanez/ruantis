import { serverTickRate } from "../../logic/tick";
import { Drawtype, Nodeboxtype, TextureAlpha } from "../../utility/enums";
import { Vec3 } from "../../utility/vector";
import { registerBlock, setBlock } from "../block_database";

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
	let mine = meta.get_int(ORE_MINE);

	if (mine == 0) {
		mine = 10;
		meta.set_int(ORE_MINE, mine);
	}

	mine -= 1;
	meta.set_int(ORE_MINE, mine);

	core.sound_play("tree_chop", { pos: pos });

	print(core.get_node(pos).name.substring(4));

	// Could do an axe calculation here.
	if (math.random(1, 1000) > 900) {
		print("got ore");
	}

	if (mine == 1) {
		setBlock(pos, "ore");
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
	on_dig: on_dig,
	node_dig_prediction: "",
	groups: { mine: 1 },
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
	on_dig: on_dig,
	node_dig_prediction: "",
	groups: { mine: 1 },
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
	on_dig: on_dig,
	node_dig_prediction: "",
	groups: { mine: 1 },
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
	on_dig: on_dig,
	node_dig_prediction: "",
	groups: { mine: 1 },
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadOre(): void {}
