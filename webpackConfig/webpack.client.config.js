const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const clientConfig = {
    devtool: "#eval-source-map",
    entry: path.join(__dirname, '../src/clientIndex.js'),
    output: {
        path: path.join(__dirname, '../clientBuild/static/'),
        filename: 'js/client.[hash:5].js',
        chunkFilename: "js/[name].[hash:5].js",
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: []
}

if (isDev) {
    const devRules = [
        {
            test: /\.(css|scss)$/,
            use: [
                { loader: 'style-loader' },
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
        },
    ]
    clientConfig.entry = [
        "react-hot-loader/patch",
        path.join(__dirname, '../src/clientIndex.js'),
    ]
    clientConfig.output = {
        path: path.join(__dirname, '../public'),
        filename: '[name].client.js',
        chunkFilename: "[name].js",
        publicPath: '/'
    }
    clientConfig.mode = 'development'
    clientConfig.module.rules = clientConfig.module.rules.concat(devRules)
    clientConfig.devServer = {
        host: '0.0.0.0',
        port: '9000',
        inline: true,
        useLocalIp: true,
        open: true,
        overlay: {
            error: true,
        },
        contentBase: path.join(__dirname, '../public'),
        proxy: {
            '/api/**': {
                target: 'https://bb876.com/',
                secure: false, //若地址为https，需要设置为false
                changeOrigin: true //是否跨域
            },
            '/musicRankingsDetails': {
                target: 'http://api.apiopen.top/',
                secure: false, //若地址为https，需要设置为false
                changeOrigin: true //是否跨域
            },
        },
        historyApiFallback: true,
        hot: true,
    }
    clientConfig.plugins = clientConfig.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'devTest',
            filename: path.join(__dirname, '../public/index.html'),
            template: path.join(__dirname, '../public/index.html'),
            inject: true,
        }),
    ]
    )
}
if (isProd) {
    const prodRules = [
        {
            test: /\.(css|scss)$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '/static/'
                    }
                },
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
        },
    ]
    clientConfig.mode = 'production'
    clientConfig.devtool = false
    clientConfig.module.rules = clientConfig.module.rules.concat(prodRules)
    clientConfig.optimization = {
        minimizer: [new UglifyJsPlugin()],
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: -20,
                    chunks: "all"
                }
            }
        }
    }

    clientConfig.plugins = clientConfig.plugins.concat([
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:5].css",
            // chunkFilename: "css/style.[id].css",
            // allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'TTTTTT',
            filename: path.join(__dirname, '../clientBuild/index.html'),
            template: path.join(__dirname, '../public/index.html'),
            inject: true,
        })
    ]
    )

}
module.exports = merge(baseConfig, clientConfig)
