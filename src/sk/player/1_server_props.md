# Vlastnosti hráča

Táto stránka bude slúžiť ako reprezentácia používania rôznych vlastností hráča.

Sú určené na použitie na strane servera.

## player.armour

Používa sa na **nastavenie alebo získanie** aktuálnej úrovne brnenia hráča.

```js
const currentArmour = player.armour;
player.armour = 5;
player.armour += 10;
player.armour -= 10;
```

## player.authToken

Používa sa na **získanie** authToken-u poskytovaného počas implementácií skorého overenia. Väčšina používateľov to nebude využívať.

```js
alt.on('playerConnect', handleConnect);

function handleConnect(player) {
    if (!player.authToken) {
        player.kick(`Nenašiel sa žiadny overovací token`);
        return;
    }

    alt.log(`authToken hráča ${player.name} je ${authToken}`);
}
```

## player.currentWeapon

Používa sa na **nastavenie alebo získanie** aktuálneho *hash-u* zbrane hráča.

```js
player.currentWeapon = alt.hash('weapon_pistol'); // 0x1B06D571

if (player.currentWeapon === 0x1b06d571) {
    console.log(`Hráč má vybavenú pištoľ.`);
}
```

Ak chcete vybaviť všetky kontroly zbraní na strane servera v obyčajnej angličtine a nie v hash-e, mali by ste sa pokúsiť použiť prototyp na to, aby ste hráčovi dali zbraň.

```js
alt.Player.prototype.setWeapon = function(weaponName) {
    this.currentWeapon = alt.hash(weaponName);
    this.currentWeaponName = weaponName;
};
```

## player.currentWeaponComponents

Slúži na **získanie** všetkých komponentov zbraní, ktoré sa momentálne nachádzajú na hráčovej aktuálne vybavenej zbrani. Všetky komponenty zbraní sú hash-ované.

```js
const currentWeaponComponents = player.currentWeaponComponents;

for (let i = 0; i < currentWeaponComponents.length; i++) {
    const weaponComponentHash = currentWeaponComponents[i];
}
```

## player.currentWeaponTintIndex

Používa sa na **získanie** momentálne vybaveného indexu odtieňa zbrane.

```js
const currentTint = player.currentWeaponTintIndex;
```

## player.dimension

Slúži na **získanie** alebo **nastavenie** aktuálnej dimenzie hráča. Dimenzie sú založené na INT32, čo znamená, že pre dimenziu existuje minimálna a maximálna hodnota (od `-2147483648` do` 2147483648`).

Popis rozmerov napísaný Heron-om je nasledovný.

```
X môže vidieť iba X
-X môže vidieť 0 a -X
0 nevidí -X ani X
```

Predvolená dimenzia je **0**.

```js
const currentDimension = player.dimension;
player.dimension = 1;

// Ak potrebujete jedinečnú inštanciu na pripojenie hráča, toto je slušný spôsob riešenia.
// Nezabudnite to nastaviť späť na nulu potom, čo urobíte všetko, čo musíte urobiť v jedinečnej dimenzii.
player.dimension = player.id;
```

## player.entityAimOffset

Používa sa na **získanie** *ofsetu* aktuálneho cieľa hráča. V súčasnosti neexistuje prípad použitia pre túto konkrétnu funkciu.

V čase písania tohto dokumentu si alt:V team ani nie je istí, či funguje.

## player.entityAimingAt

Používa sa na **získanie** aktuálnej entity hráča, na ktorú mieria. Aktuálny pocit je, že táto konkrétna vlastnosť nefunguje.

V čase písania tohto dokumentu si alt:V team ani nie je istí, či funguje.

## player.flashlightActive

Used to **get** the player's flashlight activity?

V čase písania tohto dokumentu si alt:V team ani nie je istí, či funguje.

## player.health

Používa sa na **získanie alebo nastavenie** aktuálneho *healt-hu* hráča.

Zdravie v GTA:V je založené na hodnotách `100 - 200`.

200 je maximálny zdravotný stav hráča.

<100 znamená, že hráč je mŕtvy.

```js
const currentHealth = player.health;
player.health += 10;

if (player.health > 200) {
    player.health = 200;
}

// Zabite hráča.
player.health = 0;
```

## player.hwidExHash

Toto je jeden z dvoch spôsobov, ako získať jedinečný hardvérový hash, ktorý patrí hráčovi.

Je to skvelý spôsob, ako *zabanovať* hráča; zvlášť keď budú potrebovať úplne novú sadu hardvéru, aby sa dostali cez váš *ban*.

Momentálne nikto nevie, ako sú tieto hardvérové informácie určené.

```js
const currentHwidEx = player.hwidExHash;
```

## player.hwidHash

Toto je jeden z dvoch spôsobov, ako získať jedinečný hardvérový hash, ktorý patrí hráčovi.

Je to skvelý spôsob, ako *zabanovať* hráča; zvlášť keď budú potrebovať úplne novú sadu hardvéru, aby sa dostali cez váš *ban*.

Momentálne nikto nevie, ako sú tieto hardvérové informácie určené.

```js
const currentHwid = player.hwidHash;
```

## player.id

Používa sa na **získanie** aktuálneho ID hráča. Sú striktne jedinečné pre poradie pripojenia hráča.

ID sa môžu používať až do hodnoty `65535`. Po dosiahnutí 65 535 sa ID recykluje na nového pripojovaného hráča.

```js
alt.on('playerConnect', handleConnect);

function handleConnect(player) {
    alt.log(`Hráč ${player.name} sa napojil s ID ${player.id}`);
}
```

## player.ip

Vo väčšine prípadov ide o IP, ktorá sa prevádza z IPv4 na IPv6.

Príklad toho, ako vyzerá adresa IP lokálneho hostiteľa: `::ffff:127.0.0.1`

```js
alt.on('playerConnect', handleConnect);

function handleConnect(player) {
    if (player.ip === `::ffff:127.0.0.1`) {
        alt.log(`Hráč ${player.name} sa napojil lokálne.`);
    }
}
```

## player.maxArmour

Používa sa na **nastavenie alebo získanie** aktuálneho maximálneho brnenia hráča. Maximálna hodnota, na ktorú je možné nastaviť, je `65535`.

Po nastavení tejto možnosti môžete nastaviť aktuálne brnenie hráča na maximálnu hodnotu brnenia.

```js
const currentMaxArmour = player.maxArmour;
if (currentMaxArmour <= 100) {
    player.maxArmour = 65535;
    player.armour = 65535;
}

alt.log(`${player.name} je nabuchanec`);
```

## player.maxHealth

Používa sa na **nastavenie alebo získanie** aktuálneho maximálneho zdravia hráča. Maximálna hodnota, ktorú je možné nastaviť, je 65535.

Po nastavení môžete nastaviť aktuálny stav hráča na maximálnu hodnotu.

```js
const currentMaxHealth = player.maxHealth;
if (currentMaxHealth <= 100) {
    player.maxHealth = 65535;
    player.health = 65535;
}

alt.log(`${player.name} je zdravý nabuchanec.`);
```

## player.model

Slúži na nastavenie **nastavenia alebo získanie** aktuálneho modelu hráča.

Sem môžete vložiť hodnotu reťazca/*string-u*.

Žiadny model sa nenastavuje automaticky a malo by sa nastavovať, keď je hráč pripojený alebo autentifikovaný.

```js
alt.on('playerConnect', handleConnect);

function handleConnect(player) {
    player.model = 'mp_m_freemode_01';
}
```

## player.name

Slúži na **získanie** aktuálneho mena hráča. Toto nastavuje hráč vo svojich možnostiach.

```js
alt.on('playerConnect', handleConnect);

function handleConnect(player) {
    if (player.name.toLowerCase() === 'stuyk') {
        player.kick(`Hlúpe meno.`);
    }
}
```

## player.netOwner

Používa sa na **získanie** aktuálneho vlastníka siete zodpovedného za synchronizáciu entity so serverom. Zdedené z entity.

Pre priemerného vývojára to nemusí byť nevyhnutne užitočná vlastnosť.

```js
const currentOwner = player.netOwner;

if (!currentOwner) {
    console.log(`Zdá sa, že túto entitu nikto nevlastní.`);
}
```

## player.ping

Používa sa na **získanie** aktuálneho *ping-u* hráča.

Nižšie je uvedený úryvok, ktorý sprístupňuje *ping* hráča všetkým hráčom.

```js
alt.setInterval(handlePingUpdate, 5000);

function handlePingUpdate() {
    const currentPlayers = [...alt.Player.all];

    for (let i = 0; i < currentPlayers.length; i++) {
        const player = currentPlayers[i];
        if (!player || !player.valid) {
            continue;
        }

        player.setSyncedMeta('ping', player.ping);
    }
}
```

## player.pos

Slúži na **získanie** alebo **nastavenie** aktuálnej pozície hráča.

Pri získavaní aktuálnej pozície hráča by ste mali použiť operátor šírenia, aby ste ho mohli zmeniť.

```js
const currentPos = { ...player.pos };
currentPos.x += 1;

// Teleportujte ich pod mapou.
player.pos = {
    x: 0,
    y: 0,
    z: 0
};

// Vytvorte Vector3 s funkciou alt.
player.pos = new alt.Vector3(0, 0, 0);
```

## player.rot

Používa sa na **získanie alebo nastavenie** aktuálnej rotácie hráča. Avšak **nastavenie rotácie je na strane servera prerušené**.

```js
const currentRot = { ...player.rot };
```

## player.seat

Používa sa na **získanie** aktuálneho sedadla, na ktorom sa hráč nachádza.

```js
if (player.vehicle && player.seat === -1) {
    alt.log(`Hráč je na sedadle vodiča.`); // Vpredu vľavo
}

if (player.vehicle && player.seat === 0) {
    alt.log(`Hráč je na sedadle spolujazdca.`); // Cestujúci. Vpredu vpravo
}

if (player.vehicle && player.seat === 1) {
    alt.log(`Hráč je za sedadlom vodiča.`); // Vľavo vzadu
}

if (player.vehicle && player.seat === 2) {
    alt.log(`Hráč je za sedadlom spolujazdca.`); // Vpravo vzadu
}
```

## player.socialId

Používa sa na **získanie** nezabezpečenej verzie aktuálnej identifikácie hráča v *social club-e*, ktorá je prepojená s jeho Rockstar účtom.

Majte na pamäti, že táto hodnota **NIE JE BEZPEČNÁ**, nepoužívajte ju na autentifikáciu. **MOŽNÉ JU OBLBNÚŤ/POZMENIŤ !**

```js
const social = player.socialId;
```

## player.valid

Používa sa na **získanie**, či je hráčska entita stále platná. To je užitočné pri používaní časových limitov, intervalov a riešení udalostí odpojenia.

Neplatný hráč znamená, že môže dlhšie prijímať údaje zo servera.

```js
alt.on('playerDisconnect', handleDisconnect);

function handleDisconnect(player, reason) {
    if (!player || !player.valid) {
        console.log(`Zdá sa, že tento hráč je už neplatný. Nemôžem nič uložiť.`);
        return;
    }

    console.log(`${player.name} sa odpojil`);
}
```

## player.vehicle

Používa sa na **získanie** aktuálneho vozidla, v ktorom sa hráč nachádza. Vráti hodnotu **null** alebo **undefined**, ak hráč **NENÍ** vo vozidle.

```js
if (player.vehicle) {
    console.log(`Hráč je vo vozidle. Zmeňme jeho farbu!`);
    player.vehicle.setPrimaryColor = {
        r: 255,
        g: 0,
        b: 0,
        a: 255
    };
}

if (!player.vehicle) {
    console.log(`Hráč nie je vo vozidle.`);
}
```
