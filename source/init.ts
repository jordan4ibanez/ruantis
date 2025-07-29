import { deployTickTimer } from "./logic/tick";
import { deployWindowHandling } from "./player/window";
import { deployInventoryHandling } from "./player/inventory";
import { deployClientTracker } from "./player/tracker";
import { deployPlayerEntity } from "./player/player";
import { loadNodes } from "./map/map_barrel";
import { loadItems } from "./items/item_barrel";

function main() {
	deployTickTimer();
	deployClientTracker();
	deployWindowHandling();
	deployInventoryHandling();
	deployPlayerEntity();
	loadNodes();
	loadItems();
}
main();
