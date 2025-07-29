import { ShallowVector3 } from "../../minetest-api";
import { Vec3 } from "../utility/vector";

const FIXED_SEED = 18211451931165;

core.register_on_generated((minp: ShallowVector3, maxp: ShallowVector3) => {
	const noise: NoiseObject = core.get_value_noise({
		seed: FIXED_SEED,
		spread: new Vec3(1, 1, 1),
	});

	print(dump(noise));
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadStaticGeneration(): void {}
