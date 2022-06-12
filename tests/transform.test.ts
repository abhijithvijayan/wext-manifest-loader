import {transformManifest} from '../source/transform';

describe('transformManifest tests', () => {
  it('should return empty object', () => {
    expect(transformManifest({}, 'chrome')).toEqual({});
  });
});
