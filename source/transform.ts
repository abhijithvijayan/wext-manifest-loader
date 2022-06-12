import {BrowserType, ENV_REGEX, ENVKeys, VENDOR_REGEX} from './constants';

export const transformManifest = (
  manifest: Record<string, string> | string | number,
  selectedVendor: BrowserType
): any => {
  if (Array.isArray(manifest)) {
    return manifest.map((newManifest) => {
      return transformManifest(newManifest, selectedVendor);
    });
  }

  if (typeof manifest === 'object') {
    return Object.entries(manifest).reduce(
      (newManifest: Record<string, string>, [key, value]) => {
        // match with vendors regex
        const vendorMatch: RegExpMatchArray | null = key.match(VENDOR_REGEX);

        if (vendorMatch) {
          // match[1] => 'opera|firefox' => ['opera', 'firefox']
          const vendors: string[] = vendorMatch[1].split('|');

          // Swap key with non prefixed name
          if (vendors.includes(selectedVendor)) {
            // match[2] => will be the key
            newManifest[vendorMatch[2]] = transformManifest(
              value,
              selectedVendor
            );
          }
        } else {
          // if no vendor keys are present, check if env keys are present
          const envMatch: RegExpMatchArray | null = key.match(ENV_REGEX);
          if (envMatch) {
            const isProd: boolean = process.env.NODE_ENV === 'production';
            const envKey: string = envMatch[1];

            // inject keys based on environment and keys passed
            if (
              (!isProd && envKey === ENVKeys.DEV) ||
              (isProd && envKey === ENVKeys.PROD)
            ) {
              // match[2] => will be the key
              newManifest[envMatch[2]] = transformManifest(
                value,
                selectedVendor
              );
            }
          } else {
            newManifest[key] = transformManifest(value, selectedVendor);
          }
        }

        return newManifest;
      },
      {}
    );
  }

  return manifest;
};
