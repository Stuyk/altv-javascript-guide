# Using Events

Now that we've given a brief overview of events. Let's talk about how to read the API.

_If these links are ever out of date. Notify Stuyk._

-   [Server API](https://altmp.github.io/altv-typings/modules/_alt_server_.html#on)
-   [Client API](https://altmp.github.io/altv-typings/modules/_alt_client_.html#on)

Below is some common use cases for events. Just some general code regarding how to use them.

### (Server) playerConnect

This event is the entry point for any player who is joining your server. You should be using this event once in your entire resource. It listens for player connections. You can even kick a player before they fully connect.

**Server Side**

```js
// An event to handle when a player connects.
alt.on('playerConnect', handlePlayerConnect);

// Uses the class alt.Player
function handlePlayerConnect(player) {
    alt.log(`${player.name} has connected.`);
}
```

It's important to understand that **NOTHING HAPPENS** after a player connects.

No player can move. No model is set for the player.

Here is how you set a player model and spawn the player.

**Server Side**

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
    player.model = `mp_m_freemode_01`;
    player.spawn(spawn.x, spawn.y, spawn.z, 0);
}
```

### (Client) connectionComplete

The alternative to the `playerConnect` event is the `connectionComplete` event from client-side. This is when a player is fully connected to the server.

This event is client-side and we already know who the player is.

This is only happening on their computer and is instance based.

Which means this function is ran for every player but only for the player that connected.

**Client Side**

```js
alt.on('connectionComplete', handleConnectionComplete);

function handleConnectionComplete() {
    const myClientPosition = { ...alt.Player.local.pos };

    alt.log(`My Position Is: ${JSON.stringify(myClientPosition)}`);
    alt.emitServer('helloFromClient', 'this is a string');
}
```

**Server Side**

```js
alt.onClient('helloFromClient', handleHelloFromClient);

function handleHelloFromClient(player, msg) {
    console.log(`${player.name} sent up an event.`);
    console.log(msg);
}
```

### (Server) playerDeath

Player Death is a pretty common event.

If a player dies you will want to use `player.spawn` to restore their functionality.

**Server Side**

```js
alt.on('playerDeath', handlePlayerDeath);

function handlePlayerDeath(victim, killer, weaponHash) {
    if (!victim || !victim.valid) {
        return;
    }

    if (killer && killer.valid) {
        alt.log(`${victim.name} was killed by ${killer.name}`);
    }

    alt.log(`${victim.name} will spawn in 5 seconds...`);
    alt.setTimeout(() => {
        if (!victim || !victim.valid) {
            return;
        }

        victim.spawn(0, 0, 0);
        victim.health = 200;
    }, 5000);
}
```

#### Common Use Case

Let's say we want to ragdoll a player when they die and keep them ragdolled until they respawn there is a simple way we can do that.

**Server Side**

```js
alt.on('playerDeath', handlePlayerDeath);

function handlePlayerDeath(victim, killer, weaponHash) {
    // Validate that the victim exists.
    if (!victim || !victim.valid) {
        return;
    }

    // Respawn the player.
    victim.spawn(victim.pos.x, victim.pos.y, victim.pos.z);

    // If we already marked the victim as dead. Stop code execution.
    if (victim.isDead) {
        return;
    }

    // Mark the victim as dead.
    victim.isDead = true;
    alt.emitClient(victim, 'death:Handle', victim.isDead);

    // Start a timeout in 5 seconds that will respawn them.
    alt.setTimeout(() => {
        // Verify they are still in the server in 5 seconds.
        if (!victim || !victim.valid) {
            return;
        }

        // Unmark them as dead and respawn them.
        victim.isDead = false;
        alt.emitClient(victim, 'death:Handle', victim.isDead);
        victim.spawn(0, 0, 0); // Set to your Hospital Position
        victim.health = 200;
    }, 5000);
}
```

**Client Side**

```js
let interval;
let isDead = false;

// Recieve the value from server side.
alt.on('death:Handle', value => {
    // Update our local value.
    isDead = value;

    // If the value is false. Don't re-create the interval.
    if (!isDead) {
        return;
    }

    // Start an interval that calls a function every 100ms.
    interval = alt.setInterval(handleDeathTicks, 100);
});

function handleDeathTicks() {
    // If they are no longer marked as dead. Clear the interval.
    if (!isDead) {
        alt.clearInterval(interval);
        return;
    }

    // If they are marked as dead. Ragdoll them.
    native.setPedToRagdoll(alt.Player.local.scriptID, 5000, 0, 0, true, true, false);
}
```

### (Server) playerLeftVehicle & playerEnteredVehicle

These events are triggered when a player enters or leaves a vehicle.

Here's an example of deleting the vehicle the player entered after they exit it.

Only if they are the driver.

**Server Side**

```js
alt.on('playerEnteredVehicle', handlePlayerEnteredVehicle);
alt.on('playerLeftVehicle', handlePlayerLeftVehicle);

function handlePlayerEnteredVehicle(player, vehicle, seat) {
    // Store information about the vehicle and seat on the player.
    player.currentSeat = seat;
    player.lastVehicle = vehicle;
}

function handlePlayerLeftVehicle(player, vehicle, seat) {
    // Check if the seat is the driver seat. Check if the vehicle is valid.
    if (player.currentSeat === -1 && player.lastVehicle.valid) {
        player.lastVehicle.destroy();
        player.lastVehicle = null;
        player.currentSeat = -2;
    }
}
```
