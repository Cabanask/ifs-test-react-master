const path = require('path')

// postcss
const webpackPostcssTools = require('webpack-postcss-tools')
const autoprefixer = require('autoprefixer')
const postcssCustomProperties = require('postcss-custom-properties')
const postcssRebeccaPurple = require('postcss-color-rebeccapurple')
const postcssSvgInline = require('postcss-inline-svg')
const postcssCalc = require('postcss-calc')

const globalMap = webpackPostcssTools.makeVarMap('src/config/css/global.css');

const variablesMap = Object.assign({}, globalMap.vars);

const PATHS = {
    src: path.join(__dirname, 'src'),
    lib: path.join(__dirname, 'node_modules')
}

module.exports = {
    title: 'React-UI styleguide',
    sections: [
        {
            name: 'Volt UI',
            components: 'src/components/*/*.js'
        }
    ],
    template: 'styleguide.html',
    skipComponentsWithoutExample: true,
    highlightTheme: 'base16-light',
    getExampleFilename: function(componentpath) {
        return componentpath.replace(/\.js?$/, '.md')
    },
    handlers: require('react-docgen').defaultHandlers.concat(function (documentation, docPath) {
        // Calculate a display name for components based upon the declared class name.
        if (docPath.value.type === 'ClassDeclaration' && docPath.value.id.type === 'Identifier') {
            documentation.set('displayName', docPath.value.id.name);

            // Calculate the key required to find the component in the module exports
            if (docPath.parentPath.value.type === 'ExportNamedDeclaration') {
                documentation.set('path', docPath.value.id.name);
            }
        }

        // The component is the default export
        if (docPath.parentPath.value.type === 'ExportDefaultDeclaration') {
            documentation.set('docPath', 'default');
        }
    }),
    updateWebpackConfig(webpackConfig) {
        // Your source files folder or array of folders, should not include node_modules
        webpackConfig.resolve.alias['rsg-components/Wrapper'] = path.join(__dirname, 'src/components/StyleguideWrapper')
        webpackConfig.resolve.alias.components = path.join(__dirname, 'src/components')
        webpackConfig.resolve.alias.config = path.join(__dirname, 'src/config')

        webpackConfig.module.rules = [
            {
                test: /\.css$/,
                enforce: 'pre',
                loader: 'postcss-loader',
                options: {
                    postcss: [
                        autoprefixer,
                        postcssCustomProperties({
                            variables: variablesMap
                        }),
                        postcssRebeccaPurple,
                        postcssSvgInline,
                        postcssCalc()
                    ]
                }
            },
            {
                test: /node_modules[\/\\](remark-parse|character-entities-html4|character-reference-invalid|character-entities-legacy|character-entities|hast-util-sanitize)[\/\\].*\.json$/,
                include: /node_modules/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                include:
                    [  `${__dirname}/node_modules/codemirror`,
                        `${__dirname}/node_modules/highlight.js` ],
                loader: 'style!css'
            },
            {
                test: /\.css$/,
                include: `${__dirname}/node_modules/react-styleguidist/src`,
                loader: 'style!css?modules&importLoaders=1&localIdentName=ReactStyleguidist-[name]__[local]'
            },
            // Babel loader will use your project’s .babelrc
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, 'src'),
                    path.join(__dirname, 'scripts'),
                    path.join(__dirname, 'node_modules/react-styleguidist/src')
                ],
                loader: 'babel-loader'
            },
            // Other loaders that is needed for your components
            {
                // Test expects a RegExp! Note the slashes!
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        query: {
                            modules: 1,
                            importLoaders: 1,
                            localIndentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            { test: /\.json?$/, loader: 'json-loader', include: PATHS.src },
            { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]', include: PATHS.src },
            { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]', include: PATHS.src },
            { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]', include: PATHS.src },
            { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]', include: PATHS.src },
            { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]', include: PATHS.src }
        ]

        webpackConfig.plugins[2].options.options.context = __dirname
        webpackConfig.plugins[2].options.options.postcss = [
            autoprefixer,
            postcssCustomProperties({
                variables: variablesMap
            }),
            postcssRebeccaPurple,
            postcssSvgInline,
            postcssCalc()
        ]

        return webpackConfig
    }
}
