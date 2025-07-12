import { whenPlayerJoins, whenPlayerLeaves } from "../logic/player_join_leave";
import { registerClientTickFunction } from "../logic/tick";

class Controls {
	/** Held down. */
	leftDown: boolean = false;
	/** Held down. */
	rightDown: boolean = false;

	/** Single press. */
	leftPressed: boolean = false;
	/** Single press. */
	rightPressed: boolean = false;
}

const controlMap = new Map<string, Controls>();

whenPlayerJoins((player) => {
	controlMap.set(player.get_player_name(), new Controls());
});

whenPlayerLeaves((player) => {
	controlMap.delete(player.get_player_name());
});

registerClientTickFunction((player) => {
	const name = player.get_player_name();
	const rawControl = player.get_player_control();

	const data = controlMap.get(name);

	if (data == null) {
		throw new Error(`Player ${name} was never given a controls object.`);
	}

	data.leftDown = rawControl.left;
	data.rightDown = rawControl.right;
});
