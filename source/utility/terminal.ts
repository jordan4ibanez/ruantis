/**
 * Colorize a string to pretty print it to an ANSI terminal.
 * If your terminal does not support ANSI colors: Oops.
 * @param inputString The string you want to print.
 * @param r Red channel color. (0 - 255)
 * @param g Green channel color. (0 - 255)
 * @param b Blue channel color. (0 - 255)
 * @returns ANSI Colorized string.
 */
export function terminalColorize(
	inputString: string,
	r: number,
	g: number,
	b: number
): string {
	// tostring in case anything stupid happens.
	return (
		"\x1b[38;2;" +
		tostring(r) +
		";" +
		tostring(g) +
		";" +
		tostring(b) +
		"m" +
		inputString +
		"\x1b[0m"
	);
}
