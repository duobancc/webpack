// 导入一个安装好的插件

// import { Configuration } from 'webpack'
// 运行webpack 时一定要记得注释该 import 语句
/** @type { import('webpack').Configuration }*/
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const RemoveCommentsPlugin = require('./remove-comments-plugin')
const path = require('path')

module.exports = {
    mode: 'none',
    entry: './src/04-webpack-plugins/src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'build')
    },
    module: {
        rules: [ // 对资源模块加载规则配置
            {
                test: /\.css$/, // 根据打包过程中所遇到文件路径匹配是否使用这个loader  它是一个正则表达式，用来匹配打包过程中所遇到文件路径，
                use: [ // 指定具体的 loader 一旦配置多个 loader （数组形式），执行顺序是从后往前执行的
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.md$/,
                use: [
                    'html-loader',
                    './markdown-loader.js'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            title: 'html 插件',
            // meta: {
            //     viewport: 'width=device-width'
            // }
            template:'./src/index.html' // 引用模板
        }),
        // 生成另一个 html 页面
        new htmlWebpackPlugin({
            filename: 'about.html'
        }),
        new copyWebpackPlugin({
            patterns: ['./README.md'] // 需要拷贝的目录或者路径通配符
        }),
        // 自己的插件
        new RemoveCommentsPlugin()
    ]


}