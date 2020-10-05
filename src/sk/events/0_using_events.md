# Sprievodca využitím *eventov*

Teraz, keď sme poskytli stručný prehľad udalostí, poďme si povedať, ako čítať API.

_Ak sú tieto odkazy niekedy zastarané, skontrolujte anglickú verziu._

- [Server API](https://altmp.github.io/altv-typings/modules/_alt_server_.html#on)
- [Klient API](https://altmp.github.io/altv-typings/modules/_alt_client_.html#on)

Ďalej uvádzame niekoľko bežných prípadov použitia *event-ov*. Len všeobecný kód, ktorý sa týka ich použitia.

[Syntax a parametre nájdete v príkladoch *eventov* servera](./2_server_events.html)

## playerConnect  - vzorové *eventy* na strane servera

Táto udalosť je vstupným bodom pre každého hráča, ktorý sa pripája k vášmu serveru. Túto udalosť by ste mali používať raz v celom svojom zdroji. Počúva pripojenie hráčov. Môžete dokonca hráča *kick-núť* skôr, ako sa úplne pripojí.

**Na strane servera**

```js
// Event, ktorý sa má vyriešiť, keď sa hráč pripojí.
alt.on('playerConnect', handlePlayerConnect);

// Používa class-u alt.Player
function handlePlayerConnect(player) {
    alt.log(`${player.name} sa pripojil.`);
}
```

Je dôležité pochopiť, že **SA NIČ NESTANE** po pripojení hráča.

Žiadny hráč sa nemôže hýbať. Pre prehrávač nie je nastavený žiadny model.

Takto nastavíte model hráča a umiestnite hráča.

**Na strane servera**

```js
/// <reference types="@altv/types-server" />
import alt from 'alt-server';

const spawn = {
    x: -1291.7142333984375,
    y: 83.43296813964844,
    z: 54.8916015625
};

alt.on('playerConnect', handlePlayerConnect);

function handlePlayerConnect(player) {
    player.spawn(spawn.x, spawn.y, spawn.z, 0);
    player.model = `mp_m_freemode_01`;
}
```

## connectionComplete  - vzorové *eventy* na strane klienta

Alternatívou k *event-u* `playerConnect` je *event* ` connectionComplete` zo strany klienta. To je prípad, keď je hráč úplne pripojený k serveru. Táto udalosť je na strane klienta a my už vieme, kto je hráč. Toto sa deje iba na ich počítači a je založené na inštanciách, čo znamená, že táto funkcia je spustená pre každého hráča, ale iba pre hráča, ktorý sa pripojil.

**Na strane klienta**

```js
alt.on('connectionComplete', handleConnectionComplete);

function handleConnectionComplete() {
    const myClientPosition = { ...alt.Player.local.pos };

    alt.log(`Moja pozícia je: ${JSON.stringify(myClientPosition)}`);
    alt.emitServer('helloFromClient', 'this is a string');
}
```

**Na strane servera**

```js
alt.onClient('helloFromClient', handleHelloFromClient);

function handleHelloFromClient(player, msg) {
    console.log(`${player.name} poslal event event.`);
    console.log(msg);
}
```

## playerDeath  - vzorové *eventy* na strane servera a klienta 

Smrť hráča je celkom bežná udalosť. Ak hráč zomrie, budete chcieť použiť `player.spawn` na obnovenie jeho funkčnosti.

Po smrti ich budete musieť manuálne *ragdoll-ovať*, ak si prajete, aby tam zostali dlho. Majte na pamäti, že musíte použiť `player.spawn` skôr, ako ich označíte ako *ragdoll*.

### **Na strane servera**

```js
alt.on('playerDeath', handlePlayerDeath);

function handlePlayerDeath(victim, killer, weaponHash) {
    if (!victim || !victim.valid) {
        return;
    }

    if (killer && killer.valid) {
        alt.log(`${victim.name} bol zabitý hráčom ${killer.name}`);
    }

    alt.log(`${victim.name} sa spawne za 5 sekúnd...`);
    alt.setTimeout(() => {
        if (!victim || !victim.valid) {
            return;
        }

        victim.spawn(0, 0, 0);
        victim.health = 200;
    }, 60000 * 3); // Respawne obeť za 3 minúty.
}
```

### Prípad bežného použitia

Povedzme, že chceme hráča *ragdoll-núť*, keď zomrie, a nechať ho *ragdoll*, kým sa neobnoví. Existuje jednoduchý spôsob, ako to urobiť.

#### **Na strane servera**

```js
alt.on('playerDeath', handlePlayerDeath);

function handlePlayerDeath(victim, killer, weaponHash) {
    // Overte, či obeť existuje.
    if (!victim || !victim.valid) {
        return;
    }

    // Znova zobrazí hráča.
    victim.spawn(victim.pos.x, victim.pos.y, victim.pos.z);

    // Keby sme už označili obeť ako mŕtvu. Zastaviť vykonávanie kódu.
    if (victim.isDead) {
        return;
    }

    // Označte obeť ako mŕtvu.
    victim.isDead = true;
    alt.emitClient(victim, 'death:Handle', victim.isDead);

    // Spustí časový limit o 5 sekúnd, ktorý ich respawne.
    alt.setTimeout(() => {
        // Overte, či sú na serveri stále do 5 sekúnd.
        if (!victim || !victim.valid) {
            return;
        }

        // Odznačte ich ako mŕtve a znova ich objavte.
        victim.isDead = false;
        alt.emitClient(victim, 'death:Handle', victim.isDead);
        victim.spawn(0, 0, 0); // Nastavte svoju nemocničnú pozíciu
        victim.health = 200;
    }, 5000);
}
```

#### **Na strane klienta**

```js
let interval;
let isDead = false;

// Príjem hodnoty zo strany servera.
alt.on('death:Handle', value => {
    // Aktualizácia našej miestnej hodnoty.
    isDead = value;

    // Ak je hodnota nepravdivá. Interval znova nevytvárajte.
    if (!isDead) {
        return;
    }

    // Spustenie intervalu, ktorý volá funkciu každých 100 ms.
    interval = alt.setInterval(handleDeathTicks, 100);
});

function handleDeathTicks() {
    // Ak už nie je označený ako mŕtvy, vymažte interval.
    if (!isDead) {
        alt.clearInterval(interval);
        return;
    }

    // Ak sú označené ako mŕtve, ragdoll-ni te ich.
    native.setPedToRagdoll(alt.Player.local.scriptID, 5000, 0, 0, true, true, false);
}
```

## playerLeftVehicle & playerEnteredVehicle  - vzorové *eventy* na strane servera

Tieto udalosti sa spustia, keď hráč vstúpi do vozidla alebo ho opustí.

Tu je príklad odstránenia vozidla, do ktorého hráč vstúpil po jeho opustení.

```js
alt.on('playerEnteredVehicle', handlePlayerEnteredVehicle);
alt.on('playerLeftVehicle', handlePlayerLeftVehicle);

function handlePlayerEnteredVehicle(player, vehicle, seat) {
    // Uložte informácie o vozidle a sedadle do hráča.
    player.currentSeat = seat;
    player.lastVehicle = vehicle;
}

function handlePlayerLeftVehicle(player, vehicle, seat) {
    // Skontrolujte, či je sedadlom sedadlo vodiča. Skontrolujte, či je vozidlo platné.
    if (player.currentSeat === -1 && player.lastVehicle.valid) {
        player.lastVehicle.destroy();
        player.lastVehicle = null;
        player.currentSeat = -2;
    }
}
```
