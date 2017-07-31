const os = require('os')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./base.config')

function resolve(dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = merge(baseConfig, {
  output: {
    filename: 'dist/js/[name].[chunkhash:8].js',
    chunkFilename: 'dist/js/[name].chunk.[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!less-loader',
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!stylus-loader',
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: resolve('dll/prod'),
      manifest: require('../../dll/prod/vendor1.manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      context: resolve('dll/prod'),
      manifest: require('../../dll/prod/vendor2.manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      context: resolve('dll/prod'),
      manifest: require('../../dll/prod/vendor3.manifest.json'),
    }),
    new ExtractTextPlugin({
      filename: 'dist/styles/[name].[contenthash:8].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      filename: resolve('public/index.html'),
      template: resolve('src/index.prod.html'),
      inject: true,
      chunksSortMode: 'dependency',
    }),
    new UglifyJsPlugin({
      parallel: {
        cache: true,
        workers: os.cpus().length,
      },
    }),
  ],
})
