import { ShallowVector3 } from "../../minetest-api";
import { Vec2, Vec3 } from "../utility/vector";
import { setBlock } from "./block_database";

const FIXED_SEED = 18211451931165;

const FIXED_SPREAD = 100;

core.set_mapgen_setting("seed", FIXED_SEED, true);

core.register_on_generated(
	(minp: ShallowVector3, maxp: ShallowVector3, seed) => {
		const noise: NoiseObject = core.get_value_noise({
			seed: FIXED_SEED,

			spread: new Vec3(FIXED_SPREAD, FIXED_SPREAD, FIXED_SPREAD),
		});

		const worker = new Vec2();

		const outputQueue: Vec3[] = [];

		for (const x of $range(minp.x, maxp.x)) {
			for (const z of $range(minp.z, maxp.z)) {
				worker.x = x;
				worker.y = z;

				const rawNoise = noise.get_2d(worker);

				const fixedNoise = math.floor(rawNoise * 2);

				const output = new Vec3();

				output.x = x;
				output.y = fixedNoise;
				output.z = z;

				outputQueue.push(output);
			}
		}

		core.bulk_set_node(outputQueue, { name: "i_grass" });
	}
);

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadStaticGeneration(): void {}
