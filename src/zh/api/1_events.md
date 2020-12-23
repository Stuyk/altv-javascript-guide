# 事件

活动以一种非常特定的方式进行，理解它们之间的交流非常重要.

服务器可以与任何客户端对接.
客户端只能与WebView(网页浏览)和服务器对接.

一个客户端 **绝不** 与另一个客户端链接.

| 功能名称  | 介绍                                                                                |
| -------------- | ------------------------------------------------------------------------------------------ |
| alt.emit       | 在服务器或客户端上发出事件。 仅在它发出的那一侧收到.     |
| alt.on         | 接收事件。 服务器仅接收服务器事件。 客户端仅接收客户端事件。 |
| alt.onServer   | 接收从客户端服务器发出的事件。 触发 `alt.emitClient`. |
| alt.emitClient | 向他们接收到的特定客户端发送事件 `alt.onServer`.                  |
| alt.onClient   | 接收服务器端从客户端发出的事件. 触发 `alt.emitServer`. |
| alt.emitServer | 向接收到的服务器发送事件 `alt.onClient`.                          |

## 服务器到客户端

服务器只能使用带有Player的emitClient向客户端发出数据.
然而, 一个玩家参数也可以用 null 代替所有玩家，发送数据.

**服务器端**

```js
alt.on('playerConnect', player => {
    alt.emitClient(player, 'sayHello');
});
```

**客户端**

```js
alt.onServer('sayHello', () => {
    alt.log('Hello from server.');
});
```

## 客户端到服务器

客户端仅允许使用发出服务器将数据发送到服务器端.
服务器端onServer事件将在其事件处理程序中自动接收一个Player参数.

**客户端**

```js
alt.on('connectionComplete', () => {
    alt.emitServer('sayHello');
});
```

**客户端**

```js
alt.onClient('sayHello', player => {
    alt.log(`${player.name} is saying hello`);
});
```

## 服务器资源到服务器资源

服务端只能自己 on 和 emit 进行接/收功能.
客户端只能自己 on 和 emit 进行接/收功能.
他们也跨资源交流.

**服务器端**

```js
alt.emit('hello', 'this is a message');

alt.on('hello', msg => {
    alt.log(msg);
});
```

## 客户资源到客户资源

**客户端**

```js
alt.emit('hello', 'this is a message');

alt.on('hello', msg => {
    alt.log(msg);
});
```

## 客户端到WebView(网页浏览)并返回

**摘记:** HTTP地址中的资源是指您当前正在为其编写代码的资源.

**客户端**

```js
const webview = new alt.WebView('http://resource/client/html/index.html');
webview.on('test2', handleFromWebview);

function handleFromWebview(msg) {
    alt.log(msg);
}

alt.setTimeout(() => {
    webview.emit('test', 'Hello from Client');
}, 500);
```

**客户端HTML页面**

```html
<html>
    <head>
        <title>Hello World</title>
    </head>
    <body>
        <p>Words</p>
        <script type="text/javascript">
            if ('alt' in window) {
                alt.on('test', msg => {
                    console.log(msg);
                    alt.emit('test2', 'hello from webview');
                });
            }
        </script>
    </body>
</html>
```
