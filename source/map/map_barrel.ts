import { loadBlockDatabase } from "./block_database";
import { ____automation_internal_only_deploy_map_data } from "./chunk_database/auto_chunk_data";
import { loadDecorations } from "./decorations/decorations";
import { loadDevelopmentMode } from "./development_mode";
import { loadOutside } from "./floor/outside";
import { loadStairs } from "./floor/stairs";
import { loadOre } from "./ore/ore";
import { loadTrees } from "./plants/tree";

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadNodes(): void {}

loadBlockDatabase();

loadDevelopmentMode();

loadOutside();

loadStairs();

loadDecorations();

loadTrees();

loadOre();

____automation_internal_only_deploy_map_data();
