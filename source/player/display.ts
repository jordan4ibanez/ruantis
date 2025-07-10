import { whenPlayerJoins } from "../logic/player";
import { registerClientTickFunction } from "../logic/tick";

class DisplayInformation {}



registerClientTickFunction((player: ObjectRef, delta: number) => {
	const windowInfo = core.get_player_window_information(name);
	if (windowInfo == null) {
		print("going again");
		return;
	}

	print("done");

	return true;
});
