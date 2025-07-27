import {
	afterClientJoins,
	whenClientJoins,
	whenClientLeaves,
} from "../logic/client_join_leave";
import { registerClientTickFunction } from "../logic/tick";
import { HudElementType } from "../utility/enums";
import { Vec2, Vec3 } from "../utility/vector";

core.override_item("", {
	range: 100,
});

class Player {
	private readonly name: string;
	private readonly client: ObjectRef;
	private hp: number = 10;

	constructor(client: ObjectRef) {
		this.name = client.get_player_name();
		this.client = client;
	}
}

const players = new Map<string, Player>();

function setUpPlayer(client: ObjectRef): void {
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
		gravity: 10000,
		speed_climb: 0,
		speed_crouch: 0,
		liquid_fluidity: 0,
		liquid_fluidity_smooth: 0,
		liquid_sink: 0,
		acceleration_default: 0,
		acceleration_air: 0,
		sneak: false,
	});
}

whenClientJoins((client) => {
	// getDatabase()

	//? The client becomes a player.

	const name = client.get_player_name();
	const pData = new Player(client);

	players.set(name, pData);

	setUpPlayer(client);

	client.hud_add({
		type: HudElementType.text,
		text: "Ruantis prototype",
		offset: new Vec2(64, 12),
		position: new Vec2(0, 0),
	});
});

whenClientLeaves((client) => {
	players.delete(client.get_player_name());
});

registerClientTickFunction((player, delta) => {
	const name = player.get_player_name();
	const pData = players.get(name);

	// Player might be one tick late.
	if (pData == null) {
		return;
	}
});

/**
 * Get a player.
 * @param name The player's name.
 * @returns The player or null.
 */
export function getPlayer(name: string): Player | null {
	return players.get(name) || null;
}

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function deployPlayerEntity(): void {}
