import { ShallowVector3 } from "../../minetest-api";
import { Vec2, Vec3 } from "../utility/vector";

const FIXED_SEED = 18211451931165;

const FIXED_SPREAD = 100;
const MULTIPLIER = 2;

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

				const fixedNoise = math.floor(rawNoise * MULTIPLIER);

				const output = new Vec3();

				output.x = x;
				output.y = fixedNoise;
				output.z = z;

				outputQueue.push(output);
			}
		}
		core.bulk_set_node(outputQueue, { name: "i_grass" });

		while (outputQueue.length > 0) {
			outputQueue.pop();
		}

		// north +z
		const front = new Vec3();
		// south -z
		const back = new Vec3();
		// west -x
		const left = new Vec3();
		// east +x
		const right = new Vec3();

		for (const x of $range(minp.x, maxp.x)) {
			for (const z of $range(minp.z, maxp.z)) {
				worker.x = x;
				worker.y = z;

				front.x = x;
				front.y = z + 1;

				back.x = x;
				back.y = z - 1;

				left.x = x - 1;
				left.y = z;

				right.x = x + 1;
				right.y = z;

				const currentHeight = math.floor(
					noise.get_2d(worker) * MULTIPLIER
				);

				const frontHeight = math.floor(
					noise.get_2d(front) * MULTIPLIER
				);

				const backHeight = math.floor(noise.get_2d(back) * MULTIPLIER);

				const leftHeight = math.floor(noise.get_2d(left) * MULTIPLIER);

				const rightHeight = math.floor(
					noise.get_2d(right) * MULTIPLIER
				);
			}
		}
	}
);

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadStaticGeneration(): void {}
