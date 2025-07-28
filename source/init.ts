import { deployTickTimer } from "./logic/tick";
import { deployWindowHandling } from "./player/window";
import { deployInventoryHandling } from "./player/inventory";
import { deployClientTracker } from "./player/tracker";
import { deployPlayerEntity } from "./player/player";
import { loadChunkDatabase } from "./map/chunk_database/chunks_database";
import { loadNodes } from "./map/map_barrel";

function main() {
	deployTickTimer();
	deployClientTracker();
	deployWindowHandling();
	deployInventoryHandling();
	deployPlayerEntity();
	loadNodes();
	loadChunkDatabase();
}
main();
