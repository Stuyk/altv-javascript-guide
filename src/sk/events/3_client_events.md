# Príklady využitia *eventu* u klienta

Toto je dokument, ktorý poskytne príklad pre každý *event* klienta. Je to nevyhnutné na to, aby ste skutočne pevne pochopili, ako sa udalosť spúšťa a ako sa s ňou zaobchádza.

## Dôležitý tip

Ak sa snažíte použiť súbor `console.log` na strane klienta., nebude to fungovať, namiesto toho musíte použiť `alt.log`.

```js
alt.log(`Haló zo strany klienta`);
alt.log(`Tvoja pozícia je: ${JSON.stringify(alt.Player.local.pos)}`);
```

## anyResourceError

Spustí sa pri načítaní *resource-e* vo vašom `server.cfg` a **vyhodí chybu**.

-   `resourceName` je názov *resource-e* vo vašom súbore `server.cfg`

```js
alt.on('anyResourceError', handleEvent);

function handleEvent(resourceName) {
    console.log(`${resourceName} sa nepodarilo načítať.`);
}
```

## anyResourceStart

Spustí sa pri načítaní *resource-e* vo vašom `server.cfg` a načíta sa správne.

-   `resourceName` je názov *resource-e* vo vašom súbore `server.cfg`

```js
alt.on('anyResourceStart', handleEvent);

function handleEvent(resourceName) {
    console.log(`${resourceName} sa načítal.`);
}
```

## anyResourceStop

Spustí sa to pri tvrdom zastavení prostriedku programovo alebo prostredníctvom konzoly.

-   `resourceName` je názov *resource-e* vo vašom súbore `server.cfg`

```js
alt.on('anyResourceStop', handleEvent);

function handleEvent(resourceName) {
    console.log(`${resourceName} bol zastavený. Reštartovanie resource-e.`);
    alt.restartResource(resourceName); // <-- To spustí resource, ktorý sa zastavil, aby sa automaticky reštartoval.
}
```

## connectionComplete

Toto sa volá, keď sa napojíte na server a načítali sa všetky *resource-e*, ktoré ste načítali.

```js
alt.on('connectionComplete', handleEvent);

function handleEvent() {
    alt.log(`Nazdar!`);
}
```

## consoleCommand

Toto sa volá, keď do konzoly klientskeho servera alt:V napíšete nejaké údaje. Po stlačení klávesu **Enter** sa slová automaticky rozdelia.

- `args` je pole reťazcov

```js
alt.on('consoleCommand', handleEvent);

function handleEvent(args) {
    const cmd = args[0];

    if (cmd !== 'loghello') {
        return;
    }

    alt.log(`Hello from client.`);
}
```

Predpokladajme, že sme do konzoly servera zadali nasledujúce.

```
loghello
```

## disconnect

To je väčšinou užitočné, keď sa pripájate k miestnemu vývojovému prostrediu. Používa sa na vyčistenie akýchkoľvek herných zmien pred opätovným pripojením.

```js
alt.on('disconnect', handleEvent);

function handleEvent() {
    alt.log(`Odpojili ste sa.`)
	// Po tejto udalosti už nebudú fungovať žiadne správy ani funkcie.
}
```

## gameEntityCreate

Toto sa volá, keď sa hráč, vozidlo alebo čokoľvek iné dostane do dosahu klienta.

To znamená, že ak vozidlo vchádza z dosahu vášho streamovacieho rozsahu, začne sa synchronizovať s hráčom v rámci tohoto *event-u*.

* `entita` je vytvorená entita.

### **Na strane servera**

```js
alt.on('playerConnect', (player) => {
   player.model = 'mp_m_freemode_01';
   player.spawn(0, 0, 0);
    
   // Vytvorte vozidlo
   const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);
   alt.emitClient(player, 'setIntoVehicle', vehicle);
});
```

### **Na strane klienta**

```js
// Začnite s nastavením na strane servera
alt.onServer('setIntoVehicle', handleSetIntoVehicle);

function handleSetIntoVehicle(vehicle) {
    alt.Player.local.needsVehicle = vehicle;
}


// Začnite s implementáciou event-u
alt.on('gameEntityCreate', handleEvent);

function handleEvent(entity) {
    // Skontrolujte, či ide o entitu vozidla.
	if (typeof entity !== alt.Vehicle) {
        return;
    }

    // Skontrolujte, či ide o vozidlo, ktoré hľadáme.
	if (alt.Player.local.needsVehicle !== entity) {
        return;
    }

    // Vypnite hľadanie nových vozidiel.
	alt.Player.local.needsVehicle = false;

	// Vložte ich na sedadlo vodiča.
	// ScriptID sa používa na získanie kľučky vozidla a hráča pre natives.
    native.setPedIntoVehicle(alt.Player.local.scriptID, vehicle.scriptID, -1);
}
```

## gameEntityDestroy

Volá sa to, keď vozidlo, hráč alebo čokoľvek iné opustí streamingový rozsah klienta.

To je vynikajúce, keď potrebujete zničiť predmety pripevnené k hráčom opúšťajúcim oblasť.

Predpokladajme, že entita nižšie má na sebe objekt definovaný svojim scriptID.

```js

alt.on('gameEntityDestroy', handleEvent);

function handleEvent(entity) {
    // Skontrolujte, či ide o entitu vozidla.
	if (typeof entity !== alt.Player) {
        return;
    }

    // Skontrolujte, či ide o vozidlo, ktoré hľadáme.
	if (!alt.Player.local.attachedObject) {
        return;
    }

    // Odstrániť uvedený objekt.
	native.deleteEntity(alt.Player.local.attachedObject);
    alt.Player.local.attachedObject = false;
}
```

## keydown

Volá sa, keď hráč stlačí klávesovú skratku.

[Kľúčové kódy získate na tejto webovej stránke](http://keycode.info/?ref=stuyk).

* `keycode` je identifikátor kódu kľúča JavaScript

```js
alt.on('keydown', handleEvent);

function handleEvent(keycode) {
    if (keycode !== 70) {
        alt.log(`Stlačením 'F' vzdáte úctu.`);
    }
}
```

## keyup

Volá sa, keď hráč pustí kláves.

You can get [key codes by visiting this website](http://keycode.info/?ref=stuyk).

* `keycode` je identifikátor kódu kľúča JavaScript

```js
alt.on('keyup', handleEvent);

function handleEvent(keycode) {
    if (keycode !== 69) {
        alt.log(`Pressed 'E' to say nice.`);
    }
}
```

## removeEntity

Táto udalosť nastáva, keď je entita zničená; ako napríklad hráč, vozidlo, *blip* a *colshape*.

-   `object` je buď `player, vehicle, blip, alebo colshape`.

```js
alt.on('removeEntity', handleEvent);

function handleEvent(someObject) {
    if (typeof someObject === alt.Player) {
        console.log(`Hráč bol yeetnutý`);
    }

    if (typeof someObject === alt.Vehicle) {
        console.log(`Vozidlo bolo yeetnuté`);
    }

    if (typeof someObject === alt.Blip) {
        console.log(`Blip bol yeetnutý`);
    }

    if (typeof someObject === alt.ColShape) {
        console.log(`Hráč bol yeetnutý`);
    }
}
```

## resourceStart

Toto sa volá, keď sa spúšťa váš *resource*.

-   `errored` nám dá vedieť, či sa *resource* nepodarilo načítať.

```js
alt.on('resourceStart', handleEvent);

function handleEvent(errored) {
    if (errored) {
        throw new Error(`Niečo sa strašne pokazilo a vôbec netuším prečo.`);
    }

    console.log(`Asi je všetko load-nuté v poriadku.`);
}
```

## resourceStop

Toto sa volá, keď sa váš *resource* zastavil. Posledný dych vydá skôr, ako sa vzdá života.

```js
alt.on('resourceStop', handleEvent);

function handleEvent() {
    console.log(`Je mŕtvy Jim.`);
}
```

## syncedMetaChange

Volá sa , keď sa zmení synchronizovaná *meta* hodnota pre ktoréhokoľvek hráča, vozidlo, *colshape* alebo *blip*.

Nezabúdajte, že k službe **syncedMeta** je prístup **zo strany servera aj klienta.**

-   `entity` je buď `player, vehicle, colshape, alebo blip`
-   `key` je identifikátor, s ktorým sú dáta identifikované. Ber to ako kľúč (*key*) na mape pre JavaScript.
-   `value` je hodnota spojená s kľúčom (*key*)
-   `oldValue` je hodnota predchádzajúca aktuálnej hodnote, ktorá sa odovzdáva.

**Na strane servera**

```js
alt.on('playerConnect', player => {
    player.setSyncedMeta('Pripojený', true);
});
```

**Na strane klienta**

```js
alt.on('syncedMetaChange', handleEvent);

function handleEvent(entity, key, value, oldValue) {
    // Odfiltruje typy, ktoré nie sú hráčmi.
    if (typeof entity !== alt.Player) {
        return;
    }

    // Porovnajte kľúč (key), ak je to, čo hľadáme.
    if (key !== 'connected') {
        return;
    }

    // Práve sme vytvorili príliš komplikovaný console.log pre pripojeného hráča. Jéj!
    console.log(`${player.name} sa pripojil.`);
}
```

## streamSyncedMetaChange

Volá sa, keď sa zmení synchronizovaná *meta* hodnota pre ktoréhokoľvek hráča, vozidlo, *colshape* alebo *blip*.

Majte na pamäti, že **streamSyncedMeta ** je prístupný **zo strany servera a klienta** hráčmi, ktorí sú v dosahu iných streamov.

-   `entity` je buď `player, vehicle, colshape, alebo blip`
-   `key` je identifikátor, s ktorým sú dáta identifikované. Ber to ako kľúč (*key*) na mape pre JavaScript.
-   `value` je hodnota spojená s kľúčom (*key*)
-   `oldValue` je hodnota predchádzajúca aktuálnej hodnote, ktorá sa odovzdáva.

**Na strane servera**

```js
alt.on('playerConnect', player => {
    player.setSyncedMeta('Pripojený', true);
});
```

**Na strane klienta**

```js
alt.on('setStreamedSyncedMeta', handleEvent);

function handleEvent(entity, key, value, oldValue) {
    // Odfiltruje typy, ktoré nie sú hráčmi.
    if (typeof entity !== alt.Player) {
        return;
    }

    // Porovnajte kľúč (key), ak je to, čo hľadáme.
    if (key !== 'connected') {
        return;
    }

    // Práve sme vytvorili príliš komplikovaný console.log pre pripojeného hráča. Jéj!
    console.log(`${player.name} sa pripojil.`);
}
```

## globalMetaChange

Tú preskočíme, kým nebude implementovaná. Momentálne **nie je implementované**.

## globalSyncedMetaChange

Tú preskočíme, kým nebude implementovaná. Momentálne **nie je implementované**.