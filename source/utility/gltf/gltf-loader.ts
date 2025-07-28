// Originally derived from THREE.GLTFLoader
// https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/GLTFLoader.js

import { BINARY_HEADER_MAGIC, GLTFBinaryData } from "./glb-decoder";
import { GltfAsset } from "./gltf-asset";
import { LoaderUtils } from "./loaderutils";

// main library exports
import * as gltf from "./gltf";
import { parseJson } from "../file";
export { gltf };
export * from "./gltf-asset";

/** Main class of the library */
export class GltfLoader {
	/**
	 * Load glTF from a URL. Only the main file is loaded - external buffer and image files
	 * are loaded lazily when needed. To load all, you can use `GltfAsset.preFetchAll()`
	 */
	load(url: string): GltfAsset {
		// const path = LoaderUtils.extractUrlBase(url);
		// print(path);
		return this.parse(url);
	}

	private parse(path: string): GltfAsset {
		const json = parseJson(path);

		// print(dump(json));
		// print(tonumber(json.asset.version));

		const v = tonumber(json?.asset?.version || "0") || 0;
		if (json.asset === undefined || v < 2) {
			throw new Error(
				"Unsupported asset. glTF versions >=2.0 are supported."
			);
		}

		return new GltfAsset(json, path, undefined);
	}
}
