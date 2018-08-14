# env-yaml

## Usage

```javascript
require('env-yaml').config();
```

Create a `.env.yml` file in the root dirctory of your project, 
and add environment-specific variables as valid YAML.

That's it.

`process.env` now has the keys and values you defined in your `.env.yml` file.

## Options

### Path

Default: `.env.yml`

You can specify a custom path if your file containing environmnet variables is
named or located differently.

```javascript
require('env-yaml').config({ path: '/custom/path/to/your/yaml/env/vars' });
```

### Encoding

Default: `utf8`

You may specify the encoding of your file containing environment variables
using this option.

```javascript
require('env-yaml').config({ encoding: 'base64' });
```

### Namespace

Default: null

You may specify a namespace in which to fetch your environment variables. Useful when you want to store environment specific values within the same files.

```javascript
require('env-yaml').config({ namespace: 'development' });
```