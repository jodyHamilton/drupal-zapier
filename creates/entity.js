


const dynamicFields = (z, bundle) => {
  const getFields = (parent_key, value) => {
    var raw = Object.keys(value);
    var new_fields = [];
    for (let key of raw) {
      var combo_key = key;
      if (parent_key !== '') {
        combo_key = parent_key + '.' + key;
      }
      if (typeof value[key] === 'object' && value[key] !== null) {
        var fields = getFields(combo_key, value[key]);
        var fields_array = Object.keys(fields);
        for (let new_key of fields_array) {
          new_fields.push(fields[new_key]);
        }
      }
      else {
        // We don't need the top-level 'type' field.
        if (combo_key !== 'type') {
          new_fields.push({key: combo_key, type: 'text'});
        }
      }
    }
    return new_fields;
  }

  if (bundle.inputData.entity_type && bundle.inputData.bundle) {
    return z.request({url: '{{bundle.authData.url}}/{{bundle.inputData.entity_type}}/{{bundle.inputData.bundle}}'}).then(function(response) { 
      var content = z.JSON.parse(response.content);
      var data = content.data;
      var sample = data[0];
      // Recursively make fields out of multidimensional data.
      return getFields('', sample);
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
      var data = {};
      data['type'] = bundle.inputData.entity_type + '--' + bundle.inputData.bundle;
      // Turn inputData into a multidimensional object.
      var inputData = bundle.inputData;
      var inputArray = Object.keys(inputData);
      for (let key of inputArray) {
        if (key !== 'entity_type' && key !== 'bundle') {
          var keyArray = key.split('.');
          keyArray.reverse();
          var innerData = {};
          var depthKeys = Object.keys(keyArray);
          for (let depth of depthKeys) {
            if (depth == 0) {
              innerData[keyArray[depth]] = inputData[key];
            }
            else if (depth == (keyArray.length - 1)) {
              data[keyArray[depth]] = innerData;
            }
            else {
              var newObj = {};
              newObj[keyArray[depth]] = innerData;
              innerData = newObj;
            }  
          }
        }
      }
      const promise = z.request({
        url: bundle.authData.url + '/' + bundle.inputData.entity_type + '/' + bundle.inputData.bundle,
        method: 'POST',
        headers: {'Content-type': 'application/vnd.api+json'},
        body: JSON.stringify({
          data: data
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
