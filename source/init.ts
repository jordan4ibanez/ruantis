import { setUpCamera } from "./player/camera";
import { deployInventory } from "./player/inventory";
import { PointedThingType } from "./utility/globals";

function main() {
	print(PointedThingType.node);

	core.register_on_joinplayer((player: ObjectRef) => {
		setUpCamera(player);
		deployInventory(player);
	});
}
main();
