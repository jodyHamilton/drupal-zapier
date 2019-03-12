const listentities = (z, bundle) => {
  // `z.console.log()` is similar to `console.log()`.

  const params = {};

  // You can build requests and our client will helpfully inject all the variables
  // you need to complete. You can also register middleware to control this.
  const requestOptions = {
    url: '{{bundle.authData.url}}/{{bundle.inputData.entity_type}}/{{bundle.inputData.bundle}}',
    params: params
  };  

  // You may return a promise or a normal data structure from any perform method.
  return z.request(requestOptions)
    .then(response => z.JSON.parse(response.content).data);
};

const dynamicFields = (z, bundle) => {
  const response = z.request({url: '{{bundle.authData.url}}'});
  return response.then(function(response) { 
    const content = z.JSON.parse(response.content);
    const links = content.links;
    var raw = Object.keys(links);
    var split = [];
    var entities = {};
    var bundles = {};

    for (let key of raw) {
      split = key.split('--');
      entities[split[0]] = split[0];
      if (bundle.inputData.entity_type) {
        if (bundle.inputData.entity_type == split[0]) {
          bundles[split[1]] = split[1];
        }
      }
      else {
        bundles[split[1]] = split[1];
      }
    }

    return [
      {key: 'entity_type', choices: entities, helpText: 'Which Drupal entity type should we watch.', required: true, altersDynamicFields: true},
      {key: 'bundle', choices: bundles,  helpText: 'Which bundle should we watch.', required: true}
    ];
  });
};

// We recommend writing your triggers separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'entity',

  noun: 'entity',
  display: {
    label: 'New Entity',
    description: 'Trigger when a new entity is added.'
  },

  operation: {

    inputFields: [
      dynamicFields
    ],

    perform: listentities,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      id: '22ba8c8d-db9a-4dbd-a01d-ac404d2336c1',
      type: 'node--program'
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    //   outputFields: [
    //    () => { return []; }
    //   ]
    // For a more complete example of using dynamic fields see
    // https://github.com/zapier/zapier-platform-cli#customdynamic-fields.
    // Alternatively, a static field definition should be provided, to specify labels for the fields

    // Get this from Drupal.

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'type', label: 'Type'}
    ]
  },

};
