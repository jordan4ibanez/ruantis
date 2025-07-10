/**
 * Mini null safety wrapper.
 * Since this is single threaded, it's gonna get real weird.
 */
export class Option<T> {
	data: T | null = null;

	is_some(): boolean {
		return this.data != null;
	}

	is_none(): boolean {
		return this.data == null;
	}

	unwrap(): T {
		if (this.data) {
			return this.data;
		} else {
			error("Tried to unwrap nothing!");
		}
	}

	someFun<T>(f: (input: T) => void): Option<T> {
		if (this.data != null) {
			f(this.data as T);
		}
		return this as unknown as Option<T>;
	}

	noneFun<T>(f: () => void): Option<T> {
		if (this.data == null) {
			f();
		}
		return this as unknown as Option<T>;
	}

	constructor(input?: T | null) {
		this.data = input || null;
	}

	mutate<Y>(input: Y | null): Option<Y> {
		(this.data as Y | null) = input;
		return this as unknown as Option<Y>;
	}
}

/**
 * If you're not sure if it's going to be nothing, safely wrap it.
 * @param input Something...or maybe nothing?
 * @returns OptionSingleThreaded<Type>
 */
export function optionWrap<T>(input: T): Option<T> {
	return new Option<T>(null).mutate(input);
}
