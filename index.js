const entity_trigger = require('./triggers/entity');
const entity_create = require('./creates/entity');
const authentication = require('./authentication');

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: [],

  afterResponse: [],

  resources: {},

  triggers: {
    [entity_trigger.key]: entity_trigger
  },

  searches: {},

  creates: {
    [entity_create.key]: entity_create
  }
};

module.exports = App;
