import { loader } from './loader';

export default loader;

// For CommonJS default export support
module.exports = loader;
module.exports.default = loader;
