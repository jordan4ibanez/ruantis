import { deployTickTimer } from "./logic/tick";
import { deployCameraHandling } from "./player/camera";
import { deployWindowHandling } from "./player/window";
import { deployInventoryHandling } from "./player/inventory";
import { deployTracker } from "./player/tracker";
import { deployPlayerEntity } from "./player/player";
import { loadNodes } from "./tiles/debug_tiles";

function main() {
	deployTickTimer();
	deployTracker();
	deployWindowHandling();
	deployCameraHandling();
	deployInventoryHandling();
	deployPlayerEntity();
	loadNodes();
}
main();
