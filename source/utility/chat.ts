export function sendFailureNotification(
	client: ObjectRef,
	message: string
): void {
	const name = client.get_player_name();
	core.sound_play("failure", { to_player: name });
	core.chat_send_player(name, message);
}
