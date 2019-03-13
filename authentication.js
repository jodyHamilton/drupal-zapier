'use strict';
const test = (z , bundle) => {
  return z.request({
      url: bundle.authData.url,
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error('We did not get JSON from the URL you configured. Check that you have JSON:API enabled.');
      }
      return response;
    });
};

const authentication = {
  type: 'basic',
  test: test,
  connectionLabel: '{{bundle.authData.url}}',
  fields: [
    {
      key: 'url',
      type: 'string',
      required: true,
      helpText: 'URL to your JSON:API endpoint. For example, https://foo.com/jsonapi. You need to enable JSON:API module and core Basic Auth modules on your Drupal 8 site.'
    }
  ]
};

module.exports = authentication;

