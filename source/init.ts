import { deployTickTimer } from "./logic/tick";
import { deployCameraHandling } from "./player/camera";
import { deployWindowHandling } from "./player/window";
import { deployInventoryHandling } from "./player/inventory";
import { deployClientTracker } from "./player/tracker";
import { deployPlayerEntity } from "./player/player";
import { loadNodes } from "./tiles/tiles";

function main() {
	deployTickTimer();
	deployClientTracker();
	deployWindowHandling();
	deployCameraHandling();
	deployInventoryHandling();
	deployPlayerEntity();
	loadNodes();
}
main();
