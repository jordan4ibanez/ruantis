import { registerItem } from "./utility";

registerItem({
	name: "bronze_axe",
	image: "bronze_axe.png",
	groups: { axe: 1 },
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadTools(): void {}
