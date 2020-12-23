# 帮助文本

帮助文本是出现在游戏左上角的小方框.

您无法更改此文本的位置.

**客户端**

```js
alt.onServer('showHelpText', showHelpText);

export function showHelpText(text, milliseconds) {
    native.beginTextCommandDisplayHelp('STRING');
    native.addTextComponentScaleform(text);
    native.endTextCommandDisplayHelp(0, 0, 0, milliseconds);
}
```

## 用法示例

**服务器端**

```js
alt.on('playerConnect', player => {
    alt.emitClient(player, 'showHelpText', '按 ~INPUT_MOVE_UP_ONLY~ 前进.', 5000);
});
```

**客户端**

```js
showHelpText('按 ~INPUT_MOVE_UP_ONLY~ 前进.', 5000);
```
