import { whenPlayerJoins, whenPlayerLeaves } from "../logic/player_join_leave";
import { registerClientTickFunction } from "../logic/tick";

class Controls {
	/** Held down. */
	readonly leftDown: boolean = false;
	/** Held down. */
	readonly rightDown: boolean = false;

	/** Single press. */
	readonly leftPressed: boolean = false;
	/** Single press. */
	readonly rightPressed: boolean = false;

	update(rawControl: LTPlayerControlObject) {
		let leftWasPressed = this.leftDown;
		let rightWasPressed = this.rightDown;
		(this.leftDown as boolean) = rawControl.left;
		(this.rightDown as boolean) = rawControl.right;
		(this.leftPressed as boolean) = !leftWasPressed && this.leftDown;
		(this.rightPressed as boolean) = !rightWasPressed && this.rightDown;
	}
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
	const data = controlMap.get(name);
	if (data == null) {
		throw new Error(`Player ${name} was never given a controls object.`);
	}
	data.update(player.get_player_control());
});

/**
 * Get player control inputs.
 * @param name Player name.
 * @returns Player Control object.
 */
export function getControls(name: string): Controls {
	const data = controlMap.get(name);
	if (data == null) {
		throw new Error(`Player ${name} has no controls object.`);
	}
	return data;
}
