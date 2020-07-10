<h1 align="center">wext-manifest-loader</h1>
<p align="center">Webpack Loader for Webextension manifest</p>
<div align="center">
  <a href="https://www.npmjs.com/package/wext-manifest-loader">
    <img src="https://img.shields.io/npm/v/wext-manifest-loader" alt="NPM" />
  </a>
  <a href="https://travis-ci.com/abhijithvijayan/wext-manifest-loader">
    <img src="https://travis-ci.com/abhijithvijayan/wext-manifest-loader.svg?branch=main" alt="Travis Build" />
  </a>
  </a>
  <a href="https://david-dm.org/abhijithvijayan/wext-manifest-loader">
    <img src="https://img.shields.io/david/abhijithvijayan/wext-manifest-loader.svg?colorB=orange" alt="DEPENDENCIES" />
  </a>
  <a href="https://github.com/abhijithvijayan/wext-manifest-loader/blob/main/license">
    <img src="https://img.shields.io/github/license/abhijithvijayan/wext-manifest-loader.svg" alt="LICENSE" />
  </a>
  <a href="https://twitter.com/intent/tweet?text=Check%20out%20wext-manifest-loader%21%20by%20%40_abhijithv%0A%0AWebpack%20Loader%20for%20Webextension%20manifest%0Ahttps%3A%2F%2Fgithub.com%2Fabhijithvijayan%2Fwext-manifest-loader%0A%0A%23webpack%20%23loader%20%23manifest%20%23javascript%20%23webextensions">
     <img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social" alt="TWEET" />
  </a>
</div>
<h3 align="center">🙋‍♂️ Made by <a href="https://twitter.com/_abhijithv">@abhijithvijayan</a></h3>
<p align="center">
  Donate:
  <a href="https://www.paypal.me/iamabhijithvijayan" target='_blank'><i><b>PayPal</b></i></a>,
  <a href="https://www.patreon.com/abhijithvijayan" target='_blank'><i><b>Patreon</b></i></a>
</p>
<p align="center">
  <a href='https://www.buymeacoffee.com/abhijithvijayan' target='_blank'>
    <img height='36' style='border:0px;height:36px;' src='https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png' border='0' alt='Buy Me a Coffee' />
  </a>
</p>
<hr />

Generate browser tailored `manifest.json` for Web Extensions that you specify properties to appear only in specific browsers.

❤️ it? ⭐️ it on [GitHub](https://github.com/abhijithvijayan/wext-manifest-loader/stargazers) or [Tweet](https://twitter.com/intent/tweet?text=Check%20out%20wext-manifest-loader%21%20by%20%40_abhijithv%0A%0AWebpack%20Loader%20for%20Webextension%20manifest%0Ahttps%3A%2F%2Fgithub.com%2Fabhijithvijayan%2Fwext-manifest-loader%0A%0A%23webpack%20%23loader%20%23manifest%20%23javascript%20%23webextensions) about it.

## Table of Contents

- [Browser Support](#browser-support)
- [Installation](#installation)
- [Usage](#usage)
- [FAQs](#faqs)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
- [LICENSE](#license)

## Browser Support

| [![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](/) | [![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](/) | [![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png)](/) | [![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](/) |
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✔ | ✔ | ✔ | ✔ |

This loader will take a definition input for the manifest, and return you content for the specified browser.

### Looking for Web Extension starter

Checkout [web-extension-starter](https://github.com/abhijithvijayan/web-extension-starter) that uses this package

## Installation

Ensure you have [Node.js](https://nodejs.org) 10 or later installed. Then run the following:

```sh
# via npm
npm install --save-dev wext-manifest-loader wext-manifest-webpack-plugin

# or yarn
yarn add wext-manifest-loader wext-manifest-webpack-plugin --dev
```

## Usage

You can easily use this module together with the [`wext-manifest-webpack-plugin`](https://www.npmjs.com/package/wext-manifest-webpack-plugin) to output the `manifest.json` as part of your build process **without** any additional js bundle and with auto rebundling on file change.

**Note:** Make sure you pass a **TARGET_BROWSER** env variable with one of `chrome/firefox/edge/opera` value

#### Sample manifest with vendor prefixed keys

<https://github.com/abhijithvijayan/web-extension-starter/blob/react-typescript/source/manifest.json>

> **webpack.config.js**

```js
// ... other plugins
const WextManifestWebpackPlugin = require("wext-manifest-webpack-plugin");

const targetBrowser = process.env.TARGET_BROWSER;
const destPath = path.join(__dirname, 'extension');

module.exports = {
    entry: {
        manifest: './src/manifest.json',
        // ...
    },

    output: {
        path: path.join(destPath, targetBrowser),
        filename: 'js/[name].bundle.js',
    },

    module: {
        rules: [
            {
                type: 'javascript/auto', // prevent webpack handling json with its own loaders,
                test: /manifest\.json$/,
                use: 'wext-manifest-loader',
                exclude: /node_modules/,
            },
        ]
    },

    plugins: [
        new WextManifestWebpackPlugin(),
        // ...
    ],
};
```

## Options

### `usePackageJSONVersion`

Type: `Boolean`
Default: `false`

If true, updates manifest.json `version` field with `package.json` version. It is often useful for easy release of web-extension.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        type: 'javascript/auto', // prevent webpack handling json with its own loaders,
        test: /manifest\.json$/,
        use: {
            loader: 'wext-manifest-loader',
            options: {
                usePackageJSONVersion: true,
            },
        },
        exclude: /node_modules/,
      },
    ],
  },
};
```

<hr />

## FAQs

### 1.What are vendor prefixed manifest keys

Vendor prefixed manifest keys allow you to write one `manifest.json` for multiple vendors.

```js
{
  "__chrome__name": "AwesomeChrome",
  "__firefox__name": "AwesomeFirefox",
  "__edge__name": "AwesomeEdge",
  "__opera__name": "AwesomeOpera"
}
```

if the **TARGET_BROWSER** is `chrome` this compiles to:

```js
{
  "name": "AwesomeChrome",
}
```

---

Add keys to multiple vendors by seperating them with `|` in the prefix

```
{
  __chrome|opera__name: "AwesomeExtension"
}
```

if the vendor is `chrome` or `opera`, this compiles to:

```
{
  "name": "AwesomeExtension"
}
```

### 2. How can I conditionally set keys based on enviroment

```js
{
  "__dev__name": "NameInDevelopment",
  "__prod__name": "NameInProduction",
}
```

if the **NODE_ENV** is `production` this compiles to:

```js
{
  "name": "NameInProduction",
}
```

else

```js
{
  "name": "NameInDevelopment",
}
```

## Issues

_Looking to contribute? Look for the [Good First Issue](https://github.com/abhijithvijayan/wext-manifest-loader/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22good+first+issue%22)
label._

### 🐛 Bugs

Please file an issue [here](https://github.com/abhijithvijayan/wext-manifest-loader/issues/new) for bugs, missing documentation, or unexpected behavior.

[**See Bugs**](https://github.com/abhijithvijayan/wext-manifest-loader/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22type%3A+bug%22)

### Linting & TypeScript Config

- Shared Eslint & Prettier Configuration - [`@abhijithvijayan/eslint-config`](https://www.npmjs.com/package/@abhijithvijayan/eslint-config)
- Shared TypeScript Configuration - [`@abhijithvijayan/tsconfig`](https://www.npmjs.com/package/@abhijithvijayan/tsconfig)

## Credits

Thanks to [@fregante](https://github.com/fregante) for suggesting to convert initial (`wext-manifest`) module to webpack loader(`wext-manifest-loader`)

## License

MIT © [Abhijith Vijayan](https://abhijithvijayan.in)
