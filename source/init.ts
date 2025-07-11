import { deployTickTimer } from "./logic/tick";
import { deployCameraHandling } from "./player/camera";
import { deployDisplayHandling } from "./player/window";
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
