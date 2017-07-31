const config = require('../config')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = config.dev.env
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack/dev.config')

const port = process.env.PORT || config.dev.port
const autoOpenBrowser = !!config.dev.autoOpenBrowser
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
})
const hotMiddleware = webpackHotMiddleware(compiler, {
  log: () => {},
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', compilation => compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
  hotMiddleware.publish({ action: 'reload' })
  cb()
}))

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
app.use('/', express.static('./public'))

const uri = `http://localhost:${port}`

devMiddleware.waitUntilValid(() => console.log(`> Listening at ${uri}\n`))

module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
