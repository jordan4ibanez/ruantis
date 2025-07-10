type pFunc = (player: ObjectRef) => void;

const joinFuncs: pFunc[] = [];
const leaveFuncs: pFunc[] = [];

/**
 * Add a function to run when the player joins the server.
 * @param func Function to run when a player joins the server.
 */
export function whenPlayerJoins(func: pFunc): void {
	joinFuncs.push(func);
}

/**
 * Add a function to run when the player leaves the server.
 * @param func Function to run when a player leaves the server.
 */
export function whenPlayerLeaves(func: pFunc): void {
	leaveFuncs.push(func);
}

// And then the implementation.

core.register_on_joinplayer((p: ObjectRef) => {
	for (const f of joinFuncs) {
		f(p);
	}
});

core.register_on_leaveplayer((p: ObjectRef) => {
	for (const f of leaveFuncs) {
		f(p);
	}
});
