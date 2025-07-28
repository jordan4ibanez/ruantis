import { GLTFBinaryData } from "./glb-decoder";
import { GlTf, GlTfId } from "./gltf";

/** Spec: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#accessor-element-size */
export const GLTF_COMPONENT_TYPE_ARRAYS: { [index: number]: any } = {
	5120: Int8Array,
	5121: Uint8Array,
	5122: Int16Array,
	5123: Uint16Array,
	5125: Uint32Array,
	5126: Float32Array,
};

/** Spec: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#accessor-element-size */
export const GLTF_ELEMENTS_PER_TYPE: { [index: string]: number } = {
	SCALAR: 1,
	VEC2: 2,
	VEC3: 3,
	VEC4: 4,
	MAT2: 4,
	MAT3: 9,
	MAT4: 16,
};

export class GltfAsset {
	/** The JSON part of the asset. */
	gltf: GlTf;
	glbData: GLTFBinaryData | undefined;
	/** Helper for accessing buffer data */
	bufferData: BufferData;

	constructor(
		gltf: GlTf,
		baseUri: string,
		glbData: GLTFBinaryData | undefined
	) {
		this.gltf = gltf;
		this.glbData = glbData;
		this.bufferData = new BufferData(this, baseUri);
	}

	/**
	 * Fetch the data for a buffer view. Pass in the `bufferView` property of an
	 * `Accessor`.
	 * NOTE: To avoid any unnessary copies, the data is returned as a `Uint8Array` instead of an `ArrayBuffer`.
	 */
	async bufferViewData(index: GlTfId): Promise<Uint8Array> {
		if (!this.gltf.bufferViews) {
			/* istanbul ignore next */
			throw new Error("No buffer views found.");
		}
		const bufferView = this.gltf.bufferViews[index];
		const bufferData = await this.bufferData.get(bufferView.buffer);
		const byteLength = bufferView.byteLength || 0;
		const byteOffset = bufferView.byteOffset || 0;

		// For GLB files, the 'base buffer' is the whole GLB file, including the json part.
		// Therefore we have to consider bufferData's offset within its buffer it as well.
		// For non-GLB files it will be 0.
		const baseBuffer = bufferData.buffer;
		const baseBufferByteOffset = bufferData.byteOffset;

		return new Uint8Array(
			baseBuffer,
			baseBufferByteOffset + byteOffset,
			byteLength
		);
	}

	/**
	 * Fetch the data associated with the accessor. Equivalent to `bufferViewData` for most accessors; special cases:
	 * - `accessor.bufferView` is undefined: create a buffer initialized with zeroes.
	 * - `accessor.sparse` is defined: Copy underlying buffer view and apply values from `sparse`.
	 */
	async accessorData(index: GlTfId): Promise<Uint8Array> {
		if (!this.gltf.accessors) {
			/* istanbul ignore next */
			throw new Error("No accessors views found.");
		}
		const acc = this.gltf.accessors[index];
		const elementsPerType = GLTF_ELEMENTS_PER_TYPE[acc.type];
		let data;
		if (acc.bufferView !== undefined) {
			data = await this.bufferViewData(acc.bufferView);
		} else {
			const byteSize =
				GLTF_COMPONENT_TYPE_ARRAYS[acc.componentType]
					.BYTES_PER_ELEMENT *
				elementsPerType *
				acc.count;
			data = new Uint8Array(byteSize);
		}

		if (acc.sparse) {
			// parse sparse data
			const { count, indices, values } = acc.sparse;
			let typedArray = GLTF_COMPONENT_TYPE_ARRAYS[indices.componentType];
			let bufferViewData = await this.bufferViewData(indices.bufferView);
			const indexData = new typedArray(
				bufferViewData.buffer,
				bufferViewData.byteOffset + (indices.byteOffset || 0),
				count
			);

			typedArray = GLTF_COMPONENT_TYPE_ARRAYS[acc.componentType];
			bufferViewData = await this.bufferViewData(values.bufferView);
			const valueData = new typedArray(
				(await this.bufferViewData(values.bufferView)).buffer,
				bufferViewData.byteOffset + (values.byteOffset || 0),
				count * elementsPerType
			);

			// copy base data and change it
			if (acc.bufferView) {
				// no copy necessary if no bufferView since data was created above
				data = new Uint8Array(data);
			}

			const typedData = new GLTF_COMPONENT_TYPE_ARRAYS[acc.componentType](
				data.buffer
			);
			for (let i = 0; i < count; i++) {
				for (let j = 0; j < elementsPerType; j++) {
					typedData[elementsPerType * indexData[i] + j] =
						valueData[elementsPerType * i + j];
				}
			}
		}

		return data;
	}

	/** Pre-fetches all buffer and image data. Useful to avoid stalls due to lazy loading. */
	async preFetchAll(): Promise<void[][]> {
		return Promise.all([this.bufferData.preFetchAll()]);
	}
}

// tslint:disable:max-classes-per-file
export class BufferData {
	asset: GltfAsset;
	baseUri: string;

	private bufferCache: Array<Uint8Array> = [];

	constructor(asset: GltfAsset, baseUri: string) {
		this.asset = asset;
		this.baseUri = baseUri;
	}

	/**
	 * Get the buffer data. Triggers a network request if this buffer resides
	 * in an external .bin file and is accessed for the first time (cached afterwards).
	 * when it's accessed for the first time and `preFetchAll` has not been used.
	 * To avoid any delays, use `preFetchAll` to pre-fetch everything.
	 * NOTE: To avoid any unnessary copies, the data is returned as a `Uint8Array` instead of an `ArrayBuffer`.
	 */
	get(index: GlTfId): Uint8Array {
		if (this.bufferCache[index] !== undefined) {
			return this.bufferCache[index];
		} else {
			throw new Error("External .bin not supported.");
		}
	}

	/** Pre-fetches all buffer data. */
	async preFetchAll(): Promise<void[]> {
		const buffers = this.asset.gltf.buffers;
		if (!buffers) {
			return [];
		}
		return Promise.all(buffers.map((_, i): any => this.get(i))) as Promise<
			void[]
		>;
	}
}
