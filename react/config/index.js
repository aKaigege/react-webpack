const path = require('path')

module.exports = {
  build: {
    env: 'production',
    outputIndex: path.resolve(__dirname, '../public/index.html'),
    assetsRoot: path.resolve(__dirname, '../public'),
    assetsSubDirectory: 'dist',
    assetsPublicPath: '/',
    productionSouceMap: false,
  },
  dev: {
    env: 'development',
    port: 8080,
    autoOpenBrowser: false,
    assetsSubDirectory: 'dist',
    assetsPublicPath: '/',
    proxyTable: {
    },
  },
}
