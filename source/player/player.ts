import {
	afterClientJoins,
	whenClientJoins,
	whenClientLeaves,
} from "../logic/client_join_leave";
import { registerClientTickFunction, serverTickRate } from "../logic/tick";
import { devMode } from "../map/development_mode";
import { Entity, registerEntity, spawnEntity } from "../utility/entity";
import {
	EntityVisual,
	HudElementType,
	SkyParametersType,
} from "../utility/enums";
import { Vec2, Vec3 } from "../utility/vector";

let devMine;
if (devMode) {
	devMine = {
		times: {
			1: 0,
		},
	};
}

core.override_item("", {
	range: devMode ? 100 : 3,

	tool_capabilities: {
		groupcaps: {
			mine: {
				times: {
					1: serverTickRate,
					2: serverTickRate * 2,
					3: serverTickRate * 3,
					4: serverTickRate * 4,
					5: serverTickRate * 5,
					6: serverTickRate * 6,
					7: serverTickRate * 7,
					8: serverTickRate * 8,
				},
			},
			dev_mine: devMine,
		},
	},
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

class DebugPlayerModel extends Entity {
	initial_properties: ObjectProperties = {
		visual: EntityVisual.mesh,
		mesh: "player.gltf",
		static_save: false,
	};
}

registerEntity(DebugPlayerModel);
core.register_chatcommand("test", {
	params: "",
	description: "",
	privs: {},
	func: function (
		name: string,
		param: string
	): LuaMultiReturn<[boolean, string]> | void {
		const p = core.get_player_by_name(name)!;

		const pos = p.get_pos();

		core.add_entity(pos, "DebugPlayerModel");
	},
});

const players = new Map<string, Player>();

function setUpPlayer(client: ObjectRef): void {
	client.hud_set_flags({
		hotbar: devMode ? true : false,
		healthbar: false,
		wielditem: false,
		breathbar: false,
		minimap: true,
	});

	client.set_properties({
		stepheight: 0.255,
	});

	client.set_physics_override({
		speed: 1,
		jump: 0,
		gravity: 1000,
		speed_climb: 0,
		speed_crouch: 0,
		liquid_fluidity: 0,
		liquid_fluidity_smooth: 0,
		liquid_sink: 0,
		acceleration_default: 1,
		acceleration_air: 0,
		sneak: false,
	});

	client.set_armor_groups({ immortal: 1 });

	client.set_sky({
		clouds: false,
		base_color: "black",
		// fog: {
		// 	fog_distance: 30,
		// 	fog_start: 10,
		// },
		type: SkyParametersType.plain,
	});
	client.set_sun({
		visible: false,
		sunrise_visible: false,
	});
	client.set_moon({
		visible: false,
	});
	client.set_stars({
		visible: false,
	});

	if (devMode) {
		core.set_player_privs(client.get_player_name(), {
			fly: true,
			noclip: true,
			fast: true,
			give: true,
			grant: true,
			server: true,
		});
	} else {
		// This should be checking the meta to see if the player has been to the server before.
		client.set_pos(new Vec3(0, 1, 0));
	}

	const ent = spawnEntity(client.get_pos(), DebugPlayerModel);
	if (ent == null) {
		throw new Error("wat");
	}
	ent.set_attach(client, "", new Vec3(), new Vec3(), true);
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
		number: 0xffffff,
		offset: new Vec2(360, -12),
		position: new Vec2(0, 1),
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
