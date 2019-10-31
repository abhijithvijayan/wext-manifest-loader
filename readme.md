# wext-manifest [![npm version](https://img.shields.io/npm/v/wext-manifest)](https://www.npmjs.com/package/wext-manifest)

> Webextension Manifest Generator

Package that compiles manifest.json files for WebExtensions

## Browser Support

| [![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](https://chrome.google.com/webstore/detail/kutt/pklakpjfiegjacoppcodencchehlfnpd) | [![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](https://addons.mozilla.org/firefox/addon/kutt/) | [![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png)](CONTRIBUTING.md#for-opera-users) |
![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 49 & later ✔ | 52 & later ✔ | 36 & later ✔ | Latest ✔ |

This module will take a definition input for the manifest, and return you filename and content for the specified browser.

### Looking for Web Extension starter?

Checkout [web-extension-starter](https://github.com/abhijithvijayan/web-extension-starter) that uses this package

## Installation

```sh
npm install --save wext-manifest
```

## Usage

```js
const wextManifest = require("wext-manifest");

const input = {
	manifest_version: 2,
	name: "Sample WebExtension",
	version: "0.0.1",

	icons: {
		"16": "assets/icons/favicon-16.png",
		"32": "assets/icons/favicon-32.png",
		"48": "assets/icons/favicon-48.png",
		"128": "assets/icons/favicon-128.png"
	},

	description: "Sample description",
	homepage_url: "https://github.com/abhijithvijayan/web-extension-starter",
	short_name: "Sample Name",

	permissions: ["tabs", "storage", "http://*/*", "https://*/*"],
	content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",

	"__chrome|firefox__author": "abhijithvijayan",
	__opera__developer: {
		name: "abhijithvijayan"
	},

	__firefox__applications: {
		gecko: { id: "{754FB1AD-CC3B-4856-B6A0-7786F8CA9D17}" }
	},

	__chrome__minimum_chrome_version: "49",
	__opera__minimum_opera_version: "36",

	browser_action: {
		default_popup: "popup.html",
		default_icon: {
			"16": "assets/icons/favicon-16.png",
			"32": "assets/icons/favicon-32.png",
			"48": "assets/icons/favicon-48.png",
			"128": "assets/icons/favicon-128.png"
		},
		default_title: "tiny title",
		"__chrome|opera__chrome_style": false,
		__firefox__browser_style: false
	},

	"__chrome|opera__options_page": "options.html",

	options_ui: {
		page: "options.html",
		open_in_tab: true,
		__chrome__chrome_style: false
	}
};

console.log(wextManifest.firefox(input));
// => { name: 'manifest.json', content: '{"manifest_version":2...' }
```

### What are vendor prefixed manifest keys?

Vendor prefixed manifest keys allow you to write one `manifest.json` for multiple vendors.

```js
{
  "__chrome__name": "AwesomeChrome",
  "__firefox__name": "AwesomeFox",
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

## With Webpack

You can easily use this module together with the [`write-webpack-plugin`](https://www.npmjs.com/package/write-webpack-plugin) to output the manifest file as part of your build process.

The following example will create `extension/firefox/manifest.json` when `TARGET_BROWSER=firefox`.

```js
const path = require("path");
const wextManifest = require("wext-manifest");
const WriteWebpackPlugin = require("write-webpack-plugin");

const targetBrowser = process.env.TARGET_BROWSER;

const manifest = wextManifest[targetBrowser]({
	// Manifest input
});

module.exports = {
	// ...

	output: {
		path: path.join(__dirname, "extension", targetBrowser),
		filename: "[name].js"
	},

	plugins: [
		// ...

		new WriteWebpackPlugin([
			{ name: manifest.name, data: Buffer.from(manifest.content) }
		])
	]
};
```

## Show your support

Give a ⭐️ if this project helped you!

## License

MIT © [Abhijith Vijayan](https://abhijithvijayan.in)
