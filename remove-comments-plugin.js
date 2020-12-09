const { compilation } = require("webpack")

// 移除注释的插件
// class RemoveCommentsPlugin {
//   apply (compiler) {
//     console.log(' RCP启动')
//     //  compiler =>  包含了我们此次构建的所有配置信息
//     compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
//       //  compilation => 可以理解为此次打包的上下文
//       for ( const name in compilation.assets ){
//         console.log(name) // 输出文件名称
//       }
//     })
//   }
// }

// export {RemoveCommentsPlugin};

// ./remove-comments-plugin.js

class RemoveCommentsPlugin {

  apply (compiler) {

    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {

      // compilation => 可以理解为此次打包的上下文

      for (const name in compilation.assets) {

        if( name.endsWith('.js')){
          const contents = compilation.assets[name].source()
          const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
          compilation.assets[name] = {
            source: () => noComments,
            size: () => noComments.length
          }
        }

        // console.log( compilation.assets[name].source() ) // 输出文件名称

      }

    })

  }
}

module.exports = RemoveCommentsPlugin

