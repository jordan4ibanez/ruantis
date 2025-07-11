import { Vec3 } from "./vector";

// export function concat(...input: string[]): string {
// 	let accumulator = "";
// 	input.forEach((val: string) => {
// 		accumulator += val;
// 	});
// 	return accumulator;
// }

// export function generateSchematic(
// 	size: Vec3,
// 	keys: { [id: string]: string },
// 	forcePlace: { [id: string]: boolean },
// 	data: string,
// 	ySliceProb: number[]
// ): SchematicDefinition {
// 	let newSchematic = {
// 		size: size,
// 		data: [],
// 		yslice_prob: [],
// 	};

// 	const length = data.length;
// 	let countDown = length;
// 	for (let i = 1; i <= length; i++) {
// 		const databit = string.sub(data, countDown, countDown);
// 		table.insert(newSchematic.data, {
// 			name: keys[databit],
// 			force_place: forcePlace[databit] == true,
// 		});
// 		// print(forcePlace[databit] == true)
// 		countDown -= 1;
// 	}

// 	for (const databit of ySliceProb) {
// 		table.insert(newSchematic.yslice_prob, { prob: databit });
// 	}

// 	return newSchematic;
// }



// /**
//  * Register a node regardless of it's name.
//  * @param nodeName The node name.
//  * @param definition The node definition.
//  */
// export function registerNode(
// 	nodeName: string,
// 	definition: NodeDefinition
// ): void {
// 	core.register_node(":" + nodeName, definition);
// }

// /**
//  * Print a warning message instead of an error.
//  * @param message The warning message.
//  */
// export function warning(message: string): void {
// 	let rawText: string = debug.traceback(message);
// 	let textArray: string[] = rawText.split("\n");
// 	let accumulator: string[] = [];

// 	// ? For debugging.
// 	// print(rawText);

// 	// We want to remove the line that points to the utility module.
// 	for (const [key, value] of textArray.entries()) {
// 		if (key != 2 && key != 3) {
// 			accumulator.push(value);
// 		}
// 	}
// 	let result: string = "WARNING! " + table.concat(accumulator, "\n");
// 	// This only works on ANSI terminals, so sorry windows peoples.
// 	print(terminalColorize(result, 255, 165, 0));
// }

// const register_globalstep = core.register_globalstep;
// /**
//  * Run a function in a global step.
//  * @param func Function to be run on global step.
//  */
// export function onStep(func: (delta: number) => void) {
// 	register_globalstep(func);
// }

// const get_us_time = core.get_us_time;
// /**
//  * Get the US time. Somewhere in the US.
//  * @returns The time in the US.
//  */
// export function getTime(): number {
// 	return get_us_time();
// }

// const get_connected_players = core.get_connected_players;

// /**
//  * Get all players currently online.
//  * @returns Array of players currently online.
//  */
// export function getPlayers(): ObjectRef[] {
// 	return get_connected_players();
// }
