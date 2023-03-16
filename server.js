const path = require("path")

const uiCore = require('aquila-ui-core')
const createServer = uiCore('server')

const config = require('./config/config.js')

const pluginsController = require('aquila-ui-plugins')
const aquilaPlugins = pluginsController('plugins')

const plugins = [
    ...aquilaPlugins
]

const rootDir = process.env.NODE_ENV === 'production' ? __dirname : __dirname


const conf = {
    ...config,
    build: {
        ...config.build,
        options: {
            ...config.build.options,
            outputDir: path.join(rootDir, '/builtWWW')
        }
    }
}

const server = createServer(conf, plugins)
server.start()
