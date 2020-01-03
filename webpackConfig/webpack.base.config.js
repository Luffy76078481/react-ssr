const path = require('path')
module.exports = {
    module: {
        rules: [
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 8000,
                    name: 'img/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 100,
                    name: 'fonts/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            "commonFunc": path.join(__dirname, "../src/common/commonFunc.js"), //公共方法
            "withStyle": path.join(__dirname, "../src/common/withStyle.js"), //服务端渲染样式
            "config": path.join(__dirname, "../config/config.js"), //公共方法
            'react-dom': '@hot-loader/react-dom'
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
}
