module.exports = [{
  entry: "./public/main.js",
  output: {
      path: __dirname + "/public",
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
          { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
      ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
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
              exclude: /(node_modules)/,
              loader: 'babel',
              query: {
                  presets: ['es2015', 'react']
              }
          }
      ]
  },
  target: 'node',
  externals: /node_modules/
}
]
