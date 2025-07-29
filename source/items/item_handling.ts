import { ShallowVector3 } from "../../minetest-api";
import { Entity, registerEntity } from "../utility/entity";
import { EntityVisual } from "../utility/enums";
import { Vec2, Vec3 } from "../utility/vector";

export class ItemEntity extends Entity {
	name: string = "__builtin:item";
	itemstring: string = "";
	dropped_by: string = "";
	// Item expiry
	age: number = 0;

	initial_properties = {
		hp_max: 1,
		visual: EntityVisual.wielditem,
		physical: true,
		textures: [""],
		automatic_rotate: 1.5,
		is_visible: true,
		pointable: false,
		collide_with_objects: false,
		collisionbox: [-0.21, -0.21, -0.21, 0.21, 0.21, 0.21],
		selectionbox: [-0.21, -0.21, -0.21, 0.21, 0.21, 0.21],
		visual_size: new Vec2(0.21, 0.21),
	};

	set_item(item: string | ItemStackObject | null) {
		const stack = ItemStack(item || this.itemstring);
		this.itemstring = stack.to_string();
		if (this.itemstring == "") {
			// Item not yet known.
			return;
		}

		const itemname: string =
			(stack.is_known() && stack.get_name()) || "unknown";

		const def: ItemDefinition | undefined = core.registered_items[itemname];

		this.object.set_properties({
			textures: [itemname],
			wield_item: this.itemstring,
			glow: def && def.light_source,
		});
	}
	get_staticdata(): string {
		return core.serialize({
			itemstring: this.itemstring,
			age: this.age,
			dropped_by: this.dropped_by,
		});
	}
	on_activate(staticdata: string, dtime_s: number): void {
		if (string.sub(staticdata, 1, string.len("return")) == "return") {
			const data: any = core.deserialize(staticdata);
			if (data && type(data) == "table") {
				this.itemstring = data.itemstring;
				this.age = (data.age || 0) + dtime_s;
			}
		} else {
			this.itemstring = staticdata;
		}
		this.object.set_armor_groups({ immortal: 1 });
		this.object.set_velocity(new Vec3(0, -100, 0));
		this.object.set_acceleration(new Vec3(0, -100, 0));

		this.set_item(this.itemstring);
	}
	on_step(delta: number, moveResult: MoveResult | null): void {
		print("hi");
	}
}
registerEntity(ItemEntity, true);

core.item_drop = (
	itemStack: ItemStackObject,
	dropper: ObjectRef | null,
	position: ShallowVector3
): [ItemStackObject, ObjectRef] | null => {

	print("hi");

	core.add_entity

	return null;
};

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadCustomItemEntity(): void {}
