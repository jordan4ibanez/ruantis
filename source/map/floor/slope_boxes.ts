import { Nodeboxtype } from "../../utility/enums";

const detail = 20;

export const invCornerNodeBox: NodeBox = (() => {
	const t: NodeBox = {
		type: Nodeboxtype.fixed,
	};

	let slT = [];
	for (const i of $range(1, detail - 1)) {
		const notch = i / detail;
		const invNotch = 1 - notch;
		slT.push([-0.5, -0.5, -0.5 + notch, 0.5 - notch, 0.5 - invNotch, 0.5]);
	}
	t.fixed = slT;
	return t;
})();

export const cornerNodeBox: NodeBox = (() => {
	const t: NodeBox = {
		type: Nodeboxtype.fixed,
	};
	let sdr = [];
	for (const i of $range(1, detail - 1)) {
		const notch = i / detail;
		const invNotch = 1 - notch;

		sdr.push([-0.5, -0.5, -0.5 + notch, 0.5, 0.5 - invNotch, 0.5]);
		sdr.push([-0.5, -0.5, -0.5, 0.5 - notch, 0.5 - invNotch, 0.5]);
	}
	t.fixed = sdr;
	return t;
})();

export const slopeNodeBox: NodeBox = (() => {
	const t: NodeBox = {
		type: Nodeboxtype.fixed,
	};
	let slp = [];
	for (const i of $range(1, detail - 1)) {
		const notch = i / detail;
		const invNotch = 1 - notch;
		slp.push([-0.5, -0.5, -0.5 + notch, 0.5, 0.5 - invNotch, 0.5]);
	}
	t.fixed = slp;
	return t;
})();