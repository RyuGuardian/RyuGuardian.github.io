'use strict'

const path = require('path');
const webpack = require('webpack');
// WEBPACK PLUGINS
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// LOADER PLUGINS
const { VueLoaderPlugin } = require('vue-loader');

function resolvePath(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = (env, argv) => {
  let devMode = argv.mode === 'development';
  let dest = devMode ? 'src/' : 'dist/';

  return {
    entry: './src/index.js',

    output: {
      filename: 'bundle.js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname + '/' + dest)
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]vuex?/
          }
        }
      }
    },

    devtool: devMode ? 'eval-source-map' : undefined,

    devServer: {
      hot: true,
      watchOptions: {
        poll: true
      }
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: devMode ? ['vue-style-loader', 'css-loader', 'sass-loader']
            : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            })
        },
        {
          test: /\.(js|vue)$/,
          use: 'eslint-loader',
          enforce: 'pre'
        }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlPlugin({
        filename: devMode ? 'index.html' : '../index.html',
        template: path.resolve(__dirname + '/src/index.template.html'),
        inject: true
      }),
      new ExtractTextPlugin('style.css'),
      new CopyPlugin([{
        from: resolvePath('resources/git_pages/homepage/static/img'),
        to: resolvePath(dest + 'static/img'),
        toType: 'dir'
      }]),

      new VueLoaderPlugin(),

      new webpack.DefinePlugin({ 'process.env.MODE': JSON.stringify(argv.mode) })
    ]
  }
};
