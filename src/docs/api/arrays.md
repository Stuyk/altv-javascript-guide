# Special Arrays

There are two special arrays that exist on server-side that help you with determine all players or vehicles.

-   alt.Player.all
-   alt.Vehicle.all

They can be used in various ways.

```js
// Make a copy of the players array.
const currentPlayers = [...alt.Player.all];

// For each player in currentPlayers log their name.
for (let i = 0; i < currentPlayers.length; i++) {
    const pName = currentPlayers[i].name;
    alt.log(pName);
}

// Make a copy of the vehicles array.
const currentVehicles = [...alt.Vehicle.all];

// For each vehicle in currentVehicles log the model.
for (let i = 0; i < currentVehicles.length; i++) {
    const model = currentVehicles[i].model;
    alt.log(model);
}
```
