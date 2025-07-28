import { deployTickTimer } from "./logic/tick";
import { deployWindowHandling } from "./player/window";
import { deployInventoryHandling } from "./player/inventory";
import { deployClientTracker } from "./player/tracker";
import { deployPlayerEntity } from "./player/player";
import { loadNodes } from "./map/block_database";
import { loadChunks } from "./map/chunks";

function main() {
	deployTickTimer();
	deployClientTracker();
	deployWindowHandling();
	deployInventoryHandling();
	deployPlayerEntity();
	loadNodes();
	loadChunks();
}
main();
