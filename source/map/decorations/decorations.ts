import { ShallowVector3 } from "../../../minetest-api";
import { serverTickRate } from "../../logic/tick";
import { Drawtype, Nodeboxtype, ParamType2 } from "../../utility/enums";
import { registerBlock, setBlock } from "../block_database";
import { devMode } from "../development_mode";

registerBlock({
	name: "fountain",
	drawtype: Drawtype.mesh,
	mesh: "fountain.gltf",
	tiles: ["fountain.png"],
	collision_box: {
		type: Nodeboxtype.fixed,
		fixed: [-1.5, -0.5, -1.5, 1.5, 0.5, 1.5],
	},
});

registerBlock({
	name: "log_sideways",
	drawtype: Drawtype.mesh,
	paramtype2: ParamType2["4dir"],
	mesh: "log_sideways.gltf",
	tiles: ["log_sideways.png"],
});
(() => {
	const benchBox = {
		type: Nodeboxtype.fixed,
		fixed: [-0.75, -0.5, -0.4, 0.75, 0.2, 0.4],
	};

	registerBlock({
		name: "bench",
		drawtype: Drawtype.mesh,
		paramtype2: ParamType2["4dir"],
		pointable: true,
		collision_box: benchBox,
		selection_box: benchBox,
		mesh: "bench.gltf",
		tiles: ["bench.png"],
	});
})();

for (const i of $range(1, 3)) {
	const fireBox = {
		type: Nodeboxtype.fixed,
		fixed: [-0.4, -0.5, -0.4, 0.4, 0.2, 0.4],
	};

	registerBlock({
		name: `camp_fire_${i}`,
		drawtype: Drawtype.mesh,
		pointable: true,
		collision_box: fireBox,
		selection_box: fireBox,
		mesh: `camp_fire_${i}.gltf`,
		tiles: ["camp_fire.png"],
	});

	// Don't want this constantly changing in dev mode!
	if (devMode) {
		continue;
	}

	core.register_abm({
		label: `:camp_fire_${i}`,
		interval: serverTickRate,
		nodenames: [`camp_fire_${i}`],
		chance: 1,
		action: function (
			pos: ShallowVector3,
			node: NodeTable,
			delta: number
		): void {
			let t = i + 1;
			if (t > 3) {
				t = 1;
			}
			core.after(0, () => {
				core.swap_node(pos, { name: `camp_fire_${t}` });
			});
		},
	});
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadDecorations(): void {}
