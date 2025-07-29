import { loadBlockDatabase } from "./block_database";
import { loadChunkBarrel } from "./chunk_database/chunk_barrel";
import { loadDecorations } from "./decorations/decorations";
import { loadDevelopmentMode } from "./development_mode";
import { loadOutside } from "./floor/outside";
import { loadStairs } from "./floor/stairs";
import { loadOre } from "./ore/ore";
import { loadTrees } from "./plants/tree";
import { loadStaticGeneration } from "./static_generation";

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

loadChunkBarrel();

loadStaticGeneration();
