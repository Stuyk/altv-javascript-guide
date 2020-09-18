# Get All Players & Vehicles

There are two special arrays that exist on server-side that help you with determine all players or vehicles.

## alt.Player.all

This array specifically returns a list of all players that are currently on your server.

There are a few things you should keep in mind when using arrays like this.

1. Always clone your array. It will save you from undefined or invalid issues.

```js
const currentPlayers = [...alt.Player.all];
```

2. When looping through your players. Validate them.

```js
const currentPlayers = [...alt.Player.all];

// Loop through players.
for (let i = 0; i < currentPlayers.length; i++) {
    const aPlayer = currentPlayers[i];

    // We check validity by checking if 'aPlayer.valid' is true.
    if (!aPlayer || !aPlayer.valid) {
        continue;
    }

    // Do other stuff.
}

// Another way to loop through players.
currentPlayers.forEach((player, index) => {
    // We are checking validity here once again.
    if (!player || !player.valid) {
        return;
    }

    // Do other stuff.
});
```

## alt.Vehicle.all

Make sure you've read above. The same process and validity checks apply for vehicles.

```js
const currentVehicles = [...alt.Vehicle.all];

// Loop through vehicles.
for (let i = 0; i < currentVehicles.length; i++) {
    const aVehicle = currentVehicles[i];

    // We check validity by checking if 'aVehicle.valid' is true.
    if (!aVehicle || !aVehicle.valid) {
        continue;
    }

    // Do other stuff.
}

// Another way to loop through vehicles.
currentVehicles.forEach((vehicle, index) => {
    // We are checking validity here once again.
    if (!vehicle || !vehicle.valid) {
        return;
    }

    // Do other stuff.
});
```
