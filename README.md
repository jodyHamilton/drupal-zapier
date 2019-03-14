## Getting started using this app

To use this app, please ask me for a 'Zapier invite': I'll need your email. You can hit me up at my [Drupal contact form](https://www.drupal.org/u/jody-lynn) You'll get an email from [Zapier](https://zapier.com/app/home) and then you will be able to use a 'Drupal' trigger or action when creating a 'zap' in zapier.

You can optionally clone this repo and push your own forked version of the app in order to use it, but I need users with live zaps in order to get the app published.

You will need a Drupal 8 site *without* any htaccess restrictions.

Enable basic_auth (core) module.

Add and enable JSON:API contrib module.

## Getting data from Drupal

Configure a Zap with 'Drupal' trigger.
Enter in your url, including /jsonapi ('https://foo.com/jsonapi') and a username and password that has access to the data you're trying to get.

You should be able to map any entity creation to actions in Zapier.

A quick first experiment: Have Zapier send you a direct Slack message or email when someone posts a new Drupal node. Or send new user registrations into your CRM. (Sir, is that even GDPR compliant?)

## Creating data in Drupal

Configure a Zap with 'Drupal' action.
Enter in your url, including /jsonapi ('https://foo.com/jsonapi') and a username and password that has access to create the entity type you want to create.

There needs to be an entity of the chosen type/bundle already on the site, as it will be fetched to populate the field options.

## Contributing

To contribute, start here: https://zapier.com/developer/start/introduction
You'll need to install the zapier-cli. 
To run tests, you'll need to add a .env file with credentials to a site:

TEST_USERNAME=bot

TEST_PASSWORD=foo

TEST_URL=https://foo.com/jsonapi

TEST_ENTITY=node

TEST_BUNDLE=article
