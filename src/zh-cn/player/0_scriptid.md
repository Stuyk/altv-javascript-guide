# 了解ScriptID

这是我们在客户端识别另一位玩家或我们自己的方式.

概述

-   scriptID仅对客户端唯一.
-   scriptID将为我们提供一种修改本机玩家行为的方法.
-   它们最常与本地一起使用.
-   每个客户端每个玩家他们都是唯一的.
    -   不要尝试与其他玩家共享scriptID. 不起作用.

## 如何获得.

您的玩家的scriptID可以通过这种方式检索.

```js
alt.Player.local.scriptID;
```

这等效于FiveM中的`local playerPed = PlayerPedId()`.

但是，对于单个玩家, 这取决于您如何接收其玩家实例.

### 服务器端

```js
alt.on('playerConnect', player => {
    // 散发给所有玩家
    alt.emitClient(null, 'joined', player);
});
```

### Client Side

```js
alt.onServer('joined', otherPlayer => {
    // 检查自己. 忽略自我.
    if (otherPlayer === alt.Player.local) {
        // 让我们冻结自己.
        // 实际上不这样做. 这就是大多数本地使用scriptID的方式.
        alt.log(`你被冻结了.`);
        native.freezeEntityPosition(alt.Player.local.scriptID, true);

        // 我们将在5秒内解冻.
        alt.setTimeout(() => {
            alt.log(`你被解除了冻结.`);
            native.freezeEntityPosition(alt.Player.local.scriptID, false);
        }, 5000);
        return;
    }

    // 将他们的scriptID记录到'F8'控制台.
    alt.log(`他们的scriptID为: ${otherPlayer.scriptID}`);
});
```
