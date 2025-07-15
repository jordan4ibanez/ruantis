import { whenClientJoins, whenClientLeaves } from "../logic/client_join_leave";
import { registerClientTickFunction } from "../logic/tick";

export class Controls {
	//? Keyboard.

	/** Held down. */
	readonly leftHeld: boolean = false;
	/** Held down. */
	readonly rightHeld: boolean = false;

	/** Single press. */
	readonly leftPressed: boolean = false;
	/** Single press. */
	readonly rightPressed: boolean = false;

	/** Held down. */
	readonly upHeld: boolean = false;
	/** Held down. */
	readonly downHeld: boolean = false;

	//? Mouse.

	/** Held down. */
	readonly mouseLeftHeld: boolean = false;
	/** Held down. */
	readonly mouseRightHeld: boolean = false;

	/** Single press. */
	readonly mouseLeftClick: boolean = false;
	update(rawControl: LTPlayerControlObject) {
		let leftWasPressed = this.leftHeld;
		let rightWasPressed = this.rightHeld;

		(this.leftHeld as boolean) = rawControl.left;
		(this.rightHeld as boolean) = rawControl.right;
		(this.upHeld as boolean) = rawControl.up;
		(this.downHeld as boolean) = rawControl.down;

		(this.leftPressed as boolean) = !leftWasPressed && this.leftHeld;
		(this.rightPressed as boolean) = !rightWasPressed && this.rightHeld;
	}
}

const controlMap = new Map<string, Controls>();

whenClientJoins((client) => {
	controlMap.set(client.get_player_name(), new Controls());
});

whenClientLeaves((client) => {
	controlMap.delete(client.get_player_name());
});

registerClientTickFunction((client) => {
	const name = client.get_player_name();
	const data = controlMap.get(name);
	if (data == null) {
		throw new Error(`Client ${name} was never given a controls object.`);
	}
	data.update(client.get_player_control());
});

/**
 * Get client control inputs.
 * @param name Client name.
 * @returns Control object.
 */
export function getControls(name: string): Controls {
	const data = controlMap.get(name);
	if (data == null) {
		throw new Error(`Client ${name} has no controls object.`);
	}
	return data;
}
