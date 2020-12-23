# 获取所有玩家 & 载具

服务器端存在两个特殊的数组，可帮助您确定所有玩家或载具.

## alt.Player.all

该数组参数专门返回服务器上当前所有玩家的数组.

使用这样的数组参数时，请记住一些注意事项.

1. 始终复制数组参数。 它将使您免于未定义或无效的问题.

```js
const currentPlayers = [...alt.Player.all];
```

2. 可以尝试遍历循环一下玩家. 实践它.

```js
const currentPlayers = [...alt.Player.all];

// 循环遍历玩家.
for (let i = 0; i < currentPlayers.length; i++) {
    const aPlayer = currentPlayers[i];

    // 我们通过 'aPlayer.valid' 检查是否为真 来检查有效性.
    if (!aPlayer || !aPlayer.valid) {
        continue;
    }

    // 尝试做其他事情.
}

// 循环遍历玩家的另一种方法.
currentPlayers.forEach((player, index) => {
    // 我们在这里再次检查有效性.
    if (!player || !player.valid) {
        return;
    }

    // 尝试做其他事情.
});
```

## alt.Vehicle.all

确保您已阅读以上内容, 相同的过程和有效性检查适用于载具.

```js
const currentVehicles = [...alt.Vehicle.all];

// 循环遍历载具.
for (let i = 0; i < currentVehicles.length; i++) {
    const aVehicle = currentVehicles[i];

    // 我们通过 'aVehicle.valid' 检查是否为真 来检查有效性.
    if (!aVehicle || !aVehicle.valid) {
        continue;
    }

    // 做其他事情.
}

// 循环遍历载具的另一种方法.
currentVehicles.forEach((vehicle, index) => {
    // 我们在这里再次检查有效性.
    if (!vehicle || !vehicle.valid) {
        return;
    }

    // 做其他事情.
});
```
