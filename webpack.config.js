
// import { Configuration } from 'webpack'
// 运行webpack 时一定要记得注释该 import 语句
/** @type { import('webpack').Configuration }*/


const path = require('path')

module.exports = {
    mode:'none',
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'build')
    }

}