const config = require('../config')

process.env.NODE_ENV = config.build.env

const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack/prod.config')

const spinner = ora('Building for production...')

spinner.start()
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), (err) => {
  if (err) throw err
  webpack(webpackConfig, (err2, stats) => {
    spinner.stop()
    if (err2) throw err2
    process.stdout.write(`${stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    })}\n\n`)

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      `  Tip: built files are meant to be served over an HTTP server.\n'
         Opening index.html over file:// won't work.\n`))
  })
})
