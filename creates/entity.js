


const dynamicFields = (z, bundle) => {
  const getFields = (og_key, value) => {
    var raw = Object.keys(value);
    var new_fields = [];
    for (let key of raw) {
      if (typeof value[key] === 'object' && value[key] !== null) {
        var fields = getFields(og_key + '.' + key, value[key]);
        var fields_array = Object.keys(fields);
        for (let new_key of fields_array) {
          new_fields.push(fields[new_key]);
        }
      }
      else {
        new_fields.push({key: og_key + '.' + key, type: 'text'});
      }
    }
    return new_fields;
  }

  if (bundle.inputData.entity_type && bundle.inputData.bundle) {
    return z.request({url: '{{bundle.authData.url}}/{{bundle.inputData.entity_type}}/{{bundle.inputData.bundle}}'}).then(function(response) { 
      var new_fields = [];
      var content = z.JSON.parse(response.content);
      var data = content.data;
      var sample = data[0];
      var raw = Object.keys(sample);
      for (let key of raw) {
        if (typeof sample[key] === 'object' && sample[key] !== null) {
          var fields = getFields(key, sample[key]);
          var fields_array = Object.keys(fields);
          for (let new_key of fields_array) {
            new_fields.push(fields[new_key]);
          }
        }
        else {
          new_fields.push({key: key, type: 'text'});
        }
      }
      return new_fields;
    });
  }
  return [];
};

const dynamicBasic = (z, bundle) => {
  return z.request({url: '{{bundle.authData.url}}'}).then(function(response) { 
    const content = z.JSON.parse(response.content);
    const links = content.links;
    var raw = Object.keys(links);
    var split = [];
    var entities = {};
    var bundles = {};
    var fields = [];
    
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
    fields.push({key: 'entity_type', choices: entities, helpText: 'Which Drupal entity type should we create.', required: true, altersDynamicFields: true});
    fields.push({key: 'bundle', choices: bundles,  helpText: 'Which bundle should we create. We will use the newest entity of this type to populate the available fields.', required: true, altersDynamicFields: true});
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
      dynamicBasic,
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
