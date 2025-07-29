import { ShallowVector3 } from "../../minetest-api";
import { Vec2, Vec3 } from "../utility/vector";
import { setBlock } from "./block_database";

const FIXED_SEED = 18211451931165;

const FIXED_SPREAD = 100;
const MULTIPLIER = 2;

core.set_mapgen_setting("seed", FIXED_SEED, true);

core.register_on_generated((minp: ShallowVector3, maxp: ShallowVector3) => {
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

	// front north +z
	const front = new Vec2();
	// rear south -z
	const back = new Vec2();
	// left west -x
	const left = new Vec2();
	// right east +x
	const right = new Vec2();

	const work3 = new Vec3();

	// front left front right etc.
	const fl = new Vec2();
	const fr = new Vec2();
	const rl = new Vec2();
	const rr = new Vec2();

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

			const currentHeight = math.floor(noise.get_2d(worker) * MULTIPLIER);

			work3.x = x;
			work3.y = currentHeight + 1;
			work3.z = z;

			const frontHeight = math.floor(noise.get_2d(front) * MULTIPLIER);
			const backHeight = math.floor(noise.get_2d(back) * MULTIPLIER);
			const leftHeight = math.floor(noise.get_2d(left) * MULTIPLIER);
			const rightHeight = math.floor(noise.get_2d(right) * MULTIPLIER);

			let adder = 0;

			// todo: then check for corner (will need different algorithm)

			let enc = 0;

			if (frontHeight > currentHeight) {
				adder++;
				enc += 1;
			}
			if (backHeight > currentHeight) {
				adder++;
				enc += 10;
			}
			if (leftHeight > currentHeight) {
				adder++;
				enc += 100;
			}
			if (rightHeight > currentHeight) {
				adder++;
				enc += 1000;
			}

			// Simplex check. (1 side)
			if (adder == 0) {
				// Inverse corner check.

				fl.x = x - 1;
				fl.y = z + 1;

				fr.x = x + 1;
				fr.y = z + 1;

				rl.x = x - 1;
				rl.y = z - 1;

				rr.x = x + 1;
				rr.y = z - 1;

				const hfl = math.floor(noise.get_2d(fl) * MULTIPLIER);
				const hfr = math.floor(noise.get_2d(fr) * MULTIPLIER);
				const hrl = math.floor(noise.get_2d(rl) * MULTIPLIER);
				const hrr = math.floor(noise.get_2d(rr) * MULTIPLIER);

				if (hfl > currentHeight) {
					// Front left corner.
					setBlock(work3, "i_grass_inverse_corner", 0);
				} else if (hfr > currentHeight) {
					// Front right corner.
					setBlock(work3, "i_grass_inverse_corner", 1);
				} else if (hrl > currentHeight) {
					// Rear left corner.
					setBlock(work3, "i_grass_inverse_corner", 3);
				} else if (hrr > currentHeight) {
					// Rear right corner.
					setBlock(work3, "i_grass_inverse_corner", 2);
				}
			} else if (adder == 1) {
				// Regular slope check.

				if (frontHeight > currentHeight) {
					setBlock(work3, "i_grass_slope", 0);
				} else if (backHeight > currentHeight) {
					setBlock(work3, "i_grass_slope", 2);
				} else if (leftHeight > currentHeight) {
					setBlock(work3, "i_grass_slope", 3);
				} else if (rightHeight > currentHeight) {
					setBlock(work3, "i_grass_slope", 1);
				}
			} else if (adder == 2) {
				// Corner check.
				if (enc == 101) {
					//? Front left
					setBlock(work3, "i_grass_corner", 0);
				} else if (enc == 1001) {
					//? Front right.
					setBlock(work3, "i_grass_corner", 1);
				} else if (enc == 110) {
					//? Back left.
					setBlock(work3, "i_grass_corner", 3);
				} else if (enc == 1010) {
					//? Back right.
					setBlock(work3, "i_grass_corner", 2);
				}
			} else if (adder == 4) {
				// There's a hole.
				print("found a hole");
				setBlock(work3, "i_grass", 1);
			}
		}
	}
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadStaticGeneration(): void {}
