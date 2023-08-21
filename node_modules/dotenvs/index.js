/**
 * Load into process.env or return environment variables stored in env file.
 * @module
 */

var dotenv = require('dotenv');
var fs = require('fs');
var Path = require('path');

/** 
 * Load or return environment variables
 * @param {string} [name] - Name of environment. Used to suffix env file with preceding dash (e.g. ".env-test"). If null, file with name ".env" will be used
 * @param {boolean} [returnObject] - Whether to return an object with the variables instead of applying to process.env
 */
module.exports = (name, returnObject) => {
  var suffix = name ? '-' + name : '';
  var path = Path.resolve(__dirname, '../../.env' + suffix);

  if (!fs.existsSync(path)) {
    return returnObject ? Object.assign({}, process.env) : undefined;
  }

  if (returnObject) {
    return Object.assign({}, dotenv.parse(fs.readFileSync(path)), process.env);
  } else {
    dotenv.config({ path: path });
  }
};