export interface ItemDef {
	name: string;
	image: string;
	stackLimit?: number;
}
export function registerItem(def: ItemDef) {
	const temp: ItemDefinition = {
		inventory_image: def.image,
		wield_image: def.image,
		stack_max: def.stackLimit || 1,
	};

	core.register_craftitem(":" + def.name, temp);
}
