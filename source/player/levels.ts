// Level 0 is what you start out at.
const levels: number[] = [0];

(() => {
	let baseLevel = 0;
	let adder = 100;
	// Goes to level 100;
	for (let i = 0; i < 100; i++) {
		baseLevel += adder;
		levels.push(baseLevel);
		adder = math.floor(adder * 1.1);
	}
})();

//? This is level debugging.
// for (const i of $range(0, levels.length - 1)) {
// 	print(`Level: [${i}] = ${levels[i]}`);
// }

export function getLevel(): void {}
