const fs = require('fs');
const mkdirp = require('mkdirp');
const rmdirp = require('rmdirp');
const _ = require('lodash');

const templatesDir = '/home/dlittle/Projects/mean-templates/templates/';
const schemasDir = '/home/dlittle/Projects/cmsapp/schemas/';

const templates = {
  servers: {
    models: _.template(
      fs.readFileSync(templatesDir + 'server/models/model.jst'),
      { 'imports': require(templatesDir + 'server/models/imports') }
    )
  }
}

const schemas = {
  'cmsapp-contacts': {
    'Church': require(schemasDir + 'cmsapp-contacts/Person.json')
  }
}

console.log(templates.servers.models(schemas['cmsapp-contacts'].Church));
