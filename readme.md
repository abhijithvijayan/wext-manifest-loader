# wext-manifest-loader [![npm version](https://img.shields.io/npm/v/wext-manifest-loader)](https://www.npmjs.com/package/wext-manifest-loader)

> Webpack Loader for Webextension manifest

Generate browser tailored `manifest.json` for Web Extensions that you specify properties to appear only in specific browsers.

<h3>🙋‍♂️ Made by <a href="https://twitter.com/_abhijithv">@abhijithvijayan</a></h3>
<p>
  Donate:
  <a href="https://www.paypal.me/iamabhijithvijayan" target='_blank'><i><b>PayPal</b></i></a>,
  <a href="https://www.patreon.com/abhijithvijayan" target='_blank'><i><b>Patreon</b></i></a>
</p>
<p>
  <a href='https://www.buymeacoffee.com/abhijithvijayan' target='_blank'>
    <img height='36' style='border:0px;height:36px;' src='https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png' border='0' alt='Buy Me a Coffee' />
  </a>
</p>
<hr />

## Browser Support

| [![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](/) | [![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](/) | [![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png)](/) | [![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](/) |
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✔ | ✔ | ✔ | ✔ |

This loader will take a definition input for the manifest, and return you content for the specified browser.

### Looking for Web Extension starter?

Checkout [web-extension-starter](https://github.com/abhijithvijayan/web-extension-starter) that uses this package

## Installation

```sh
# npm
npm install --save-dev wext-manifest-loader wext-manifest-webpack-plugin

# yarn
yarn add wext-manifest-loader wext-manifest-webpack-plugin --dev
```

## Usage

You can easily use this module together with the [`wext-manifest-webpack-plugin`](https://www.npmjs.com/package/wext-manifest-webpack-plugin) to output the `manifest.json` as part of your build process **without** any additional js bundle and with auto rebundling on file change.

**Note:** Make sure you pass a **TARGET_BROWSER** env variable with one of `chrome/firefox/edge/opera` value

#### Sample manifest with vendor prefixed keys:
https://github.com/abhijithvijayan/web-extension-starter/blob/react-typescript/source/manifest.json

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

### What are vendor prefixed manifest keys?

Vendor prefixed manifest keys allow you to write one `manifest.json` for multiple vendors.

```js
{
  "__chrome__name": "AwesomeChrome",
  "__firefox__name": "AwesomeFirefox",
  "__edge__name": "AwesomeEdge",
  "__opera__name": "AwesomeOpera"
}
```

if the vendor is `chrome` this compiles to:

```js
{
  "name": "AwesomeChrome",
}
```

---

Add keys to multiple vendors by seperating them with | in the prefix

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

## Credits
Thanks to [@fregante](https://github.com/fregante) for suggesting to convert initial (`wext-manifest`) module to webpack loader(`wext-manifest-loader`)

## Show your support

Give a ⭐️ if this project helped you!

## License

MIT © [Abhijith Vijayan](https://abhijithvijayan.in)
