import { deployTickTimer } from "./logic/tick";
import { setUpCamera } from "./player/camera";
import { deployInventory } from "./player/inventory";

function main() {
	deployTickTimer();

	core.register_on_joinplayer((player: ObjectRef) => {
		setUpCamera(player);
		deployInventory(player);
	});
}
main();
