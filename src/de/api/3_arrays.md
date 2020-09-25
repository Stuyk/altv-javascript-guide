# Alle Spieler oder Fahrzeuge erhalten

Es gibt zwei spezielle Arrays serverside mit den wir alle Fahrzeuge oder Spieler erhalten können.

## alt.Player.all

Dieses Array beinhaltet alle Spieler die momentan mit unserem Server verbunden sind.

Es gibt einige Dinge die man im Hinterkopf behalten sollte, wenn man Arrays wie diese verwendet.

1. Kopier das Array wenn du es benutzt um Fehler zu vermeiden.

```js
const currentPlayers = [...alt.Player.all];
```

2. Wenn du durch das Array loopst, stelle sicher dass das Element valide ist.

```js
const currentPlayers = [...alt.Player.all];

// Durch alle Spieler loopen.
for (let i = 0; i < currentPlayers.length; i++) {
    const aPlayer = currentPlayers[i];

    // Wir überprüfen ob der Spieler valide ist.
    if (!aPlayer || !aPlayer.valid) {
        continue;
    }

    // Hier können wir jetzt unsere anderen Sachen machen.
}

// Ein anderer Weg um durch alle Spieler zu loopen.
currentPlayers.forEach((player, index) => {
    // Wir überprüfen die Validität des Spielers wieder.
    if (!player || !player.valid) {
        return;
    }

    // Hier können wir jetzt unsere anderen Sachen machen.
});
```

## alt.Vehicle.all

Stelle sicher dass du den oberen Abschnitt gelesen hast. Das gleiche gilt hier auch.

```js
const currentVehicles = [...alt.Vehicle.all];

// Durch alle Fahrzeuge loopen.
for (let i = 0; i < currentVehicles.length; i++) {
    const aVehicle = currentVehicles[i];

    // Wir überprüfen ob das Fahrzeug valide ist.
    if (!aVehicle || !aVehicle.valid) {
        continue;
    }

    // Hier können wir jetzt unsere anderen Sachen machen.
}

// Ein anderer Weg um durch alle Fahrzeuge zu loopen.
currentVehicles.forEach((vehicle, index) => {
    // Wir überprüfen die Validität des Fahrzeuges wieder.
    if (!vehicle || !vehicle.valid) {
        return;
    }

    // Hier können wir jetzt unsere anderen Sachen machen.
});
```
