'use strict'

var yaml = require('js-yaml'),
  fs = require('fs');

function parse(src) {
  return yaml.load(src);
}

function config(options) {
  var path = '.env.yml',
    encoding = 'utf8';

  if (options) {
    if (options.path) {
      path = options.path;
    }
    if (options.encoding) {
      encoding = options.encoding;
    }
  }

  try {
    var parsedDoc = parse(fs.readFileSync(path, { encoding: encoding }));

    console.log(parsedDoc);

    Object.keys(parsedDoc).forEach(function(key) {
      process.env[key] = process.env[key] || parsedDoc[key];
    });

    return { parsed: parsedDoc };
  } catch (e) {
    return { error: e };
  }
}

module.exports.config = config;
module.exports.load = config;
module.exports.parse = parse;