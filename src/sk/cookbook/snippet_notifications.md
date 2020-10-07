# Notifikácie (Notifications)

Notifikácie sú čierne polia, ktoré sa zobrazujú nad mapou vľavo dole.

Sú prístupné iba zo strany klienta, ale môžete ich zavolať zo strany servera.

V nasledujúcom príklade nájdete informácie o tom, ako to využiť dvoma rôznymi spôsobmi.

![](../../img/notification.jpg)

**Na strane klienta**

```js
alt.onServer('drawNotification', drawNotification);

export function drawNotification(imageName, headerMsg, detailsMsg, message) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(message);
    native.endTextCommandThefeedPostMessagetextTu(
        imageName.toUpperCase(),
        imageName.toUpperCase(),
        false,
        4,
        headerMsg,
        detailsMsg,
        1.0,
        ''
    );
    native.endTextCommandThefeedPostTicker(false, false);
}
```

## Príklad použitia

**Na strane servera**

```js
alt.emitClient(player, 'drawNotification', 'CHAR_AMMUNATION', 'Header', 'Small Details', 'The rest of the owl.');
```

**Na strane klienta**

```js
drawNotification('CHAR_AMMUNATION', 'Header', 'Small Details', 'The rest of the owl.');
```
