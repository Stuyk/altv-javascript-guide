# Príklady využitia *eventu* na serveri

Toto je dokument, ktorý poskytne príklad pre každú udalosť servera. Je to nevyhnutné na to, aby ste skutočne pevne pochopili, ako sa udalosť spúšťa a ako sa s ňou zaobchádza.

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

## consoleCommand

To sa spustí, keď do konzoly servera alt:V napíšete nejaké údaje. Po stlačení klávesu **Enter** sa slová automaticky rozdelia.

-   `args` je pole reťazcov (*string-ov*)

```js
alt.on('consoleCommand', handleEvent);

function handleEvent(args) {
    const cmd = args[0];

    if (cmd !== 'kickall') {
        return;
    }

    // Týmto kick-neté všetkých hráčov, ktorí sú momentálne online.
    const players = [...alt.Player.all];
    for (let i = 0; i < players.length; i++) {
        if (!players[i] || !players[i].valid) {
            continue;
        }

        players[i].kick();
    }
}
```

Predpokladajme, že sme do konzoly servera zadali nasledujúce.

```
kickall
```

## entityEnterColshape

Ak chcete skontrolovať, či hráč vstúpi do konkrétnej oblasti na strane servera, môžete použiť **ColShape**.

Prichádzajú v [rôznych tvaroch a veľkostiach](https://altmp.github.io/altv-typings/classes/_alt_server_.colshape.html) a v tomto príklade použijeme Valec (*Cylinder*).

-   `colshape` môže byť akýkoľvek *colshape*, do ktorého hráč vstúpi.
- `entity` môže byť vozidlo alebo hráč.

```js
// Vytvorte ColshapeCylinder
// (x, y, z, radius, height) Parametre
const cs = new alt.ColshapeCylinder(0, 0, 0, 3, 200);

// Toto je funkcia, ku ktorej máme prístup z inštancie colshape.
cs.doSomething = player => {
    console.log(`Máte hráča na dosah.`);
};

// Vytvorte event.
alt.on('entityEnterColshape', handleEvent);

// Vybavte event.
function handleEvent(colshape, entity) {
    // Naplňte všetky entity, ktoré nie sú hráčmi.
    if (typeof entity !== alt.Player) {
        return;
    }

    // Skontrolujte, či funkcia existuje. Potom vykonajte funkciu.
    if (typeof cs.doSomething === 'function') {
        cs.doSomething(entity); // <- Zavolanie funkcie a odovzdanie hráča.
    }
}
```

## entityLeaveColshape

Ak chcete skontrolovať, či hráč opustí konkrétnu oblasť na strane servera, môžete použiť **ColShape**.

Prichádzajú v [rôznych tvaroch a veľkostiach](https://altmp.github.io/altv-typings/classes/_alt_server_.colshape.html) a v tomto príklade použijeme Valec (*Cylinder*).

-   `colshape` môže byť akýkoľvek *colshape*, do ktorého hráč vstúpi.
-   `entity` môže byť vozidlo alebo hráč.

```js
// Vytvorte ColshapeCylinder
// (x, y, z, radius, height) Parametre
const cs = new alt.ColshapeCylinder(0, 0, 0, 3, 200);

// Toto je funkcia, ku ktorej máme prístup z inštancie colshape.
cs.doSomething = player => {
    console.log(`Už nemáte hráča na dosah.`);
};

// Vytvorte event.
alt.on('entityLeaveColshape', handleEvent);

// Vybavte event.
function handleEvent(colshape, entity) {
    // Naplňte všetky entity, ktoré nie sú hráčmi.
    if (typeof entity !== alt.Player) {
        return;
    }

    // Skontrolujte, či funkcia existuje. Potom vykonajte funkciu.
    if (typeof cs.doSomething === 'function') {
        cs.doSomething(entity); // <- Zavolanie funkcie a odovzdanie hráča.
    }
}
```

## explosion

Výbuch je skutočne jedinečná udalosť. Na väčšine serverov často vypnú explózie. Toto je jedna z udalostí, ktorú môžete na konci vyhodiť výrazom `return false`, aby ste zabránili poškodeniu všetkých výbuchov na serveri.

-   `entity` je zdrojom škody.
- `explosionType` je číslo.
- `position` je miesto výbuchu
-   `exposionFx` je hodnota hash ScreenFx použitá pri výbuchu
-   `target` je pre koho bol zameraný tento výbuch.

```js
alt.on('explosion', handleEvent);

function handleEvent(entity, explosionType, position, explosionFxNumberOrHash, target?) {
    if (explosionType === 0) {
        return false; // Nepoškodzujte hráčov
    }

    return true; // Škody hráčom
}
```

## playerChangedVehicleSeat

Tento *event* sa volá, keď sa hráč prehadzuje z jedného sedadla na druhé.

-   `player` je inštancia hráča, ktorý mení sedadlo.
- `vehicle` je vozidlo, v ktorom sa práve koná
- `oldSeat` je staré sedadlo, na ktorom bol hráč.
- `newSeat` je nové miesto, na ktorom sa hráč nachádza.

```js
alt.on('playerChangedVehicleSeat', handleEvent);

function handleEvent(player, vehicle, oldSeat, newSeat) {
    if (oldSeat === -1 && newSeat !== -1) {
        console.log(`${player.name} opustil miesto vodiča!`);
    }
}
```

## playerConnect

Toto je *event*, ktorý nastane, keď sa hráč pripojí k serveru.

Hráč môže zrušiť svoje pripojenie spustením príkazu `player.kick()`.

### Nič sa nestane po pripojení hráča

Je dôležité pochopiť, že **NIČ SA NESTÁVA** po pripojení hráča. Pre zobrazenie hráča musíte použiť `player.spawn` a `player.model`.

-   `player` je hráč, ktorý sa pripojil k serveru.

```js
alt.on('playerConnect', handleEvent);

function handleEvent(player) {
    console.log(`${player.name} sa pripojil k serveru.`);
    console.log(`${player.name} sa teraz uvidí.`);

    player.spawn(0, 0, 0);
    player.model = `mp_m_freemode_01`; // mp_f_freemode_01

    alt.setTimeout(() => {
        if (!player || !player.valid) {
            return;
        }

        player.kick();
    }, 5000);
}
```

## playerDamage

Toto je *event*, ktorý nastane, keď hráč utrpí škodu. Poškodenie je možné vyvrátiť pridaním späť chýbajúceho zdravia.

Odporúča sa nepoužívať túto udalosť namiesto `playerDeath`. Majú svoje vlastné príslušné použitie.

Ak chcete poškodené časti tela a ďalšie informácie, prečítajte si [weaponDamage](#weaponDamage)

-   `player` je hráč, ktorý je poškodený
- `attacker` je hráč, ktorý útočí na hráča
- `weaponHash` je hash číslo pre zbraň
- `damage` je škoda spôsobená hráčovi

```js
alt.on('playerDamage', handleEvent);

function handleEvent(player, attacker, weaponHash, damage) {
    player.health += damage;

    if (player.health > 200) {
        player.health = 200;
    }

    if (player.health <= 100) {
        // Sú mŕtvi
        player.spawn(player.pos.x, player.pos.y, player.pos.z);
    }

    return false; // Toto vylúči všetky spôsobené škody. Hráč sa neobnoví.
}
```

## playerDeath

Ak zrazu stratíte celé zdravie a zomriete. Toto je udalosť, ktorá sa spustí.

-   `player` je hráč, ktorý zomrel.
- `attacker` je hráč, ktorý spôsobil smrť tohto hráča. Môže to byť niekedy hráč.
- `weaponHash` je *hash* použitej zbrane.

```js
alt.on('playerDamage', handleEvent);

function handleEvent(player, attacker, weaponHash) {
    console.log(`${player.name} zomrel v rukách ${attacker.name}.`);
    player.spawn(player.pos.x, player.pos.y, player.pos.z, 5000); // Týmto sa hráč znovu objaví na mieste po 5 sekundách.
}
```

## playerDisconnect

Toto je *event* odpojenia, keď hráč opustí server.

-   `player` je hráč, ktorý opustil server.
- `reason` je dôvod, prečo hráč opustil server.

```js
alt.on('playerDisconnect', handleEvent);

function handleEvent(player, reason) {
    // Mali by ste skontrolovať, či je hráč platný. Ak sú údaje o prototypoch neplatné, môžu sa stratiť.
    if (!player || !player.valid) {
        console.error(`Nepodarilo sa získať údaje o hráčovi ${player.name}`);
    } else {
		// Klonujte svoje údaje, ktoré tu chcete uložiť, čo najskôr.
		// Tu urobte príkaz na uloženie databázy.
		// Po ukončení tejto funkcie sa dáta hráča stratia.
    }

    console.log(`${player.name} sa odpojil.`);
}
```

## playerEnteredVehicle

Tento *event* sa spustí, keď sa hráč **posadil** do vozidla. **Nie pri nastupovaní ani pri začatí nastupovanie !**

-   `player` ktorý vošiel do vozidla.
- `vehicle` do ktorého sa hráč posadil.
- `seat` je sedadlo, na ktorom hráč sedí. Ďalšie informácie nájdete v [tabuľke sedadiel](#Seat Table)

```js
alt.on('playerEnteredVehicle', handleEvent);

function handleEvent(player, vehicle, seat) {
    console.log(`${player.name} opustil ${vehicle.model} sadnútim na sedadlo ${seat}`);
    vehicle.engineOn = true; // <-- Autíčko ide brrr.
}
```

## playerLeftVehicle

Tento *event* sa spustí, keď hráč **úplne vystúpil** z vozidla. **Nie pri vystupovaní ani pri začatí vystupovanie !**

-   `player` ktorý vystúpil z vozidla.
-   `vehicle` z ktorého sa hráč vystúpil.
-   `seat` je sedadlo, na ktorom hráč sedel. Ďalšie informácie nájdete v [tabuľke sedadiel](#Seat Table)

```js
alt.on('playerLeftVehicle', handleEvent);

function handleEvent(player, vehicle, seat) {
    console.log(`${player.name} vystúpil z ${vehicle.model} zo sedadla ${seat}`);
    vehicle.engineOn = true; // <-- Autíčko ide brrr.
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

```js
alt.on('playerConnect', player => {
    player.setSyncedMeta('Pripojený', true);
});

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

```js
alt.on('playerConnect', player => {
    player.setSyncedMeta('Pripojený', true);
});

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

## vehicleDestroy

Volá sa, keď je vozidlo poškodené do tej miery, že bolo zničené.

```js
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);
vehicle.currentModel = 'infernus';

alt.on('vehicleDestroy', handleEvent);

function handleEvent(vehicle) {
    const newPosition = { ...vehicle.pos };
    const newModel = vehicle.currentModel;

    if (vehicle.valid && vehicle.destroy) {
        vehicle.destroy();
    }

    // Opätovne zobrazí vozidlo, keď je zničené.
    new alt.Vehicle(oldModel, newPosition.x, newPosition.y, newPosition.z, 0, 0, 0);
}
```

## weaponDamage

Toto je *event*, ktorý nastane, keď hráč poškodí zbraň. Poškodenie je možné vyvrátiť pridaním späť chýbajúceho zdravia.

Odporúča sa nepoužívať túto udalosť namiesto `playerDeath`. Majú svoje vlastné príslušné použitie.

-   `player` je hráč, ktorý je poškodený
- `target` je hráč, na ktorého hráč útočí
- `weaponHash` je *hash* zbrane
- `damage` je škoda spôsobená hráčovi
- `offset` je vektor3, ktorý predstavuje miesto, kde bol hráč presne zasiahnutý
- `bodyPart` je kostný index miesta, kde bol hráč zasiahnutý

```js
alt.on('weaponDamage', handleEvent);

function handleEvent(player, target, weaponHash, damage, offset, bodyPart) {
    console.log(`${player.name} zaútočil na ${target.name}`);
    console.log(`${target.name} dostal ${damage} z ${weaponHash} pri kostnom indexe ${bodyPart}`);
    console.log(`Popieranie škody`);
    return false;
}
```

## startFire

Tú preskočíme, kým nebude implementovaná. Momentálne **nie je implementované**.

## startProjectile

Tú preskočíme, kým nebude implementovaná. Momentálne **nie je implementované**.

## playerWeaponChange

To je, keď hráč prepne zo starej zbrane na novú zbraň.

-   `player` je hráč, ktorý mení zbrane.
- `oldWeapon` je číslo alebo *hash* použitej starej zbrane.
- `newWeapon` je číslo alebo *hash* novej použitej zbrane.

```js
alt.on('playerWeaponChange', handleEvent);

function handleEvent(player, oldWeapon, newWeapon) {
    // Zabráni zámene zbraní
    player.currentWeapon = oldWeapon;
}
```
