import { ShallowVector2, ShallowVector3 } from "../../minetest-api";
import { randomRange } from "./math";

const rr = randomRange;

export class Vec3 implements ShallowVector3 {
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

	clone(): Vec3 {
		const output = new Vec3();
		output.x = this.x;
		output.y = this.y;
		output.z = this.z;
		return output;
	}

	set(x: number, y: number, z: number): void {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	addImmutable(other: ShallowVector3): Vec3 {
		const output = new Vec3();
		output.x = this.x + other.x;
		output.y = this.y + other.y;
		output.z = this.z + other.z;
		return output;
	}

	subtractImmutable(other: ShallowVector3): Vec3 {
		const output = new Vec3();
		output.x = this.x - other.x;
		output.y = this.y - other.y;
		output.z = this.z - other.z;
		return output;
	}

	copyFrom(other: ShallowVector3): void {
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;
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

	distance(other: Vec3): number {
		const x = this.x - other.x;
		const y = this.y - other.y;
		const z = this.z - other.z;
		return math.sqrt(x * x + y * y + z * z);
	}

	equals(other: Vec3): boolean {
		return this.x == other.x && this.y == other.y && this.z == other.z;
	}

	toString(): string {
		return (
			"(" +
			tostring(this.x) +
			"," +
			tostring(this.y) +
			"," +
			tostring(this.z) +
			")"
		);
	}
}

export class Vec2 implements ShallowVector2 {
	x: number = 0;
	y: number = 0;

	constructor(x?: number, y?: number) {
		this.x = x || 0;
		this.y = y || 0;
	}

	static zero(): Vec2 {
		return new Vec2(0, 0);
	}

	clone(): Vec2 {
		const output = new Vec2();
		output.x = this.x;
		output.y = this.y;
		return output;
	}

	set(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}

	addImmutable(other: ShallowVector3): Vec2 {
		const output = new Vec2();
		output.x = this.x + other.x;
		output.y = this.y + other.y;
		return output;
	}

	subtractImmutable(other: ShallowVector2): Vec2 {
		const output = new Vec2();
		output.x = this.x - other.x;
		output.y = this.y - other.y;
		return output;
	}

	copyFrom(other: ShallowVector2): void {
		this.x = other.x;
		this.y = other.y;
	}

	randomize(minX: number, maxX: number, minY: number, maxY: number): Vec2 {
		this.x = rr(minX, maxX);
		this.y = rr(minY, maxY);

		return this;
	}

	distance(other: ShallowVector2): number {
		const x = this.x - other.x;
		const y = this.y - other.y;
		return math.sqrt(x * x + y * y);
	}

	equals(other: ShallowVector2): boolean {
		return this.x == other.x && this.y == other.y;
	}

	toString(): string {
		return "(" + tostring(this.x) + "," + tostring(this.y) + ")";
	}
}
