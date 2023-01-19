const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const {name, dependencies: deps} = require('./package.json')

const setPublicPath = (mode) => {
    switch (mode) {
        case 'development':
            return `//${process.env.HOST}:${process.env.PORT}/`
        case 'production':
            return `//${process.env.HOST}/`
        case 'staging':
            return `//${process.env.HOST}/`
        default:
            return `//${process.env.HOST}/`
    }

}

const addPlugins = config => {
    config.plugins.unshift(
        new ModuleFederationPlugin({
            name,
            filename: 'remoteEntry.js',
            shared: {
                ...deps,
                "react": {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps.react,

                },
                "react-router-dom": {
                    singleton: true,
                    requiredVersion: deps.reactRouterDom,
                }
            },
            exposes: {
                './ExportModule': './src/module-federation/ExportModule',
            },
            remotes: {}
        })
    )
    return config
}

module.exports = [
    config => {
        const mode = process.env.NODE_ENV
        config.output.publicPath = setPublicPath(mode)
        // publicPath - адрес на котором развернуто наше приложение, необходимо для понимания откуда забирать модуль
        config.mode = mode
        // mode - режим разработки
        return addPlugins(config)
    },
]

