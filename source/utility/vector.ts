import { randomRange } from "./math";

const rr = randomRange;

class Vec3 {
	x: number = 0;
	y: number = 0;
	z: number = 0;

	constructor(x?: number, y?: number, z?: number) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	}

	static zero(): Vec3 {
		return new Vec3(0, 0, 0);
	}

	randomize(
		minX: number,
		maxX: number,
		minY: number,
		maxY: number,
		minZ: number,
		maxZ: number
	): Vec3 {
		this.x = rr(minX, maxX);
		this.y = rr(minY, maxY);
		this.z = rr(minZ, maxZ);
		return this;
	}

	distance(other: Vec2): number {
		return vector.distance(this, other);
	}
}

class Vec2 {
	x: number = 0;
	y: number = 0;

	constructor(x?: number, y?: number) {
		this.x = x || 0;
		this.y = y || 0;
	}

	static zero(): Vec2 {
		return new Vec2(0, 0);
	}

	randomize(minX: number, maxX: number, minY: number, maxY: number): Vec2 {
		this.x = rr(minX, maxX);
		this.y = rr(minY, maxY);

		return this;
	}

	distance(other: Vec2): number {
		return vector.distance(this, other);
	}
}
