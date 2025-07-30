export interface ItemDef {
	name: string;
	image: string;
	stackLimit?: number;
	groups?: Dictionary<string, number>;
}
export function registerItem(def: ItemDef) {
	const temp: ItemDefinition = {
		inventory_image: def.image,
		wield_image: def.image,
		stack_max: def.stackLimit || 1,
		groups: def.groups,
	};

	core.register_craftitem(":" + def.name, temp);
}
