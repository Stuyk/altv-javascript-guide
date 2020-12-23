# 事件的良好做法

有很多使用事件的方法, 最常见的问题是在事件内部初始化事件.

## 在事件中初始化事件

如果您是在事件中初始化事件的人员之一. 通常, 您会造成内存泄漏.

### 通用服务器端事件示例

**不要这样做** ⚠️

```js
alt.on('playerConnect', handleConnection);

function handleConnection(player) {
    alt.on('doSomething', player => {
        player.health = 200;
    });

    alt.emit('doSomething', player); // <--- 这是个问题.
}
```

相反, 您应该做的是以这种方式初始化事件.

**更好的做法** ✔️

```js
alt.on('playerConnect', handleConnection);
alt.on('doSomething', handleDoSomething);

function handleConnection(player) {
    alt.emit('doSomething', player);
}

function handleDoSomething(player) {
    player.health = 200;
}
```

**为什么** ❓

我们之所以不这样做的原因是, 每次玩家连接到服务器时, 您都要初始化同一事件的多个实例. 就像每次玩家进入服务器时都在创建事件一样.

如果我们希望单个事件触发每个用户一次. 我们在事件外将其初始化一次.

### 通用WebView示例

这是利用客户端API的另一个示例.

**不要这样做** ⚠️

```js
const url = `https://resource/client/html/index.html`;
let view;
let somethingToSend;

alt.onServer('show:WebView', handleOpen);
alt.onServer('close:WebView', handleClose)

function handleOpen(_somethingToSend) {
    somethingToSend = _somethingToSend;
    
    // 加载新WebView
	if (!view) {
        view = new alt.WebView(url);
    }
    
    // 添加事件
    view.on('load', handleLoad); // <-- 这是一个问题.
    view.on('close', handleClose);
}

function handleClose() {
    if (!view) {
        return;
    }
    
    view.destroy();
    view = null;
}

function handleLoad() {
    if (!view) {
        return;
    }
    
    view.emit('sendSomething', somethingToSend);
}

```

与上述类似示例一样, 突出显示的行是一个问题, 这是有原因的.

考虑到在创建WebView时, 您正在创建一个实例.

创建此单个实例后, 您要添加事件.

但是, 这些事件只需要挂接到 **一次**.

**更好的做法** ✔️

```js
const url = `https://resource/client/html/index.html`;
let view;
let somethingToSend;

alt.onServer('show:WebView', handleOpen);
alt.onServer('close:WebView', handleClose)

function handleOpen(_somethingToSend) {
    somethingToSend = _somethingToSend;
    
	if (!view) {
        // 加载新的WebView并添加事件
        view = new alt.WebView(url);
        view.on('load', handleLoad);
        view.on('close', handleClose);
    }
}

function handleClose() {
    if (!view) {
        return;
    }
    
    view.destroy();
    view = null;
}

function handleLoad() {
    if (!view) {
        return;
    }
    
    view.emit('sendSomething', somethingToSend);
}

```



## 关闭未使用的事件

如果您有很多事件, 可能会发现最终不再需要某些事件.

您可以通过几种方式关闭事件.

| 关闭事件的类型             | 描述                                    |
| ------------------------- | ---------------------------------------------- |
| `alt.off`                 | 关闭任何仅客户端或服务器端的事件.                 |
| `alt.offClient`           | 关闭来自客户端的任何事件.                        |
| `alt.offServer`           | 关闭来自服务器端的任何事件.                      |
| `yourWebViewVariable.off` | 关闭任何来自WebView的事件.                      |

所有这些事件都需要关闭`function`. 这意味着, 如果要关闭事件, 则不能创建箭头函数或代替函数的回调. 下面有一些例子.

### 使用 'alt.off'

这可以在服务器端或客户端上完成.

这是有关如何使用`alt.off`的示例.

```js
alt.on('doSomething', handleDoSomething);

function handleDoSomething() {
    // 可以从任何地方调用此功能.
    // 您不必在事件内部将其关闭.
    alt.off('doSomething', handleDoSomething); // <--- 这是一个function
}

```

### 使用 'alt.offClient'

这 **仅用于** 服务器端.

这是有关如何使用`alt.offClient`的示例.

```js
alt.onClient('doSomething', handleDoSomething);

function handleDoSomething() {
    // 可以从任何地方调用此功能.
    // 您不必在事件内部将其关闭.
    alt.offClient('doSomething', handleDoSomething); // <--- 这是一个function
}
```

### 使用 'alt.offServer'

这 **仅用于** 客户端.

这是有关如何使用`alt.offServer`的示例.

```js
alt.onServer('doSomething', handleDoSomething);

function handleDoSomething() {
    // 可以从任何地方调用此功能.
    // 您不必在事件内部将其关闭.
    alt.offServer('doSomething', handleDoSomething); // <--- 这是一个function
}
```

### 使用 'yourWebView.off'

本示例WebView **仅用于** 客户端.

```js
const url = `https://resource/client/html/index.html`;
let view;
let somethingToSend;

alt.onServer('show:WebView', handleOpen);
alt.onServer('close:WebView', handleClose)

function handleOpen(_somethingToSend) {
    somethingToSend = _somethingToSend;
    
	if (!view) {
        // 加载新的WebView并添加事件
        view = new alt.WebView(url);
        view.on('load', handleLoad);
        view.on('close', handleClose);
    }
}

function handleLoad() {
    if (!view) {
        return;
    }
    
    view.emit('sendSomething', somethingToSend);
    
    // 假设我们要在创建WebView之后立即关闭事件.
    // 这个功能就是我们需要做到的.
    view.off('load', handleLoad); // <-- 这是一个Function
}

```

## 结束语

请记住, 如果您关闭事件, 则需要重新初始化它.

利用此功能可以发挥自己的优势, 无需关闭所有事件, 这只是应于更多利用的功能.
