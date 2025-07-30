function handle_give_command(
	cmd: string,
	giver: string,
	receiver: string,
	stackstring: string
) {
	// core.log("action", giver .. " invoked " .. cmd
	// 		.. ', stackstring="' .. stackstring .. '"')
	// local itemstack = ItemStack(stackstring)
	// if itemstack:is_empty() then
	// 	return false, S("Cannot give an empty item.")
	// elseif (not itemstack:is_known()) or (itemstack:get_name() == "unknown") then
	// 	return false, S("Cannot give an unknown item.")
	// -- Forbid giving 'ignore' due to unwanted side effects
	// elseif itemstack:get_name() == "ignore" then
	// 	return false, S("Giving 'ignore' is not allowed.")
	// end
	// local receiverref = core.get_player_by_name(receiver)
	// if receiverref == nil then
	// 	return false, S("@1 is not a known player.", receiver)
	// end
	// local leftover = receiverref:get_inventory():add_item("main", itemstack)
	// local partiality
	// if leftover:is_empty() then
	// 	partiality = nil
	// elseif leftover:get_count() == itemstack:get_count() then
	// 	partiality = false
	// else
	// 	partiality = true
	// end
	// -- The actual item stack string may be different from what the "giver"
	// -- entered (e.g. big numbers are always interpreted as 2^16-1).
	// stackstring = itemstack:to_string()
	// local msg
	// if partiality == true then
	// 	msg = S("@1 partially added to inventory.", stackstring)
	// elseif partiality == false then
	// 	msg = S("@1 could not be added to inventory.", stackstring)
	// else
	// 	msg = S("@1 added to inventory.", stackstring)
	// end
	// if giver == receiver then
	// 	return true, msg
	// else
	// 	core.chat_send_player(receiver, msg)
	// 	local msg_other
	// 	if partiality == true then
	// 		msg_other = S("@1 partially added to inventory of @2.",
	// 				stackstring, receiver)
	// 	elseif partiality == false then
	// 		msg_other = S("@1 could not be added to inventory of @2.",
	// 				stackstring, receiver)
	// 	else
	// 		msg_other = S("@1 added to inventory of @2.",
	// 				stackstring, receiver)
	// 	end
	// 	return true, msg_other
	// end
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
export function deployGiveOverride(): void {}
