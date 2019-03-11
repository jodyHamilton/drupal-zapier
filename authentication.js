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
      helpText: 'URL to your JSON:API endpoint. For example, https://foo.com/jsonapi.'
    }
  ]
};

module.exports = authentication;

