To use this app, ask me for an invite to it in Zapier.

You will need a Drupal 8 site *without* any htaccess restrictions.
Enable basic_auth (core) module.
Add and enable JSON:API contrib module.

Configure the Zap with 'Drupal' trigger.
Enter in your url, including /jsonapi ('https://foo.com/jsonapi') and a username and password that has access to the data you're trying to get.

You should be able to map any entity creation to actions in Zapier.

To contribute, start here: https://zapier.com/developer/start/introduction
You'll need to install the zapier-cli. 
To run tests, you'll need to add a .env file with credentials to a site:

TEST_USERNAME=bot
TEST_PASSWORD=foo
TEST_URL=https://foo.com/jsonapi
TEST_ENTITY=node
TEST_BUNDLE=article
