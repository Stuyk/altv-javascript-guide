# Client Event Usage & Examples

This is a document that will provide an example for every server event. This is necessary to really ensure you get a firm grasp on how an event is triggered and handled.

## An Important Tip

If you're trying to use `console.log` on client-side. It will **not** work.

You must use `alt.log` instead.

```js
alt.log(`Hello on client side.`);
alt.log(`Your position is: ${JSON.stringify(alt.Player.local.pos)}`);
```

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

## connectionComplete

This is called when you have entered the server and all resources for you have loaded.

```js
alt.on('connectionComplete', handleEvent);

function handleEvent() {
    alt.log(`Welcome!`);
}
```

## consoleCommand

This is triggered when you type some data into your alt:V Client server console. It automatically separates your words after you press enter.

-   args is an Array of strings

```js
alt.on('consoleCommand', handleEvent);

function handleEvent(args) {
    const cmd = args[0];

    if (cmd !== 'loghello') {
        return;
    }

    alt.log(`Hello from client.`);
}
```

Assume we typed the following in the server console.

```
loghello
```

## disconnect

This is mostly useful when you are reconnecting to your local development environment. This is used to clean up any game changes before you reconnect once again.

```js
alt.on('disconnect', handleEvent);

function handleEvent() {
    alt.log(`You have disconnected.`)
	// No more messages or functions work after this event.
}
```

## gameEntityCreate

This is called when a player, vehicle, or anything else comes into streaming range of a client.

Meaning if a vehicle is entering from outside of your streaming range it will begin to be synchronized for the player inside of this event.

* entity is the entity created.

### Server Side

```js
alt.on('playerConnect', (player) => {
   player.model = 'mp_m_freemode_01';
   player.spawn(0, 0, 0);
    
   // Spawn a Vehicle
   const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);
   alt.emitClient(player, 'setIntoVehicle', vehicle);
});
```

### Client Side

```js
// Begin Setup for Server Side
alt.onServer('setIntoVehicle', handleSetIntoVehicle);

function handleSetIntoVehicle(vehicle) {
    alt.Player.local.needsVehicle = vehicle;
}


// Begin Event Implementation
alt.on('gameEntityCreate', handleEvent);

function handleEvent(entity) {
    // Check if this is a vehicle entity.
	if (typeof entity !== alt.Vehicle) {
        return;
    }

    // Check if this is the vehicle we're looking for.
	if (alt.Player.local.needsVehicle !== entity) {
        return;
    }

    // Shut off looking for new vehicles.
	alt.Player.local.needsVehicle = false;

    // Set them into the drivers seat.
    // ScriptID is used to get the handle of the vehicle and player for natives.
    native.setPedIntoVehicle(alt.Player.local.scriptID, vehicle.scriptID, -1);
}
```

## gameEntityDestroy

This is called when a vehicle, player, or anything else leaves the streaming range of a client.

This is great when you need to destroy objects attached to players leaving an area.

Let's assume the entity below has an object on them defined by its scriptID.

```js

alt.on('gameEntityDestroy', handleEvent);

function handleEvent(entity) {
    // Check if this is a vehicle entity.
	if (typeof entity !== alt.Player) {
        return;
    }

    // Check if this is the vehicle we're looking for.
	if (!alt.Player.local.attachedObject) {
        return;
    }

    // Delete said object.
	native.deleteEntity(alt.Player.local.attachedObject);
    alt.Player.local.attachedObject = false;
}
```

## keydown

This is called when a player presses their keyboard key down.

You can get [key codes by visiting this website](http://keycode.info/?ref=stuyk).

* keycode is the JavaScript key code identifier

```js
alt.on('keydown', handleEvent);

function handleEvent(keycode) {
    if (keycode !== 70) {
        alt.log(`Pressed 'F' to pay respects.`);
    }
}
```

## keyup

This is called when a player lets go of a key.

You can get [key codes by visiting this website](http://keycode.info/?ref=stuyk).

* keycode is the JavaScript key code identifier

```js
alt.on('keyup', handleEvent);

function handleEvent(keycode) {
    if (keycode !== 69) {
        alt.log(`Pressed 'E' to say nice.`);
    }
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

**Sever Side**

```js
alt.on('playerConnect', player => {
    player.setSyncedMeta('Connected', true);
});
```

**Client Side**

```js
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
    alt.log(`You have joined the server.`);
}
```

## streamSyncedMetaChange

This is called when a synced meta value changes for any player, vehicle, colshape, or blip.

Keep in mind that **streamSyncedMeta** can be **accessed from server and client side** by players who are within other's streaming range.

-   entity is a `player, vehicle, colshape, or blip`
-   key is an identifier that data is identified with. Think of it as a key in a map for JavaScript.
-   value is the value associated with the key.
-   oldValue is the value previous to the current value being passed.

**Server Side**

```js
alt.on('playerConnect', player => {
    player.setStreamedSyncedMeta('Connected', true);
});
```

**Client Side**

```js
alt.on('setStreamedSyncedMetaChange', handleEvent);

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
    console.log(`You have joined the server.`);
}
```

## globalMetaChange

We will skip this one until it is implemented. Currently **not implemented**.

## globalSyncedMetaChange

We will skip this one until it is implemented. Currently **not implemented**.
