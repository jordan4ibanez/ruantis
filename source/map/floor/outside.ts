import { registerBlock, setBlock } from "../block_database";

registerBlock({
	name: "i_grass",
	on_construct: (pos) => {
		const i = math.random(1, 3);
		setBlock(pos, `grass_${i}`);
	},
});

for (const i of $range(1, 3)) {
	registerBlock({ name: `grass_${i}` });
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadOutside(): void {}
