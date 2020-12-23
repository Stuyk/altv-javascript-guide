# API介绍

您可以在 API 上获得有关 alt:V 功能和编写代码的大多数信息.

唯一需要注意的是，使用大多数功能的例子很少.

-   [https://altmp.github.io/altv-typings/](https://altmp.github.io/altv-typings/)

## 浏览API

阅读 API 时，有两个部分. **(点击上面的链接)**

-   alt-server

    -   引用服务器端可用的所有功能.

-   alt-client

    -   引用客户端上所有可用的功能.

    -   经常使用 natives / game 功能.

    -   仅影响玩家的客户端.

## 阅读API

当您查看 API 时，将为 函数和类 定义所有参数及其类型.

这是一个查看 'alt.on' 函数的示例.

```ts
on(eventName: "playerConnect", listener: (player: Player) => void): void
```

如果您不知道如何阅读API，那么一开始阅读它可能会使您感到困惑.

-   事件名称称为 `on`
-   第一个参数是 `playerConnect`
-   第二个参数是监听或回调函数。 它通过 `alt.Player` 类型.
    -   您可以单击播放器以查看其提供的属性.
    -   其中一些属性是 `name` ，`ip` 等.
-   `:void` 意味着什么都不返回.

这是完全使用的同一功能.

```js
alt.on('playerConnect', handlePlayerConnect);

function handlePlayerConnect(player) {
    alt.log(`${player.name} connected to the server.`);
}
```

## 使用API

通常，您有几种不同类型的变量，函数，类等。

让我们讨论一下这些含义以及它们在代码中的外观.

### 功能

函数始终像函数（duh）一样工作，API 通常为它们提供一个部分.

![](../../img/functions.png)

这是一个使用上述功能之一的示例.

```js
alt.setTimeout(() => {
    alt.log(`Hello. This triggered after 5 seconds.`);
}, 5000);
```

### 类

类的工作方式类似于普通的JavaScript类。 这仅取决于您如何导入 'alt-server' 或 'alt-client'.

假设您以'alt'作为所有内容的前缀.

![](../../img/classes.png)

请记住，并非所有类都可以访问或可以创建.

这是一个使用上面的类之一的示例.

```js
const pos = new alt.Vector3(0, 0, 0);
const vehicle = new alt.Vehicle('infernus', pos.x, pos.y, pos.z, 0, 0, 0);
const shape = new alt.ColshapeCylinder(pos.x, pos.y, pos.z, 5, 10);
```

### 属性

一个属性通常存在于类的内部. 它们访问 **无需括号**.

它们也是可读的，因此您不必总是设置它们.

这是使用车辆的示例.

```js
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);

if (vehicle.engineOn === false) {
    vehicle.engineOn = true;
}
```

### 方法

方法通常将存在于 类 的内部。 带括号可以访问它们.

```js
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);
const result = vehicle.getDoorState(0);
vehicle.setArmoredWindowHealth(0, 100);
```
