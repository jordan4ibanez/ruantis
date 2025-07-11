import { whenPlayerJoins } from "../logic/player";
import { CameraModeType } from "../utility/enums";

function setUpCamera(player: ObjectRef): void {
	assert(player.is_player());
	player.hud_set_flags({
		hotbar: false,
		healthbar: false,
		wielditem: false,
		breathbar: false,
		minimap: true,
	});
	player.set_camera({ mode: CameraModeType.first });
}

export function deployCameraHandling(): void {
	whenPlayerJoins((player) => {
		setUpCamera(player);
	});
}
