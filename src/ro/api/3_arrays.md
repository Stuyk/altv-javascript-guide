# Parcurgerea listei de Jucători și a listei de Vehicule

În server-side există două matrice cu ajutorul care conțin jucătorii respectiv vehiculele de pe server. Cu ajutorul acestora putem acționa asupra tuturor vehiculelor respectiv jucătorilor.

## alt.Player.all

Această matrice returnează în mod specific o listă cu toți jucătorii care se află în prezent pe serverul dumneavoastră.

Există câteva lucruri pe care ar trebuie să le aveți în vedere atunci când trebuie să utilizați matrice de genul.

1. Clonați întotdeauna matricea. Vă va salva de probleme precum undefined sau invalid.

```js
const currentPlayers = [...alt.Player.all];
```

2. Când parcurgeți jucătorii. Validați-i.

```js
const currentPlayers = [...alt.Player.all];

// Parcurgerea jucătorilor
for (let i = 0; i < currentPlayers.length; i++) {
    const aPlayer = currentPlayers[i];

    // Verificăm dacă jucătorul (aPlayer.valid) este încă valid, pentru a evita eventuale probleme.
    if (!aPlayer || !aPlayer.valid) {
        continue;
    }

    // Codul tău...
}

// Un alt mod de a parcurge jucătorii.
currentPlayers.forEach((player, index) => {
    // Verificăm din nou dacă 'aPlayer.valid' este true.
    if (!player || !player.valid) {
        return;
    }

    // Codul tău...
});
```

## alt.Vehicle.all

Asigurați-vă că ați citit indicațiile de mai sus. Putem utiliza același procedeu și pentru vehicule.

```js
const currentVehicles = [...alt.Vehicle.all];

// Parcurgem vehiculele.
for (let i = 0; i < currentVehicles.length; i++) {
    const aVehicle = currentVehicles[i];

    // Verificăm dacă 'aVehicle.valid' este true.
    if (!aVehicle || !aVehicle.valid) {
        continue;
    }

    // Codul tău...
}

// Un alt mod de a parcurge vehiculele.
currentVehicles.forEach((vehicle, index) => {
    // Verificăm din nou dacă 'vehicle.valid' este true.
    if (!vehicle || !vehicle.valid) {
        return;
    }

    // Codul tău...
});
```
