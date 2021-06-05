const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CommonConfig = require('./config.common');

const GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify('production'),
    'BUILD_ENV': JSON.stringify(process.env.BUILD_ENV)
  }
};

module.exports = merge(CommonConfig, {
  mode: 'production',

  plugins: [
    new webpack.DefinePlugin(GLOBALS)
  ],

  optimization: {
    minimize: true
  }
});

