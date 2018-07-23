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

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'dist/bundle.js',
    path: path.resolve(__dirname)
  },

  devtool: 'source-map',

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
        use: ExtractTextPlugin.extract({
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
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new ExtractTextPlugin('dist/style.css'),
    new CopyPlugin([{
      from: resolvePath('resources/git_pages/homepage/static/img'),
      to: resolvePath('dist/static/img'),
      toType: 'dir'
    }]),

    new VueLoaderPlugin()
  ]
};
