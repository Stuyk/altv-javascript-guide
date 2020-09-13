# Event Gotcha's

There are a lot of ways to use events and the most common problem seen is initiliazing events inside of events.

## Initializing Events in Events

If you are one of those people who is initializing an event in an event. You're creating a memory leak.

⚠️ DO NOT DO THIS ⚠️

```js
alt.on('playerConnect', handleConnection);

function handleConnection(player) {
    alt.on('doSomething', player => {
        player.health = 200;
    });

    alt.emit('doSomething', player);
}
```

What you should be doing instead is initializing your events in this way.

✔️ BETTER ✔️

```js
alt.on('playerConnect', handleConnection);
alt.on('doSomething', handleDoSomething);

function handleConnection(player) {
    alt.emit('doSomething', player);
}

function handleDoSomething(player) {
    player.health = 200;
}
```

❓ WHY ❓

The reason why we don't do it in the first way is because each time a player is connecting to the server you are initializing multiple instances of that same events. Think of it like every time a player enters the server the event is being created an additional time.

If we want a single event to trigger once per user. We initialize it once outside of the event.

## Turning Off Unused Events

If you have a lot of events, you may find some events eventually are no longer needed.

You can turn off events based on where they are in a handful of ways.

| Type of Off Event | Description                                    |
| ----------------- | ---------------------------------------------- |
| `alt.off`         | Turn off any client or server side only event. |
| `alt.offClient`   | Turn off any event coming from the client.     |
| `alt.offServer`   | Turn off any event coming from the server.     |

All of these events have one thing in common. That is the fact that all events require a `function` to be turned off.

This is why we seperate the function handler from the event itself.

```js
alt.on('playerConnect', handleConnection);
alt.on('doSomething', handleDoSomething);
alt.onClient('singleUse', handleSingleUseEvent);

function handleConnection(player) {
    alt.emit('doSomething', player);
}

function handleDoSomething(player) {
    player.health = 200;
    alt.off('doSomething', handleDoSomething);
}

function handleSingleUseEvent(player) {
    alt.offClient('singleUse', handleSingleUseEvent);
}
```

Keep in mind that if you turn off an event. You will need to re-initialize it to be used again.

Use this to your advantage and you do not need to turn off every event this is just a feature that should be utilized more.
