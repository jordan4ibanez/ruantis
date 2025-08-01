import { whenClientJoins, whenClientLeaves } from "../logic/client_join_leave";
import { registerClientTickFunction } from "../logic/tick";
import { getClient } from "./tracker";

/**
 * Client controls object.
 */
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
	/** Single press. */
	readonly mouseRightClick: boolean = false;

	readonly shifting: boolean = false;
}

class MasterController extends Controls {
	__polled: boolean = false;
	__timeRecord: number = 0;

	__shouldUpdate(): boolean {
		const curTime = core.get_us_time();
		if (this.__timeRecord == curTime) {
			return false;
		}
		this.__timeRecord = curTime;
		return true;
	}

	__update(rawControl: LTPlayerControlObject) {
		//? Keyboard.

		let leftWasPressed = this.leftHeld;
		let rightWasPressed = this.rightHeld;

		(this.leftHeld as boolean) = rawControl.left;
		(this.rightHeld as boolean) = rawControl.right;
		(this.upHeld as boolean) = rawControl.up;
		(this.downHeld as boolean) = rawControl.down;

		(this.leftPressed as boolean) = !leftWasPressed && this.leftHeld;
		(this.rightPressed as boolean) = !rightWasPressed && this.rightHeld;

		//? Mouse.

		let mouseLeftWasPressed = this.mouseLeftHeld;
		let mouseRightWasPressed = this.mouseRightHeld;

		(this.mouseLeftHeld as boolean) = rawControl.dig;
		(this.mouseRightHeld as boolean) = rawControl.place;

		(this.mouseLeftClick as boolean) =
			!mouseLeftWasPressed && this.mouseLeftHeld;
		(this.mouseRightClick as boolean) =
			!mouseRightWasPressed && this.mouseRightHeld;

		(this.shifting as boolean) = rawControl.sneak;
	}
}

const controlMap = new Map<string, MasterController>();

whenClientJoins((client) => {
	controlMap.set(client.get_player_name(), new MasterController());
});

whenClientLeaves((client) => {
	controlMap.delete(client.get_player_name());
});

//? No matter what, this should at least attempt to synchronize the customized controls.

function __controlUpdateLogic(data: MasterController, name: string): void {
	if (data.__shouldUpdate()) {
		const cli = getClient(name);
		if (cli == null) {
			throw new Error(`Client ${name} does not exist.`);
		}
		data.__update(cli.get_player_control());
	}
}

registerClientTickFunction((client) => {
	const name = client.get_player_name();
	const data = controlMap.get(name);
	if (data == null) {
		throw new Error(`Client ${name} was never given a controls object.`);
	}
	__controlUpdateLogic(data, name);
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

	__controlUpdateLogic(data, name);

	return data;
}
