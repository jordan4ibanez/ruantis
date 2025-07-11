import { deployTickTimer } from "./logic/tick";
import { deployCameraHandling } from "./player/camera";
import { deployWindowHandling } from "./player/window";
import { deployInventoryHandling } from "./player/inventory";

import { deployTracker } from "./player/tracker";

function main() {
	deployTickTimer();
	deployTracker();
	deployWindowHandling();
	deployCameraHandling();
	deployInventoryHandling();
}
main();
