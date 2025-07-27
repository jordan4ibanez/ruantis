import { afterClientJoins, whenClientJoins } from "../logic/client_join_leave";
import {
	registerClientTickFunction,
	registerServerTickFunction,
} from "../logic/tick";
import { getDatabase } from "../utility/database";
import { Entity, registerEntity, spawnEntity } from "../utility/entity";
import { EntityVisual, HudElementType } from "../utility/enums";
import { Vec2, Vec3 } from "../utility/vector";

import { Controls, getControls } from "./controls";

core.override_item("", {
	range: 100,
});

class Player {
	private readonly name: string;
	private readonly client: ObjectRef;

	constructor(client: ObjectRef) {
		this.name = client.get_player_name();
		this.client = client;
	}
}

const players = new Map<string, Player>();

afterClientJoins((client) => {
	// todo: get from database.
	// getDatabase()

	//? The client becomes a player.

	const name = client.get_player_name();
	const pData = new Player(client);

	players.set(name, pData);

	client.hud_add({
		type: HudElementType.text,
		text: "Caution: Garbage area. Use caution.",
		offset: new Vec2(264, 12),
		position: new Vec2(0, 0),
	});
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
