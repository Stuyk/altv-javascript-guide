# 属性制作

通过属性制作，您可以扩展玩家，载具等的默认类功能.

重要的是要了解，所有属性文件应在数据库初始化之后立即加载.

授予您的属性具有数据库功能.

它们**不能**在多个资源中工作, 仅单个资源.

### JJavaScript服务器端用法示例

```js
alt.Player.prototype.emitMeta = function emitMeta(key, value) {
    if (typeof value === 'function') {
        throw new Error(`值不是函数类型。 emitMeta.prototype`);
    }

    this.setMeta(key, value);
    alt.emitClient(this, 'meta:Emit', key, value);
};

alt.Player.prototype.init = function init() {
    this.data = {};
};

alt.Player.prototype.syncCash = function syncCash() {
    this.emitMeta('cash', this.data.cash);
};

alt.Player.prototype.setCash = function setCash(value) {
    if (isNaN(value)) {
        throw new Error(`值不是数字类型. setCash.prototype`);
    }

    if (!this.data) {
        this.data = {};
    }

    this.data.cash = value;
    this.syncCash();
};

alt.Player.prototype.subCash = function subCash(value) {
    if (isNaN(value)) {
        throw new Error(`值不是数字类型. subCash.prototype`);
    }

    if (!this.data) {
        this.data = {};
    }

    const absValue = Math.abs(parseFloat(value)) * 1;
    if (this.data.cash < absValue) {
        return false;
    }

    this.data.cash -= absValue;
    this.data.cash = Number.parseFloat(this.data.cash).toFixed(2) * 1;
    this.syncCash();
    return true;
};

alt.Player.prototype.addCash = function addCash(value) {
    if (isNaN(value)) {
        throw new Error(`值不是数字类型. addCash.prototype`);
    }

    if (!this.data) {
        this.data = {};
    }

    const absValue = Math.abs(parseFloat(value));
    if (this.data.cash + absValue > 92233720368547757) {
        absValue = 92233720368547757;
    }

    this.data.cash += absValue;
    this.data.cash = Number.parseFloat(this.data.cash).toFixed(2) * 1;
    this.syncCash();
    return true;
};
```

### Typescript 服务器端用法示例

```ts
// 使用`alt-client`在客户端进行属性制作.
declare module 'alt-server' {
    export interface Player {
        cash?: number;
        bank?: number;

        // 您必须声明函数接口.
        addToCash(value: number): boolean;
        addToBank(value: number): boolean;
    }
}

// 然后您可以定义属性函数.
alt.Player.prototype.addToCash = function addToCash(value: number) {
    if (!this.cash) {
        this.cash = value;
    } else {
        this.cash += value;
    }

    return true;
};

alt.Player.prototype.addToBank = function addToBank(value: number) {
    if (!this.bank) {
        this.bank = value;
    } else {
        this.bank += value;
    }

    return true;
};
```

## 用法示例

**服务器端**

```js
player.init();
player.emitMeta('test', true);
player.setCash(25);
player.subCash(5);
player.addCash(2);
```
