'use strict';

var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = [{
  entry: path.join(__dirname, "./public/main.js"),
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
          { exclude: /(node_modules)/, test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
          {
              exclude: /(node_modules)/,
              test: /\.(eot|svg|ttf|woff|woff2)$/,
              loader: "file-loader",
              //include:
          }
      ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
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
  entry: './server.js',
  output: {
    path: __dirname,
    filename: 'bundle.server.js',
    libraryTarget: 'commonjs2'
  },
  module: {
      loaders: [
          {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: 'babel',
              query: {
                  presets: ['es2015', 'react']
              }
          },
          { test: /\.json$/, loader: "json-loader" }
      ]
  },
  target: 'node',
  externals: [nodeExternals()]
}
];
