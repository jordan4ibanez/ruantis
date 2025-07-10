export function setUpCamera(player: ObjectRef): void {
	assert(player.is_player());

	print("hi");

	player.hud_set_flags({
		hotbar: false,
		healthbar: false,
		wielditem: false,
		breathbar: false,
		minimap: true,
	});
}
