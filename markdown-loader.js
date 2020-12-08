module.exports = source => {

  //  加载到的模块内容 => '# About\n\nthis is a markdown file. '
  console.log( source) 
  // return 'hello loader markdown'  loader 返回结果必须是一段标准的 js 代码
  // 

  return 'console.log("hello loader markdown")'
}