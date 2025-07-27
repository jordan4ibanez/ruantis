export function readFileToString(path: string): string {
	const [f] = io.open(path, "rb");

	if (f == undefined) {
		throw new Error(`File ${path} does not exist.`);
	}

	io.close(f);

	let output: string = "";

	for (const [line] of io.lines(path)) {
		output += line + "\n";
		// print(line);
	}
	return output;
}

export function parseJson(path: string) {
	return core.parse_json(readFileToString(path));
}
