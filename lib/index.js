'use strict'

var yaml = require('js-yaml'),
  fs = require('fs');

function parse(src) {
  var result = yaml.load(src);
  return result ? result : { };
}

function config(options) {
  var path = '.env.yml',
    encoding = 'utf8',
    namespace = null;

  if (options) {
    if (options.path) {
      path = options.path;
    }
    if (options.encoding) {
      encoding = options.encoding;
    }
    if (options.namespace) {
      namespace = options.namespace;
    }
  }

  try {
    var parsedDoc = parse(fs.readFileSync(path, { encoding: encoding }));
    var configObject = namespace ? parsedDoc[namespace] : parsedDoc;
    Object.keys(configObject).forEach(function(key) {
      process.env[key] = process.env[key] || configObject[key];
    });

    return { parsed: configObject };
  } catch (e) {
    return { error: e };
  }
}

module.exports.config = config;
module.exports.load = config;
module.exports.parse = parse;