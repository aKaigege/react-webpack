const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const baseConfig = require('./base.config')

function resolve(dir) {
  return path.join(__dirname, '../..', dir)
}

// add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach((name) => {
  baseConfig.entry[name] = ['./build/webpack/hot'].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader?sourceMap', 'less-loader'],
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader?sourceMap', 'stylus-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: resolve('dll/dev'),
      manifest: require('../../dll/dev/vendor1.manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      context: resolve('dll/dev'),
      manifest: require('../../dll/dev/vendor2.manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      context: resolve('dll/dev'),
      manifest: require('../../dll/dev/vendor3.manifest.json'),
    }),
    new HtmlWebpackPlugin({
      filename: resolve('public/index.html'),
      template: resolve('src/index.dev.html'),
      inject: true,
      chunksSortMode: 'dependency',
    }),
    new FriendlyErrorsPlugin(),
  ],
  devtool: '#cheap-module-eval-source-map',
})
