const path = require('path')

module.exports = {
    src: path.join(process.cwd(), 'src'),
    dev: path.join(process.cwd(), 'entries/dev.js'),
    prod: path.join(process.cwd(), 'entries/prod.js'),
    build: path.join(process.cwd(), 'build'),
    dist: path.join(process.cwd(), 'dist'),
    lib: path.join(process.cwd(), 'node_modules')
}
