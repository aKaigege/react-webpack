const os = require('os')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    vendor1: ['react'],
    vendor2: ['react-router','react-dom', 'axios'],
    vendor3: ['redux','react-redux','redux-thunk']
  },
  plugins: [
    new UglifyJsPlugin({
      parallel: {
        cache: true,
        workers: os.cpus().length,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
}
