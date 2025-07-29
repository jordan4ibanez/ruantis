import { ShallowVector3 } from "../../minetest-api";

const FIXED_SEED = 18211451931165;

core.register_on_generated((minp: ShallowVector3, maxp: ShallowVector3) => {});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadStaticGeneration(): void {}
