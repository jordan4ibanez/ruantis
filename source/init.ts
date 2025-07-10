import { whenPlayerJoins } from "./logic/player";
import { deployTickTimer } from "./logic/tick";
import { setUpCamera } from "./player/camera";
import { deployDisplayHandling } from "./player/display";
import { deployInventory } from "./player/inventory";
import { deployTracker } from "./player/tracker";

function main() {
	deployTickTimer();
	deployTracker();
	deployDisplayHandling();

	whenPlayerJoins((player: ObjectRef) => {
		setUpCamera(player);
		deployInventory(player);
	});
}
main();
