const webpack = require('webpack');
const config = require('./config.common');

/**
 * `BUILD_ENV` holds the environment name to be used for loading environment specific configs
 * */
const GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify('development'),
    'BUILD_ENV': JSON.stringify(process.env.BUILD_ENV)
  }
};

config['mode'] = 'development';

config['plugins'].push(new webpack.DefinePlugin(GLOBALS));

config['plugins'].push(new webpack.SourceMapDevToolPlugin({
  filename: '[name].js.map',
  exclude: ['spritemap']
}));

module.exports = config;
