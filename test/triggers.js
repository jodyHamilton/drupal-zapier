// You need a .env file like
// TEST_USERNAME=bot
// TEST_PASSWORD=foo
// TEST_URL=https://foo.com/jsonapi
// TEST_ENTITY=node
// TEST_BUNDLE=article

require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('triggers', () => {

  zapier.tools.env.inject();

  describe('new entity trigger', () => {
    it('should load entities', (done) => {

      const bundle = {
        authData: {
          username: process.env.TEST_USERNAME,
          password: process.env.TEST_PASSWORD,
          url: process.env.TEST_URL
        },
        inputData: {
          entity_type: process.env.TEST_ENTITY,
          bundle: process.env.TEST_BUNDLE
        }
      };

      appTester(App.triggers.entity.operation.perform, bundle)
        .then(results => {
       //   console.log(results);
       //   console.log(results[0]);
          results.length.should.above(0);

          const firstentity = results[0];
          firstentity.type.should.eql(process.env.TEST_ENTITY + '--' + process.env.TEST_BUNDLE);

          done();
        })
        .catch(done);
    });
  });

});
