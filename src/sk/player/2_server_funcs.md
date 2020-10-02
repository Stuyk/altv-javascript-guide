# Funkcie hráča

Táto stránka bude slúžiť ako reprezentácia používania rôznych funkcií hráča.

Sú určené na použitie na strane servera.

## addWeaponComponent

Používa sa na pridanie komponentu zbrane k zbrani na základe jej hodnoty hash.

Zoznam komponentov nájdete v [Tabuľka komponentov zbraní](../tables/weapon_components).

```js
// weaponHash, componentHash
player.addWeaponComponent(0xDFE37640, 0x5B3E7DB6)
```

## deleteMeta

Používa sa na odstránenie *meta* na **strane servera**, ktoré sú k dispozícii pre rôzne zdroje.

```js
// Nastaví meta hráča.
player.setMeta('cash', 500); // key, value

// Skontrolujte, či existuje meta.
if (player.hasMeta('cash')) { // key
    // Získajte meta od hráča.
	const currentCash = player.getMeta('cash'); // key

	// Odstrániť meta.
    player.deleteMeta('cash'); // <--- Usage
}
```

## deleteStreamSyncedMeta

Používa sa na odstránenie údajov uložených v entite hráča, ktorá je prístupná na **strane servera** a na **strane klienta**.

Tento typ synchronizovaného *meta* je prístupný iba hráčom v rozsahu streamovania tohto hráča.

```js
// Nastaví meta hráča.
player.setStreamSyncedMeta('ping', player.ip); // key, value

// Skontrolujte, či existuje meta.
if (player.hasStreamSyncedMeta('ping')) { // key
    // Získajte meta od hráča.
	const currentCash = player.getStreamSyncedMeta('ping'); // key
    
	// Odstrániť meta.
    player.deleteStreamSyncedMeta('ping'); // <--- Usage
}
```

## deleteSyncedMeta

Používa sa na odstránenie údajov uložených v entite prehrávača, ktorá je prístupná na **strane servera** a na **strane klienta**.

Tento typ synchronizovaného *meta* je prístupný vo **vnútri** a **mimo** rozsahu streamovania.

```js
// Nastaví meta hráča.
player.setSyncedMeta('ping', player.ip); // key, value

// Skontrolujte, či existuje meta.
if (player.hasSyncedMeta('ping')) { // key
    // Získajte meta od hráča.
	const currentCash = player.getSyncedMeta('ping'); // key
    
	// Odstrániť meta.
    player.deleteSyncedMeta('ping'); // <--- Usage
}
```

## destroy

Toto by si nikdy nemal používať. To nebude robiť nič a môže spôsobiť pád servera. 

## getMeta

Používa sa na získanie **server-side** *meta*, ktorý je k dispozícii naprieč *resource-mi*.

```js
// Nastaví meta hráča.
player.setMeta('cash', 500); // key, value

// Skontrolujte, či existuje meta.
if (player.hasMeta('cash')) { // key
    // Získajte meta od hráča.
	const currentCash = player.getMeta('cash'); // <--- Usage

	// Odstrániť meta.
    player.deleteMeta('cash'); // key
}
```

## getStreamSyncedMeta

Používa sa na získanie údajov uložených v entite hráča, ktorá je prístupná na **strane servera** a na **strane klienta**.

Tento typ synchronizovaného *meta* je prístupný iba hráčom **vnútri** streamovaného rozsahu tohto hráča.

```js
// Nastaví meta hráča.
player.setStreamSyncedMeta('ping', player.ip); // key, value

// Skontrolujte, či existuje meta.
if (player.hasStreamSyncedMeta('ping')) { // key
    // Získajte meta od hráča.
	const currentCash = player.getStreamSyncedMeta('ping'); // <--- Usage
    
	// Odstrániť meta.
    player.deleteStreamSyncedMeta('ping'); // key
}
```

## getSyncedMeta

Používa sa na odstránenie údajov uložených v entite hráča, ktorá je prístupná na **strane servera** a na **strane klienta**.

Tento typ synchronizovaného *meta* je prístupný vo **vnútri** a **mimo** rozsahu streamovania.

```js
// Nastaví meta hráča.
player.setSyncedMeta('ping', player.ip); // key, value

// Skontrolujte, či existuje meta.
if (player.hasSyncedMeta('ping')) { // key
    // Získajte meta od hráča.
	const currentCash = player.getSyncedMeta('ping'); // <--- Usage
    
	// Odstrániť meta.
    player.deleteSyncedMeta('ping'); // key
}
```

## giveWeapon

Používa sa na to, aby hráč dostal zbraň na základe *hash-u* alebo vhodného mena.

Pozrite sa na [Tabuľku Príčina smrti](../tables/cause_of_death) so všetkými dostupnými *hash-mi* a menami zbraní.

```js
// weaponHash, ammoCount, equipThisWeaponNow?
player.giveWeapon(1141786504, 1, true); // Get a golf club.
```

## hasMeta

Používa sa na kontrolu, či je k dispozícii *meta* na **strane servera**. To funguje naprieč *resource-mi*.

```js
// Nastaví meta hráča.
player.setMeta('cash', 500); // key, value

// Skontrolujte, či existuje meta.
if (player.hasMeta('cash')) { // <---- Usage
    // Získajte meta od hráča.
	const currentCash = player.getMeta('cash'); // key

	// Odstrániť meta.
    player.deleteMeta('cash'); // key
}
```

## hasStreamSyncedMeta

Používa sa na kontrolu, či sú k dispozícii údaje uložené v hráčskej entite. Je k dispozícii na **strane servera** a na **strane klienta**.

Tento typ synchronizovaných *meta* je prístupný iba hráčom v rozsahu streamovania tohto hráča.

```js
// Nastaví meta hráča.
player.setStreamSyncedMeta('ping', player.ip); // key, value

// Skontrolujte, či existuje meta.
if (player.hasStreamSyncedMeta('ping')) { // <--- Usage
    // Získajte meta od hráča.
	const currentCash = player.getStreamSyncedMeta('ping'); // key
    
	// Odstrániť meta.
    player.deleteStreamSyncedMeta('ping'); // key
}
```

## hasSyncedMeta

Používa sa na kontrolu, či sú k dispozícii údaje uložené v hráčskej entite. Je k dispozícii na **strane servera** a na **strane klienta**.

Tento typ synchronizovaného *meta* je prístupný vo **vnútri** a **mimo** rozsahu streamovania.

```js
// Nastaví meta hráča.
player.setSyncedMeta('ping', player.ip); // key, value

// Skontrolujte, či existuje meta.
if (player.hasSyncedMeta('ping')) {  // <--- Usage
    // Získajte meta od hráča.
	const currentCash = player.getSyncedMeta('ping'); // key
    
	// Odstrániť meta.
    player.deleteSyncedMeta('ping'); // key
}
```

## kick

Používa sa na vyhodenie hráča zo servera. **dôvod**, keď je dodávaný s funkciou, sa momentálne hráčovi nezobrazuje.

Možno budete chcieť vytvoriť riešenie, ktoré používateľa po 5 sekundách odpojí.

```js
alt.on('playerConnect', handleConnect);

// Počúvajte pripojenie hráča.
function handleConnect(player) {
	player.kick('Bye'); // Okamžite ich vykopnite.
    
	// Kicknite ich nakoniec.
    alt.setTimeout(() => {
        console.log(`Hráč ${player.name} bude kicknutý do 5 sekúnd.`);
    }, 5000); // 5 sekúnd.
}
```

## removeAllWeapons

Používa sa na odstránenie všetkých zbraní hráča.

```js
player.removeAllWeapons(); // Not much else to this.
```

## removeWeapon

Používa sa na odstránenie zbrane na základe *hash-u* zbrane.

```js
player.removeWeapon(1141786504); // Remove a golf club.
```

## removeWeaponComponent

Používa sa na odstránenie komponentu zbrane zo zbrane hráča.

```js
// weaponHash, componentHash
player.addWeaponComponent(0xDFE37640, 0x5B3E7DB6)
```

## resetNetOwner

Obnoví predvolenú funkčnosť netOwner. Priemerní vývojári to pravdepodobne nebudú používať.

## setDateTime

Slúži na nastavenie aktuálneho denného času hráča v hre. Je dôležité si uvedomiť, že čas bude pokračovať bez ohľadu na aktuálny časový harmonogram hráča.

Odporúča sa čas zmraziť, ak si prajete, aby zostal určitý čas.

To je možné vykonať pomocou natívneho `native.pauseClock(true);` na **strane klienta**.

```js
const currentServerTime = new Date(Date.now());
// deň, mesiac, rok, hodina, minúta, sekunda
player.setDateTime(date.getDay(), date.getMonth(), date.getFullYear(), date.getHour(), date.getMinute(), date.getSecond())
```

## setMeta

Slúži na nastavenie **meta** na **strane servera** u hráča. To funguje naprieč zdrojmi.

```js
// Nastaví meta hráča.
player.setMeta('cash', 500); // <--- Usage (key, value)

// Skontrolujte, či existuje meta.
if (player.hasMeta('cash')) { // key
    // Získajte meta od hráča.
	const currentCash = player.getMeta('cash'); // key

	// Odstrániť meta.
    player.deleteMeta('cash'); // key
}
```

## setNetOwner

Používa sa na zmenu vlastníka siete týchto entít. Priemerní vývojári to pravdepodobne nebudú používať.

## setStreamSyncedMeta

Používa sa na nastavenie údajov uložených v entite hráča. Je k dispozícii na **strane servera** a na **strane klienta**.

Tento typ synchronizovaných *metadát* je prístupný iba hráčom v rozsahu streamovania tohto hráča.

```js
// Nastaví meta hráča.
player.setStreamSyncedMeta('ping', player.ip); // key, value

// Skontrolujte, či existuje meta.
if (player.hasStreamSyncedMeta('ping')) { // <--- Usage
    // Získajte meta od hráča.
	const currentCash = player.getStreamSyncedMeta('ping'); // key
    
	// Odstrániť meta.
    player.deleteStreamSyncedMeta('ping'); // key
}
```

## setSyncedMeta

Používa sa na nastavenie údajov uložených v entite hráča, ktorá je prístupná na **strane servera** a na **strane klienta**.

Tento typ synchronizovaného *meta* je prístupný vo **vnútri** a **mimo** rozsahu streamovania.

```js
// Nastaví meta hráča.
player.setSyncedMeta('ping', player.ip); // key, value

// Skontrolujte, či existuje meta.
if (player.hasSyncedMeta('ping')) {  // <--- Usage
    // Získajte meta od hráča.
	const currentCash = player.getSyncedMeta('ping'); // key
    
	// Odstrániť meta.
    player.deleteSyncedMeta('ping'); // key
}
```

## setWeaponTintIndex

Používa sa na nastavenie indexu odtieňa zbrane na základe jeho hodnoty *hash*.

Pozrite sa na [Tabuľka zbraňových odtieňov](../tables/weapon_tint)

```js
// weaponHash, componentHash
player.setWeaponTintIndex(0xDFE37640, 1)
```

## setWeather

Slúži na nastavenie aktuálneho počasia hráča.

Pozrite sa na [Tabuľku počasia](../tables/weather)

## spawn

Používa sa na oživenie hráča po jeho smrti na základe pozície Vector3. Posledný parameter sa používa na oneskorenie reprodukcie.

```js
// x, y, z, oneskorenie (delay)
player.spawn(0, 0, 0, 0); // Spawne hráča pod mapou na 0,0,0
```



