import { whenPlayerJoins } from "../logic/player_join_leave";
import { CameraModeType } from "../utility/enums";
import { Vec3 } from "../utility/vector";
import { Controls } from "./controls";

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
	private yaw: number = 0;
	private pitch: number = 0;
	private zoom: number = 1;
	private outputPosition: Vec3 = new Vec3();
	private changed: boolean = true;

	doControls(control: Controls, ltPlayer: ObjectRef, playerPos: Vec3): void {
		if (control.leftDown || control.rightDown) {
			// todo: also needs pitch controls and zoom
			this.changed = true;
		}

		// Nothing to do.
		if (!this.changed) {
			return;
		}
		this.changed = false;

		if (control.leftDown) {
			this.yaw -= 0.01;
		} else if (control.rightDown) {
			this.yaw += 0.01;
		}

		// Todo: the vector library needs a scalar.
		this.outputPosition
			.set(this.pitch, this.yaw, 0)
			.toDirection()
			.multiply(new Vec3(10, 10, 10))
			.add(playerPos);

		const output = this.outputPosition.subtractImmutable(
			ltPlayer.get_pos()
		);

		//! This is debug.
		print(output.addImmutable(ltPlayer.get_pos()));

		ltPlayer.add_pos(output);
	}
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function deployCameraHandling(): void {}
