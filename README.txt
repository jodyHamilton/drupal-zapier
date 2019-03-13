To use this app, ask me for an invite to it in Zapier.

You will need a Drupal 8 site *without* any htaccess restrictions.
Enable basic_auth (core) module.
Add and enable JSON:API contrib module.

## Getting data from Drupal

Configure a Zap with 'Drupal' trigger.
Enter in your url, including /jsonapi ('https://foo.com/jsonapi') and a username and password that has access to the data you're trying to get.

You should be able to map any entity creation to actions in Zapier.

## Creating data in Drupal

Configure a Zap with 'Drupal' action.
Enter in your url, including /jsonapi ('https://foo.com/jsonapi') and a username and password that has access to create the entity type you want to create.

There needs to be an entity of the chosen type/bundle already on the site, as it will be fetched to populate the field options.

## Contibuting

To contribute, start here: https://zapier.com/developer/start/introduction
You'll need to install the zapier-cli. 
To run tests, you'll need to add a .env file with credentials to a site:

TEST_USERNAME=bot
TEST_PASSWORD=foo
TEST_URL=https://foo.com/jsonapi
TEST_ENTITY=node
TEST_BUNDLE=article
