# 客户端事件用法 & 示例

该文档将为每个服务器事件提供一个示例. 这对于确保您确实掌握事件的触发和处理方式非常必要.

## 重要提示

如果您想在客户端使用`console.log`. 将**不会**起作用.

您必须改为使用`alt.log`.

```js
alt.log(`您好客户端.`);
alt.log(`你的位置是: ${JSON.stringify(alt.Player.local.pos)}`);
```

## anyResourceError

当您在`server.cfg`中加载资源并且**错误**加载时触发.

-   resourceName 是您的`server.cfg`中的资源名称

```js
alt.on('anyResourceError', handleEvent);

function handleEvent(resourceName) {
    console.log(`${resourceName} 加载失败.`);
}
```

## anyResourceStart

当您在`server.cfg`中加载资源并正确加载时触发.

-   resourceName 是您的`server.cfg`中的资源名称

```js
alt.on('anyResourceStart', handleEvent);

function handleEvent(resourceName) {
    console.log(`${resourceName} 已加载.`);
}
```

## anyResourceStop

当您以编程方式或通过控制台强制停止资源时, 将触发此事件.

-   resourceName 是您的`server.cfg`中的资源名称

```js
alt.on('anyResourceStop', handleEvent);

function handleEvent(resourceName) {
    console.log(`${resourceName} 已停止. 重新启动资源.`);
    alt.restartResource(resourceName); // <-- 这将触发已停止的资源以自动重新启动.
}
```

## connectionComplete

当您进入服务器并且已加载所有资源时, 将调用此方法.

```js
alt.on('connectionComplete', handleEvent);

function handleEvent() {
    alt.log(`欢迎!`);
}
```

## consoleCommand

当您在alt:V客户端服务器控制台中键入一些数据时, 将触发此操作. 按下回车键后, 它会自动分隔您的单词.

-   args 是字符串数组

```js
alt.on('consoleCommand', handleEvent);

function handleEvent(args) {
    const cmd = args[0];

    if (cmd !== 'loghello') {
        return;
    }

    alt.log(`你好来自于客户端.`);
}
```

假设我们在服务器控制台中输入了以下内容.

```
loghello
```

## disconnect

当您重新连接到本地开发环境时, 这最有用. 这用于清理游戏更改, 然后再次重新连接.

```js
alt.on('disconnect', handleEvent);

function handleEvent() {
    alt.log(`您已断开连接.`)
	// 此事件后不再有消息或功能起作用.
}
```

## gameEntityCreate

当玩家, 车辆或其他任何东西进入客户端的流范围时被称为.

这意味着, 如果车辆从您的流范围之外进入, 它将在此事件范围内开始为玩家同步.

* entity 是创建的实体.

### 客户端

```js
alt.on('playerConnect', (player) => {
   player.model = 'mp_m_freemode_01';
   player.spawn(0, 0, 0);
    
   // 生成一个载具
   const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);
   alt.emitClient(player, 'setIntoVehicle', vehicle);
});
```

### 客户端

```js
// 开始安装服务器端
alt.onServer('setIntoVehicle', handleSetIntoVehicle);

function handleSetIntoVehicle(vehicle) {
    alt.Player.local.needsVehicle = vehicle;
}


// 事件开始实施
alt.on('gameEntityCreate', handleEvent);

function handleEvent(entity) {
    // 检查这是否是载具实体.
	if (typeof entity !== alt.Vehicle) {
        return;
    }

    // 检查这是否是我们要寻找的载具.
	if (alt.Player.local.needsVehicle !== entity) {
        return;
    }

    // 停止寻找新载具.
	alt.Player.local.needsVehicle = false;

    // 将它们放在驾驶员座椅上.
    // ScriptID用于获取natives本地的车辆和玩家的句柄.
    native.setPedIntoVehicle(alt.Player.local.scriptID, vehicle.scriptID, -1);
}
```

## gameEntityDestroy

当车辆, 玩家或其他任何东西离开客户端的流范围时, 这称为.

当您需要销毁附着在离开某个区域的玩家的物品时, 这非常有用.

假设下面的实体上有一个由其scriptID定义的对象.

```js

alt.on('gameEntityDestroy', handleEvent);

function handleEvent(entity) {
    // 检查这是否是载具实体.
	if (typeof entity !== alt.Player) {
        return;
    }

    // 检查这是否是我们要寻找的载具.
	if (!alt.Player.local.attachedObject) {
        return;
    }

    // 删除上述物件.
	native.deleteEntity(alt.Player.local.attachedObject);
    alt.Player.local.attachedObject = false;
}
```

## keydown

玩家按下键盘键时会调用.

你可以查看 [通过访问此网站的按键代码](http://keycode.info/?ref=stuyk).

* keycode 是JavaScript键码标识符

```js
alt.on('keydown', handleEvent);

function handleEvent(keycode) {
    if (keycode !== 70) {
        alt.log(`按下'F'表示尊重.`);
    }
}
```

## keyup

玩家放开按键时称为.

你可以查看 [通过访问此网站的按键代码](http://keycode.info/?ref=stuyk).

* keycode 是JavaScript键码标识符

```js
alt.on('keyup', handleEvent);

function handleEvent(keycode) {
    if (keycode !== 69) {
        alt.log(`按下'E'表示奈斯.`);
    }
}
```

## removeEntity

此事件是实体被销毁时; 例如玩家, 载具, blip 和 colshape.

-   object 可以是 `player, vehicle, blip, 或者 colshape`.

```js
alt.on('removeEntity', handleEvent);

function handleEvent(someObject) {
    if (typeof someObject === alt.Player) {
        console.log(`一名玩家.`);
    }

    if (typeof someObject === alt.Vehicle) {
        console.log(`一个载具.`);
    }

    if (typeof someObject === alt.Blip) {
        console.log(`一个blip.`);
    }

    if (typeof someObject === alt.ColShape) {
        console.log(`一个colshape.`);
    }
}
```

## resourceStart

资源启动时调用.

-   错误让我们知道资源是否加载失败.

```js
alt.on('resourceStart', handleEvent);

function handleEvent(errored) {
    if (errored) {
        throw new Error(`发生严重错误, 我不知道为什么.`);
    }

    console.log(`猜猜一切都装好了.`);
}
```

## resourceStop

资源停止时将调用此方法. 在放弃生命之前的最后一口气.

```js
alt.on('resourceStop', handleEvent);

function handleEvent() {
    console.log(`他死了吉姆.`);
}
```

## syncedMetaChange

当任何玩家, 载具, 同型物或blip的同步元值发生更改时, 将调用此方法.

请记住, 可以从**服务器端 和 客户端 访问 syncedMeta**

-   object 是 `player, vehicle, colshape, 或者 blip`
-   key 是用于识别数据的标识符. 将其视为JavaScript映射中的键.
-   value 是与键关联的值.
-   oldValue 是传递当前值之前的值.

**服务器端**

```js
alt.on('playerConnect', player => {
    player.setSyncedMeta('Connected', true);
});
```

**客户端**

```js
alt.on('syncedMetaChange', handleEvent);

function handleEvent(entity, key, value, oldValue) {
    // 过滤掉非玩家类型.
    if (typeof entity !== alt.Player) {
        return;
    }

    // 比较键, 如果它是我们想要的.
    if (key !== 'connected') {
        return;
    }

    // 我们只是为连接的玩家制作了一个过于复杂的console.log. 好极了!
    alt.log(`您已加入服务器.`);
}
```

## streamSyncedMetaChange

当任何玩家, 载具, 同型物或blip的同步元值发生更改时, 将调用此方法

请记住, 其他人的媒体范围内的玩家可以从**服务器 和 客户端 访问 streamSyncedMeta**.

-   对象是 `player, vehicle, colshape, 或者 blip`
-   键是用于识别数据的标识符. 将其视为JavaScript映射中的键.
-   值是与键关联的值.
-   oldValue是传递当前值之前的值.

**服务器端**

```js
alt.on('playerConnect', player => {
    player.setStreamedSyncedMeta('Connected', true);
});
```

**客户端**

```js
alt.on('streamedSyncedMetaChange', handleEvent);

function handleEvent(entity, key, value, oldValue) {
    // 过滤掉非玩家类型.
    if(!(entity instanceof alt.Player)) return;
    
    // 比较键, 如果它是我们想要的.
    if (key !== 'connected') {
        return;
    }

    // 我们只是为连接的玩家制作了一个过于复杂的console.log. 好极了!
    console.log(`您已加入服务器.`);
}
```

## globalMetaChange

我们将跳过这一步, 直到实施为止. 目前 **未实现**.

## globalSyncedMetaChange

我们将跳过这一步, 直到实施为止. 目前 **未实现**.
