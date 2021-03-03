# chapter-1
  ## 1-1前端的发展
  * **模块化**

> 模块化是指把一个复杂的系统分解到多个模块以方便编码。

  * **CommonJS**

>  [CommonJS](http://www.commonjs.org/) 是一种使用广泛的 JavaScript 模块化规范，核心思想是通过 require 方法来同步地加载依赖的其他模块，通过 module.exports 导出需要暴露的接口。 CommonJS 规范的流行得益于 Node.js 采用了这种方式，后来这种方式被引入到了网页开发中。

* **AMD**

> [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) 也是一种 JavaScript 模块化规范，与 CommonJS 最大的不同在于它采用异步的方式去加载依赖的模块。 AMD 规范主要是为了解决针对浏览器环境的模块化问题，最具代表性的实现是 [requirejs](http://requirejs.org/)。

* **ES6 模块化**

> ES6 模块化是欧洲计算机制造联合会 ECMA 提出的 JavaScript 模块化规范，它在语言的层面上实现了模块化。浏览器厂商和 Node.js 都宣布要原生支持该规范。它将逐渐取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

* **样式文件的模块化**

> 除了 JavaScript 开始模块化改造，前端开发里的样式文件也支持模块化。 以 SCSS 为例，把一些常用的样式片段放进一个通用的文件里，再在另一个文件里通过 `@import` 语句去导入和使用这些样式片段。

## 1-2常见的构建工具及对比

**构建**

> 把源代码转换成发布到线上的可执行的 JavaScript、CSS、HTML、代码，包括如下内容

* 代码转换：TypeScript 编译成 JavaScript、SCSS编译成CSS等。
* 文件优化：压缩 JavaScript、CSS、HTML代码，压缩合并图片等。
* 代码切割： 提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
* 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
* 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
* 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
* 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

> 构建其实是工程化、自动化思想在前端开发中的体现，把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。 构建给前端开发注入了更大的活力，解放了我们的生产力。
>
> 历史上先后出现一系列构建工具，它们各有其优缺点。由于前端工程师很熟悉 JavaScript ，Node.js 又可以胜任所有构建需求，所以大多数构建工具都是用 Node.js 开发的。下面来一一介绍它们

* **Npm Script**

> [Npm Script](https://docs.npmjs.com/misc/scripts) 是一个任务执行者。Npm 是在安装 Node.js 时附带的包管理器，Npm Script 则是 Npm 内置的一个功能，允许在 `package.json` 文件里面使用 `scripts` 字段定义任务
>
> Npm Script的优点是内置，无须安装其他依赖。其缺点是功能太简单，虽然提供了 `pre` 和 `post` 两个钩子，但不能方便地管理多个任务之间的依赖。

* **Grunt**

> [Grunt](https://gruntjs.com/) 和 Npm Script 类似，也是一个任务执行者。Grunt 有大量现成的插件封装了常见的任务，也能管理任务之间的依赖关系，自动化执行依赖的任务，每个任务的具体执行代码和依赖关系写在配置文件 `Gruntfile.js` 里
>
> Grunt的优点是：
>
> - 灵活，它只负责执行你定义的任务；
> - 大量的可复用插件封装好了常见的构建任务。
>
> Grunt的缺点是集成度不高，要写很多配置后才可以用，无法做到开箱即用。
>
> Grunt 相当于进化版的 Npm Script，它的诞生其实是为了弥补 Npm Script 的不足。

* **Gulp**

> [Gulp](http://gulpjs.com/) 是一个基于流的自动化构建工具。 除了可以管理和执行任务，还支持监听文件、读写文件。Gulp 被设计得非常简单，只通过下面5个方法就可以胜任几乎所有构建场景：
>
> - 通过 `gulp.task` 注册一个任务；
> - 通过 `gulp.run` 执行任务；
> - 通过 `gulp.watch` 监听文件变化；
> - 通过 `gulp.src` 读取文件；
> - 通过 `gulp.dest` 写文件。
>
> Gulp 的最大特点是引入了流的概念，同时提供了一系列常用的插件去处理流，流可以在插件之间传递。
>
> Gulp 的优点是好用又不失灵活，既可以单独完成构建也可以和其它工具搭配使用。其缺点是和 Grunt 类似，集成度不高，要写很多配置后才可以用，无法做到开箱即用。
>
> 可以将Gulp 看作 Grunt 的加强版。相对于 Grunt，Gulp增加了监听文件、读写文件、流式处理的功能。

* **Fis3**

> [Fis3](https://fex.baidu.com/fis3/) 是一个来自百度的优秀国产构建工具。相对于 Grunt、Gulp 这些只提供基本功能的工具，Fis3 集成了 Web 开发中的常用构建功能，如下所述。
>
> - 读写文件：通过 `fis.match` 读文件，`release` 配置文件输出路径。
> - 资源定位：解析文件之间的依赖关系和文件位置。
> - 文件指纹：通过 `useHash` 配置输出文件时给文件 URL 加上 md5 戳来优化浏览器缓存。
> - 文件编译：通过 `parser` 配置文件解析器做文件转换，例如把 ES6 编译成 ES5。
> - 压缩资源：通过 `optimizer` 配置代码压缩方法。
> - 图片合并：通过 `spriter` 配置合并 CSS 里导入的图片到一个文件来减少 HTTP 请求数。
>
> Fis3的优点是集成了各种 Web 开发所需的构建功能，配置简单开箱即用。其缺点是目前官方已经不再更新和维护，不支持最新版本的 Node.js。
>
> Fis3 是一种专注于 Web 开发的完整解决方案，如果将 Grunt、Gulp 比作汽车的发动机，则可以将Fis3 比作一辆完整的汽车。

* **Webpack**

> [Webpack](https://webpack.js.org/) 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。
>
> 其官网的首页图很形象的画出了 Webpack 是什么，如下：
>
> ![图1-2 Webpack 简介](http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/img/1-2webpack.png)
>
> 一切文件：JavaScript、CSS、SCSS、图片、模板，在 Webpack 眼中都是一个个模块，这样的好处是能清晰的描述出各个模块之间的依赖关系，以方便 Webpack 对模块进行组合和打包。 经过 Webpack 的处理，最终会输出浏览器能使用的静态资源。





# chapter-2