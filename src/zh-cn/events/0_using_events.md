# 事件使用指南

现在, 我们对事件进行了简要概述. 让我们谈谈如何读取API.

_如果这些链接失效了. 请联系Stuyk._

-   [服务器 API](https://altmp.github.io/altv-typings/modules/_alt_server_.html#on)
-   [客户端 API](https://altmp.github.io/altv-typings/modules/_alt_client_.html#on)

以下是事件的一些常见用例. 只是一些有关如何使用它们的通用代码.

[有关语法和参数, 请参阅服务器事件示例](./server_events)

## playerConnect服务器端示例事件

此事件是任何加入您的服务器的玩家的切入点. 您应该在整个资源中使用一次此事件. 它监听于玩家的连接. 您甚至可以在玩家完全连接之前踢出他们.

**服务器端**

```js
// 玩家连接时要处理的事件.
alt.on('playerConnect', handlePlayerConnect);

// 使用类 alt.Player
function handlePlayerConnect(player) {
    alt.log(`${player.name} 已连接.`);
}
```

重要的是要了解玩家连接后**什么都不会发生**.

没有玩家可以移动. 没有为玩家设置模型.

这是设置玩家模型并生成玩家的方法.

**服务器端**

```js
/// <reference types="@altv/types-server" />
import alt from 'alt-server';

const spawn = {
    x: -1291.7142333984375,
    y: 83.43296813964844,
    z: 54.8916015625
};

alt.on('playerConnect', handlePlayerConnect);

function handlePlayerConnect(player) {
    player.spawn(spawn.x, spawn.y, spawn.z, 0);
    player.model = `mp_m_freemode_01`;
}
```

## connectionComplete客户端示例

`playerConnect`事件的替代方法是客户端的`connectionComplete`事件. 这是玩家完全连接到服务器时.

该事件是客户端事件, 我们已经知道玩家是谁. 这仅在他们的计算机上发生, 并且是基于实例的.

这意味着此功能仅对每个玩家都有效, 但仅对连接的玩家有效.

**客户端**

```js
alt.on('connectionComplete', handleConnectionComplete);

function handleConnectionComplete() {
    const myClientPosition = { ...alt.Player.local.pos };

    alt.log(`我的位置是: ${JSON.stringify(myClientPosition)}`);
    alt.emitServer('helloFromClient', '这是一个字符串');
}
```

**服务器端**

```js
alt.onClient('helloFromClient', handleHelloFromClient);

function handleHelloFromClient(player, msg) {
    console.log(`${player.name} 发出了一个事件.`);
    console.log(msg);
}
```

## playerDeath 服务器端 & 客户端示例

玩家死亡是很常见的事件. 如果玩家死亡, 您将需要使用`player.spawn`来复活玩家.

如果希望他们在此呆很长时间, 则必须在它们死后手动进行布娃娃. 请记住, 您必须先运行`player.spawn`才能将其标记为布娃娃.

### 服务器端

```js
alt.on('playerDeath', handlePlayerDeath);

function handlePlayerDeath(victim, killer, weaponHash) {
    if (!victim || !victim.valid) {
        return;
    }

    if (killer && killer.valid) {
        alt.log(`${killer.name} 击杀了 ${victim.name}`);
    }

    alt.log(`${victim.name} 将在5秒内复活...`);
    alt.setTimeout(() => {
        if (!victim || !victim.valid) {
            return;
        }

        victim.spawn(0, 0, 0);
        victim.health = 200;
    }, 60000 * 3); // 将在3分钟内重生死亡者.
}
```

### 常见用例

假设我们想在玩家死亡时对他们进行布娃娃, 并让他们继续布娃娃状态直到他们重生, 这是一种简单的方法.

#### 服务器端

```js
alt.on('playerDeath', handlePlayerDeath);

function handlePlayerDeath(victim, killer, weaponHash) {
    // 验证受害者是否存在.
    if (!victim || !victim.valid) {
        return;
    }

    // 重生玩家.
    victim.spawn(victim.pos.x, victim.pos.y, victim.pos.z);

    // 如果我们已经将受害者标记为死亡. 停止执行代码.
    if (victim.isDead) {
        return;
    }

    // 将受害者标记为死亡.
    victim.isDead = true;
    alt.emitClient(victim, 'death:Handle', victim.isDead);

    // 定时在5秒钟之后, 将重新生成它们.
    alt.setTimeout(() => {
        // 验证它们在5秒钟内仍在服务器中.
        if (!victim || !victim.valid) {
            return;
        }

        // 取消标记它们为已死亡并重新生成它们.
        victim.isDead = false;
        alt.emitClient(victim, 'death:Handle', victim.isDead);
        victim.spawn(0, 0, 0); // 设置到您的医院位置
        victim.health = 200;
    }, 5000);
}
```

#### 客户端

```js
let interval;
let isDead = false;

// 从服务器端接收值.
alt.on('death:Handle', value => {
    // 更新我们的本地值.
    isDead = value;

    // 如果值为false. 不要重新创建间隔.
    if (!isDead) {
        return;
    }

    // 启动一个间隔, 每100ms调用一次函数.
    interval = alt.setInterval(handleDeathTicks, 100);
});

function handleDeathTicks() {
    // 如果它们不再标记为已死. 清除间隔.
    if (!isDead) {
        alt.clearInterval(interval);
        return;
    }

    // 如果它们被标记为已死. 启用布娃娃.
    native.setPedToRagdoll(alt.Player.local.scriptID, 5000, 0, 0, true, true, false);
}
```

## playerLeftVehicle & playerEnteredVehicle 服务器端示例

当玩家进入或离开车辆时触发这些事件.

这是删除玩家退出车辆后进入的车辆的示例.

```js
alt.on('playerEnteredVehicle', handlePlayerEnteredVehicle);
alt.on('playerLeftVehicle', handlePlayerLeftVehicle);

function handlePlayerEnteredVehicle(player, vehicle, seat) {
    // 将有关车辆和座位的信息存储在玩家上.
    player.currentSeat = seat;
    player.lastVehicle = vehicle;
}

function handlePlayerLeftVehicle(player, vehicle, seat) {
    // 检查座位是否为驾驶员. 检查车辆是否有效.
    if (player.currentSeat === -1 && player.lastVehicle.valid) {
        player.lastVehicle.destroy();
        player.lastVehicle = null;
        player.currentSeat = -2;
    }
}
```
