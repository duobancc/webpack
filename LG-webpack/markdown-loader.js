const marked = require('marked')

// module.exports = source => {

//   //  加载到的模块内容 => '# About\n\nthis is a markdown file. '
//   // console.log( source) 
//   // return 'hello loader markdown'  loader 返回结果必须是一段标准的 js 代码
//   // 

//   return 'console.log("hello loader markdown")'
// }

// module.exports = source => {

//   // 1 将 markdown 转换为 html 字符串
//   const html = marked(source)

//   // 2. 将 html 字符串拼接为一段导出字符串的js代码
//   const code = `module.exports = ${JSON.stringify(html)}`
//   return code

// }

// 多个loader 配合使用
module.exports = source => {
  // 1 将 markdown 转换为 html 字符串
  const html = marked(source)
  return html
}

