const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const ShellPlugin = require('webpack-shell-plugin-next');

const shellScripts = [
  'mv assets/javascript/application.css assets/stylesheets/application.css',
  // Sprite images to use inline/linked files
  'mv assets/javascript/icon-sprite.svg assets/images/icon-sprite.svg',
  // Required for Jekyll includes
  'cp assets/images/icon-sprite.svg _includes/icon-sprite.svg'
]

function resolve (dir) {
  return path.join(__dirname, '../../', dir)
}

const configCommon = {
  context: resolve('/'),

  entry: {
    application: [
      resolve('_javascript/application.js')
    ]
  },

  output: {
    filename: '[name].js',
    path: resolve('assets/javascript/')
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new SVGSpritemapPlugin(resolve('assets/images/shared/icons/*.svg'), {
      output: {
        filename: 'icon-sprite.svg'
      },
      sprite: {
        prefix: false,
        generate: {
          symbol: true,
          use: true,
        }
      }
    }),
    new ShellPlugin({
      onAfterDone: {
        scripts: shellScripts,
        blocking: false,
        parallel: true
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: resolve(__dirname, 'assets/stylesheets/')
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          'file-loader',
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ]
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },

  resolve: {
    extensions: ['.js'],
  }
};

module.exports = configCommon;
