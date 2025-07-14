import { deployTickTimer } from "./logic/tick";
import { deployCameraHandling } from "./player/camera";
import { deployWindowHandling } from "./player/window";
import { deployInventoryHandling } from "./player/inventory";
import { deployPlayerTracker } from "./player/tracker";
import { deployPlayerEntity } from "./player/player";
import { loadNodes } from "./tiles/tiles";

function main() {
	deployTickTimer();
	deployPlayerTracker();
	deployWindowHandling();
	deployCameraHandling();
	deployInventoryHandling();
	deployPlayerEntity();
	loadNodes();
}
main();
