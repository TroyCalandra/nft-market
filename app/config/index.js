'use strict';
const env = process.env.NODE_ENV;

module.exports = require('./defaults'), env ? require('./' + env) : require('./defaults');