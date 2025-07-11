import { Vec2, Vec3 } from "./vector";

export interface EntityFireTable {
	position: Vec3;
	visualSize: Vec2;
}

/** Typescript Luaentity. :) */
export abstract class Entity implements LuaEntity {
	name: string = "";
	object: ObjectRef = {} as ObjectRef;
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

/**
 * A bolt on to allow you to directly register MT lua entities as TS classes.
 * @param clazz Class definition.
 */
export function registerEntity(clazz: { new (): LuaEntity }) {
	core.register_entity(":" + clazz.name, new clazz());
}
