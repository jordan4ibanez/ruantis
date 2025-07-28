export function numberToBinary(n: number): string {
	let b = (n >>> 0).toString(2);
	const bLen = b.length;
	if (bLen < 8) {
		b = b.padStart(8, "0");
	}
	return b;
}
