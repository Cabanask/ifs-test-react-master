const PATHS = require('./_config')

const webpack = require('webpack')
const webpackPostcssTools = require('webpack-postcss-tools')
const globalMap = webpackPostcssTools.makeVarMap('src/config/css/global.css')
const autoprefixer = require('autoprefixer')
const postcssCustomProperties = require('postcss-custom-properties')
const postcssRebeccaPurple = require('postcss-color-rebeccapurple')
const postcssSvgInline = require('postcss-inline-svg')
const postcssCalc = require('postcss-calc')

const variablesMap = Object.assign({}, globalMap.vars)


module.exports = {
    performance: {
        hints: false
    },
    resolve: {
        modules: [PATHS.src, PATHS.lib],
        extensions: ['.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.dev.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                loader: 'eslint-loader'
            },
            {
                // Test expects a RegExp! Note the slashes!
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]___[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                // Enable caching for improved performance during development
                // It uses default OS directory by default. If you need something
                // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        'react',
                        ['es2015', { 'modules': false }]
                    ],
                    plugins: [
                        'transform-decorators-legacy',
                        'babel-plugin-syntax-trailing-function-commas',
                        'babel-plugin-transform-class-properties',
                        'babel-plugin-transform-export-extensions',
                        'babel-plugin-transform-object-rest-spread'
                    ]
                }
            },
            {
                test: /\.json?$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpe?g)$/i,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]'
                }
            },
            /*{
                test: /\.(svg|woff|woff2|[ot]tf|eot)$/i,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            },*/
            { test: /\.svg$/, loader: 'url-loader' },
            { test: /\.woff$/, loader: 'url-loader' },
            { test: /\.woff2$/, loader: 'url-loader' },
            { test: /\.[ot]tf$/, loader: 'url-loader' },
            { test: /\.eot$/, loader: 'url-loader' }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
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
        })
    ]
}
