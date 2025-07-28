export function numberToBinary(n: number, bits: number = 8): string {
	return (n >>> 0).toString(2).padStart(bits, "0");
}
