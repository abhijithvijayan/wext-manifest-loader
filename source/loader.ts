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

const LOADER_NAME = 'wext-manifest-loader';
const packageJSONPath: string = path.resolve('./package.json');
const browserVendors: string[] = ['chrome', 'firefox', 'opera', 'edge'];
const envVariables: string[] = ['dev', 'prod'];
// https://regex101.com/r/CNy9Qc/1
const vendorRegExp = new RegExp(
  `^__((?:(?:${browserVendors.join('|')})\\|?)+)__(.*)`
);
// https://regex101.com/r/EBf90P/2
const environmentRegExp = new RegExp(
  `^__((?:(?:${envVariables.join('|')})))__(.*)`
);
enum ENV_KEYS {
  DEV = 'dev',
  PROD = 'prod',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const schema: any = {
  type: 'object',
  properties: {
    usePackageJSONVersion: {
      type: 'boolean',
    },
  },
};

// Manually Forked from `webextension-toolbox/webpack-webextension-plugin`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformVendorKeys = (manifest, vendor: string): any => {
  if (Array.isArray(manifest)) {
    return manifest.map((newManifest) => {
      return transformVendorKeys(newManifest, vendor);
    });
  }

  if (typeof manifest === 'object') {
    return Object.entries(manifest).reduce((newManifest, [key, value]) => {
      // match with vendors regex
      const vendorMatch: RegExpMatchArray | null = key.match(vendorRegExp);

      if (vendorMatch) {
        // match[1] => 'opera|firefox' => ['opera', 'firefox']
        const vendors: string[] = vendorMatch[1].split('|');

        // Swap key with non prefixed name
        if (vendors.indexOf(vendor) > -1) {
          // match[2] => will be the key
          newManifest[vendorMatch[2]] = value;
        }
      } else {
        // if no vendor keys are present, check if env keys are present
        const envMatch: RegExpMatchArray | null = key.match(environmentRegExp);

        if (envMatch) {
          const isProd: boolean = process.env.NODE_ENV === 'production';
          const envKey: string = envMatch[1];

          // inject keys based on enviroment and keys passed
          if (
            (!isProd && envKey === ENV_KEYS.DEV) ||
            (isProd && envKey === ENV_KEYS.PROD)
          ) {
            // match[2] => will be the key
            newManifest[envMatch[2]] = value;
          }
        } else {
          newManifest[key] = transformVendorKeys(value, vendor);
        }
      }

      return newManifest;
    }, {});
  }

  return manifest;
};

export function loader(context: any, source): void {
  if (context.cacheable) {
    context.cacheable();
  }

  context.addDependency(packageJSONPath);

  // get passed options
  const options = getOptions(context);

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
      context.emitError(err);
    }
  }

  // get vendor name from env TARGET_BROWSER
  const vendor: string | undefined = process.env.TARGET_BROWSER;

  if (vendor) {
    // vendor not in list
    if (browserVendors.indexOf(vendor) < 0) {
      return context.emitError(
        `${LOADER_NAME}: browser ${vendor} is not supported`
      );
    }
  } else {
    return context.emitError(`${LOADER_NAME}: TARGET_BROWSER variable missing`);
  }

  // Transform manifest
  const manifest = transformVendorKeys(content, vendor);

  // update version field with package.json version
  if (usePackageJSONVersion) {
    try {
      const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf-8'));
      // replace `2.0.0-beta.1` to `2.0.0.1`
      manifest.version = packageJSON.version.replace('-beta.', '.');
    } catch (err) {
      context.emitError(err);
    }
  }

  const outputPath: string = interpolateName(context, 'manifest.json', {
    source,
  });
  // const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

  // separators \u2028 and \u2029 are treated as a new line in ES5 JavaScript and thus can break the entire JSON
  const formattedJson: string = JSON.stringify(manifest, null, 2)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  // emit file content
  context.emitFile(outputPath, formattedJson);
}
