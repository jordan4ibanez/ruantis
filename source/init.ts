import { deployTickTimer } from "./logic/tick";
import { setUpCamera } from "./player/camera";
import { deployInventory } from "./player/inventory";
import { deployTracker } from "./player/tracker";

function main() {
	deployTickTimer();
	deployTracker();

	core.register_on_joinplayer((player: ObjectRef) => {
		setUpCamera(player);
		deployInventory(player);
	});
}
main();
