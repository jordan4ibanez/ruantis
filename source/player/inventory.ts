import { Vec2 } from "../utility/vector";

const displayResolutions = new Map<string, Vec2>();

export function deployInventory(player: ObjectRef): void {
	player.set_inventory_formspec("");
}
