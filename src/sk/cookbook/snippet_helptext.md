# Text pomocníka (Help Text)

Help Text je malé políčko, ktoré sa zobrazuje v ľavom hornom rohu vašej hry.

Pozíciu tohto textu nemôžete zmeniť.

**Na strane klienta**

```js
alt.onServer('showHelpText', showHelpText);

export function showHelpText(text, milliseconds) {
    native.beginTextCommandDisplayHelp('STRING');
    native.addTextComponentScaleform(text);
    native.endTextCommandDisplayHelp(0, 0, 0, milliseconds);
}
```

## Príklad použitia

**Na strane servera**

```js
alt.on('playerConnect', player => {
    alt.emitClient(player, 'showHelpText', 'Press ~INPUT_MOVE_UP_ONLY~ to move forward.', 5000);
});
```

**Na strane klienta**

```js
showHelpText('Press ~INPUT_MOVE_UP_ONLY~ to move forward.', 5000);
```
