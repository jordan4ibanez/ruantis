import { fakeRef } from "./init";
import { Vec2, Vec3 } from "./vector";

export interface EntityFireTable {
	position: Vec3;
	visualSize: Vec2;
}

/** Typescript Luaentity. :) */
export abstract class Entity implements LuaEntity {
	// Name is required.
	abstract name: string;
	object: ObjectRef = fakeRef();
	fireEntity: ObjectRef | null = null;
	fireTable: EntityFireTable | null = null;

	// Abstract members.
	initial_properties?: ObjectProperties;
	on_activate?(staticData: string, delta: number): void;
	on_deactivate?(removal: boolean): void;
	// Note: moveResult: only available if physical=true
	on_step?(delta: number, moveResult: MoveResult | null): void;
	on_punch?(
		puncher: ObjectRef | null,
		timeFromLastPunch: number | null,
		toolCapabilities: ToolCapabilities | null,
		dir: Vec3 | null,
		damage: number
	): void;
	on_death?(killer: ObjectRef): void;
	on_rightclick?(clicker: ObjectRef): void;
	on_attach_child?(child: ObjectRef): void;
	on_detach_child?(child: ObjectRef): void;
	on_detach?(parent: ObjectRef): void;
	get_staticdata?(): string;
}
