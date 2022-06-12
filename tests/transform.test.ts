import {transformManifest} from '../source/transform';
import {Browser} from '../source/constants';

describe('transformManifest tests', () => {
  it('should return empty object', () => {
    expect(transformManifest({}, 'chrome')).toEqual({});
  });

  it('should return correct JSON for JSON without vendor prefixes', () => {
    expect(
      transformManifest(
        JSON.parse(`
			{
			  "name": "test",
			  "manifest_version": 2
			}
        `),
        Browser.CHROME
      )
    ).toEqual(
      JSON.parse(`
			{
			  "name": "test",
			  "manifest_version": 2
			}
      `)
    );
  });
});

describe('Vendor Tests', () => {
  //
});

describe('chrome tests', () => {
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

  it('nested vendor keys', () => {
    expect(
      transformManifest(
        JSON.parse(`
			{
			 "options_ui": {
				"page": "options.html",
				"open_in_tab": true,
				"__chrome__chrome_style": false,
				"__firefox|opera__browser_style": false
			  }
			}
        `),
        Browser.CHROME
      )
    ).toEqual(
      JSON.parse(`
			{
			 "options_ui": {
				"page": "options.html",
				"open_in_tab": true,
				"chrome_style": false
			  }
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

  it('nested vendor keys', () => {
    expect(
      transformManifest(
        JSON.parse(`
			{
			 "options_ui": {
				"page": "options.html",
				"open_in_tab": true,
				"__chrome__chrome_style": false,
				"__firefox|opera__browser_style": false
			  }
			}
        `),
        Browser.FIREFOX
      )
    ).toEqual(
      JSON.parse(`
			{
			 "options_ui": {
				"page": "options.html",
				"open_in_tab": true,
				"browser_style": false
			  }
			}
      `)
    );
  });
});
