# 从另一个平台转过来?

好吧，您不是唯一一个有此想法的用户.

alt:V 提供了很多功能，但是使用此客户端时有一些注意事项.

-   服务器端代码仅支持 JS, C＃, LUA.
-   客户端代码仅支持 JS.
-   当正在创建一个模块以允许使用WASM的任何语言.
-   Natives 基于 Rockstar 的实际 Natives 名称

这些是关于 alt:V 唯一要考虑的主要事项.

否则，这是其他一些重要方面.

✔️ alt:V 支持服装附加组件.

✔️ alt:V 支持大多数修改.

✔️ alt:V 支持MLOs.

✔️ alt:V 支持自定义地图.

下面是一些没有的东西.

❌ 客户端没有LUA

❌ ESX 没有

❌ ELS 没有(Dex++ 正在为此工作)

❌ 如果您戳错了人，则不会进行审查

❌ 不支持 .asi, .dll, 或 ENB文件.

❌ 不支持ScriptHookV.

<br />

---

## FiveM 至 alt:V

以下是 alt:V 和 FiveM 之间的一些主要区别.

### 服务器端和客户端

是的，我们实际上有一个服务器端和一个客户端。 这意味着对于 alt:V 来说，注入不是一个很常见的问题。 更不用说客户端操纵了。 但是，对于专家级程序员没有什么是安全的.

[这是涵盖服务器端与客户端的视频.](https://www.youtube.com/watch?v=z-knlYI_QZM)

### 本地玩家?

我们不使用 `local playerPed = PlayerPedId()` 获取我们的本地玩家.

我们使用 `alt.Player.local.scriptID`.

### 本地玩家载具?

我们不必使用本地.

```js
alt.Player.local.vehicle;
```

### 线程数?

我们使用间隔和超时来生成线程.

我们还可以访问`alt.everyTick`它基本上是一个0ms的间隔.

```js
const myInterval = alt.setInterval(doSomething, 5000);
const myTimeout = alt.setTimeout(doSomethingElse, 10000);

function doSomething() {
    alt.log(`This was called at every 5 seconds.`);
}

function doSomethingElse() {
    alt.log(`This was called after 10 seconds.`);
}

alt.everyTick(() => {
    alt.log(`Your console will die with this every tick`);
});
```

### 事件?

事件有各种形式和规模. 查看 [API 事件部分](../api/events)

### Natives?

Natives 导入，并且只能从客户端访问.

您可以访问 [alt:V Native 资料库](https://natives.altv.mp) 更好地了解可用的东西.

### 载入画面?

我们目前不支持任何形式的加载屏幕。 我们认为这对多人游戏来说是不必要的功能.

---

## RAGE:MP 到 alt:V

以下是 alt:V 和 RAGE:MP 之间的一些关键区别.

### 本地玩家?

我们不使用`local playerPed = PlayerPedId()`获取我们的本地玩家.

我们使用 `alt.Player.local.scriptID`.

### mp.events.add('render')

我们使用间隔和超时来生成线程.

我们还可以访问`alt.everyTick`它基本上是一个0ms的间隔.

```js
const myInterval = alt.setInterval(doSomething, 5000);
const myTimeout = alt.setTimeout(doSomethingElse, 10000);

function doSomething() {
    alt.log(`This was called at every 5 seconds.`);
}

function doSomethingElse() {
    alt.log(`This was called after 10 seconds.`);
}

alt.everyTick(() => {
    alt.log(`Your console will die with this every tick`);
});
```

### mp.events.add & mp.events.call

事件有各种形式和规模. 查看 [API 事件部分.](../api/events)

我们对 alt:V 的事件有了更好的控制.

### 文字标签，标记等.

查看本文档的片段部分.
