import { getAllPlayers } from "../player/tracker";

export function deployTickTimer(): void {
	core.register_globalstep(tick);
}

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

type temporaryClientTickFunctionType = (
	player: ObjectRef,
	delta: number
) => boolean;
type temporaryServerTickFunctionType = (delta: number) => boolean;

let functionID = 0;

const temporaryClientFuncs = new Map<number, temporaryClientTickFunctionType>();
const temporaryServerFuncs = new Map<number, temporaryServerTickFunctionType>();

export function registerTemporaryClientTickFunction(
	func: temporaryClientTickFunctionType
): void {
	temporaryClientFuncs.set(functionID, func);
	functionID++;
}

export function registerTemporaryServerTickFunction(
	func: temporaryServerTickFunctionType
): void {
	temporaryServerFuncs.set(functionID, func);
	functionID++;
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
