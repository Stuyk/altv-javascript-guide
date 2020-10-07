# Server Event Usage & Examples

This is a document that will provide an example for every server event. This is necessary to really ensure you get a firm grasp on how an event is triggered and handled.

## anyResourceError

This is triggered when you load a resource in your `server.cfg` and it **errors**.

-   resourceName is the name of a resource in your `server.cfg`

```js
alt.on('anyResourceError', handleEvent);

function handleEvent(resourceName) {
    console.log(`${resourceName} has failed to load.`);
}
```

## anyResourceStart

This is triggered when you load a resource in your `server.cfg` and it loads correctly.

-   resourceName is the name of a resource in your `server.cfg`

```js
alt.on('anyResourceStart', handleEvent);

function handleEvent(resourceName) {
    console.log(`${resourceName} has loaded.`);
}
```

## anyResourceStop

This is triggered when you forcefully stop a resource programmatically or through the console.

-   resourceName is the name of a resource in your `server.cfg`

```js
alt.on('anyResourceStop', handleEvent);

function handleEvent(resourceName) {
    console.log(`${resourceName} has been stopped. Restarting the resource.`);
    alt.restartResource(resourceName); // <-- This triggers the resource that stopped to restart automatically.
}
```

## consoleCommand

This is triggered when you type some data into your alt:V server console. It automatically separates your words after you press enter.

-   args is an Array of strings

```js
alt.on('consoleCommand', handleEvent);

function handleEvent(args) {
    const cmd = args[0];

    if (cmd !== 'kickall') {
        return;
    }

    // This kicks all players currently online.
    const players = [...alt.Player.all];
    for (let i = 0; i < players.length; i++) {
        if (!players[i] || !players[i].valid) {
            continue;
        }

        players[i].kick();
    }
}
```

Assume we typed the following in the server console.

```
kickall
```

## entityEnterColshape

If you want to check if a player enters a specific area on the server-side. You can use a ColShape.

They come in [various shapes and sizes](https://altmp.github.io/altv-typings/classes/_alt_server_.colshape.html) and we will be using a Cylinder in this example.

-   colshape can be any colshape where a player enters it.
-   entity can be a Vehicle or a Player.

```js
// Create a ColshapeCylinder
// (x, y, z, radius, height) Parameters
const cs = new alt.ColshapeCylinder(0, 0, 0, 3, 200);

// This is a fat arrow function we can access from the colshape's isntance.
cs.doSomething = player => {
    console.log(`You have a player in your grasp.`);
};

// Create the event.
alt.on('entityEnterColshape', handleEvent);

// Handle the event.
function handleEvent(colshape, entity) {
    // Strain out any Entities that are not a player.
    if (typeof entity !== alt.Player) {
        return;
    }

    // Check if the function exists. Then execute the function.
    if (typeof cs.doSomething === 'function') {
        cs.doSomething(entity); // <-- Calling the fat arrow function and passing the player.
    }
}
```

## entityLeaveColshape

If you want to check if a player leaves a specific area on the server-side. You can use a ColShape.

They come in [various shapes and sizes](https://altmp.github.io/altv-typings/classes/_alt_server_.colshape.html) and we will be using a Cylinder in this example.

-   colshape can be any colshape where a player enters it.
-   entity can be a Vehicle or a Player.

```js
// Create a ColshapeCylinder
// (x, y, z, radius, height) Parameters
const cs = new alt.ColshapeCylinder(0, 0, 0, 3, 200);

// This is a fat arrow function we can access from the colshape's isntance.
cs.doSomething = player => {
    console.log(`You no longer have a player in your grasp.`);
};

// Create the event.
alt.on('entityLeaveColshape', handleEvent);

// Handle the event.
function handleEvent(colshape, entity) {
    // Strain out any Entities that are not a player.
    if (typeof entity !== alt.Player) {
        return;
    }

    // Check if the function exists. Then execute the function.
    if (typeof cs.doSomething === 'function') {
        cs.doSomething(entity); // <-- Calling the fat arrow function and passing the player.
    }
}
```

## explosion

Explosion is a really unique event. In most servers they'll often turn off explosions. This is one of those events that you can throw a `return false` at the end to stop all explosions from doing damage on the server.

-   Entity is the source of the damage.
-   explosionType is a number.
-   position is the location of the explosion
-   exposionFx is the hash of the ScreenFx used for the explosion
-   target is who this explosion was targeted for.

```js
alt.on('explosion', handleEvent);

function handleEvent(entity, explosionType, position, explosionFxNumberOrHash, target?) {
    if (explosionType === 0) {
        return false; // Don't Do Damage to Players
    }

    return true; // Do Damage to Players
}
```

## playerChangedVehicleSeat

This event is called when a player is shuffling from one seat to another.

-   player is a player instance of who is performing the shuffling.
-   vehicle is the vehicle that this is currently taking place in
-   oldSeat is the old seat the player was in.
-   newSeat is the new seat the player is in.

```js
alt.on('playerChangedVehicleSeat', handleEvent);

function handleEvent(player, vehicle, oldSeat, newSeat) {
    if (oldSeat === -1 && newSeat !== -1) {
        console.log(`${player.name} has left the driver's seat!`);
    }
}
```

## playerConnect

This is the event that occurs when a player has connected to the server.

The player can have their connection cancelled by running `player.kick()` command.

### Nothing Happens On Player Connect

It's important to understand that **NOTHING HAPPENS** after a player connects. You must use `player.spawn` and `player.model` to see the player.

-   player is the player who joined the server.

```js
alt.on('playerConnect', handleEvent);

function handleEvent(player) {
    console.log(`${player.name} has joined the server.`);
    console.log(`${player.name} has will now see himself out.`);

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

This is event that occurs when a player takes damage. Damage can be negated by adding back missing health.

It is recommended to not use this event in place of playerDeath. They have their own respective uses.

If you want body parts damaged and other information see [weaponDamage](#weaponDamage)

-   player is the player who is being damaged
-   attacker is the player who is attacking the player
-   weaponHash is the hash number for a weapon
-   damage is the damage done to the player

```js
alt.on('playerDamage', handleEvent);

function handleEvent(player, attacker, weaponHash, damage) {
    player.health += damage;

    if (player.health > 200) {
        player.health = 200;
    }

    if (player.health <= 100) {
        // They're dead
        player.spawn(player.pos.x, player.pos.y, player.pos.z);
    }

    return false; // This will negate all damage taken. It will not respawn a player.
}
```

## playerDeath

If you suddenly lose all of your health and die. This is the event that gets triggered.

-   player is the player who died.
-   attacker is the player who caused this player to die. It can sometimes be the player.
-   weaponHash is the hash of the weapon used.

```js
alt.on('playerDamage', handleEvent);

function handleEvent(player, attacker, weaponHash) {
    console.log(`${player.name} has died in the hands of ${attacker.name}.`);
    player.spawn(player.pos.x, player.pos.y, player.pos.z, 5000); // This will respawn the player in place after 5 seconds.
}
```

## playerDisconnect

This is the disconnect event for when a player leaves the server.

-   player is the player who has left the server.
-   reason is why the player has left the server.

```js
alt.on('playerDisconnect', handleEvent);

function handleEvent(player, reason) {
    // You should check if the player is valid. Data from prototyping can be lost if they're invalid.
    if (!player || !player.valid) {
        console.error(`Could not get data for a player. ${player.name}`);
    } else {
        // Clone your data you want to save here asap.
        // Do a database save statement here.
        // After this function ends the player data is lost.
    }

    console.log(`${player.name} has disconnected.`);
}
```

## playerEnteredVehicle

This event is trigger when a player has **sat down** in a vehicle. **Not** **Entering**. **Not Beginning To Enter**.

-   player who entered the vehicle.
-   vehicle the player has sat down inside of.
-   seat is the seat the player is sitting in. See [seat table for more info](#Seat Table)

```js
alt.on('playerEnteredVehicle', handleEvent);

function handleEvent(player, vehicle, seat) {
    console.log(`${player.name} left the ${vehicle.model} by entering seat ${seat}`);
    vehicle.engineOn = true; // <-- Car goes brr.
}
```

## playerLeftVehicle

This event is triggered when the player has completely left a vehicle. **Not Leaving**. **Not Beginning to Leave**.

-   player who left the vehicle.
-   vehicle the player is standing outside of.
-   seat is the seat the player was sitting in. See [seat table for more info](#Seat Table)

```js
alt.on('playerLeftVehicle', handleEvent);

function handleEvent(player, vehicle, seat) {
    console.log(`${player.name} left the ${vehicle.model} by leaving seat ${seat}`);
    vehicle.engineOn = true; // <-- Car goes brr.
}
```

## removeEntity

This event is when a entity is destroyed; such as a player, vehicle, blip, and colshape.

-   object is either `player, vehicle, blip, or colshape`.

```js
alt.on('removeEntity', handleEvent);

function handleEvent(someObject) {
    if (typeof someObject === alt.Player) {
        console.log(`A player got yeeted.`);
    }

    if (typeof someObject === alt.Vehicle) {
        console.log(`A vehicle got yeeted.`);
    }

    if (typeof someObject === alt.Blip) {
        console.log(`A blip got yeeted.`);
    }

    if (typeof someObject === alt.ColShape) {
        console.log(`A player got yeeted.`);
    }
}
```

## resourceStart

This is called when your resource is starting.

-   errored lets us know if the resource failed to load.

```js
alt.on('resourceStart', handleEvent);

function handleEvent(errored) {
    if (errored) {
        throw new Error(`Something went horribly wrong and I have no idea why.`);
    }

    console.log(`Guess everything loaded okay.`);
}
```

## resourceStop

This is called when your resource has stopped. Its final breathe before it gives up on life.

```js
alt.on('resourceStop', handleEvent);

function handleEvent() {
    console.log(`He's dead Jim.`);
}
```

## syncedMetaChange

This is called when a synced meta value changes for any player, vehicle, colshape, or blip.

Keep in mind that **syncedMeta** can be **accessed from server and client side.**

-   entity is a `player, vehicle, colshape, or blip`
-   key is an identifier that data is identified with. Think of it as a key in a map for JavaScript.
-   value is the value associated with the key.
-   oldValue is the value previous to the current value being passed.

```js
alt.on('playerConnect', player => {
    player.setSyncedMeta('connected', true);
});

alt.on('syncedMetaChange', handleEvent);

function handleEvent(entity, key, value, oldValue) {
    // Filter out non-player types.
    if (typeof entity !== alt.Player) {
        return;
    }

    // Compare the key if it's what we are looking for.
    if (key !== 'connected') {
        return;
    }

    // We just made an overly complicated console.log for a player connected. Yay!
    console.log(`${player.name} has connected.`);
}
```

## streamSyncedMetaChange

This is called when a synced meta value changes for any player, vehicle, colshape, or blip.

Keep in mind that **streamSyncedMeta** can be **accessed from server and client side** by players who are within other's streaming range.

-   entity is a `player, vehicle, colshape, or blip`
-   key is an identifier that data is identified with. Think of it as a key in a map for JavaScript.
-   value is the value associated with the key.
-   oldValue is the value previous to the current value being passed.

```js
alt.on('playerConnect', player => {
    player.setStreamedSyncedMeta('Connected', true);
});

alt.on('streamSyncedMetaChange', handleEvent);

function handleEvent(entity, key, value, oldValue) {
    // Filter out non-player types.
    if (typeof entity !== alt.Player) {
        return;
    }

    // Compare the key if it's what we are looking for.
    if (key !== 'connected') {
        return;
    }

    // We just made an overly complicated console.log for a player connected. Yay!
    console.log(`${player.name} has connected.`);
}
```

## globalMetaChange

We will skip this one until it is implemented. Currently **not implemented**.

## globalSyncedMetaChange

We will skip this one until it is implemented. Currently **not implemented**.

## vehicleDestroy

This is called when a vehicle has been damaged to the point where it has been destroyed.

```js
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);
vehicle.currentModel = 'infernus';

alt.on('vehicleDestroy', handleEvent);

function handleEvent(vehicle) {
    const newPosition = { ...vehicle.pos };
    const newModel = vehicle.currentModel;

    if (vehicle.valid && vehicle.destroyed) {
        vehicle.destroy();
    }

    // Respawns the vehicle when its destroyed.
    new alt.Vehicle(oldModel, newPosition.x, newPosition.y, newPosition.z, 0, 0, 0);
}
```

## weaponDamage

This is event that occurs when a player does damage with a weapon. Damage can be negated by adding back missing health.

It is recommended to not use this event in place of playerDeath. They have their own respective uses.

-   player is the player who is being damaged
-   target is the player who is being attacked by the player
-   weaponHash is the hash number for a weapon
-   damage is the damage done to the player
-   offset is a vector3 representing where the player got hit exactly
-   bodyPart is the bone index of where the player got hit

```js
alt.on('weaponDamage', handleEvent);

function handleEvent(player, target, weaponHash, damage, offset, bodyPart) {
    console.log(`${player.name} attacked ${target.name}`);
    console.log(`${target.name} took ${damage} from ${weaponHash} at the bone index of ${bodyPart}`);
    console.log(`Denying Damage`);
    return false;
}
```

## startFire

We will skip this one until it is implemented. Currently **not implemented**.

## startProjectile

We will skip this one until it is implemented. Currently **not implemented**.

## playerWeaponChange

This is when a player switches from and old weapon to a new weapon.

-   player is the player who is swtiching weapons.
-   oldWeapon is the number or hash of the old weapon used.
-   newWeapon is the number or hash of the new weapon being used.

```js
alt.on('playerWeaponChange', handleEvent);

function handleEvent(player, oldWeapon, newWeapon) {
    // Prevent Weapon Swapping
    player.currentWeapon = oldWeapon;
}
```
