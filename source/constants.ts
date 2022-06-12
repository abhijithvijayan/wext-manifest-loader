export const LOADER_NAME = 'wext-manifest-loader';

export const ENVKeys = {
  DEV: 'dev',
  PROD: 'prod',
} as const;

export const Browser = {
  CHROME: 'chrome',
  FIREFOX: 'firefox',
  OPERA: 'opera',
  EDGE: 'edge',
} as const;
export type BrowserType = typeof Browser[keyof typeof Browser];

export const browserVendors: BrowserType[] = [
  Browser.CHROME,
  Browser.FIREFOX,
  Browser.OPERA,
  Browser.EDGE,
];
export const envVariables: string[] = [ENVKeys.DEV, ENVKeys.PROD];

// https://regex101.com/r/CNy9Qc/1
export const VENDOR_REGEX = new RegExp(
  `^__((?:(?:${browserVendors.join('|')})\\|?)+)__(.*)`
);

// https://regex101.com/r/EBf90P/2
export const ENV_REGEX = new RegExp(
  `^__((?:(?:${envVariables.join('|')})))__(.*)`
);
