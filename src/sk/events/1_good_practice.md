# Osvedčené postupy pre *event-y*

Existuje mnoho spôsobov, ako používať *event-y*, a najčastejším problémom, ktorý sa tu vyskytuje, je inicializácia *event-u* vo vnútri *event-e*.

## Inicializácia *event-u* v *event-e*

Ak patríte k ľuďom, ktorí inicializujú *event* v *event-e*, tak často vytvárate *memory leak-y*.

### Príklad všeobecných *event-ov* na serveri

**NEROBTE TO** ⚠️

```js
alt.on('playerConnect', handleConnection);

function handleConnection(player) {
    alt.on('doSomething', player => {
        player.health = 200;
    });

    alt.emit('doSomething', player); // <--- Toto je problém.
}
```

Namiesto toho by ste mali inicializovať vaše *event-y* týmto spôsobom.

**LEPŠIE** ✔️

```js
alt.on('playerConnect', handleConnection);
alt.on('doSomething', handleDoSomething);

function handleConnection(player) {
    alt.emit('doSomething', player);
}

function handleDoSomething(player) {
    player.health = 200;
}
```

**PREČO** ❓

Dôvod, prečo to nerobíme prvým spôsobom, je ten, že zakaždým, keď sa hráč pripája k serveru, inicializujete viac inštancií tých istých *event-ov*. Myslite na to, že zakaždým, keď hráč vstúpi na server, sa *event* vytvára ešte raz.

Ak chceme, aby sa na používateľa spustila jedna udalosť raz, inicializujeme ho raz mimo *event-u*.

### Všeobecný príklad WebView

Tu je ďalší príklad využitia API na strane klienta.

**NEROBTE TO** ⚠️

```js
const url = `https://resource/client/html/index.html`;
let view;
let somethingToSend;

alt.onServer('show:WebView', handleOpen);
alt.onServer('close:WebView', handleClose)

function handleOpen(_somethingToSend) {
    somethingToSend = _somethingToSend;
    
    // Load a New View
	if (!view) {
        view = new alt.WebView(url);
    }
    
    // Add an Event
    view.on('load', handleLoad); // <--- Toto je problém.
    view.on('close', handleClose);
}

function handleClose() {
    if (!view) {
        return;
    }
    
    view.destroy();
    view = null;
}

function handleLoad() {
    if (!view) {
        return;
    }
    
    view.emit('sendSomething', somethingToSend);
}

```

Rovnako ako v podobných príkladoch vyššie, existuje dôvod, prečo je zvýraznený riadok problémom.

Zvážte, že pri vytváraní WebView vytvárate jednu inštanciu.

Po vytvorení tejto jednej inštancie chcete pridať svoje *event-y*.

Avšak tieto *event-y* je potrebné *hook-nuť* iba **raz**.

**LEPŠIE** ✔️

```js
const url = `https://resource/client/html/index.html`;
let view;
let somethingToSend;

alt.onServer('show:WebView', handleOpen);
alt.onServer('close:WebView', handleClose)

function handleOpen(_somethingToSend) {
    somethingToSend = _somethingToSend;
    
	if (!view) {
        // Load New WebView and Add Events
        view = new alt.WebView(url);
        view.on('load', handleLoad);
        view.on('close', handleClose);
    }
}

function handleClose() {
    if (!view) {
        return;
    }
    
    view.destroy();
    view = null;
}

function handleLoad() {
    if (!view) {
        return;
    }
    
    view.emit('sendSomething', somethingToSend);
}

```



## Vypnutie nepoužívaných *event-ov*

Ak máte veľa *event-ov*, možno zistíte, že niektoré *event-y* nakoniec už nie sú potrebné.

*Event-y* môžete vypnúť na základe toho, kde sa nachádzajú, niekoľkými spôsobmi.

| Typ *Off Event-u*         | Anglický popis                                 | Popis                                                        |
| ------------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| `alt.off`                 | Turn off any client or server side only event. | Vypnite všetky *event-y* iba na strane klienta alebo servera. |
| `alt.offClient`           | Turn off any event coming from the client.     | Vypnite všetky *event-y* prichádzajúce od klienta.           |
| `alt.offServer`           | Turn off any event coming from the server.     | Vypnite všetky *event-y* prichádzajúce zo servera.           |
| `yourWebViewVariable.off` | Turn off any event coming from a WebView.      | Vypnite všetky *event-y* prichádzajúce z WebView.            |

Všetky tieto *event-y* vyžadujú vypnutie „funkcie“. To znamená, že nemôžete vytvoriť funkciu tučného šípu alebo spätné volanie namiesto funkcie, ak chcete *event* vypnúť. Tu je niekoľko príkladov.

### Používanie `alt.off`

To je možné vykonať na strane servera alebo klienta.

Toto je príklad použitia `alt.off`

```js
alt.on('doSomething', handleDoSomething);

function handleDoSomething() {
    // Túto funkciu je možné volať odkiaľkoľvek.
    // Vo vnútri eventu ju nemusíte vypínať.
    alt.off('doSomething', handleDoSomething); // <--- Táto funkcia
}

```

### Používanie `alt.offClient`

To je možné vykonať **iba** na strane servera.

Toto je príklad použitia `alt.offClient`.

```js
alt.onClient('doSomething', handleDoSomething);

function handleDoSomething() {
    // Túto funkciu je možné volať odkiaľkoľvek.
    // Vo vnútri eventu ju nemusíte vypínať.
    alt.offClient('doSomething', handleDoSomething); // <--- Táto funkcia
}
```

### Používanie `alt.offServer`

To je možné vykonať **iba** na strane klienta.

Toto je príklad použitia `alt.offServer`

```js
alt.onServer('doSomething', handleDoSomething);

function handleDoSomething() {
    // Túto funkciu je možné volať odkiaľkoľvek.
    // Vo vnútri eventu ju nemusíte vypínať.
    alt.offServer('doSomething', handleDoSomething); // <--- Táto funkcia
}
```

### Používanie `yourWebView.off`

Tento príklad používa WebView, ktorý je **iba** na strane klienta.

```js
const url = `https://resource/client/html/index.html`;
let view;
let somethingToSend;

alt.onServer('show:WebView', handleOpen);
alt.onServer('close:WebView', handleClose)

function handleOpen(_somethingToSend) {
    somethingToSend = _somethingToSend;
    
	if (!view) {
        // Load New WebView and Add Events
        view = new alt.WebView(url);
        view.on('load', handleLoad);
        view.on('close', handleClose);
    }
}

function handleLoad() {
    if (!view) {
        return;
    }
    
    view.emit('sendSomething', somethingToSend);
    
	// Povedzme, že chceme vypnúť event ihneď po vytvorení WebView.
	// Táto funkcia je spôsob, akým to robíme.
    view.off('load', handleLoad); // <--- Táto funkcia
}

```

## Záverečné vyhlásenie

Nezabudnite, že ak *event* vypnete, budete ho musieť znova inicializovať.

Využite to vo svoj prospech a nemusíte vypínať každý *event*, jedná sa iba o funkciu, ktorá by sa mala využívať viac.