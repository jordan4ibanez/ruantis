export interface ItemDef {
	name: string;
	image: string;
}
export function registerItem(def: ItemDef) {
	const temp: ItemDefinition = {
		inventory_image: def.image,
		wield_image: "blank.png",
	};

	core.register_craftitem(":" + def.name, temp);
}
