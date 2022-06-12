/**
 *  wext-manifest-loader
 *
 *  @author   abhijithvijayan <abhijithvijayan.in>
 *  @license  MIT License
 */

import fs from 'fs';
import path from 'path';
import validateOptions from 'schema-utils';
import {getOptions, interpolateName} from 'loader-utils';
import {browserVendors, LOADER_NAME} from './constants';
import {transformManifest} from './transform';

const packageJSONPath: string = path.resolve('./package.json');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const schema: any = {
  type: 'object',
  properties: {
    usePackageJSONVersion: {
      type: 'boolean',
    },
  },
};

export function loader(this, source): string {
  if (this.cacheable) {
    this.cacheable();
  }

  this.addDependency(packageJSONPath);

  // get passed options
  const options = getOptions(this);

  validateOptions(schema, options, {
    name: 'Wext Manifest Loader',
  });

  const usePackageJSONVersion: boolean =
    (options.usePackageJSONVersion && true) || false;

  let content = {};
  // parse JSON
  if (typeof source === 'string') {
    try {
      content = JSON.parse(source);
    } catch (err) {
      this.emitError(err);
    }
  }

  // get vendor name from env TARGET_BROWSER
  const vendor: string | undefined = process.env.TARGET_BROWSER;

  if (vendor) {
    // vendor not in list
    if (!browserVendors.includes(vendor)) {
      return this.emitError(
        `${LOADER_NAME}: browser ${vendor} is not supported`
      );
    }
  } else {
    return this.emitError(`${LOADER_NAME}: TARGET_BROWSER variable missing`);
  }

  // Transform manifest
  const manifest = transformManifest(content, vendor);

  // update version field with package.json version
  if (usePackageJSONVersion) {
    try {
      const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf-8'));
      // replace `2.0.0-beta.1` to `2.0.0.1`
      manifest.version = packageJSON.version.replace('-beta.', '.');
    } catch (err) {
      this.emitError(err);
    }
  }

  const outputPath: string = interpolateName(this, 'manifest.json', {
    source,
  });
  const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

  // separators \u2028 and \u2029 are treated as a new line in ES5 JavaScript and thus can break the entire JSON
  const formattedJson: string = JSON.stringify(manifest, null, 2)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  // emit file content
  this.emitFile(outputPath, formattedJson);

  return `module.exports = ${publicPath};`;
}
