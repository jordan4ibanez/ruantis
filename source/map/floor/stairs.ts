import { Drawtype, Nodeboxtype, ParamType2 } from "../../utility/enums";
import { registerBlock, setBlock } from "../block_database";

const stairBox: NodeBox = {
	type: Nodeboxtype.fixed,
	fixed: [
		// Bottom step.
		[0 - 0.5, 0 - 0.5, 0 - 0.5, 1 - 0.5, 0.25 - 0.5, 1 - 0.5],
		[0 - 0.5, 0.25 - 0.5, 0.25 - 0.5, 1 - 0.5, 0.5 - 0.5, 1 - 0.5],
		[0 - 0.5, 0.5 - 0.5, 0.5 - 0.5, 1 - 0.5, 0.75 - 0.5, 1 - 0.5],
		// Top step.
		[0 - 0.5, 0.75 - 0.5, 0.75 - 0.5, 1 - 0.5, 1 - 0.5, 1 - 0.5],
	],
};

registerBlock({
	name: "stone_stair",
	paramtype2: ParamType2["4dir"],
	drawtype: Drawtype.nodebox,
	pointable: true,
	node_box: stairBox,
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadStairs(): void {}
