const path = require('path')
const defaultConfig = require('./default.config.js')

const build = {
    options: {
        outputDir: path.join(__dirname, '../build'),
        imgDir: path.join(__dirname, '../img')
    },
    aliases: {
        'aquila-ui-crypto': path.join(__dirname, '../node_modules/aquila-ui-crypto/api.js')
    }
}

module.exports = build
