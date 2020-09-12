# Introduction to API

The API is where you can get a majority of information regarding the functionality and writing code for alt:V.

The only caveat is that there are few examples on using most of the functions.

-   [https://altmp.github.io/altv-typings/](https://altmp.github.io/altv-typings/)

## Navigating the API

When you are reading the API there are two sections. **(Click the above link)**

-   alt-server

    -   Referring to all functionality available on the server-side.

-   alt-client

    -   Referring to all functionality available on the client-side.

    -   Often uses natives / game functionality.

    -   Only affects a player's client.

## Reading the API

When you are looking at the API all parameters and their types are defined for functions and classes.

Here's an example looking at the `alt.on` function.

```ts
on(eventName: "playerConnect", listener: (player: Player) => void): void
```

Reading this may be a little confusing at first if you don't know how to read APIs.

-   The event name is called `on`
-   The first parameter is `playerConnect`
-   The second parameter is a listener or a callback function. It passes a `alt.Player` type.
    -   You can click on Player to see what properties it offers.
    -   Some of these properties are `name`, `ip`, etc.
-   `:void` means that this returns nothing.

Here is that same function in full use.

```js
alt.on('playerConnect', handlePlayerConnect);

function handlePlayerConnect(player) {
    alt.log(`${player.name} connected to the server.`);
}
```

## Classes

Most classes in JavaScript require `new` before constructing them.

Here's the constructor for the `alt.Vehicle` class.

```ts
new Vehicle(model: string | number, x: number, y: number, z: number, rx: number, ry: number, rz: number): Vehicle
```

As you can see based on what we've read above it takes multiple parameters.

It also returns a Vehicle type.

We can use that knowledge to spawn a vehicle.

```js
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);
vehicle.engineOn = true;
vehicle.customPrimaryColor = {
    r: 255,
    g: 0,
    b: 0,
    a: 255
};
```

## Events

Events work in a very specific way and understanding their communication is very important.

Server can talk to any client.
Client may only talk to WebViews and the Server.

A client **CANNOT** talk to another client.

| Function Name  | Description                                                                                |
| -------------- | ------------------------------------------------------------------------------------------ |
| alt.emit       | Emit an event on server or client side. Only recieved on the side it was emitted from.     |
| alt.on         | Recieves an event. Server only recieves server events. Client only recieves client events. |
| alt.onServer   | Recieves an event emitted from the server on client-side. Triggered with `alt.emitClient`. |
| alt.emitClient | Emit an event to a specific client that they recieve with `alt.onServer`.                  |
| alt.onClient   | Recieves an event emitted from the client on server-side. Triggered with `alt.emitServer`. |
| alt.emitClient | Emit an event to the server that is recieved with `alt.onClient`.                          |

### Server to Client

**Server Side**

```js
alt.on('playerConnect', player => {
    alt.emitClient(player, 'sayHello');
});
```

**Client Side**

```js
alt.onServer('sayHello', () => {
    alt.log('Hello from server.');
});
```

### Client to Server

**Note**: Server will automatically inherit a player type from whoever it is emitting from on the server side.

**Client Side**

```js
alt.on('connectionComplete', () => {
    alt.emitServer('sayHello');
});
```

**Server Side**

```js
alt.onClient('sayHello', player => {
    alt.log(`${player.name} is saying hello`);
});
```

### Server Resource to Server Resource

**Server Side**

```js
alt.emit('hello', 'this is a message');

alt.on('hello', msg => {
    alt.log(msg);
});
```

### Client Resource to Client Resource

**Client Side**

```js
alt.emit('hello', 'this is a message');

alt.on('hello', msg => {
    alt.log(msg);
});
```

### Client to WebView and Back

**Note:** Resource in the HTTP address refers to the resource that you are currently writing code for.

**Client Side**

```js
const webview = new alt.WebView('http://resource/client/html/index.html');
webview.on('test2', handleFromWebview);

function handleFromWebview(msg) {
    alt.log(msg);
}

alt.setTimeout(() => {
    webview.emit('test', 'Hello from Client');
}, 500);
```

**Client Side HTML Page**

```html
<html>
    <head>
        <title>Hello World</title>
    </head>
    <body>
        <p>Words</p>
        <script type="text/javascript">
            if ('alt' in window) {
                alt.on('test', msg => {
                    console.log(msg);
                    alt.emit('test2', 'hello from webview');
                });
            }
        </script>
    </body>
</html>
```

## Special Arrays

There are two special arrays that exist on server-side that help you with determine all players or vehicles.

-   alt.Player.all
-   alt.Vehicle.all

They can be used in various ways.

```js
const currentPlayers = [...alt.Player.all]; // Make a copy of the players array.

for (let i = 0; i < currentPlayers.length; i++) {
    const pName = currentPlayers[i].name;
    alt.log(pName);
}

const currentVehicles = [...alt.Vehicle.all];
for (let i = 0; i < currentVehicles.length; i++) {
    const model = currentVehicles[i].model;
    alt.log(model);
}
```
