type pFunc = (client: ObjectRef) => void;

const joinFuncs: pFunc[] = [];
const leaveFuncs: pFunc[] = [];

/**
 * Add a function to run when a client joins the server.
 * @param func Function to run when a client joins the server.
 */
export function whenClientJoins(func: pFunc): void {
	joinFuncs.push(func);
}

/**
 * Add a function to run when a client leaves the server.
 * @param func Function to run when a client leaves the server.
 */
export function whenClientLeaves(func: pFunc): void {
	leaveFuncs.push(func);
}

//? This is for when you need to do thing after the client is in the world.

const afterJoinFuncs: pFunc[] = [];

/**
 * Add a function to run immediately after a client joins the server.
 * @param func Function to run immediately after a client joins the server.
 */
export function afterClientJoins(func: pFunc): void {
	afterJoinFuncs.push(func);
}

// And then the implementation.

core.register_on_joinplayer((p: ObjectRef) => {
	for (const f of joinFuncs) {
		f(p);
	}

	for (const f of afterJoinFuncs) {
		core.after(
			0,
			(f: pFunc, p: ObjectRef) => {
				f(p);
			},
			f,
			p
		);
	}
});

core.register_on_leaveplayer((p: ObjectRef) => {
	for (const f of leaveFuncs) {
		f(p);
	}
});
