const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');



module.exports = {
  //  js 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到 一个 bundle.js 文件
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: [
        //   // 'style-loader',
        //   // 'css-loader'

        //   // 'style-loader',
        //   // 'css-loader'

        // ]
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    // new ExtractTextPlugin({
    //   // 从 .js 文件中提取出来的 .css 文件的名称
    //   filename: `[name]_[contenthash:8].css`
    // })
    // new ExtractTextPlugin('style.css')  

    // https://github.com/gwuhaolin/dive-into-webpack/issues/67
    // webpack v4版本extract-text-webpack-plugin不再用于css #67

    new MiniCssExtractPlugin({
      filename: `[name]_[contenthash:8].css`,
    })
  ],
};
