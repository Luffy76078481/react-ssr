const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const serverConfig = {
    entry: path.resolve(__dirname, '../src/server/app.js'),
    output: {
        path: path.resolve(__dirname, '../serverBuild'),
        filename: 'root.server.js',
        publicPath: '/static/'
    },
    mode: 'development',
    target: "node",
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    { loader: 'isomorphic-style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require("autoprefixer")
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            }
        ]
    }

}
module.exports = merge(baseConfig, serverConfig)
