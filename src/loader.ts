const browserVendors: string[] = ['chrome', 'firefox', 'opera', 'edge'];
const vendorRegExp = new RegExp(`^__((?:(?:${browserVendors.join('|')})\\|?)+)__(.*)`);

/**
 *  Fork of `webextension-toolbox/webpack-webextension-plugin`
 */
const transformVendorKeys = (manifest, vendor: string) => {
	if (Array.isArray(manifest)) {
		return manifest.map((newManifest) => {
			return transformVendorKeys(newManifest, vendor);
		});
	}

	if (typeof manifest === 'object') {
		return Object.entries(manifest).reduce((newManifest, [key, value]) => {
			const match = key.match(vendorRegExp);

			if (match) {
				const vendors: string[] = match[1].split('|');

				// Swap key with non prefixed name
				if (vendors.indexOf(vendor) > -1) {
					newManifest[match[2]] = value;
				}
			} else {
				newManifest[key] = transformVendorKeys(value, vendor);
			}

			return newManifest;
		}, {});
	}

	return manifest;
};

export default function (content): string {
	// eslint-disable-next-line no-unused-expressions
	this.cacheable && this.cacheable();

	const manifest = typeof content === 'string' ? JSON.parse(content) : content;
	// ToDo: get vendor name from env TARGET_BROWSER
	const transform = transformVendorKeys(manifest, 'firefox');

	return `${transform}`;
}
