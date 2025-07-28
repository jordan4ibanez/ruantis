const clickCheck = new Vec3(0, 1, 0);

export function blockClick(
	position: ShallowVector3,
	node: NodeTable,
	puncher: ObjectRef | null,
	pointedThing: PointedThing
) {
	if (puncher == null) {
		return;
	}
	const name = puncher.get_player_name();

	print(dump(getControls(name)));

	if (getControls(name).leftPressed) {
		print("press");
	}

	const timer = clickTimeoutMap.get(name) || 1;

	if (timer > 0) {
		return;
	}

	if (pointedThing.type != PointedThingType.node) {
		throw new Error("Logic error.");
	}

	const above = new Vec3().copyFrom(pointedThing.above!);
	const below = new Vec3().copyFrom(pointedThing.under!);

	const diff = above.subtractImmutable(below);

	if (!diff.equals(clickCheck)) {
		core.log(LogLevel.warning, `Player ${name} is clicking under the map.`);
		return;
	}

	const targetPos = new Vec3().copyFrom(position).add(clickCheck);

	print(targetPos.toString());
	clickTimeoutMap.set(name, tickRate);
}
core.register_on_punchnode(blockClick);
