const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../../config')
const dllConfig = require('./dll.config')
const os = require('os')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = merge(dllConfig, {
  output: {
    path: config.build.assetsRoot,
    filename: 'vendors/prod/[name].[chunkhash:8].js',
    publicPath: config.build.assetsPublicPath,
    library: '[name]_[chunkhash:8]',                   // 必填项，将此dll包暴露到window上，给app.js调用
  },
  plugins: [
    new UglifyJsPlugin({
      parallel: {
        cache: true,
        workers: os.cpus().length,
      },
    }),
    new webpack.DllPlugin({
      context: resolve('dll/prod'),                   // 必填项，用来标志manifest中的路径
      path: resolve('dll/prod/[name].manifest.json'), // 必填项，存放manifest的路径
      name: '[name]_[chunkhash:8]',                                 // 必填项，manifest的name
    }),
    new HtmlWebpackPlugin({
      filename: resolve('src/index.prod.html'),
      template: resolve('src/index.html'),
      inject: true,
      chunksSortMode: 'dependency',
    }),
  ],
})
