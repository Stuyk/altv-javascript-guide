# MongoDB

MongoDB是一个NoSQL数据库，使用起来非常简单. 强烈建议在基于JavaScript的环境中使用MongoDB, 这是Typescript和JavaScript的无缝体验. 它很容易上手, 并且有一些不错的ORM可以帮助您管理数据库.

MongoDB可以与 MySQL, MariaDB, PostgreSQL 等竞争.

## Simply Mongo

这是我创建的一个小型存储库，可让您利用一个非常简单的数据库处理程序，对于普通开发人员而言已经足够了。 它是专门为帮助新开发人员创建的，这些新开发人员只想存储数据而不会考虑过多数据.

 [阅读更多有关Simply Mongo的NPM软件包的信息](https://www.npmjs.com/package/simplymongo)

### 通过命令安装

```js
$ npm install simplymongo
```

### 如何初始化数据库

您可能需要在服务器端的`startup.js`文件中使用此模式.

**startup.js - 服务器端**

这是资源的主要切入点.

在这里您应该定义一个新的数据库.

```js
import * as sm from 'simplymongo';

sm.onReady(establishConnection);

async function establishConnection() {
    import('./bigImportFile.js');
    // 您不必真正等待任何这些加载。 只是一个参考.
}

new sm.Database('mongodb://localhost:27017', 'mydb', ['accounts', 'characters']);
// new sm.Database('mongodb://localhost:27017', 'mydb', ['accounts', 'characters'], 'username', 'password');
```

**bigImportFile.js - 服务器端**

该文件应在连接数据库并准备使用后加载.

```js
import('./someFile.js'); // 假设其中有一个数据库实例.
import('./someOtherFile.js');
```

**someFile.js - 服务器端**

该文件将代表一种安全地获取在`startup.js`文件之后加载的任何其他文件中的数据库的方法.

```js
import alt from 'alt-server';
import * as sm from 'simplymongo';

const db = sm.getDatabase();
```

### 如何使用您的数据库

在[初始化数据库并加载下一个文件]（＃如何初始化数据库）之后, 您应该开始使用`sm.getDatabase()`来获取数据库实例.

这就是我们开始与数据库对话并向其发送指令的方式.

#### 获取您现有的数据库连接

```js
import alt from 'alt-server';
import * as sm from 'simplymongo';

const db = sm.getDatabase();
```

#### 了解等待的含义

很快, 对异步事件有基本的了解就很重要

```js
alt.on('playerConnect', handleAsyncEvent);

// <----- 我们使用此标识符来告诉它打算使用的功能 'await'.
async function handleAsyncEvent(player) {
	// 此函数将启动一个单独的事件，在该事件中等待返回该事件.
    // 这不会阻止该函数被多次调用.
    // 实际上，您可以随意调用此函数，并且永远不会占用任何其他代码.
	const accounts = await db.fetchAllByField('socialclub', player.socialId, 'accounts');
    
    if (accounts.length >= 1) {
        console.log(`You found a document!`)
        console.log(accounts[0]); // 数组从0开始。并不是从1.
    }
}
```

#### 插入新数据并获取现有数据

```js
// 让我们使用玩家的 social club ID 来处理一些事情。
// 强烈建议不要这样做.
// 以此为例.
const socialclub = player.socialId;

// 提取所有与 social club ID 相匹配的帐户.
const accounts = await db.fetchAllByField('socialclub', socialclub, 'accounts');
let account;

// 检查该 social club ID 是否不存在任何帐户.
if (accounts.length <= 0) {
    // 为玩家构建文档.
    const newDocument = {
        username: player.name,
        socialclub,
        lastip: player.ip,
        bank: 9000,
        cash: 9000,
        logins: 0
    };

    // 这将插入一个新的文档对象。 然后返回带有_id的新文档
    // (DocumentObject, CollectionName, returnDocument?)
    account = await db.insertData(newDocument, 'accounts', true);
} else {
    // 这将分配我们找到的唯一文档（如果存在）。 到帐户变量.
    account = accounts[0];
}
```

#### 更新玩家的数据

```js
// 每次登录时更新IP.
// 没错，玩家最大生命值是200.
await db.updatePartialData(account._id, { health: 200 }, 'accounts');

// 您还可以一次为玩家更新多组数据.
await db.updatePartialData(account._id, { health: player.health, armour: player.armour  }, 'accounts');

// 您还可以通过将player.data对象传播到父对象中来更新它.
// 这被称为 `保存所有`.
await db.updatePartialData(account._id, { ...player.data  }, 'accounts');
```

#### 设置一个`player.data`对象

我只建议这样做，因为这样可以很容易地管理玩家上的数据.

请记住，分配给玩家的数据不能在服务器端资源之间共享.

```js
// 检查玩家的ID。 这是基于 social club ID 查询的唯一性.
// 您绝对可以用 用户名 替换 social club ID.
// 让我们继续下一步，根据id向下获取数据.
const account = await db.fetchData('_id', account._id, 'accounts');

// 如果您不了解其他数据类型的参数查找.
// 像用户名，电子邮件等.
/*
    这应该返回类似于以下内容的结构.
    {
       _id,
       username,
       socialclub,
       lastip,
       logins,
        bank
    }
*/

// 现在，我们已经有了一些数据。 让我们看看如何访问和更新数据.
// 如果使用单个资源。 使用此模式.
player.data = account;
```

### player.data 更新模式

这是保持数据库高效的非常简单的模式.

您应该只是读取一次数据库，而不要一直从数据库中读取数据.

```js
// 假设我们正在继续上面片段中创建的代码.
player.data.money += 500;
player.data.bank -= 500;

player.setSyncedMeta('money', player.data.money);
player.setSyncedMeta('bnak', player.data.bank);

// 更新资金和银行数据.
await db.updatePartialData(player.data._id, { money: player.data.money, bank: player.data.bank  }, 'accounts');
```

相当容易更新和管理!

您可以通过在玩家上使用属性扩展其功能来改进此功能.

```js
alt.Player.prototype.saveField = async function(fieldName, fieldValue, sync = false) {
	if (sync) {
        this.setSyncedMeta(fieldName, this.data[fieldName]);
    }

    await db.updatePartialData(this.data._id, { [fieldName]: fieldValue }, 'accounts');
}
```

然后，您可以简单地从单个资源内部的任何位置进行调用。 挺棒的.

```js
player.saveField('money', player.data.money, true);
```

#### 删除文档

您可以通过提供一个 `_id`.

```js
await db.deleteById(player.data._id, 'accounts');
```