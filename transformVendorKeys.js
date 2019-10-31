const browserVendors = require('./vendors.json');

const vendorRegExp = new RegExp(`^__((?:(?:${browserVendors.join('|')})\\|?)+)__(.*)`);

/**
 *  Custom fork of `webextension-toolbox/webpack-webextension-plugin
 */
const transformVendorKeys = (manifest, vendor) => {
	// [fix] arrays transforming to objects
	if (typeof manifest === 'object' && !Array.isArray(manifest)) {
		return Object.entries(manifest).reduce((newManifest, [key, value]) => {
			const match = key.match(vendorRegExp);

			if (match) {
				const vendors = match[1].split('|');

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

module.exports = transformVendorKeys;
