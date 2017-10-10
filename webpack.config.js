/*eslint no-undef: 0*/
const merge = require('webpack-merge')
const common = require('./webpack/common')

module.exports = merge(common, require(`./webpack/${process.env.npm_lifecycle_event}`))
