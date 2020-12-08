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

### loader

* 如何通过 Loader 机制实现特殊资源加载?

> Webpack 是用 Loader（加载器）来处理每个模块的，而内部默认的 Loader 只能处理 JS 模块，
> 如果需要加载其他类型的模块就需要配置不同的 Loader。

![](https://s0.lgstatic.com/i/image3/M01/13/A8/Ciqah16gAM2AVBOyAACbAmBWOWM473.png)

* **加载器的使用方式**

> 安装一个Loader 模块
> 在配置文件中添加对应的配置
> 如下示例

``` 
$ npm install css-loader --save-dev 

# or yarn add css-loader --dev

// ./webpack.config.js

module.exports = {

  entry: './src/main.css',

  output: {

    filename: 'bundle.js'

  },

  module: {

    rules: [

      {

        test: /\.css$/, // 根据打包过程中所遇到文件路径匹配是否使用这个 loader

        use: 'css-loader' // 指定具体的 loader

      }

    ]

  }

}

```

> 在配置对象的 module 属性中添加一个 rules 数组
> 这个数组就是我们针对资源模块的加载规则配置，其中的每个规则对象都需要设置两个属性:

* 首先是 test 属性，它是一个正则表达式，用来匹配打包过程中所遇到文件路径，这里我们是以 .css 结尾
* 然后是 use 属性，它用来指定匹配到的文件需要使用的 loader，这里用到的是 css-loader

![](https://s0.lgstatic.com/i/image3/M01/06/79/CgoCgV6gAQyAVv7XAAAyFU_9fDQ769.png)

* **样式模块加载的问题**

> 此时，如果你尝试在页面中使用这里输出的 bundle.js 文件，你会发现刚刚的这个 main.css 模块并没有工作。

![](https://s0.lgstatic.com/i/image3/M01/06/79/CgoCgV6gARSAXyX_AAFkFP2Qek8997.png)
> 发现 css-loader 只会(负责)把 css 模块加载到js 代码中，而并不会使用这个模块
> 所以这里我们还需要在 css-loader 的基础上再使用一个 style-loader，
> 把 css-loader 转换后的结果通过 style 标签追加到页面上
> 安装完 style-loader 之后，我们将配置文件中的 use 属性修改为一个**数组**，将 style-loader 也放进去。
> 这里需要注意的是，**一旦配置多个 Loader，执行顺序是从后往前执行的，**
> 所以这里一定要将 css-loader 放在最后，
> 因为必须要 css-loader 先把 CSS 代码转换为 JS 模块，才可以正常打包，具体配置如下：

```
// ./webpack.config.js

module.exports = {

  entry: './src/main.css',

  output: {

    filename: 'bundle.js'

  },

  module: {

    rules: [

      {

        test: /\.css$/,

        // 对同一个模块使用多个 loader，注意顺序

        use: [

          'style-loader',

          'css-loader'

        ]

      }

    ]

  }

}

```

* 题外话，学习新事物不是说学会它的所有用法你就能提高，因为这些照着文档操作基本上谁都可以做到，很多时候它的思想才是突破点。能搞明白新事物为什么这样设计，基本上你就算出道了。

### 开发一个loader

* loader工作机制

> Webpack 加载资源文件的过程类似于一个工作管道，你可以在这个过程中依次使用多个 Loader，
> 但是最终这个管道结束过后的结果必须是一段标准的 JS 代码字符串。

![](https://s0.lgstatic.com/i/image3/M01/06/7D/CgoCgV6gA8SAfv7-AAA9hfxlofw372.png)

> 在loader 的js 中 输入你需要处理的文件内容
> loader 中使用一些函数 将该内容处理 成 符合 js 标准的字符串 
> 输出

> 除了 module.exports 这种方式，Webpack 还允许我们在返回的代码中使用 ES Modules 的方式导出，

```
// ./markdown-loader.js

const marked = require('marked')

module.exports = source => {

  // 1. 将 markdown 转换为 html 字符串

  const html = marked(source)

  return html

}


```


[file-loader](https://webpack.js.org/loaders/file-loader)

[url-loader](https://webpack.js.org/loaders/url-loader)

[babel-loader](https://webpack.js.org/loaders/babel-loader)

[style-loader](https://webpack.js.org/loaders/style-loader)

[css-loader](https://webpack.js.org/loaders/css-loader)
[sass-loader](https://webpack.js.org/loaders/sass-loader)
[postcss-loader](https://webpack.js.org/loaders/postcss-loader)
[eslint-loader](https://github.com/webpack-contrib/eslint-loader)
[vue-loader](https://github.com/vuejs/vue-loader)
