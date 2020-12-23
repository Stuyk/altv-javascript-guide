# 服务器端事件用法&示例

该文档将为每个服务器事件提供一个示例. 这对于确保您确实掌握事件的触发和处理方式非常必要.

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
    alt.restartResource(resourceName); // <-- 他触发停止的资源以自动重新启动.
}
```

## consoleCommand

当您在alt:V服务器控制台中键入一些数据时, 将触发此操作. 按下回车键后, 它会自动分隔您的单词.

-   args 是字符串数组

```js
alt.on('consoleCommand', handleEvent);

function handleEvent(args) {
    const cmd = args[0];

    if (cmd !== 'kickall') {
        return;
    }

    // 他踢了当前在线的所有玩家.
    const players = [...alt.Player.all];
    for (let i = 0; i < players.length; i++) {
        if (!players[i] || !players[i].valid) {
            continue;
        }

        players[i].kick();
    }
}
```

假设我们在服务器控制台中键入了以下内容.

```
kickall
```

## entityEnterColshape

如果要检查玩家是否进入服务器端的特定区域. 您可以使用ColShape.

参阅 [各种形状和尺寸信息](https://altmp.github.io/altv-typings/classes/_alt_server_.colshape.html) 在这个例子中我们将使用一个圆柱体.

-   colshape 可以是玩家进入的任何colshape.
-   entity 可以是 载具 或 玩家.

```js
// 创建一个ColshapeCylinder
// (x, y, z, radius, height) 参量
const cs = new alt.ColshapeCylinder(0, 0, 0, 3, 200);

// 这是一个箭头功能, 我们可以从colshape的实例访问.
cs.doSomething = player => {
    console.log(`您掌握了一个玩家.`);
};

// 创建事件.
alt.on('entityEnterColshape', handleEvent);

// 处理事件.
function handleEvent(colshape, entity) {
    // 过滤掉所有不是玩家的实体.
    if (typeof entity !== alt.Player) {
        return;
    }

    // 检查功能是否存在. 然后执行功能.
    if (typeof cs.doSomething === 'function') {
        cs.doSomething(entity); // <-- 调用箭头功能并传递玩家.
    }
}
```

## entityLeaveColshape

如果要检查玩家是否在服务器端离开了特定区域. 您可以使用ColShape.

参阅 [各种形状和尺寸信息](https://altmp.github.io/altv-typings/classes/_alt_server_.colshape.html) 在这个例子中我们将使用一个圆柱体.

-   colshape 可以是玩家进入的任何colshape.
-   entity 可以是 载具 或 玩家.

```js
// 创建一个ColshapeCylinder
// (x, y, z, radius, height) 参量
const cs = new alt.ColshapeCylinder(0, 0, 0, 3, 200);

// 这是一个箭头功能, 我们可以从colshape的实例访问.
cs.doSomething = player => {
    console.log(`您不再需要一名玩家.`);
};

// 创建事件.
alt.on('entityLeaveColshape', handleEvent);

// 处理事件.
function handleEvent(colshape, entity) {
    // 过滤掉所有不是玩家的实体.
    if (typeof entity !== alt.Player) {
        return;
    }

    // 检查功能是否存在. 然后执行功能.
    if (typeof cs.doSomething === 'function') {
        cs.doSomething(entity); // <-- 调用箭头功能并传递玩家.
    }
}
```

## explosion

爆炸是一个非常独特的事件. 在大多数服务器中, 它们通常会关闭爆炸. 这是您可以在末尾抛出`return false`以阻止所有爆炸对服务器造成损害的事件之一.

-   entity 是损害的根源.
-   explosionType 是数字类型.
-   position 是爆炸的位置
-   exposionFx 是用于爆炸的ScreenFx的哈希
-   target 是这次爆炸的对象.

```js
alt.on('explosion', handleEvent);

function handleEvent(entity, explosionType, position, explosionFxNumberOrHash, target?) {
    if (explosionType === 0) {
        return false; // 不要伤害玩家
    }

    return true; // 伤害玩家
}
```

## playerChangedVehicleSeat

当玩家从一个座位移到另一个座位时调用此事件.

-   player 是执行改组的玩家实例.
-   vehicle 是目前正在发生的车辆.
-   oldSeat 是玩家所在的座位.
-   newSeat 是玩家所在的新座位.

```js
alt.on('playerChangedVehicleSeat', handleEvent);

function handleEvent(player, vehicle, oldSeat, newSeat) {
    if (oldSeat === -1 && newSeat !== -1) {
        console.log(`${player.name} 离开了驾驶员座位!`);
    }
}
```

## playerConnect

他是玩家连接到服务器时发生的事件.

玩家可以通过运行`player.kick()`命令来取消其连接.

### 玩家连接无任何反应

重要的是要知道玩家连接后**什么都不会发生**. 您必须使用`player.spawn`和`player.model`才能看到玩家.

-   player 是加入服务器的玩家.

```js
alt.on('playerConnect', handleEvent);

function handleEvent(player) {
    console.log(`${player.name} 已加入服务器.`);
    console.log(`${player.name} 现在将看到自己.`);

    player.spawn(0, 0, 0);
    player.model = `mp_m_freemode_01`; // mp_f_freemode_01

    alt.setTimeout(() => {
        if (!player || !player.valid) {
            return;
        }

        player.kick();
    }, 5000);
}
```

## playerDamage

这是玩家受到伤害时发生的事件. 可以通过增加失去的生命值来消除伤害.

建议不要使用此事件代替playerDeath. 它们有各自的用途.

如果您希望身体部位受损和其他信息, 请参阅 [武器伤害](#weaponDamage)

-   player 是被损坏的玩家
-   attacker 是攻击玩家的玩家
-   weaponHash 是武器的哈希值
-   damage 是对玩家造成的伤害

```js
alt.on('playerDamage', handleEvent);

function handleEvent(player, attacker, weaponHash, damage) {
    player.health += damage;

    if (player.health > 200) {
        player.health = 200;
    }

    if (player.health <= 100) {
        // 他死了
        player.spawn(player.pos.x, player.pos.y, player.pos.z);
    }

    return false; // 这将抵消所遭受的所有伤害. 它不会重生玩家
}
```

## playerDeath

如果您突然失去全部健康而死. 这是被触发的事件.

-   player 是谁死的玩家.
-   attacker 是导致该玩家死亡的玩家. 有时可能是自己.
-   weaponHash 是所用武器的哈希值.

```js
alt.on('playerDamage', handleEvent);

function handleEvent(player, attacker, weaponHash) {
    console.log(`${player.name} 被 ${attacker.name} 杀死了.`);
    player.spawn(player.pos.x, player.pos.y, player.pos.z, 5000); // 这将在5秒后重新生成玩家.
}
```

## playerDisconnect

这是玩家离开服务器时的断开事件.

-   player 是离开服务器的玩家.
-   reason 是玩家离开服务器的原因.

```js
alt.on('playerDisconnect', handleEvent);

function handleEvent(player, reason) {
    // 您应该检查玩家是否有效. 如果原型数据无效, 则可能会丢失它们.
    if (!player || !player.valid) {
        console.error(`无法获取玩家的数据. ${player.name}`);
    } else {
        // 尽快克隆您要保存的数据.
        // 在此处执行数据库保存语句.
        // 此功能结束后, 玩家数据将丢失.
    }

    console.log(`${player.name} 已断开连接.`);
}
```

## playerEnteredVehicle

当玩家**坐下**载具时触发此事件. **不是正在进入时**. **也不是开始进入时**.

-   player 是进入载具的玩家.
-   vehicle 是玩家已经坐在里面的载具.
-   seat 是玩家坐上的座位. 请参阅[座位表以了解更多信息](#Seat Table)

```js
alt.on('playerEnteredVehicle', handleEvent);

function handleEvent(player, vehicle, seat) {
    console.log(`${player.name} left the ${vehicle.model} by entering seat ${seat}`);
    vehicle.engineOn = true; // <-- Car goes brr.
}
```

## playerLeftVehicle

当玩家完全离开车辆时触发此事件. **不是正在离开时**. **也不是开始离开时**.

-   player 是谁离开的玩家.
-   vehicle 是玩家站在外面的载具.
-   seat 是玩家离开之前的座位. 请参阅[座位表以了解更多信息](#Seat Table)

```js
alt.on('playerLeftVehicle', handleEvent);

function handleEvent(player, vehicle, seat) {
    console.log(`${player.name} left the ${vehicle.model} by leaving seat ${seat}`);
    vehicle.engineOn = true; // <-- Car goes brr.
}
```

## removeEntity

此事件是实体被销毁时; 例如玩家, 载具, blip和colshape

-   object 可以是 `player, vehicle, blip, 或者 colshape`.

```js
alt.on('removeEntity', handleEvent);

function handleEvent(someObject) {
    if (typeof someObject === alt.Player) {
        console.log(`A player got yeeted.`);
    }

    if (typeof someObject === alt.Vehicle) {
        console.log(`A vehicle got yeeted.`);
    }

    if (typeof someObject === alt.Blip) {
        console.log(`A blip got yeeted.`);
    }

    if (typeof someObject === alt.ColShape) {
        console.log(`A player got yeeted.`);
    }
}
```

## resourceStart

资源启动时调用.

-   errored 让我们知道资源是否加载失败.

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
    console.log(`他死了吉姆`);
}
```

## syncedMetaChange

当任何玩家, 载具, 同型物或blip的同步元值发生更改时, 将调用此方法.

请记住 **syncedMeta** 可以从 **服务器 和 客户端 访问.**

-   entity 可以是 `player, vehicle, colshape, 或者 blip`
-   key 是用于标识数据的标识符. 将其视为JavaScript映射中的键.
-   value 是与键关联的值.
-   oldValue 是传递当前值之前的值.

```js
alt.on('playerConnect', player => {
    player.setSyncedMeta('connected', true);
});

alt.on('syncedMetaChange', handleEvent);

function handleEvent(entity, key, value, oldValue) {
    // 过滤掉非玩家类型.
    if (typeof entity !== alt.Player) {
        return;
    }

    // 比较key, 如果它是我们想要的.
    if (key !== 'connected') {
        return;
    }

    // 我们只是为连接的玩家制作了一个过于复杂的console.log. 好极了!
    console.log(`${player.name} has connected.`);
}
```

## streamSyncedMetaChange

当任何玩家, 载具, 同型物或blip的同步元值发生更改时, 将调用此方法.

请记住 **streamSyncedMeta** 可以从 **服务器 和 客户端 访问** 由其他人的流范围内的玩家.

-   entity 可以是 `player, vehicle, colshape, 或者 blip`
-   key 是用于标识数据的标识符. 将其视为JavaScript映射中的键.
-   value 是与键关联的值.
-   oldValue 是传递当前值之前的值.

```js
alt.on('playerConnect', player => {
    player.setStreamedSyncedMeta('Connected', true);
});

alt.on('streamSyncedMetaChange', handleEvent);

function handleEvent(entity, key, value, oldValue) {
    // 过滤掉非玩家类型.
    if (typeof entity !== alt.Player) {
        return;
    }

    // 比较key，如果它是我们想要的.
    if (key !== 'connected') {
        return;
    }

    // 我们只是为连接的玩家制作了一个过于复杂的console.log. 好极了!
    console.log(`${player.name} has connected.`);
}
```

## globalMetaChange

在实施之前, 我们将跳过这一步. 目前 **未实现**.

## globalSyncedMetaChange

在实施之前, 我们将跳过这一步. 目前 **未实现**.

## vehicleDestroy

当载具损坏到被摧毁的程度时称为.

```js
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);
vehicle.currentModel = 'infernus';

alt.on('vehicleDestroy', handleEvent);

function handleEvent(vehicle) {
    const newPosition = { ...vehicle.pos };
    const newModel = vehicle.currentModel;

    if (vehicle.valid && vehicle.destroyed) {
        vehicle.destroy();
    }

    // 销毁车辆时重生.
    new alt.Vehicle(oldModel, newPosition.x, newPosition.y, newPosition.z, 0, 0, 0);
}
```

## weaponDamage

这是玩家使用武器造成伤害时发生的事件. 可以通过增加失去的生命值来消除伤害.

建议不要使用此事件代替playerDeath. 它们有各自的用途.

-   player 是被损坏的玩家
-   target 是被玩家攻击的玩家
-   weaponHash 是武器的哈希值
-   damage 是对玩家造成的伤害
-   offset 是一个vector3, 代表玩家被准确击中的位置
-   bodyPart 是玩家被击中的地方的骨骼索引

```js
alt.on('weaponDamage', handleEvent);

function handleEvent(player, target, weaponHash, damage, offset, bodyPart) {
    console.log(`${player.name} 被 ${target.name} 攻击了`);
    console.log(`${target.name} 造成 ${damage} 来自于 ${weaponHash} 与受伤骨骼为 ${bodyPart}`);
    console.log(`拒绝受到伤害`);
    return false;
}
```

## startFire

在实施之前, 我们将跳过这一步. 目前 **未实现**.

## startProjectile

在实施之前, 我们将跳过这一步. 目前 **未实现**.

## playerWeaponChange

这是当玩家从旧武器切换到新武器时.

-   player 是切换武器的玩家.
-   oldWeapon 是使用的旧武器的数量或哈希值.
-   newWeapon i是正在使用的新武器的数量或哈希值.

```js
alt.on('playerWeaponChange', handleEvent);

function handleEvent(player, oldWeapon, newWeapon) {
    // 防止武器交换
    player.currentWeapon = oldWeapon;
}
```
