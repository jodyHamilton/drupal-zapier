const entity = require('./triggers/entity');
const authentication = require('./authentication');

// Now we can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: [],

  afterResponse: [],

  resources: {},

  triggers: {
    [entity.key]: entity
  },

  searches: {},

  creates: {}
};

// Finally, export the app.
module.exports = App;
