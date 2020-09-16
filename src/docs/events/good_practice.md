# Good Practices for Events

There are a lot of ways to use events and the most common problem seen is initializing events inside of events.

## Initializing Events in Events

If you are one of those people who is initializing an event in an event. More often than not you're creating a memory leak.

### Generic Server Events Example

**DO NOT DO THIS** ⚠️

```js
alt.on('playerConnect', handleConnection);

function handleConnection(player) {
    alt.on('doSomething', player => {
        player.health = 200;
    });

    alt.emit('doSomething', player); // <--- This is a problem.
}
```

What you should be doing instead is initializing your events in this way.

**BETTER** ✔️

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

**WHY** ❓

The reason why we don't do it in the first way is because each time a player is connecting to the server you are initializing multiple instances of that same events. Think of it like every time a player enters the server the event is being created an additional time.

If we want a single event to trigger once per user. We initialize it once outside of the event.

### Generic WebView Example

Here's another example utilizing the client-side API.

**DO NOT DO THIS** ⚠️

```js
const url = `https://resource/client/html/index.html`;
let view;
let somethingToSend;

alt.onServer('show:WebView', handleOpen);
alt.onServer('close:WebView', handleClose)

function handleOpen(_somethingToSend) {
    somethingToSend = _somethingToSend;
    
    // Load a New View
	if (!view) {
        view = new alt.WebView(url);
    }
    
    // Add an Event
    view.on('load', handleLoad); // <-- This is a problem.
    view.on('close', handleClose);
}

function handleClose() {
    if (!view) {
        return;
    }
    
    view.destroy();
    view = null;
}

function handleLoad() {
    if (!view) {
        return;
    }
    
    view.emit('sendSomething', somethingToSend);
}

```

As with the similar examples above, there's a reason why the highlighted line is an issue.

Consider that when you create a WebView you are creating a single instance.

After creating this single instance you want to add your events.

However, these events only need to be hooked into **once**.

**BETTER** ✔️

```js
const url = `https://resource/client/html/index.html`;
let view;
let somethingToSend;

alt.onServer('show:WebView', handleOpen);
alt.onServer('close:WebView', handleClose)

function handleOpen(_somethingToSend) {
    somethingToSend = _somethingToSend;
    
	if (!view) {
        // Load New WebView and Add Events
        view = new alt.WebView(url);
        view.on('load', handleLoad);
        view.on('close', handleClose);
    }
}

function handleClose() {
    if (!view) {
        return;
    }
    
    view.destroy();
    view = null;
}

function handleLoad() {
    if (!view) {
        return;
    }
    
    view.emit('sendSomething', somethingToSend);
}

```



## Turning Off Unused Events

If you have a lot of events, you may find some events eventually are no longer needed.

You can turn off events based on where they are in a handful of ways.

| Type of Off Event         | Description                                    |
| ------------------------- | ---------------------------------------------- |
| `alt.off`                 | Turn off any client or server side only event. |
| `alt.offClient`           | Turn off any event coming from the client.     |
| `alt.offServer`           | Turn off any event coming from the server.     |
| `yourWebViewVariable.off` | Turn off any event coming from a WebView.      |

All of these events require a `function` to be turned off. That means that you cannot create a fat arrow function or a callback in place of a function if you want to turn off your events. There are some examples below.

### Using 'alt.off'

This can be done on server-side or client-side.

This is an example on how to use `alt.off`

```js
alt.on('doSomething', handleDoSomething);

function handleDoSomething() {
    // This function can be called from anywhere.
    // You do not have to turn it off inside of the event.
    alt.off('doSomething', handleDoSomething); // <--- This Function
}

```

### Using 'alt.offClient'

This can be done **only** on server-side.

This is an example on how to use `alt.offClient`.

```js
alt.onClient('doSomething', handleDoSomething);

function handleDoSomething() {
    // This function can be called from anywhere.
    // You do not have to turn it off inside of the event.
    alt.offClient('doSomething', handleDoSomething); // <--- This Function
}
```

### Using 'alt.offServer'

This can be done **only** on client-side.

This is an example on how to use `alt.offServer`

```js
alt.onServer('doSomething', handleDoSomething);

function handleDoSomething() {
    // This function can be called from anywhere.
    // You do not have to turn it off inside of the event.
    alt.offServer('doSomething', handleDoSomething); // <--- This Function
}
```

### Using 'yourWebView.off'

This example uses a WebView which is **only** on client-side.

```js
const url = `https://resource/client/html/index.html`;
let view;
let somethingToSend;

alt.onServer('show:WebView', handleOpen);
alt.onServer('close:WebView', handleClose)

function handleOpen(_somethingToSend) {
    somethingToSend = _somethingToSend;
    
	if (!view) {
        // Load New WebView and Add Events
        view = new alt.WebView(url);
        view.on('load', handleLoad);
        view.on('close', handleClose);
    }
}

function handleLoad() {
    if (!view) {
        return;
    }
    
    view.emit('sendSomething', somethingToSend);
    
    // Let's just say we want to turn off an event immediately after creating the WebView.
    // This function is how we do that.
    view.off('load', handleLoad); // <-- This Function
}

```

## Closing Statement

Keep in mind that if you turn off an event, you will need to re-initialize it.

Use this to your advantage and you do not need to turn off every event this is just a feature that should be utilized more.
