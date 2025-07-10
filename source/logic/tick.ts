import { getAllPlayers } from "../player/tracker";

export function deployTickTimer(): void {
	core.register_globalstep(tick);
}

/** If returns true the function stops running. */
type clientTickFunctionType = (player: ObjectRef, delta: number) => void;

/** If returns true the function stops running. */
type serverTickFunctionType = (delta: number) => void;

const clientFunctions: clientTickFunctionType[] = [];
const serverFunctions: serverTickFunctionType[] = [];

/**
 * Run a function every client tick. (smoother)
 * @param func Function.
 */
export function registerClientTickFunction(func: clientTickFunctionType) {
	clientFunctions.push(func);
}

/**
 * Run a function every server tick. (lighter)
 * @param func Function.
 */
export function registerServerTickFunction(func: serverTickFunctionType) {
	serverFunctions.push(func);
}

let serverTimer = 0;

function tick(delta: number): void {
	// Client tick always runs.

	for (const player of getAllPlayers()) {
		for (const func of clientFunctions) {
			func(player, delta);
		}
	}

	serverTimer += delta;
	if (serverTimer > 0.5) {
		for (const func of serverFunctions) {
			func(delta);
		}
	}
}
