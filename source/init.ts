import { deployTickTimer } from "./logic/tick";
import { loadNodes } from "./map/map_barrel";
import { loadItems } from "./items/item_barrel";
import { deployPlayer } from "./player/player_barrel";

function main() {
	deployTickTimer();
	deployPlayer();
	loadNodes();
	loadItems();
}
main();
