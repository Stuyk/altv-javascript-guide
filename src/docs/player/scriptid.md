# What is a scriptID?

A ScriptID is unique to only the client side.

ScriptID's provide us a way to modify the native behavior of a player.

They are most often used in tandem with natives.

## How to get a scriptID?

Your scriptID for your player can be retrieved in this way.

```js
alt.Player.local.scriptID;
```

However, for individual players it depends on how you recieve their player instance.

**Server Side**

```js
alt.on('playerConnect', player => {
    // This emits to all player
    alt.emitClient(null, 'joined', player);
});
```

**Client Side**

```js
alt.onServer('joined', otherPlayer => {
    // Check if self. Ignore self.
    if (otherPlayer === alt.Player.local) {
        return;
    }

    // Log their scriptID to the 'F8' console.
    alt.log(`Their scriptID is: ${otherPlayer.scriptID}`);
});
```

Really simple to understand.

Just don't overthink it.
