import { whenClientJoins } from "../logic/client_join_leave";
import { CameraModeType } from "../utility/enums";
import { Vec3 } from "../utility/vector";
import { Controls } from "./controls";

core.override_item("", {
	range: 100,
});

function setUpCamera(client: ObjectRef): void {
	assert(client.is_player());
	client.hud_set_flags({
		hotbar: false,
		healthbar: false,
		wielditem: false,
		breathbar: false,
		minimap: true,
	});
	client.set_physics_override({
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
	client.set_camera({ mode: CameraModeType.first });
	const offset = client.get_properties().eye_height;
	if (offset == null) {
		throw new Error("Eye height was null");
	}
	client.set_eye_offset(
		new Vec3(0, -offset * 10, 0),
		new Vec3(0, -offset * 10, 0),
		new Vec3(0, -offset * 10, 0)
	);
}

whenClientJoins((client) => {
	setUpCamera(client);
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

	doControls(
		control: Controls,
		ltPlayer: ObjectRef,
		playerPos: Vec3,
		delta: number
	): void {
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
				this.yaw += delta * 2;
			} else if (control.rightHeld) {
				this.yaw -= delta * 2;
			}
			if (control.upHeld) {
				this.pitch += delta;
			} else if (control.downHeld) {
				this.pitch -= delta;
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
