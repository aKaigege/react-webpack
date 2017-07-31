const webpack = require('webpack')

module.exports = {
  entry: {
    vendor1: ['react'],
    vendor2: ['react-router','react-dom', 'axios'],
    vendor3: ['redux','react-redux','redux-thunk']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
}
