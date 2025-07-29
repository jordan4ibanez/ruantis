import { ShallowVector3 } from "../../minetest-api";
import { Entity, registerEntity } from "../utility/entity";
import { EntityVisual, LogLevel } from "../utility/enums";
import { Vec2, Vec3 } from "../utility/vector";

export class ItemEntity extends Entity {
	name: string = "__builtin:item";
	itemstring: string = "";
	dropped_by: string = "";
	// Item expiry
	age: number = 0;

	initial_properties = {
		hp_max: 1,
		visual: EntityVisual.sprite,
		physical: true,
		textures: [""],
		is_visible: true,
		pointable: true,
		collide_with_objects: false,
		collisionbox: [-0.25, -0.25, -0.25, 0.25, 0.25, 0.25],
		selectionbox: [-0.25, -0.25, -0.25, 0.25, 0.25, 0.25],
		visual_size: new Vec2(0.5, 0.5),
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
			textures: [def?.wield_image || ""],
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
	on_step(delta: number): void {
		this.age += delta;
		// 5 minutes and items disappear.
		if (this.age > 300) {
			this.object.remove();
		}
	}
}
registerEntity(ItemEntity, true);

core.item_drop = (
	itemStack: ItemStackObject,
	dropper: ObjectRef | null,
	position: ShallowVector3
): [ItemStackObject, ObjectRef] | null => {
	if (dropper == null || !dropper.is_player()) {
		core.log(LogLevel.error, "Don't call core.item_drop.");
		return null;
	}

	const pos = dropper.get_pos();
	pos.y += 0.1;
	const newEntity = core.add_item(pos, ItemStack(itemStack));

	if (newEntity) {
		itemStack.clear();
		return [itemStack, newEntity];
	}

	return null;
};

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadCustomItemEntity(): void {}
