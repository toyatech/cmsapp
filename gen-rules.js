var singular = require('pluralize')
  , schema = require('./schema.json');

function resolveReference(ref) {
  return schema.definitions[ref.split('/').pop()];
}

function referenceToVariable(ref) {
  var name = ref.split('/').pop();
  return '$' + name.charAt(0).toLowerCase() + name.slice(1);
}

var types = {
  object: function(object) {
    var rule = {};
    if (object.properties) {
      for (var property in object.properties) {
        rule[property] = generate(object.properties[property]);
      }
    }
    if (object.additionalProperties) {
      if (object.additionalProperties.$ref) {
        var ref = object.additionalProperties.$ref;
        rule[referenceToVariable(ref)] = generate(resolveReference(ref));
      }  
    }
    return rule;
  },
  string: function(type) {
    return { ".validate": "newData.isString()" };
  },
  number: function(type) {
    return { ".validate": "newData.isNumber()" };
  },
  boolean: function(type) {
    return { ".validate": "newData.isBoolean()" };
  }
}

function generate(object) {
  var type = object.type || 'object';
  if (object.$ref) generate(schemas.definitions[object.$ref.split('/')[2]]);
  return types[type](object);
}

console.log(JSON.stringify({rules: generate(schema)}, null, 2));
