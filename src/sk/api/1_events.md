# Event-y (Events)

*Event-y* fungujú veľmi špecifickým spôsobom a porozumenie ich komunikácie je veľmi dôležité.

Server môže komunikovať s akýmkoľvek klientom.
Klient môže komunikovať iba viacerými WebView a serverom.

Klient **NEMÔŽE** komunikovať s iným klientom.

| Názov funkcie (Function Name) | Popis                                              |
| --------------------------------- | ------------------------------------------------------------ |
| alt.emit                          | *Emit-ne event* na strane servera alebo klienta. Iba prijaté na strane, z ktorej boli emitované. |
| alt.on                            | Prijíma *event*. Server prijíma iba *event-y* servera. Klient prijíma iba klientske *event-y*. |
| alt.onServer                      | Prijíma *event* emitovaný zo servera na strane klienta. Spustené pomocou `alt.emitClient`. |
| alt.emitClient                    | Odošle *event* konkrétnemu klientovi, ktorý ho dostane, pomocou `alt.onServer`. |
| alt.onClient                      | Prijíma *event* emitovaný z klienta na strane servera. Spustené pomocou `alt.emitServer`. |
| alt.emitClient                    | *Emit-ne event* serveru, ktorý ho dostane, pomocou `alt.onClient`. |

## Server klientovi

Server môže emitovať údaje na stranu klienta iba s `alt.emitClient`, ktorý vyžaduje hráča.
Hráč však môže byť tiež nahradený hodnotou `null`, ktorá zapôsobí to, že údaje sa emit-nú všetkým hráčom.

**Strana servera**

```js
alt.on('playerConnect', player => {
    alt.emitClient(player, 'sayHello');
});
```

**Strana klienta**

```js
alt.onServer('sayHello', () => {
    alt.log('Pozdrav zo servera.');
});
```

## Klient serveru

Klient môže emitovať údaje na stranu servera iba pomocou `alt.emitServer`.
*Event* `alt.onServer` na strane servera automaticky prijme hráča vo svojom *event handler-y*.

**Strana klienta**

```js
alt.on('connectionComplete', () => {
    alt.emitServer('sayHello');
});
```

**Strana servera**

```js
alt.onClient('sayHello', player => {
    alt.log(`${player.name} pozdravuje.`);
});
```

## Serverový *resource* na serverový *resource*

Server môže komunikovať s funkciami *on* a *emit* iba sám sebe.
Klient môže komunikovať s funkciami *on* a *emit* iba sám sebe.
Hovoria tiež naprieč prostriedkami.

**Strana servera**

```js
alt.emit('hello', 'toto je správa');

alt.on('hello', msg => {
    alt.log(msg);
});
```

## Klienstký *resource* na klientský *resource*

**Strana klienta**

```js
alt.emit('hello', 'toto je správa');

alt.on('hello', msg => {
    alt.log(msg);
});
```

## Klient na WebView a späť

**Poznámka:** *Resource* v adrese HTTP označuje *resource*, pre ktorý momentálne píšete kód.

**Strana klienta**

```js
const webview = new alt.WebView('http://resource/client/html/index.html');
webview.on('test2', handleFromWebview);

function handleFromWebview(msg) {
    alt.log(msg);
}

alt.setTimeout(() => {
    webview.emit('test', 'Pozdrav z klienta.');
}, 500);
```

**HTML stránka na strane klienta**

```html
<html>
    <head>
        <title>Ahoj svet !</title>
    </head>
    <body>
        <p>Words</p>
        <script type="text/javascript">
            if ('alt' in window) {
                alt.on('test', msg => {
                    console.log(msg);
                    alt.emit('test2', 'pozdrav z webview');
                });
            }
        </script>
    </body>
</html>
```
