/**
 *  @author abhijithvijayan <abhijithvijayan.in>
 */

const transformVendorKeys = require('./transformVendorKeys');

exports.chrome = input => {
	const manifest = transformVendorKeys(input, 'chrome');
	return { name: 'manifest.json', content: JSON.stringify(manifest) };
};

exports.firefox = input => {
	const manifest = transformVendorKeys(input, 'firefox');
	return { name: 'manifest.json', content: JSON.stringify(manifest) };
};

exports.opera = input => {
	const manifest = transformVendorKeys(input, 'opera');
	return { name: 'manifest.json', content: JSON.stringify(manifest) };
};

exports.edge = input => {
	const manifest = transformVendorKeys(input, 'edge');
	return { name: 'manifest.json', content: JSON.stringify(manifest) };
};
