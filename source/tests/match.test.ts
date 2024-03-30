import {CUSTOM_PREFIX_REGEX} from '../constants';

describe('RegExp tests', () => {
  const invalidMatches = [
    'key',
    '__key__',
    'chrome',
    'CHROME',
    'dev',
    'DEV',
    '__dev_',
    'prod',
    '__DEV__',
    '__PROD__',
    '__chrome|typo__',
  ];

  test.each(invalidMatches)('should return false for %s', (input) => {
    expect(CUSTOM_PREFIX_REGEX.test(input)).toEqual(false);
  });

  const validMatches = [
    '__dev__',
    '__prod__',
    '__chrome__key',
    '__chrome|firefox__key',
    '__chrome|firefox|opera__key',
    '__chrome|firefox|opera|edge__key',
    '__chrome|chrome__key',
    '__chrome|dev__key',
    '__chrome|prod__key',
    '__chrome|firefox|dev__key',
    '__chrome|firefox|prod__key',
  ];

  test.each(validMatches)('should return true for %s', (input) => {
    expect(CUSTOM_PREFIX_REGEX.test(input)).toEqual(true);
  });
});
