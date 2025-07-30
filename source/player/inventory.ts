import { whenClientJoins } from "../logic/client_join_leave";
import { devMode } from "../map/development_mode";
import { HudElementType } from "../utility/enums";
import { Vec2 } from "../utility/vector";

const PRIMARY = "primary";
const SECONDARY = "secondary";

whenClientJoins((client) => {
	const inv = client.get_inventory();
	if (inv == null) {
		throw new Error("Engine glitch with inventory.");
	}
	inv.set_size("main", 32);

	// Wield slots.
	inv.set_size(PRIMARY, 1);
	inv.set_size(SECONDARY, 1);

	if (devMode) {
		client.hud_set_hotbar_itemcount(32);
	} else {
		client.hud_set_hotbar_itemcount(1);

		// Not a hot bar. It just shows you what you have in your inventory.
		client.hud_add({
			type: HudElementType.inventory,
			text: "main",
			number: 32,
			item: 0,
			// offset: new Vec2(0.5, 1),
			position: new Vec2(0.5, 1.0),
			alignment: new Vec2(0.0, -1.0),
		});
	}
});

export function getPrimaryItem(client: ObjectRef): ItemStackObject {
	const inv = client.get_inventory();
	if (inv == null) {
		throw new Error(`${client.get_player_name()} has no inventory.`);
	}
	return inv.get_stack(PRIMARY, 1);
}

export function getSecondaryItem(client: ObjectRef): ItemStackObject {
	const inv = client.get_inventory();
	if (inv == null) {
		throw new Error(`${client.get_player_name()} has no inventory.`);
	}
	return inv.get_stack(SECONDARY, 1);
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function deployInventoryHandling(): void {}
