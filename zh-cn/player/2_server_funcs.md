# 玩家服务器功能

该页面将代表使用各种播放器功能.

这些都意味着要在服务器端里使用.

## addWeaponComponent

用于基于其哈希将武器组件添加到武器.

查看关于 [武器组件表](../tables/weapon_components)

```js
// weaponHash, componentHash
player.addWeaponComponent(0xDFE37640, 0x5B3E7DB6)
```

## deleteMeta

用于删除可跨资源使用的**服务器端**元.

```js
// 设置玩家的元.
player.setMeta('cash', 500); // 键值, 数值

// 检查元是否存在.
if (player.hasMeta('cash')) { // 键值
    // 从玩家那里获取元数据.
	const currentCash = player.getMeta('cash'); // 键值

	// 删除Meta.
    player.deleteMeta('cash'); // <--- 用法
}
```

## deleteStreamSyncedMeta

用于删除存储在玩家实体上的数据, 该实体可在**服务器端**和**客户端**上访问.

此类同步的元数据仅可由该玩家的流范围中的玩家访问.

```js
// 设置玩家的元.
player.setStreamSyncedMeta('ping', player.ip); // 键值, 数值

// 检查元是否存在.
if (player.hasStreamSyncedMeta('ping')) { // 键值
    // 从玩家那里获取元数据.
	const currentCash = player.getStreamSyncedMeta('ping'); // 键值
    
	// 删除元.
    player.deleteStreamSyncedMeta('ping'); // <--- 用法
}
```

## deleteSyncedMeta

用于删除存储在玩家实体上的数据, 该实体可在**服务器端**和**客户端**上访问.

这种类型的同步元可以在内部和**外部**流范围内访问.

```js
// 设置玩家的元.
player.setSyncedMeta('ping', player.ip); // 键值, 数值

// 检查元是否存在.
if (player.hasSyncedMeta('ping')) { // 键值
    // 从玩家那里获取元数据.
	const currentCash = player.getSyncedMeta('ping'); // 键值
    
	// 删除元.
    player.deleteSyncedMeta('ping'); // <--- 用法
}
```

## destroy

您永远不要使用此功能. 它不会做任何事情, 可能会使您的服务器崩溃. 

## getMeta

用于获取跨资源可用的**服务器端**元.

```js
// 设置玩家的元.
player.setMeta('cash', 500); // 键值, 数值

// 检查元是否存在.
if (player.hasMeta('cash')) { // 键值
    // 从玩家那里获取元数据.
	const currentCash = player.getMeta('cash'); // <--- 用法

	// 删除元.
    player.deleteMeta('cash'); // 键值
}
```

## getStreamSyncedMeta

用于获取存储在玩家实体上的数据, 该实体可在**服务器端**和**客户端**上访问.

这种类型的同步元数据只能由玩家**在此玩家的内部流范围内**访问.

```js
// 设置玩家的元.
player.setStreamSyncedMeta('ping', player.ip); // 键值, 数值

// 检查元是否存在.
if (player.hasStreamSyncedMeta('ping')) { // 键值
    // 从玩家那里获取元数据.
	const currentCash = player.getStreamSyncedMeta('ping'); // <--- 用法
    
	// 删除元.
    player.deleteStreamSyncedMeta('ping'); // 键值
}
```

## getSyncedMeta

用于删除存储在玩家实体上的数据, 该实体可在**服务器端**和**客户端**上访问.

这种类型的同步元可以在内部和**外部**流范围内访问.

```js
// 设置玩家的元.
player.setSyncedMeta('ping', player.ip); // 键值, 数值

// 检查元是否存在.
if (player.hasSyncedMeta('ping')) { // 键值
    // 从玩家那里获取元数据.
	const currentCash = player.getSyncedMeta('ping'); // <--- 用法
    
	// 删除元.
    player.deleteSyncedMeta('ping'); // 键值
}
```

## giveWeapon

用于根据哈希或适当名称为玩家提供武器.

查看我们的 [死亡原因表](../tables/cause_of_death) 具有所有可用的武器哈希和名称.

```js
// weaponHash, ammoCount, equipThisWeaponNow?
player.giveWeapon(1141786504, 1, true); // 获取高尔夫球拍.
```

## hasMeta

用于检查**服务器端**元是否可用. 这可以跨资源工作.

```js
// 设置玩家的元.
player.setMeta('cash', 500); // 键值, 数值

// 检查元是否存在.
if (player.hasMeta('cash')) { // <---- 用法
    // 从玩家那里获取元数据.
	const currentCash = player.getMeta('cash'); // 键值

	// 删除元.
    player.deleteMeta('cash'); // 键值
}
```

## hasStreamSyncedMeta

用于检查存储在玩家实体上的数据是否可用. 这可以在**服务器端**和**客户端**上访问.

此类同步的元数据仅可由该玩家的流范围中的玩家访问.

```js
// 设置玩家的元.
player.setStreamSyncedMeta('ping', player.ip); // 键值, 数值

// 检查元是否存在.
if (player.hasStreamSyncedMeta('ping')) { // <--- 用法
    // 从玩家那里获取元数据.
	const currentCash = player.getStreamSyncedMeta('ping'); // 键值
    
	// 删除元.
    player.deleteStreamSyncedMeta('ping'); // 键值
}
```

## hasSyncedMeta

用于检查存储在玩家实体上的数据是否可用. 这可以在**服务器端**和**客户端**上访问.

这种类型的同步元可以在内部和**外部**流范围内访问.

```js
// 设置玩家的元.
player.setSyncedMeta('ping', player.ip); // 键值, 数值

// 检查元是否存在.
if (player.hasSyncedMeta('ping')) {  // <--- 用法
    // 从玩家那里获取元数据.
	const currentCash = player.getSyncedMeta('ping'); // 键值
    
	// 删除元.
    player.deleteSyncedMeta('ping'); // 键值
}
```

## kick

用于从服务器中踢出玩家. 提供给踢出玩家的一些**原因**当前不会显示给玩家.

您可能想要创建一种解决方法, 最终在5秒后断开用户连接.

```js
alt.on('playerConnect', handleConnect);

// 监听玩家的连接.
function handleConnect(player) {
	player.kick('Bye'); // 立即踢他们.
    
	// 最终踢他们.
    alt.setTimeout(() => {
        console.log(`${player.name} 将在5秒内被踢.`);
    }, 5000); // 5 秒.
}
```

## removeAllWeapons

用于从玩家身上移除所有武器.

```js
player.removeAllWeapons(); // 没有其他要操作的.
```

## removeWeapon

用于根据其武器删除武器.

```js
player.removeWeapon(1141786504); // 移除高尔夫球拍.
```

## removeWeaponComponent

用于从玩家的武器中删除武器组件.

```js
// weaponHash, componentHash
player.removeWeaponComponent(0xDFE37640, 0x5B3E7DB6)
```

## resetNetOwner

恢复netOwner的默认功能. 一般的开发人员可能不会使用它.

## setDateTime

用于设置玩家当前的游戏时间. 重要的是要了解, 无论玩家当前的时间是什么, 时间仍将会继续走. 

如果您希望保留一定的时间, 建议冻结时间.

这可以用本地完成 `native.pauseClock(true);` 在 **客户端**.

```js
const currentServerTime = new Date(Date.now());
// 日, 月, 年, 时, 分, 秒
player.setDateTime(date.getDay(), date.getMonth(), date.getFullYear(), date.getHour(), date.getMinute(), date.getSecond())
```

## setMeta

用于在玩家上设置**服务器端**元数据. 这可以跨资源工作.

```js
// 设置玩家的元.
player.setMeta('cash', 500); // <--- 用法 (键值, 数值)

// 检查元是否存在.
if (player.hasMeta('cash')) { // 键值
    // 从玩家那里获取元数据.
	const currentCash = player.getMeta('cash'); // 键值

	// 删除元.
    player.deleteMeta('cash'); // 键值
}
```

## setNetOwner

用于更改此实体的网络所有者. 一般的开发人员可能不会使用它.

## setStreamSyncedMeta

用于设置存储在玩家实体上的数据. 这可以在**服务器端**和**客户端**上访问.

此类同步的元数据仅可由该玩家的流范围中的玩家访问.

```js
// 设置玩家的元.
player.setStreamSyncedMeta('ping', player.ip); // 键值, 数值

// 检查元是否存在.
if (player.hasStreamSyncedMeta('ping')) { // <--- 用法
    // 从玩家那里获取元数据.
	const currentCash = player.getStreamSyncedMeta('ping'); // 键值
    
	// 删除元.
    player.deleteStreamSyncedMeta('ping'); // 键值
}
```

## setSyncedMeta

用于设置存储在玩家实体上的数据, 该数据可在**服务器端**和**客户端**上访问.

这种类型的同步元可以在流**内部**和**外部**访问.

```js
// 设置玩家的元.
player.setSyncedMeta('ping', player.ip); // 键值, 数值

// 检查元是否存在.
if (player.hasSyncedMeta('ping')) {  // <--- 用法
    // 从玩家那里获取元数据.
	const currentCash = player.getSyncedMeta('ping'); // 键值
    
	// 删除元.
    player.deleteSyncedMeta('ping'); // 键值
}
```

## setWeaponTintIndex

用于根据其哈希值设置武器的武器色调指数.

查看我们的 [武器色调表](../tables/weapon_tint)

```js
// weaponHash, componentHash
player.setWeaponTintIndex(0xDFE37640, 1)
```

## setWeather

用于设置玩家的当前天气.

查看我们的 [天气表](../tables/weather)

## spawn

用于在玩家死后根据Vector3的位置重生. 最后一个参数用于延迟重生时间.

```js
// x, y, z, delay
player.spawn(0, 0, 0, 0); // Spawn player under the map at 0,0,0
```



