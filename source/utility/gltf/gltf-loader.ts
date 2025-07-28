// Originally derived from THREE.GLTFLoader
// https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/GLTFLoader.js

import { BINARY_HEADER_MAGIC, GLTFBinaryData } from "./glb-decoder";
import { GltfAsset } from "./gltf-asset";
import { LoaderUtils } from "./loaderutils";
import { LoadingManager } from "./loadingmanager";

// main library exports
import * as gltf from "./gltf";
import { parseJson } from "../file";
export { gltf };
export * from "./gltf-asset";
export * from "./loadingmanager";

/** Main class of the library */
export class GltfLoader {
	private manager: LoadingManager;

	/**
	 * Pass in a custom `LoadingManager` for progress reporting.
	 */
	constructor(manager?: LoadingManager) {
		this.manager = manager || new LoadingManager();
	}

	/**
	 * Load glTF from a URL. Only the main file is loaded - external buffer and image files
	 * are loaded lazily when needed. To load all, you can use `GltfAsset.preFetchAll()`
	 */
	load(url: string): GltfAsset {
		const path = LoaderUtils.extractUrlBase(url);

		return this.parse(path);
	}

	private parse(path: string): GltfAsset {
		const json = parseJson(path);

		if (json.asset === undefined || json.asset.version[0] < 2) {
			throw new Error(
				"Unsupported asset. glTF versions >=2.0 are supported."
			);
		}

		return new GltfAsset(json, path, undefined, this.manager);
	}
}
