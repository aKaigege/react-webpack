const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../../config')
const dllConfig = require('./dll.config')

function resolve(dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = merge(dllConfig, {
  output: {
    path: config.build.assetsRoot,
    filename: 'vendors/dev/[name].[chunkhash:8].js',
    publicPath: config.build.assetsPublicPath,
    library: '[name]_[chunkhash:8]',                   // 必填项，将此dll包暴露到window上，给app.js调用
  },
  plugins: [
    new webpack.DllPlugin({
      context: resolve('dll/dev'),                   // 必填项，用来标志manifest中的路径
      path: resolve('dll/dev/[name].manifest.json'), // 必填项，存放manifest的路径
      name: '[name]_[chunkhash:8]',                                // 必填项，manifest的name
    }),
    new HtmlWebpackPlugin({
      filename: resolve('src/index.dev.html'),
      template: resolve('src/index.html'),
      inject: true,
      chunksSortMode: 'dependency',
    }),
  ],
})
