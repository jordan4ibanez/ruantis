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

const doublePi = math.pi * 2;
const halfPi = math.pi / 2;

export class Camera {
	private yaw: number = math.pi / 4;
	private pitch: number = math.pi / 4;
	private zoom: number = 1;
	private outputPosition: Vec3 = new Vec3();
	private changed: boolean = true;

	triggerRecalculation(): void {
		this.changed = true;
	}

	doControls(control: Controls, ltPlayer: ObjectRef, playerPos: Vec3): void {
		let reCalculateRotation = false;
		if (
			control.leftHeld ||
			control.rightHeld ||
			control.upHeld ||
			control.downHeld
		) {
			// todo: also needs pitch controls and zoom
			this.changed = true;
			reCalculateRotation = true;
		}

		// Nothing to do.
		if (!this.changed) {
			return;
		}
		this.changed = false;

		if (reCalculateRotation) {
			// Camera controls.
			if (control.leftHeld) {
				this.yaw += 0.05;
			} else if (control.rightHeld) {
				this.yaw -= 0.05;
			}
			if (control.upHeld) {
				this.pitch += 0.025;
			} else if (control.downHeld) {
				this.pitch -= 0.025;
			}

			// Camera limiters.
			if (this.yaw < -math.pi) {
				this.yaw += doublePi;
			} else if (this.yaw > math.pi) {
				this.yaw -= doublePi;
			}
			if (this.pitch < 0.4) {
				this.pitch = 0.4;
			} else if (this.pitch > 1.2) {
				this.pitch = 1.2;
			}

			// This focuses the camera on the player so you don't get confused.
			ltPlayer.set_look_vertical(this.pitch);
			ltPlayer.set_look_horizontal(-this.yaw + halfPi);
		}

		// Todo: the vector library needs a scalar.
		this.outputPosition
			.set(this.pitch, this.yaw, 0)
			.toDirection()
			.multiply(new Vec3(10, 10, 10))
			.add(playerPos)
			.add(new Vec3(0.5, 0.5, 0.5));

		const output = this.outputPosition.subtractImmutable(
			ltPlayer.get_pos()
		);

		//! This is debug.
		// print(output.addImmutable(ltPlayer.get_pos()));

		ltPlayer.add_pos(output);
	}
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function deployCameraHandling(): void {}
