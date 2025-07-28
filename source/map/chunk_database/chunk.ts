import { Vec3 } from "../../utility/vector";

interface PlacementData {
	pos: Vec3;
	block: string;
	param2?: number;
}

export interface Chunk {
	pos: Vec3;
	blocks: PlacementData[];
}
