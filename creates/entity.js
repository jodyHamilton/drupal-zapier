
const dynamicFields = (z, bundle) => {
  const response = z.request({url: '{{bundle.authData.url}}'});
  return response.then(function(response) { 
    const content = z.JSON.parse(response.content);
    const links = content.links;
    var raw = Object.keys(links);
    var split = [];
    var entities = {};
    var bundles = {};
    var perBundleFields = {};
    var fields = [];
    fields.push({key: 'entity_type', choices: entities, helpText: 'Which Drupal entity type should we create.', required: true, altersDynamicFields: true});
    fields.push({key: 'bundle', choices: bundles,  helpText: 'Which bundle should we create. We will use the newest entity of this type to populate the available fields.', required: true, altersDynamicFields: true});

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

    if (bundle.inputData.entity_type && bundle.inputData.bundle) {
      perBundleFields = z.request({url: '{{bundle.authData.url}}/{{bundle.inputData.entity_type}}/{{bundle.inputData.bundle}}'})
        .then(function(response) {
           var content = z.JSON.parse(response.content).data;
           var sample = data[0];
           for (let key of sample) {
             fields.push({key: key, type: 'text'});
           }
        });
    }
    return fields;

  });
};

module.exports = {
  key: 'entity',
  noun: 'Entity',
  display: {
    label: 'Create Entity',
    description: 'Creates a new entity.'
  },


  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
      dynamicFields
    ],
    perform: (z, bundle) => {
      const promise = z.request({
        url: bundle.authData.url + '/' + bundle.inputData.entity_type + '/' + bundle.inputData.bundle,
        method: 'POST',
        headers: {'Content-type': 'application/vnd.api+json'},
        body: JSON.stringify({
          data: {
            type: bundle.inputData.entity_type + '--' + bundle.inputData.bundle,
            attributes: {
              title: bundle.inputData.title
            }
          }
        })
      });

      return promise.then((response) => JSON.parse(response.content));
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      id: '22ba8c8d-db9a-4dbd-a01d-ac404d2336c1',
      type: 'node--program'
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'type', label: 'Type'}
    ]
  }
};
