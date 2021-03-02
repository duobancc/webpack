// 立即调用函数

// 当函数变成立即执行的函数表达式时，表达式中的变量不能从外部访问。

(function() {
    var name = "ccc"
    console.log(name, '|_+_|')
})()
// 无法从外部访问变量 name
console.log(name, '|_-_|')
// 抛出错误："Uncaught ReferenceError: name is not defined"


// 将 IIFE 分配给一个变量 ， 不是储存 IIFE 本身， 而是存储 IIFE 执行返回后的结果
 
var res = (function() {
    var name = "duoban"

    return name 
})()

console.log('res=', res )