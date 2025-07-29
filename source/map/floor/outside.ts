import { afterClientJoins } from "../../logic/client_join_leave";
import { Drawtype } from "../../utility/enums";
import { Vec3 } from "../../utility/vector";
import { registerBlock, setBlock } from "../block_database";

registerBlock({
	name: "i_grass",
	drawtype: Drawtype.airlike,
	groups: { static: 1 },
	on_construct: (pos) => {
		const i = math.random(1, 3);
		setBlock(pos, `grass_${i}`);
	},
});

for (const i of $range(1, 3)) {
	registerBlock({
		name: `grass_${i}`,
		tiles: [`grass_${i}.png`],
		groups: { static: 1 },
	});
}

afterClientJoins((client) => {
	setBlock(new Vec3(0, 0, 0), "i_grass");
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadOutside(): void {}
