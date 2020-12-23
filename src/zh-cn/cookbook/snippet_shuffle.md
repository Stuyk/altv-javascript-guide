# 随机数组

如果您发现自己需要改数组.

这是一个简单的导出函数，可用于整理数组.

```js
export function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        // 选择剩余的元素...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // 并与当前元素交换.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
```

## 用法示例

```js
const myArray = [1, 2, 3, 4, 5];
const result = shuffle(myArray);
console.log(result);
```
