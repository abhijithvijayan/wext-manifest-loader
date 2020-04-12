# Migrating from [wext-manifest](https://www.npmjs.com/package/wext-manifest) to [wext-manifest-loader](https://www.npmjs.com/package/wext-manifest-loader)

Instead of having manifest inside webpack configuration, the `manifest.json` could be handled by the loader.
The loader doesn't have to rely on `write-webpack-plugin` to emit the json file.

Webpack emits a `js` file for every `entry` in webpack configuration.

The loader is now in conjunction with **[wext-manifest-webpack-plugin](https://www.npmjs.com/package/wext-manifest-webpack-plugin)** to avoid compiling `js` for the manifest entry

<hr />

### Remove deprecated packages

```sh
yarn remove wext-manifest write-webpack-plugin
```

### Add loader & plugin

```sh
yarn add wext-manifest-loader wext-manifest-webpack-plugin --dev
```

### Changes in Webpack Configuration

```
// - Deletions, + Additions

// ... other plugins
-   const wextManifest = require('wext-manifest');
-   const WriteWebpackPlugin = require('write-webpack-plugin');
+   const WextManifestWebpackPlugin = require('wext-manifest-webpack-plugin');

-   const manifestInput = require('./src/manifest');
-   const manifest = wextManifest[targetBrowser](manifestInput);

module.exports = {
    entry: {
  +    manifest: './src/manifest.json',
        // ... other entries
    },

    module: {
        rules: [
  +         {
              type: 'javascript/auto', // prevent webpack handling json with its own loaders,
              test: /manifest\.json$/,
              use: 'wext-manifest-loader',
              exclude: /node_modules/,
           },
        ]
    }

    plugins: [
  -     new WriteWebpackPlugin([{ name: manifest.name, data: Buffer.from(manifest.content) }]),
  +     new WextManifestWebpackPlugin(),
        // ... other plugins
    ]
};
```

## The `manifest` file

Copy contents of `src/manifest/index.js` and transform it to `src/manifest.json` using an online json transformer

**Input**
```js
// -- src/manifest/index.js

-   const pkg = require('../../package.json');

-   const manifestInput = {
    manifest_version: 2,
    name: 'Sample WebExtension',
    version: pkg.version,
    ...
}
```
**Output**
```js
// ++ src/manifest.json

{
    "manifest_version": 2,
    "name": 'Sample WebExtension',
    "version": "0.0.0",
    ...
}

```

And you are all set

<hr />

See the commit https://github.com/abhijithvijayan/web-extension-starter/commit/fadc746bc734f346f7df977d4273bafea6d04169 for the applied changes