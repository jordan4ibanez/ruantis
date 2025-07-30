import { whenClientJoins } from "../logic/client_join_leave";
import { devMode } from "../map/development_mode";
import { HudElementType } from "../utility/enums";
import { Vec2 } from "../utility/vector";

const PRIMARY = "primary";
const SECONDARY = "secondary";

function getInv(client: ObjectRef): InvRef {
	const inv = client.get_inventory();
	if (inv == null) {
		throw new Error(`${client.get_player_name()} has no inventory.`);
	}
	return inv;
}

whenClientJoins((client) => {
	const inv = getInv(client);

	// 35 inventory slots.
	for (const i of $range(0, 6)) {
		inv.set_size(`inv_${i}`, 5);
	}

	// Wield slots.
	inv.set_size(PRIMARY, 1);
	inv.set_size(SECONDARY, 1);

	if (devMode) {
		inv.set_size("main", 32);
		client.hud_set_hotbar_itemcount(32);
	} else {
		inv.set_size("main", 1);
		client.hud_set_hotbar_itemcount(1);

		for (const i of $range(0, 6)) {
			const up = (i - 7) * 55 - 2;

			client.hud_add({
				type: HudElementType.inventory,
				text: `inv_${i}`,
				number: 32,
				item: 0,
				// Where it is on screen.
				position: new Vec2(0, 1),
				offset: new Vec2(2, up),
			});
		}
	}
});

// Put this into a module so you can autocomplete as [Inve...]
export abstract class Inventory {
	public static getPrimaryItem(client: ObjectRef): ItemStackObject {
		return getInv(client).get_stack(PRIMARY, 1);
	}

	public static getSecondaryItem(client: ObjectRef): ItemStackObject {
		return getInv(client).get_stack(SECONDARY, 1);
	}

	public static roomForItem(
		client: ObjectRef,
		item: ItemStackObject | string
	): boolean {
		const inv = getInv(client);

		for (const i of $range(0, 6)) {
			if (inv.room_for_item(`inv_${i}`, item)) {
				return true;
			}
		}
		return false;
	}
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function deployInventoryHandling(): void {}
