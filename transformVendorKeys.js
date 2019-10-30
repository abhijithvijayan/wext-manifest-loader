const browserVendors = require('./vendors.json');

const vendorRegExp = new RegExp(`^__((?:(?:${browserVendors.join('|')})\\|?)+)__(.*)`);

/**
 *  Custom fork of https://github.com/webextension-toolbox/webpack-webextension-plugin/blob/master/manifest-utils/transform-vendor-keys.js
 */
const transformVendorKeys = (manifest, vendor) => {
	if (typeof manifest === 'object') {
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
