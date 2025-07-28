import { afterClientJoins } from "../logic/client_join_leave";
import { numberToBinary } from "../utility/bitmanip";
import { Drawtype } from "../utility/enums";
import { parseJson, readFileToString } from "../utility/file";
import { GlTf } from "../utility/gltf/gltf";
import { GltfAsset, GltfLoader } from "../utility/gltf/gltf-loader";
import { Vec3 } from "../utility/vector";

core.register_node(":chunk_template", {
	drawtype: Drawtype.mesh,
	mesh: "chunk_0_0.gltf",
	tiles: ["chunk_0_0.png"],
});

core.register_on_mods_loaded(() => {
	const t: string | null = core.get_modpath("ruantis");
	if (t == null) {
		throw new Error("wat");
	}
	// core.parse_json(t + "/models/chunk_0_0.gltf");
	// 	core.parse_json(`{
	// 	"hi": true
	// }`);

	// JSON.parse(t + "/models/chunk_0_0.gltf");

	// const loader = new GltfLoader();

	// const gltf: GltfAsset = loader.load(t + "/models/chunk_0_0.gltf");

	// print(dump(gltf.accessorData(0)));

	// print(dump(gltf.bufferViewData(0)));

	// const jData = parseJson(t + "/models/chunk_0_0.gltf");

	// if (jData.meshes == null) {
	// 	throw new Error("no mesh");
	// }

	// let mesh = 0;

	// let found = false;
	// for (const d of jData.nodes) {
	// 	if (d.name == "ground") {
	// 		if (d.mesh == null) {
	// 			throw new Error("No mesh for ground");
	// 		}
	// 		// todo: might need translation, maybe?
	// 		found = true;
	// 		mesh = d.mesh;
	// 		break;
	// 	}
	// }
	// if (!found) {
	// 	throw new Error("Ground not found");
	// }
	// found = false;

	// // todo: indices was somewhere in this area

	// const vIndices = jData.meshes[mesh + 1]?.primitives[1].indices;

	// if (vIndices == null) {
	// 	throw new Error("Indices are missing");
	// }

	// const vIndicesAccessor = jData.accessors[vIndices + 1];

	// if (vIndicesAccessor.componentType != 5123) {
	// 	throw new Error("indices not in ushort");
	// }

	// const vindicesbufferView =
	// 	jData.bufferViews[vIndicesAccessor.bufferView + 1];

	// if (vindicesbufferView == null) {
	// 	throw new Error("indices buffer view doesn't exist");
	// }

	// const vIndicBuffer = vindicesbufferView.buffer;
	// const vIndicOffset = vindicesbufferView.byteOffset;
	// const vIndicBufferLength = vindicesbufferView.byteLength;

	// // print(vIndicBufferLength);

	// if (vIndicBuffer == null) {
	// 	throw new Error("Missing indices buffer index");
	// }

	// if (vIndicOffset == null) {
	// 	throw new Error("Missing indices buffer offset");
	// }

	// if (vIndicBufferLength == null) {
	// 	throw new Error("Missing buffer length");
	// }

	// const indexBuffer = jData.buffers[vIndicBuffer + 1];

	// let rawIndexBufferData: string | null = indexBuffer.uri;

	// if (rawIndexBufferData == null) {
	// 	throw new Error("Index buffer data missing");
	// }

	// if (
	// 	!rawIndexBufferData.startsWith("data:application/octet-stream;base64,")
	// ) {
	// 	throw new Error("Index buffer data raw encoding");
	// }

	// // Remove: data:application/octet-stream;base64,
	// rawIndexBufferData = rawIndexBufferData.substring(37);

	// // print(rawIndexBufferData);

	// // print(rawIndexBufferData.substring(vIndicOffset, vIndicOffset + 20));

	// // print(string.sub(rawIndexBufferData, 1, 3));

	// for (
	// 	let i = vIndicOffset + 1;
	// 	i < vIndicOffset + 1 + vIndicBufferLength;
	// 	i += 2 // ushort
	// ) {
	// 	// print(rawIndexBufferData.substring(i, i + 1));

	// 	let first: number = string.byte(rawIndexBufferData, i);
	// 	const second: number = string.byte(rawIndexBufferData, i + 1);

	// 	first = first << 8;
	// 	const third = first | second;

	// 	print(numberToBinary(third, 16), third);

	// 	// print(numberToBinary(second, 16), second, secondChar);

	// 	// print(first + second * 0x100);
	// }

	// // print(dump(indexBuffer));

	// //~ ========================== pos

	// const posVERT = jData.meshes[mesh + 1]?.primitives[1]?.attributes?.POSITION;

	// if (posVERT == null) {
	// 	throw new Error("Failed to get vert index");
	// }

	// const vertPOSAccessor = jData.accessors[posVERT + 1];

	// if (vertPOSAccessor == null) {
	// 	throw new Error("null vert pos accessor");
	// }

	// if (vertPOSAccessor.componentType != 5126) {
	// 	throw new Error("vert buffer not in float format!");
	// }

	// if (vertPOSAccessor.type != "VEC3") {
	// 	throw new Error("vert buffer not in vec3 format!");
	// }

	// const bufferViewVertIndex = vertPOSAccessor.bufferView;

	// if (bufferViewVertIndex == null) {
	// 	throw new Error("No vert buffer view index");
	// }

	// const vertBufferView = jData.bufferViews[bufferViewVertIndex + 1];

	// if (vertBufferView == null) {
	// 	throw new Error("vertex buffer view does not exist");
	// }

	// const bufferIndexVert = vertBufferView.buffer;
	// const bufferVertOffset = vertBufferView.byteOffset;
	// const bufferVertStride = vertBufferView.byteStride;

	// if (bufferIndexVert == null) {
	// 	throw new Error("The buffer index is missing");
	// }

	// if (bufferVertOffset == null) {
	// 	throw new Error("The buffer offset is missing");
	// }

	// if (bufferVertStride == null) {
	// 	throw new Error("The buffer stride is missing");
	// }

	// const buffer = jData.buffers[bufferIndexVert + 1];

	// // print(dump(buffer));

	// // print(dump(jData.accessors));

	// // if (jData.meshes[0].primitives == null) {
	// // 	throw new Error("no primitive");
	// // }

	// // print(readFileToString(t + "/models/test.json"));
});

afterClientJoins(() => {
	core.set_node(new Vec3(0, 0, 0), { name: "chunk_template" });

	core.set_node(new Vec3(1, 0, 0), { name: "debug" });
	core.set_node(new Vec3(15, 0, 0), { name: "debug" });
	core.set_node(new Vec3(15, 0, 15), { name: "debug" });
	core.set_node(new Vec3(0, 0, 15), { name: "debug" });
});

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function loadChunks(): void {}
