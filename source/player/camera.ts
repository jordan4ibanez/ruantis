import { whenClientJoins } from "../logic/client_join_leave";
import { CameraModeType } from "../utility/enums";
import { Vec3 } from "../utility/vector";
import { Controls } from "./controls";

function setUpCamera(client: ObjectRef): void {


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



