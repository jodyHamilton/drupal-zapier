'use strict';

const authentication = {
  type: 'basic',
  test: {
    url: '{{bundle.authData.url}}'
  },
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

