import { getAllPlayers } from "../player/tracker";

export function deployTickTimer(): void {
	core.register_globalstep(tick);
}

/** If returns true the function stops running. */
type clientTickFunctionType = (player: ObjectRef, delta: number) => void;

/** If returns true the function stops running. */
type serverTickFunctionType = (delta: number) => boolean | void;

let functionID = 0;

const clientFunctions = new Map<number, clientTickFunctionType>();
const serverFunctions = new Map<number, serverTickFunctionType>();

export function registerClientTickFunction(func: clientTickFunctionType) {
	clientFunctions.set(functionID, func);
	functionID++;
}

export function registerServerTickFunction(func: serverTickFunctionType) {
	serverFunctions.set(functionID, func);
	functionID++;
}

let serverTimer = 0;

function tick(delta: number): void {
	// Client tick always runs.

	for (const [_, player] of ipairs(core.get_connected_players())) {
	}
	for (const [funcID, func] of clientFunctions) {
	}

	serverTimer += delta;
	if (serverTimer > 0.5) {
		// todo: server tick.
	}
}
