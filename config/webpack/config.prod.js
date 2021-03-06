const webpack = require('webpack');
const config = require('./config.common');

/**
 * `BUILD_ENV` holds the environment name to be used for loading environment specific configs
 * */
const GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify('production'),
    'BUILD_ENV': JSON.stringify(process.env.BUILD_ENV)
  }
};

config['mode'] = 'production';

config['optimization'] = Object.assign({ minimize: true }, config['optimization']);

config['plugins'].push(new webpack.DefinePlugin(GLOBALS));

module.exports = config;
