# 单个资源与多个资源

取决于您要执行项目的方向，您可能会问自己，应该使用单个资源还是可以打开和关闭的多个资源.

最好记住，其他资源将接收自己的线程.

首先让我们看一下多个资源设置的一些局限性.

## 多个资源限制

限制将被定义为在构建游戏模式时可能引起复杂或麻烦的原因.

### 不共享原型

如果您喜欢扩展各个类的功能或以添加新功能，那么多个资源系统将无济于事。 让我们看看为什么.

假设您有这样一个原型.

```js
alt.Player.local.addMoney = function addMoney(amount) {
    if (isNaN(amount)) {
        return false;
    }

	if (!this.money) {
        this.money = amount;
    } else {
        this.money += amount;
    }
    
    return true;
}
```

现在，您只能在其写入的资源中访问 `addMoney` 函数. 

您无法将此功能移植到另一个资源，这是因为变量也不在资源之间共享使用.

### 自定义属性不共享

有没有想过为什么'setMeta' 和 'getMeta' 的存在？ 这就是为什么.

通过上面的功能，我们可以为玩家添加金钱，但是如果我们想从其他资源中获取金钱呢？

让我们来看看您的代码现在看起来是什么样子.

```js
// 导出此功能，因为我们可以将其导入其他资源.
export function addMoney(amount) {
    if (isNaN(amount)) {
        return false;
    }
	
    if (!this.hasMeta('money')) {
        this.setMeta('money', amount);
    } else {
        let currentAmount = this.getMeta('money');
        currentAmount += amount;
    	this.setMeta('money', currentAmount);
    }
}

// 导出此功能，因为我们可以将其导入其他资源.
export function getMoney(amount) {
    if (!this.hasMeta('money')) {
        return 0;
    }
    
    return this.getMeta('money');
}
```

如您所见，我们已经创建了两个新函数，可以将该函数导入任何其他资源，只要将此资源设置为我们要添加和获取的资源的依赖项即可.

这一切都很好，但这样做的唯一好处是将线程集成到较低级别的 C++ 中.

当您可以在单个资源（而不是单个文件）中完成所有工作时，为什么还要拆分所有这些并为项目增加更多的麻烦呢？这实际上是一个可怕的做法。这不是SAMP。

## 单个资源限制

显然，在使用单个资源时，您最想念的就是线程。 但是，大多数创造资源的人可能会不需要它们。 这包括正在编写角色扮演游戏模式并想要追求'最佳实践'的人.

### 丢失状态

重新启动单个资源时。 您丢失了在其中存储状态的资源状态.

这意味着您将需要重新连接以重新建立状态.

举个例子 `player.money` 在重启资源之前是500.

重新启动资源后，`player.money` 为0，因为您没有再次设置玩家的数据状态.

### 文件结构维护

如果您要构建一个非常大的游戏模式，那么您将拥有非常大的资源。 这意味着如果您没有很好的文件夹结构，您可能会发现自己在努力使所有代码井井有条。 这是人们选择加入多资源系统的主要原因之一.

我发现我最喜欢的文件夹结构之一如下.

#### 客户端文件夹结构

```sh
├───anticheat 				# 与反作弊系统相关的文件夹.
├───events				    # 仅用于处理客户端事件的文件夹.
├───gamedata			    # 与游戏相关的对象数据的文件夹.
├───html				    # 所有 HTML/VUE 界面的文件夹.
│   ├───atm
│   ├───charactereditor
│   ├───characterselect
│   ├───clothing
│   ├───hud
│   ├───help
│   ├───inventory
│   ├───login
├───systems					# 服务器端具有相应功能的文件文件夹.
│   ├───inventorySystem.js	 	# 处理常规库存功能.
│   └───vehicleSystem.js		# 处理一般车辆功能。 比如 setIntoVehicle
├───utility					# 计算函数与工具类等
└───views					# 在其中调用所有WebView的创建和删除.
    ├───atm.js				# 处理客户端的ATM.
    └───chat.js				# 处理客户端上的聊天.
```

请记住，单个文件夹可以扩展到更多文件夹.

但是，使用此文件夹结构的技巧是在服务器端保留相似的文件名，以便您知道哪些文件与哪个系统对接.

#### 服务器端文件夹结构

```sh
├───commands				# 不同的命令处理程序.
│   ├───cmdPlayer.js 			# 专门针对于玩家的命令.
│   └───cmdVehicle.js			# 专门针对于车辆的命令.
├───configuration			# 任何与配置有关。 生成点，预设等
├───events				    # 仅用于处理服务器端事件.
├───extensions				# 不同alt:V API类的原型.
│   ├───player.js
│   ├───vehicle.js
│   └───colshape.js
├───gamedata
├───systems					# 客户端上具有相应克隆的文件的文件夹.
│   ├───inventorySystem.js	 	 # 处理常规库存功能.
│   └───vehicleSystem.js		 # 处理一般车辆功能。 比如 setIntoVehicle
├───utility					# 计算函数与工具类等
└───views					# 处理服务器端视图功能的相应文件夹.
    ├───atm.js				# 处理服务器端与ATM一起使用.
    └───chat.js 			# 服务器端聊天处理程序，用于路由消息.
```

## 个人意见

我认为，原型的附加功能大大超过了单个资源可能具有的所有缺点。 有了一个好的文件夹系统并很好地了解您的代码库，只要您将文件分割成具有客户端和服务器端相应名称的单个系统，使用单个资源就非常容易.

大多数在 alt:V 上使用 JavaScript 的开发人员通常仅出于这个原因就选择退出使用多资源.

