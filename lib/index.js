'use strict'

const {readFileSync} = require('fs');

const {load} = require('js-yaml');


function loadIntoEnv(parsed)
{
  const {env} = process
  for(const key in parsed)
    if(!env.hasOwnProperty(key))
    {
      const value = parsed[key]

      env[key] = typeof value === 'string' ? value : JSON.stringify(value)
    }
}


function config({encoding = 'utf8', intoEnv = true, path} = {}) {
  if(!path) path = resolve(process.cwd(), '.env.yml');

  try {
    const parsed = load(readFileSync(path, { encoding }));
    
    intoEnv !== false && loadIntoEnv(parsed);

    return { parsed };
  } catch (error) {
    return { error };
  }
}


exports.config = config;
exports.load = config;
