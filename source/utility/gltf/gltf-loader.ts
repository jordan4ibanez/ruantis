// Originally derived from THREE.GLTFLoader
// https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/GLTFLoader.js

import { FileLoader } from "./fileloader";
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

		const loader = new FileLoader(this.manager);

		return this.parse(data, path);
	}

	/**
	 * Load from `File`s you might get from a file input or via drag-and-drop.
	 * `fileMap` is expected to map from a full file path (including directories if present).
	 * This matches the format provided by [simple-dropzone](https://www.npmjs.com/package/simple-dropzone).
	 * If you don't need support for directories/zip files, you can use `File.name` as the key.
	 *
	 * Note that `preFetchAll` is called on the result GltfAsset before returning it so that
	 * the uploaded files can be garbage-collected immediately.
	 */
	/* istanbul ignore next: relies too much on browser APIs; covered by drag-and-drop example */
	async loadFromFiles(fileMap: Map<string, File>): Promise<GltfAsset> {
		// code derived from three-gltf-viewer
		let rootFile;
		let rootPath: string;
		for (const [path, file] of fileMap) {
			if (file.name.match(/\.(gltf|glb)$/)) {
				rootFile = file;
				rootPath = path.replace(file.name, "");
			}
		}

		if (!rootFile) {
			throw new Error("No .gltf or .glb asset found.");
		}

		const fileURL =
			typeof rootFile === "string"
				? rootFile
				: URL.createObjectURL(rootFile);

		// Intercept and override relative URLs.
		const baseURL = LoaderUtils.extractUrlBase(fileURL); // TODO!!: does this make sense here?
		const blobURLs: string[] = [];
		this.manager.urlModifier = (url: string) => {
			const normalizedURL =
				rootPath + url.replace(baseURL, "").replace(/^(\.?\/)/, "");

			if (fileMap.has(normalizedURL)) {
				const blob = fileMap.get(normalizedURL);
				const blobURL = URL.createObjectURL(blob);
				blobURLs.push(blobURL);
				return blobURL;
			}

			return url;
		};

		const asset = await this.load(fileURL);
		await asset.preFetchAll(); // fetch all so the object urls can be released below

		URL.revokeObjectURL(fileURL);
		blobURLs.forEach(URL.revokeObjectURL);

		return asset;
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
