import { registerItem } from "./utility";

registerItem({
	name: "logs",
	image: "logs.png",
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadRegularItems(): void {}
