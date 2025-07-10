import { getAllPlayers } from "../player/tracker";
import { whenPlayerJoins, whenPlayerLeaves } from "./player";

export function deployTickTimer(): void {
	core.register_globalstep(tick);
}

//? Forever functions.

type clientTickFunctionType = (player: ObjectRef, delta: number) => void;
type serverTickFunctionType = (delta: number) => void;

const clientFunctions: clientTickFunctionType[] = [];
const serverFunctions: serverTickFunctionType[] = [];

/**
 * Run a function every client tick. (smoother)
 * @param func Function.
 */
export function registerClientTickFunction(func: clientTickFunctionType): void {
	clientFunctions.push(func);
}

/**
 * Run a function every server tick. (lighter)
 * @param func Function.
 */
export function registerServerTickFunction(func: serverTickFunctionType): void {
	serverFunctions.push(func);
}

//? Temporary non-targeted functions.

type temporaryClientTickFunctionType = (
	player: ObjectRef,
	delta: number
) => boolean;
type temporaryServerTickFunctionType = (delta: number) => boolean;

let functionID = 0;

const temporaryClientFuncs = new Map<number, temporaryClientTickFunctionType>();
const temporaryServerFuncs = new Map<number, temporaryServerTickFunctionType>();

/**
 * Register a temporary client tick function. (smoother)
 * @param func A function that returns true when it is completed.
 */
export function registerTemporaryClientTickFunction(
	func: temporaryClientTickFunctionType
): void {
	temporaryClientFuncs.set(functionID, func);
	functionID++;
}

/**
 * Register a temporary server tick function. (lighter)
 * @param func
 */
export function registerTemporaryServerTickFunction(
	func: temporaryServerTickFunctionType
): void {
	temporaryServerFuncs.set(functionID, func);
	functionID++;
}

let serverTimer = 0;

const tempClientDeletionQueue: number[] = [];
const tempServerDeletionQueue: number[] = [];

function tick(delta: number): void {
	// Client tick always runs.

	for (const player of getAllPlayers()) {
		for (const func of clientFunctions) {
			func(player, delta);
		}

		for (const [id, func] of temporaryClientFuncs) {
			if (func(player, delta)) {
				tempClientDeletionQueue.push(id);
			}
		}
	}

	while (tempClientDeletionQueue.length > 0) {
		const id = tempClientDeletionQueue.pop();
		if (id != null) {
			temporaryClientFuncs.delete(id);
		}
	}

	serverTimer += delta;

	if (serverTimer > 0.5) {
		for (const func of serverFunctions) {
			func(delta);
		}

		for (const [id, func] of temporaryServerFuncs) {
			if (func(delta)) {
				tempServerDeletionQueue.push(id);
			}
		}

		while (tempServerDeletionQueue.length > 0) {
			const id = tempServerDeletionQueue.pop();
			if (id != null) {
				temporaryServerFuncs.delete(id);
			}
		}
	}
}
