const webpackMerge = require('webpack-merge');

const config = require('../../config');
const common = require('./webpack/common');
const envConfig = require(`./webpack/${config.get('ENV')}`);

module.exports = webpackMerge(common, envConfig);
