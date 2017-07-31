const path = require('path')
const webpack = require('webpack')
const config = require('../../config')

function resolve(dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = {
  entry: {
    main: resolve('src'),
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'dist/js/[name].js',
    chunkFilename: 'dist/js/[name].chunk.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      public: resolve('public'),
      src: resolve('src'),
      components: resolve('src/components'),
      actions: resolve('src/actions'),
      store: resolve('src/store'),
      assets: resolve('src/assets'),
      config: resolve('src/config'),
      reducers: resolve('src/reducers'),
      constants: resolve('src/constants'),

    },
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: 'eslint-loader',
      //   enforce: 'pre',
      //   include: resolve('src'),
      // },
      {
        test: /\.jsx?$/,
        use: ['react-hot-loader/webpack','babel-loader'],
        include: resolve('src'),
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: resolve('src'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'dist/images/[name].[contenthash:8].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'dist/fonts/[name].[contenthash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
}
