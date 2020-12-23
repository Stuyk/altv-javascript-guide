# 玩家属性

此页面将代表使用各种玩家属性.

这些意味着都要用于服务器端.

## player.armour

用于**获取**或**设置**玩家当前的装甲等级.

```js
const currentArmour = player.armour;
player.armour = 5;
player.armour += 10;
player.armour -= 10;
```

## player.authToken

用于**获取**在早期auth实施期间提供的authToken. 大多数用户不会使用此功能.

```js
alt.on('playerConnect', handleConnect);

function handleConnect(player) {
    if (!player.authToken) {
        player.kick(`找不到身份验证令牌`);
        return;
    }

    alt.log(`${player.name} 的身份验证令牌是 ${authToken}`);
}
```

## player.currentWeapon

用于**获取**或**设置**玩家当前的武器哈希.

```js
player.currentWeapon = alt.hash('weapon_pistol'); // 0x1B06D571

if (player.currentWeapon === 0x1b06d571) {
    console.log(`玩家配有手枪.`);
}
```

如果您想用简单的英语而不是哈希处理服务器端的所有武器检查. 您应该尝试使用原型为玩家设置武器.

```js
alt.Player.prototype.setWeapon = function(weaponName) {
    this.currentWeapon = alt.hash(weaponName);
    this.currentWeaponName = weaponName;
};
```

## player.currentWeaponComponents

用于**获取**玩家当前装备的武器上的所有武器组件. 所有武器组件均已哈希.

```js
const currentWeaponComponents = player.currentWeaponComponents;

for (let i = 0; i < currentWeaponComponents.length; i++) {
    const weaponComponentHash = currentWeaponComponents[i];
}
```

## player.currentWeaponTintIndex

用于**获取**当前装备的武器的色调指数.

```js
const currentTint = player.currentWeaponTintIndex;
```

## player.dimension

用于**获取**或**设置**玩家的当前维度. 维度基于INT32. 这意味着维度存在最大值和最小值. 从`-2147483648`到`2147483648`.

Heron编写的维度说明如下.

```
X 只能看到 X
-X 能看到 0 和 -X
0 不能看到 -X 和 X
```

默认维度为 **0**.

```js
const currentDimension = player.dimension;
player.dimension = 1;

// 如果您需要每个玩家加入一个唯一的实例。 这是一种体面的处理方式.
// 只需记住在完成唯一维度中的所有操作后将其设置回零即可.
player.dimension = player.id;
```

## player.entityAimOffset

用于**获取**玩家当前的目标偏移量. 当前没有针对该特定功能的用例.

在撰写本文档时, 我们甚至不确定它是否正常运行.

## player.entityAimingAt

用于**获取**目标玩家的当前实体. 当前的看法是此特定属性无效.

在撰写本文档时, 我们甚至不确定它是否正常运行.

## player.flashlightActive

用来**获取**玩家的手电筒活动吗？

在撰写本文档时, 我们甚至不确定它是否正常运行.

## player.health

用于**获取**或**设置**玩家当前的健康状况.

GTA:V中的生命值基于 `100 - 200`.

200是玩家的最大生命值.

< 100 表示玩家已死亡.

```js
const currentHealth = player.health;
player.health += 10;

if (player.health > 200) {
    player.health = 200;
}

// 杀死玩家.
player.health = 0;
```

## player.hwidExHash

这是获取属于玩家的唯一硬件哈希的两种方法之一.

这是封禁玩家的好方法; 特别是当他们需要一套全新的硬件来避开封禁时.

当前没有人知道确定硬件信息的方式.

```js
const currentHwidEx = player.hwidExHash;
```

## player.hwidHash

这是获取属于玩家的唯一硬件哈希的两种方法之一.

这是封禁玩家的好方法; 特别是当他们需要一套全新的硬性来超越封禁时.

当前没有人知道确定硬件信息的方式.

```js
const currentHwid = player.hwidHash;
```

## player.id

用于**获取**玩家的当前ID. 这些是玩家加入顺序的唯一条件.

ID最多可使用值`65535`. 达到65535后, id将被回收到新的加入中.

```js
alt.on('playerConnect', handleConnect);

function handleConnect(player) {
    alt.log(`${player.name} 已加入ID为 ${player.id}`);
}
```

## player.ip

在大多数情况下, 这是一个从IPv4转换为IPv6的IP.

本地主机IP的示例: `::ffff:127.0.0.1`

```js
alt.on('playerConnect', handleConnect);

function handleConnect(player) {
    if (player.ip === `::ffff:127.0.0.1`) {
        alt.log(`${player.name} 已从本地主机加入.`);
    }
}
```

## player.maxArmour

用于**获取**或**设置**玩家当前的最大护甲. 可以设置的最大值为`65535`.

设置此设置后, 您可以将玩家的当前护甲设置为最大护甲值.

```js
const currentMaxArmour = player.maxArmour;
if (currentMaxArmour <= 100) {
    player.maxArmour = 65535;
    player.armour = 65535;
}

alt.log(`${player.name} is a chunker.`);
```

## player.maxHealth

用于**获取**或**设置**玩家当前的最大生命值。 可以设置的最大值为65535.

设置此设置后, 您可以将玩家的当前生命值设置为最大生命值.

```js
const currentMaxHealth = player.maxHealth;
if (currentMaxHealth <= 100) {
    player.maxHealth = 65535;
    player.health = 65535;
}

alt.log(`${player.name} is a healthy chunker.`);
```

## player.model

用于**获取**或**设置**玩家当前模型.

您可以在此处传递字符串值.

没有自动设置任何模型, 应该在连接玩家时或对其进行身份验证时进行设置.

```js
alt.on('playerConnect', handleConnect);

function handleConnect(player) {
    player.model = 'mp_m_freemode_01';
}
```

## player.name

用于**获取**玩家的当前名称. 由玩家在其选项中设置.

```js
alt.on('playerConnect', handleConnect);

function handleConnect(player) {
    if (player.name.toLowerCase() === 'stuyk') {
        player.kick(`愚蠢的名字.`);
    }
}
```

## player.netOwner

用于**获取**当前负责与服务器同步实体的网络所有者. 从实体继承.

对于普通开发人员而言, 这不一定是有用的属性.

```js
const currentOwner = player.netOwner;

if (!currentOwner) {
    console.log(`似乎没有人拥有这个实体.`);
}
```

## player.ping

用于**获取**玩家当前的ping.

以下是使所有玩家都能访问ping的代码段.

```js
alt.setInterval(handlePingUpdate, 5000);

function handlePingUpdate() {
    const currentPlayers = [...alt.Player.all];

    for (let i = 0; i < currentPlayers.length; i++) {
        const player = currentPlayers[i];
        if (!player || !player.valid) {
            continue;
        }

        player.setSyncedMeta('ping', player.ping);
    }
}
```

## player.pos

用于**获取**或**设置**玩家的当前位置.

获取玩家的当前位置时, 应使用点差运算符对其进行修改.

```js
const currentPos = { ...player.pos };
currentPos.x += 1;

// 在地图下传送它们.
player.pos = {
    x: 0,
    y: 0,
    z: 0
};

// 使用alt函数创建一个Vector3.
player.pos = new alt.Vector3(0, 0, 0);
```

## player.rot

用于**获取**或**设置**玩家当前的旋转方式. 但是, **设置旋转在服务器端中是无效的**.

```js
const currentRot = { ...player.rot };
```

## player.seat

用于**获取**玩家当前所在的座位位置.

```js
if (player.vehicle && player.seat === -1) {
    alt.log(`玩家坐在驾驶员座位上.`); // 驾驶位
}

if (player.vehicle && player.seat === 0) {
    alt.log(`玩家坐在副驾驶座位上.`); // 副驾驶
}

if (player.vehicle && player.seat === 1) {
    alt.log(`玩家坐在后排左边座位上.`); // 后左
}

if (player.vehicle && player.seat === 2) {
    alt.log(`玩家坐在后排右边座位上.`); // 后右
}
```

## player.socialId

用于**获取**链接到其Rockstar帐户的玩家当前social club标识的非安全版本.

请记住，此值**是不安全的**请勿将其用于身份验证. **它可以作为漏洞**.

```js
const social = player.socialId;
```

## player.valid

如果玩家实体仍然有效, 用于**获取**. 在间隔和处理断开连接事件时, 这很有用.

无效的玩家意味着它可以再从服务器接收数据.

```js
alt.on('playerDisconnect', handleDisconnect);

function handleDisconnect(player, reason) {
    if (!player || !player.valid) {
        console.log(`看来这名玩家已经无效. 无法保存任何东西.`);
        return;
    }

    console.log(`${player.name} 断开了连接.`);
}
```

## player.vehicle

用于**获取玩家所在的当前载具**, 如果不在则返回 **null** 或者 **undefined**.

```js
if (player.vehicle) {
    console.log(`玩家在车里. 让我们改变它的颜色!`);
    player.vehicle.setPrimaryColor = {
        r: 255,
        g: 0,
        b: 0,
        a: 255
    };
}

if (!player.vehicle) {
    console.log(`玩家不在车里.`);
}
```
