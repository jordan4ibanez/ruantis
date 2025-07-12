import { whenPlayerJoins } from "../logic/player_join_leave";
import { CameraModeType } from "../utility/enums";
import { Vec3 } from "../utility/vector";

function setUpCamera(player: ObjectRef): void {
	assert(player.is_player());
	player.hud_set_flags({
		hotbar: false,
		healthbar: false,
		wielditem: false,
		breathbar: false,
		minimap: true,
	});
	player.set_physics_override({
		speed: 1,
		jump: 0,
		gravity: 0,
		speed_climb: 0,
		speed_crouch: 0,
		liquid_fluidity: 0,
		liquid_fluidity_smooth: 0,
		liquid_sink: 0,
		acceleration_default: 0,
		acceleration_air: 0,
		sneak: false,
	});
	player.set_camera({ mode: CameraModeType.first });
	const offset = player.get_properties().eye_height;
	if (offset == null) {
		throw new Error("Eye height was null");
	}
	player.set_eye_offset(
		new Vec3(0, -offset * 10, 0),
		new Vec3(0, -offset * 10, 0),
		new Vec3(0, -offset * 10, 0)
	);
	core.override_item("", {
		range: 100,
	});
}

whenPlayerJoins((player) => {
	setUpCamera(player);
});

export class Camera {
	yaw: number = 0;
	pitch: number = math.pi / 2.0;
	zoom: number = 1;
	outputPosition: Vec3 = new Vec3();
	changed: boolean = true;

	calculate(): void {
		// Nothing to do.
		if (!this.changed) {
			return;
		}

		// todo: camera output position calculation.
	}
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function deployCameraHandling(): void {}
