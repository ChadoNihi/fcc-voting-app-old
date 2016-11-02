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
          }
      ]
  }
},
// {
//   entry: './server.js',
//   output: {
//     path: __dirname + '/app',
//     filename: 'bundle.server.js',
//     libraryTarget: 'commonjs2'
//   },
//   module: {
//       loaders: [
//           {
//               exclude: /(node_modules)/,
//               loader: 'babel',
//               query: {
//                   presets: ['es2015', 'react']
//               }
//           }
//       ]
//   },
//   target: 'node',
//   externals: /node_modules/
// }
]
