/**
 *  @author abhijithvijayan <abhijithvijayan.in>
 */

const transformVendorKeys = require('./transformVendorKeys');

exports.chrome = input => {
	const manifest = transformVendorKeys(input, 'chrome');

	return { name: 'manifest.json', content: JSON.stringify(manifest, null, 2) };
};

exports.firefox = input => {
	const manifest = transformVendorKeys(input, 'firefox');

	return { name: 'manifest.json', content: JSON.stringify(manifest, null, 2) };
};

exports.opera = input => {
	const manifest = transformVendorKeys(input, 'opera');

	return { name: 'manifest.json', content: JSON.stringify(manifest, null, 2) };
};

exports.edge = input => {
	const manifest = transformVendorKeys(input, 'edge');

	return { name: 'manifest.json', content: JSON.stringify(manifest, null, 2) };
};
