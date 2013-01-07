node-configurator
=================

A really simple configuration package for Node.js. 

## Features

 * Configures an arbitrarily chosen object (such as a global configuration object) using JSON formatted configuration files.
 * Optionally combines a global and environment specific configuration file.
 * By default expects to find configuration files by default under ./config under the current working directory (referred to below as *configDir*).
 * Allows *configDir* to be set to an other value than ./config.
 * Allows defining the environment with the environment variable APP_ENV.
 * By default expects to be running in the environment 'development' (as if run with environment variable APP_ENV='development').
 * Expects the global configuration file at *configDir*/config-global.json
 * Expects the environment specific configuration file at *configDir*/config-$APP_ENV where $APP_ENV is the environment variable naming the current environment.
 * Checks that the same top-level configuration key is not defined in both the global and the environment specific config files.

## Installation

    $ npm install configurator

## Example

Below you'll find an example with a global environment file, as well as a development and production environment. The key 'appTitle' is the same regardless of the environment the app is run in, but the database configuration is set depending on the environment.

Note that attempting to set the key 'db' in config-global.json below would throw an exception as it is defined in the environment specific configuration file(s), as would attempting to set 'appTitle' in the configuration file in either of config-development.json or config-production.json.

### config/config-global.json - the global configuration
	
	{
		"appTitle"     : "Our awesome app"
	}

### config/config-development.json - the development environment configuration
	
	{
		"db": {
			"host"     : "staging-db.yourdomain.com",
			"database" : "staging-db"
		}
	}

### config/config-production.json - the production environment configuration

	{
		"db": {
			"host:"    : "production-db.yourdomain.com",
			"database" : "production-db"
		}
	}

## Usage
	
foo.js:

	var configurator = require('configurator');
	Configuration = {};
    require('configurator')(Configuration);

The above example configures a globally exposed object ('Configuration'), but there's no requirement to expose the configuration globally. In the default state, when no environment is specified when foo.js is invoked, Configuration would contain:

	{
		"appTitle"	: "Our awesome app",
		"db": {
			"host"     : "staging-db.yourdomain.com",
			"database" : "staging-db"
		}
	}

When foo.js invoked with "APP_ENV=production node foo.js":

	{
		"appTitle"	: "Our awesome app",
		"db": {
			"host:"    : "production-db.yourdomain.com",
			"database" : "production-db"
		}
	}


## License

(The MIT License)

Copyright (c) 2013 Livfe Limited &lt;matias.piipari@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.