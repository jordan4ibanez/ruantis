import { loadBlockDatabase } from "./block_database";
import { loadOutside } from "./floor/outside";
import { loadStairs } from "./floor/stairs";

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadNodes(): void {}

loadBlockDatabase();

loadOutside();

loadStairs();
