
// import { Configuration } from 'webpack'
// 运行webpack 时一定要记得注释该 import 语句
/** @type { import('webpack').Configuration }*/


const path = require('path')

module.exports = {
    mode: 'none',
    entry: './src/03-使用loader加载特殊资源/markdown-loader/main.js',
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
    }

}