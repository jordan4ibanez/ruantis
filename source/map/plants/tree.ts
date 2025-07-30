import { serverTickRate } from "../../logic/tick";
import { Inventory } from "../../player/inventory";
import { Drawtype, Nodeboxtype } from "../../utility/enums";
import { registerBlock, setBlock } from "../block_database";

const treeCbox: NodeBox = {
	type: Nodeboxtype.fixed,
	fixed: [-0.5, -0.5, -0.5, 0.5, 3, 0.5],
};

const TREE_MINE = "tree_mine";

registerBlock({
	name: "tree",
	drawtype: Drawtype.mesh,
	mesh: "tree.gltf",
	tiles: ["tree.png"],
	pointable: true,
	collision_box: treeCbox,
	selection_box: treeCbox,
	node_dig_prediction: "",
	groups: { mine: 1 },
	on_dig: (pos, _, digger) => {
		if (digger == null) {
			return;
		}

		const axeLevel = Inventory.getWieldingGroupLevel(digger, "axe");

		if (axeLevel <= 0) {
			sendFailureNotification(digger, "You need an axe to chop a tree.");
			return;
		}

		const meta = core.get_meta(pos);
		let mine = meta.get_int(TREE_MINE);

		if (mine == 0) {
			mine = 10;
			meta.set_int(TREE_MINE, mine);
		}

		mine -= 1;
		meta.set_int(TREE_MINE, mine);

		const axeLevel = Inventory.getWieldingGroupLevel(digger, "axe");

		core.sound_play("tree_chop", { pos: pos });

		// todo: check for an axe!

		if (math.random(1, 1000) > 1) {
			Inventory.addItem(digger, "log");
			print("got logs");
		}

		if (mine == 1) {
			setBlock(pos, "tree_stump");
			core.get_node_timer(pos).start(serverTickRate * math.random(3, 10));
		}
	},
});

registerBlock({
	name: "tree_stump",
	drawtype: Drawtype.mesh,
	mesh: "tree_stump.gltf",
	tiles: ["tree_stump.png"],
	on_timer: (pos) => {
		setBlock(pos, "tree");
		const meta = core.get_meta(pos);
		meta.set_int(TREE_MINE, 10 + math.random(1, 5));
	},
});

/**
 * Tree-shake removal function. (but there's still trees in here!)
 *
 * Never use this!
 */
export function loadTrees(): void {}
