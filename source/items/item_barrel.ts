import { loadCustomItemEntity } from "./item_handling";
import { loadRegularItems } from "./regular_items";

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadItems(): void {}

loadRegularItems();

loadCustomItemEntity();
