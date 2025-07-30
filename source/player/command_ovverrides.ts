import { LogLevel } from "../utility/enums";
import { Inventory } from "./inventory";

function handle_give_command(
	cmd: string,
	giver: string,
	receiver: string,
	stackstring: string
) {
	core.log(
		LogLevel.action,
		giver + " invoked " + cmd + ', stackstring="' + stackstring + '"'
	);

	const itemstack = ItemStack(stackstring);

	if (itemstack.is_empty()) {
		return $multi(false, "Cannot give an empty item.");
	} else if (!itemstack.is_known() || itemstack.get_name() == "unknown") {
		return $multi(false, "Cannot give an unknown item.");
		// Forbid giving 'ignore' due to unwanted side effects
	} else if (itemstack.get_name() == "ignore") {
		return $multi(false, "Giving 'ignore' is not allowed.");
	}

	const receiverref = core.get_player_by_name(receiver);
	if (receiverref == null) {
		return;
	}

	Inventory.addItem(receiverref, itemstack);
}

core.override_chatcommand("giveme", {
	params: "",
	description: "",
	privs: { give: true, server: true },
	func: function (
		name: string,
		param: string
	): LuaMultiReturn<[boolean, string]> | void {
		const [itemstring] = string.match(param, "(.+)$");
		if (itemstring == null) {
			return $multi(false, "ItemString required.");
		}
		return handle_give_command("/giveme", name, name, itemstring);
	},
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function deployCommandOverrides(): void {}
