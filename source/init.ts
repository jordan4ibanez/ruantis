import { whenPlayerJoins } from "./logic/player";
import { deployTickTimer } from "./logic/tick";
import { deployCameraHandling } from "./player/camera";
import { deployDisplayHandling } from "./player/display";
import { deployInventoryHandling } from "./player/inventory";

import { deployTracker } from "./player/tracker";

function main() {
	deployTickTimer();
	deployTracker();
	deployDisplayHandling();
	deployCameraHandling();
	deployInventoryHandling();
}
main();
