var fs     = require('fs');
var _      = require('underscore');
var assert = require('assert');

module.exports = function(context, configDir) {
	assert(context, "A context object (such as a global Configuration object) is needed.");

	if (!configDir) configDir = "./config";

	// load global configuration
	var globalConfigPath = configDir + "/config-global.json";
	console.info("Loading global configuration from " + globalConfigPath);
	var globalConfigPath = fs.readFileSync(globalConfigPath);
	var config = JSON.parse(globalConfigPath);

	// add the environment specifics
	var env = process.env.APP_ENV;
	if (typeof env === "undefined") env = "development";
	var environmentConfigPath = configDir + "/config-" + env + ".json";
	console.info("Loading " + env + " environment configuration from " + environmentConfigPath + ".");
	
	// extend the given context object with the keys read from config files (context e.g. a global Configuration object)
	var envSpecConfig = JSON.parse(fs.readFileSync(environmentConfigPath));
	_.each(Object.keys(envSpecConfig), function(key) {
		assert(!config[key], "Key '" + key + "' defined in both " + globalConfigPath + " and " + environmentConfigPath);
		config[key] = envSpecConfig[key];
	});

	_.each(Object.keys(config), function (key) {
		assert(!context[key], "Context already has key '" + key + "' defined.");
		context[key] = config[key];
	});
};