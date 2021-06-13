'use strict';
const env = process.env.NODE_ENV;

module.exports = env ? require('./' + env) : require('./defaults');