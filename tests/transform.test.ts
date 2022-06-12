import {transformManifest} from '../source/transform';
import {Browser} from '../source/constants';

describe('transformManifest tests', () => {
  it('should return empty object', () => {
    expect(transformManifest({}, 'chrome')).toEqual({});
  });

  it('should return correct JSON for chrome', () => {
    expect(
      transformManifest(
        JSON.parse(`
			{
			  "__chrome|opera|edge__manifest_version": 3,
			  "__firefox__manifest_version": 2
			}
        `),
        Browser.CHROME
      )
    ).toEqual(
      JSON.parse(`
			{
			  "manifest_version": 3
			}
      `)
    );
  });
});

describe('firefox tests', () => {
  it('should return correct JSON for firefox', () => {
    expect(
      transformManifest(
        JSON.parse(`
			{
			  "__chrome|opera|edge__manifest_version": 3,
			  "__firefox__manifest_version": 2
			}
        `),
        Browser.FIREFOX
      )
    ).toEqual(
      JSON.parse(`
			{
			  "manifest_version": 2
			}
      `)
    );
  });
});
