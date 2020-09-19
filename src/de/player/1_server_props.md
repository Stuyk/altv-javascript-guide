# Spielerobjekteigenschaften (Serverseitig)

Diese Seite wird dir zeigen, wie die Spielereigenschaften benutzt werden können.

## player.armour

Wird benutzt, um den aktuellen Rüstungswert des Spielers zu **setzen oder lesen**.

```js
const currentArmour = player.armour;
player.armour = 5;
player.armour += 10;
player.armour -= 10;
```

## player.authToken

Wird benutzt, um das authToken zu **lesen**. Vorhanden bei earlyAuth-Implementationen. Die meisten Benutzer werden dies nicht benutzen.

```js
alt.on('playerConnect', handleConnect);

function handleConnect(player) {
    if (!player.authToken) {
        player.kick(`No Auth Token Found`);
        return;
    }

    alt.log(`${player.name}'s authToken is ${authToken}`);
}
```

## player.currentWeapon

Wird benutzt, um den hash der aktuell getragenen Waffe zu **setzen oder lesen**.

```js
player.currentWeapon = alt.hash('weapon_pistol'); // 0x1B06D571

if (player.currentWeapon === 0x1b06d571) {
    console.log(`Player has a pistol equipped.`);
}
```

Insofern du die Klartextnamen der Waffen auf dem Server lesen und setzen möchtest ohne den Hash zu benutzen, empfehle ich prototype-Funktionen zu schreiben.

```js
alt.Player.prototype.setWeapon = function(weaponName) {
    this.currentWeapon = alt.hash(weaponName);
    this.currentWeaponName = weaponName;
};
```

## player.currentWeaponComponents

Wird benutzt, um alle Waffenerweiterungen der aktuell getragenen Waffe des Spielers zu **lesen** Alle Waffenerweiterungen sind Hashbasierend.

```js
const currentWeaponComponents = player.currentWeaponComponents;

for (let i = 0; i < currentWeaponComponents.length; i++) {
    const weaponComponentHash = currentWeaponComponents[i];
}
```

## player.currentWeaponTintIndex

Wird benutzt, um den Farbtonindex der aktuell getragenen Waffe zu **lesen**.

```js
const currentTint = player.currentWeaponTintIndex;
```

| Waffen Farbton ID | Farbe  |
| ----------------- | ------ |
| 0                 | Normal |
| 1                 | Grün   |
| 2                 | Gold   |
| 3                 | Pink   |
| 4                 | Armee  |
| 5                 | LSPD   |
| 6                 | Orange |
| 7                 | Platin |

## player.dimension

Wird benutzt, um die aktuelle Dimension des Spielers zu **setzen oder lesen**. Dimensionen basieren auf dem int32 Datentyp. Dies bedeutet, dass es eine Minimale und Maximale Zahl zum setzen der Dimension gibt. Von `-2.147.483.648` bis `2.147.483.647`.

Folgende Darstellung beschreibt, welche Spieler sich in welchen Dimensionen sehen. Danke an Heron hierfür.

```
X sieht nur X
-X sieht 0 und -X
0 sieht nicht -X und X
```

Die Standarddimension ist **0**.

```js
const currentDimension = player.dimension;
player.dimension = 1;

// Wenn du willst, dass der Spieler nur sich selbst sieht und niemand anderen ist dies ein Beispiel, um dies zu erzielen.
// Beachte, dass du diesen Spieler auch wieder in Dimension 0 zurücksetzt, nachdem du fertig bist, wofür du den Spieler in die eigene Dimension gesetzt hast.
player.dimension = player.id;
```

## player.entityAimOffset

Wird benutzt, um den Zielvektor des Spielers zu **lesen**. Hierfür existiert bisher kein offensichtlicher Usecase.

Während diese Seite geschrieben wurde war nicht klar, ob dies überhaupt funktionert.

## player.entityAimingAt

Wird benutzt, um die Objektinstanz zu **lesen**, auf die der Spieler gerade zielt. Laut aktuellem Stand funktioniert des nicht korrekt.

Während diese Seite geschrieben wurde war nicht klar, ob dies überhaupt funktionert.

## player.flashlightActive

Wird benutzt, um zu **lesen**, ob der Spieler eine Taschenlampe benutzt. (Unsicher, ob dies der einzige usecase ist)

Während diese Seite geschrieben wurde war nicht klar, ob dies überhaupt funktionert.

## player.health

Wird benutzt, um den aktuellen Lebenswert des Spielers zu **lesen oder setzen**.

Das Leben in GTA:V basiert auf diesen Werten `100 - 200`.

200 ist das Maximale Leben.

< 100 bedeutet das der Spieler Tot ist.

```js
const currentHealth = player.health;
player.health += 10;

if (player.health > 200) {
    player.health = 200;
}

// Töte den Spieler.
player.health = 100;
```

## player.hwidExHash

Dies ist einer von Zwei wegen, um die Hardware (also den PC) eines Spielers einzigartig zu identifizieren.

Dies ist ein guter Weg spieler zu bannen, da diese Spieler sich neue Hardware kaufen müssen, um ihren Ban eventuell zu umgehen.

Momentan weiß niemand genau, wie und welche Informationen hier ausgelesen werden.

```js
const currentHwidEx = player.hwidExHash;
```

## player.hwidHash

Dies ist einer von Zwei wegen, um die Hardware (also den PC) eines Spielers einzigartig zu identifizieren.

Dies ist ein guter Weg spieler zu bannen, da diese Spieler sich neue Hardware kaufen müssen, um ihren Ban eventuell zu umgehen.

Momentan weiß niemand genau, wie und welche Informationen hier ausgelesen werden.

```js
const currentHwid = player.hwidHash;
```

## player.id

Wird benutzt, um die aktuelle intern alt:V-Netzwerkid des Spielers zu **lesen**. Diese ist stets einzigartig für jeden Spieler.

ID's werden ohne Änderung benutzt solange das Limit von `65535` nicht erreicht ist. Sollte diese Zahl erreicht werden kann es zu einer Neuverteilung von ids kommen.

```js
alt.on('playerConnect', handleConnect);

function handleConnect(player) {
    alt.log(`${player.name} has joined with the ID of ${player.id}`);
}
```

## player.ip

In den meisten Fällen gibt dies die IP des Spielers in IPv6 Format zurück.

Ein Beispiel für das Muster, wenn du mit deinem lokalen Server verbunden bist: `::ffff:127.0.0.1`

```js
alt.on('playerConnect', handleConnect);

function handleConnect(player) {
    if (player.ip === `::ffff:127.0.0.1`) {
        alt.log(`${player.name} has joined from local host.`);
    }
}
```

## player.maxArmour

Wird benutzt, um den maximal zu erreichenden Rüstungswert zu **setzen oder lesen**. Der Wert kann maximal nur `65535` betragen.

Nachdem dies bei dem Spieler gesetzt wurde, kann der aktuelle Rüstungswert auf den Maximal möglichen Wert angehoben werden.

```js
const currentMaxArmour = player.maxArmour;
if (currentMaxArmour <= 100) {
    player.maxArmour = 65535;
    player.armour = 65535;
}

alt.log(`${player.name} is a chunker.`);
```

## player.maxHealth

Wird benutzt, um den maximal zu erreichenden Lebenswert zu **setzen oder lesen**. Der Wert kann maximal nur `65535` betragen.

Nachdem dies bei dem Spieler gesetzt wurde, kann der aktuelle Lebenswert auf den Maximal möglichen Wert angehoben werden.

```js
const currentMaxHealth = player.maxHealth;
if (currentMaxHealth <= 100) {
    player.maxHealth = 65535;
    player.health = 65535;
}

alt.log(`${player.name} is a healthy chunker.`);
```

## player.model

Wird benutzt, um das Model des Spielers zu **setzen der lesen**.

Du benutzt einen String zum setzen.

Kein Model ist automatisch gesetzt, daher muss bei jedem Spieler der sich verbindet ein Model gesetzt werden.

```js
alt.on('playerConnect', handleConnect);

function handleConnect(player) {
    player.model = 'mp_m_freemode_01';
}
```

## player.name

Wird benutzt, um den Namen des Spielers zu **lesen**. Dieser wird von den Spielern in den alt:V Optionen eingestellt.

```js
alt.on('playerConnect', handleConnect);

function handleConnect(player) {
    if (player.name.toLowerCase() === 'stuyk') {
        player.kick(`Stupid name.`);
    }
}
```

## player.netOwner

Wird benutzt, um den aktuellen Netzwerbesitzer zu **lesen**, welcher die Spielerinstanz auf dem Server synchronisiert. Vererbt durch entity.

Für Entwickler ohne Erfahrung wird diese Eigenschaft nicht wichtig sein.

```js
const currentOwner = player.netOwner;

if (!currentOwner) {
    console.log(`Looks like nobody owns this entity.`);
}
```

## player.ping

Wird benutzt, um die aktuelle Latenz des Spielers zu **lesen**.

Unten siehst du einen Ausschnitt, wie du die Latenz für alle Spieler aufrufbar machen kannst.

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

Wird benutzt, um die aktuelle Position des Spielers zu **setzen oder lesen**.

Da der Vektor oder das Objekt, welches die aktuellen Daten der Position enthält nut gelesen werden kann, solltest du immer einen neuen Vektor initialisieren oder den Spreadoperator für Objekte benutzen.

```js
const currentPos = { ...player.pos };
currentPos.x += 1;

// Teleportiert den Spieler unter die Map.
player.pos = {
    x: 0,
    y: 0,
    z: 0
};

// Erstellt einen neuen Vektor mit der alt:V Klasse und teleportiert den Spieler unter die Map.
player.pos = new alt.Vector3(0, 0, 0);
```

## player.rot

Wird benutzt, um die aktuelle Rotation des Spielers zu **setzen oder lesen**. **Leider ist das setzten aktuell fehlerhaft oder nicht zuverlässig serverseitig**.

```js
const currentRot = { ...player.rot };
```

## player.seat

Wird benutzt, um den aktuellen Fahrzeugsitz zu **lesen**, wenn dieser in einem Fahrzeug sitzt.

```js
if (player.vehicle && player.seat === -1) {
    alt.log(`Player is in the driver's seat.`); // Vorne Links
}

if (player.vehicle && player.seat === 0) {
    alt.log(`Player is riding shotgun.`); // Beifahrer. Rechts.
}

if (player.vehicle && player.seat === 1) {
    alt.log(`Player is behind the driver's seat.`); // Hinten Links
}

if (player.vehicle && player.seat === 2) {
    alt.log(`Player is behind the player riding shotgun.`); // Hinten Rechts
}
```

## player.socialId

Wird benutzt, um eine unsichere Version der SocialClubId (Bereitgestellt durch Rockstar) des Spielers zu **lesen**.
Bitte behalte im Kopf, dass diese Id **nicht sicher** für die Authentifikation eines Spielers ist. **Diese ID kann manipuliert werden**.

```js
const social = player.socialId;
```

## player.valid

Wird benutzt, um zu **lesen**, ob das Spielerobjekt und dessen Instanz noch benutzbar ist. Dies ist sehr gut, wenn Timeouts, Intervalle oder Disconnect-Events benutzt werden.

Ein Spieler der nicht mehr gültig ist bedeutet, dass dieser keine Daten mehr vom Server gesendet kriegen kann.

```js
alt.on('playerDisconnect', handleDisconnect);

function handleDisconnect(player, reason) {
    if (!player || !player.valid) {
        console.log(`Looks like this player is already invalid. Can't save anything.`);
        return;
    }

    console.log(`${player.name} has disconnected.`);
}
```

## player.vehicle

Wird benutzt, um das Fahrzeugobjekt, also dessen Instanz zu **lesen**. Zurückgegeben wird **null** oder **undefined**, wenn der Spieler **NICHT** in einem Fahrzeug sitzt.

```js
if (player.vehicle) {
    console.log(`Player is in a vehicle. Let's change its color!`);
    player.vehicle.setPrimaryColor = {
        r: 255,
        g: 0,
        b: 0,
        a: 255
    };
}

if (!player.vehicle) {
    console.log(`Player is not in a vehicle.`);
}
```
