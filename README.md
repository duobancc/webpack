# webpack

[学习链接](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=88#/detail/pc?id=2262)

### 学习 webpack

> 模块化
> 代码有环境兼容问题
> 不同类型的前段模块类型
> 代码拆分 需要使用时 在异步加载该模块 渐进式加载

### 快速上手

> 由于 webpack 是一个 npm 工具模块， 所以先初始化一个 package.json 文件， 用来管理npm 依赖版本
> 安装 webpack 核心模块
> 安装 webpack-cli 模块

``` 

npm init --yes
yarn add webpack webpack-cli --save-dev 
npx webpack --version
v4.42.1

```

> ps webpack 是 Webpack 的核心模块，webpack-cli 是 Webpack 的 CLI 程序，用来在命令行中调用 Webpack。
> npx 是 npm 5.2 以后新增的一个命令，可以用来更方便的执行远程模块或者项目 node_modules 中的 CLI 程序。

``` 

npx webpack
这个命令在执行的过程中，Webpack 会自动从 src/index.js 文件开始打包，
然后根据代码中的模块导入操作，自动将所有用到的模块代码打包到一起。
完成之后，控制台会提示：顺着 index.js 有两个 JS 文件被打包到了一起。
与之对应的就是项目的根目录下多出了一个 dist 目录，
我们的打包结果就存放在这个目录下的 main.js 文件中
```

### webpack 打包过程

> webpack4 以后的版本支持零配置的方式直接启动打包， 整个过程会按照约定将src/index.js 作为打包入口， 最终打包的结果会存放到 dist/main.js中。
> 自定义 打包 => webpack.config.js
> webpack.config.js  是一个运行在Node.js 环境的JS文件， 也就是说我们需要按照 CommonJS 的方式编写代码，这个文件可以导出一个对象，我们可以通过所导出对象的属性完成相应的配置选项。

* entry （打包入口文件路径）
* output（输出文件位置）

> output 属性的值必须是一个对象，通过这个对象的 filename 指定输出文件的文件名称，
> path 指定输出的目录，具体代码如下所示：

``` 
// ./webpack.config.js

const path = require('path')

module.exports = {

  entry: './src/main.js',

  output: {

    filename: 'bundle.js',

    path: path.join(__dirname, 'output')

  }

}

```
> TIPS：webpack.config.js 是运行在 Node.js 环境中的代码，所以直接可以使用 path 之类的 Node.js 内置模块。

[更多配置](https://webpack.js.org/configuration/#options)

### webpack 配置文件实现智能提示

```
方式一：
// 一定记得运行 Webpack 前先注释掉这里。
// import { Configuration } from 'webpack' 
/**
 * @type {Configuration}
 */
const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  }
}

module.exports = config
方拾贰： 
/** @type {import('webpack').Configuration} */
直接在类型注释中使用 import 动态导入类型
```

### webpack 工作模式
* production 启动内置优化插件，自动优化打包结果，打包速度偏慢
* development 自动优化打包速度，添加一些调试过程中的辅助插件
* none 运行最原始的打包，不做任何额外处理。

* **修改webpack工作模式的方式**
> 通过CLI --mode 参数传入;
> 通过配置文件设置mode 属性;

[工作模式详细](https://webpack.js.org/configuration/mode/)

### 打包结果运行原理

* 立即执行函数
* 浏览器单步调试
* none 模式