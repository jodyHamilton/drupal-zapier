require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);
// const nock = require('nock');

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
          entity_type: 'node',
          bundle: 'program'
        }
      };

      appTester(App.triggers.entity.operation.perform, bundle)
        .then(results => {
        //  console.log(results);
       //   console.log(results[0]);
          results.length.should.above(0);

          const firstentity = results[0];
          firstentity.type.should.eql('node--program');

          done();
        })
        .catch(done);
    });
  });

});
