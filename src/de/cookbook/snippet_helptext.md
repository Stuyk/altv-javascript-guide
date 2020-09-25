# Hilfstext

Der Hilfstext ist eine kleine Tippbox die innerhalb deines Spiels dargestellt wird.

Die Position von der Tippbox ist nicht veränderbar.

**Clientseitig**

```js
alt.onServer('showHelpText', showHelpText);

export function showHelpText(text, milliseconds) {
    native.beginTextCommandDisplayHelp('STRING');
    native.addTextComponentScaleform(text);
    native.endTextCommandDisplayHelp(0, 0, 0, milliseconds);
}
```

## Beispiel

**Serverseitig**

```js
alt.on('playerConnect', player => {
    alt.emitClient(player, 'showHelpText', 'Press ~INPUT_MOVE_UP_ONLY~ to move forward.', 5000);
});
```

**Clientseitig**

```js
showHelpText('Press ~INPUT_MOVE_UP_ONLY~ to move forward.', 5000);
```
