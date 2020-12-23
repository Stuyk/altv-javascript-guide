# JavaScript 入门

此页面将解释一些基本的JavaScript原理. 这主要是针对那些拒绝查看诸如Code Academy之类的地方来学习编程的人. 但是, 这里有一些课程.

-   [https://learnxinyminutes.com/docs/javascript/](https://learnxinyminutes.com/docs/javascript/)
-   [https://www.learn-js.org/](https://www.learn-js.org/)
-   [https://bonsaiden.github.io/JavaScript-Garden/](https://bonsaiden.github.io/JavaScript-Garden/)

## 变量

目前, 您应该在JavaScript中使用两种类型的变量.

```js
const myVariable = 'example';
let myVariableName = 'example';
```

**const** 表示变量是常量. 这意味着变量类型不能更改, 并且内容的属性可以重新分配. 还必须有一个值.

**let** 是一种变量, 可以重新分配其值. 意味着可以反复使用. 值是可选的.

```js
let myVariable;
myVariable = 'test';
myVariable = 25;
myVariable = {
    myProperty: 'Cool Stuff'
};
```

## 基础数学

数学与其他编程语言基本相似.

```js
let result;

// 加法
result = 5 + 5;
result += 1;
console.log(result);

// 减法
result = 10 - 5;
result -= 1;
console.log(result);

// 乘法
result = 10 * 5;
result *= 2;
console.log(result);

// 除法
result = 10 / 5;
console.log(result);
```

## 基本功能

函数是特殊的代码块, 可以从其他代码块中调用. 它们也可以导出并导入到其他文件中并进行调用. 我们将在本节正下方讨论暴露.

您还可以通过许多不同的方式编写函数. 我更喜欢传统而不是箭头功能.

**传统功能示例**

```js
function myFancyFunction(myArgument, myOtherArgument) {
    console.log(myArgument);
    console.log(myOtherArgument);
}

myFancyFunction('hello', 'world');

function add(n1, n2) {
    return n1 + n2;
}

const result = add(5, 5);
console.log(result);
// 结果打印5.
```

**Fat Arrow Functions**

```js
const myFancyFunction = (myArgument, myOtherArgument) => {
    console.log(myArgument);
    console.log(myOtherArgument);
};

myFancyFunction('hello', 'world');

const add = (n1, n2) => {
    return n1 + n2;
};

const result = add(5, 5);
console.log(result);
// 结果打印5.
```

## 导出功能

使用alt:V时, 导出是该过程的重要组成部分. 但是, 导出不是常见的js. 我们对大多数导入和导出使用ES6语法. 如果您习惯了整个模块导出通用js的部分, 则这会稍有不同.

假设这些文件在同一目录中.

**文件1 - file1.js**

```js
export function myFunction(arg1, arg2) {
    console.log(arg1, arg2);
}
```

**文件2 - file2.js**

```js
import { myFunction } from './file1.js';

myFunction('hello', 'world');
```

**文件2 (另类) - file2.js**

```js
import * as myFuncs = from './file1.js'

myFuncs.myFunction('hello', 'world');
```

处理起来非常简单, 当涉及到创建可靠的文件结构时, 我们将在各处使用这些导出和导入的函数.

## 对于循环

循环在Javascript中用于许多不同的事物, 应在工具包的每个部分中使用它来帮助您减少代码编写. for循环使我们可以循环遍历一段代码. 这使我们可以对数组内部的结果执行不同的操作.

请记住, 数组从零(0)开始. 不是Lua表示数组中的第一个元素始终为零.

```js
const data = ['test0', 'test1', 'test2'];

function saySomething(msg) {
    console.log(msg);
}

// 是此for循环中的数字
// i++ 将自增1
for (let i = 0; i < data.length; i++) {
    saySomething(data[i]);
}
```

上面的代码将为上面的数组打印3次. 它将首先打印‘test0’, ‘test1’, 然后是‘test2’. 这是通过根据元素编号(即i)在数组内部传递数据来完成的.
