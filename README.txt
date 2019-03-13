To use this app, ask me for an invite to it in Zapier.

You will need a Drupal 8 site *without* any htaccess restrictions.
Enable basic_auth (core) module.
Add and enable JSON:API contrib module.

Configure the Zap with 'Drupal' trigger.
Enter in your url, including /jsonapi ('https://foo.com/jsonapi') and a username and password that has access to the data you're trying to get.

You should be able to map any entity creation to actions in Zapier.
