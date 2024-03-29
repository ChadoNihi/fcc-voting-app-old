'use strict';

var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [{
  entry: path.join(__dirname, "/public/main.js"),
  output: {
      path: path.join(__dirname, "/public"),
      filename: "bundle.js"
  },
  module: {
      loaders: [
          {
              exclude: /(node_modules)/,
              loader: 'babel',
              query: {
                  presets: ['es2015', 'react']
              }
          },
          {
            exclude: /(node_modules)/,
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'stylus-loader']),
          },/*
          {
              exclude: /(node_modules)/,
              test: /\.(eot|svg|ttf|woff|woff2)$/,
              loader: "file-loader"
          }*/
      ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("css/main.css"),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
    //new webpack.IgnorePlugin(/vertx/),
    /*new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })*/
  ]
},
{
  entry: path.join(__dirname, "/server.js"),
  output: {
    path: __dirname,
    filename: 'bundle.server.js',
    libraryTarget: 'commonjs2'
  },
  module: {
      loaders: [
          { test: /\.json$/, loader: "json-loader" },
          {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: 'babel',
              query: {
                  presets: ['es2015', 'react']
              }
          },
          /*{ exclude: /(node_modules)/, test: /\.styl$/, loader: 'isomorphic-style-loader!css-loader!stylus-loader' },
          {
              exclude: /(node_modules)/,
              test: /\.(eot|svg|ttf|woff|woff2)$/,
              loader: "file-loader"
          }*/
      ]
  },
  target: 'node',
  externals: [nodeExternals()]
}
];
