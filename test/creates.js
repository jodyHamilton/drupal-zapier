require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('creates', () => {

  describe('create entity', () => {
    it('should create a new entity', (done) => {
      const bundle = {
        authData: {
          username: process.env.TEST_USERNAME,
          password: process.env.TEST_PASSWORD,
          url: process.env.TEST_URL
        },
        inputData: {
          entity_type: process.env.TEST_ENTITY,
          bundle: process.env.TEST_BUNDLE,
          title: 'test'
        }
      };

      appTester(App.creates.entity.operation.perform, bundle)
        .then((result) => {
          result.data.should.have.property('id');
          done();
        })
        .catch(done);
    });
  });
});