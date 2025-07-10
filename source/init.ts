import { setUpCamera } from "./player/camera_setup";
import { PointedThingType } from "./utility/globals";

function main() {
	print(PointedThingType.node);

	core.register_on_joinplayer((player: ObjectRef) => {
		setUpCamera(player);
	});
}
main();
