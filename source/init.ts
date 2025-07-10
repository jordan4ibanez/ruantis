import { whenPlayerJoins } from "./logic/player";
import { deployTickTimer } from "./logic/tick";
import { setUpCamera } from "./player/camera";
import { deployInventory } from "./player/inventory";
import { deployTracker } from "./player/tracker";

function main() {
	deployTickTimer();
	deployTracker();

	whenPlayerJoins((player: ObjectRef) => {
		setUpCamera(player);
		deployInventory(player);
	});
}
main();
