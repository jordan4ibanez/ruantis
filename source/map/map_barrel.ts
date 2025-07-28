import { loadBlockDatabase } from "./block_database";
import { loadDecorations } from "./decorations/decorations";
import { loadOutside } from "./floor/outside";
import { loadStairs } from "./floor/stairs";
import { loadTrees } from "./plants/tree";

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadNodes(): void {}

loadBlockDatabase();

loadOutside();

loadStairs();

loadDecorations();

loadTrees();
