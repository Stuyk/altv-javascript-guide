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

## Using the API

You generally have a few different types of variables, functions, classes, etc.

Let's talk about what each of those means and what they look like in code.

### Functions

Functions always work like functions (duh) and the API usually has a section for them.

![](./img/functions.png)

Here is an example of what using one of the functions above may look like.

```js
alt.setTimeout(() => {
    alt.log(`Hello. This triggered after 5 seconds.`);
}, 5000);
```

### Classes

Classes work like normal JavaScript classes. It's just dependent on how you import your `alt-server` or `alt-client`.

Let's assume you have `alt` as the prefix for everything.

![](./img/classes.png)

Keep in mind that not all classes are accessible or can be created.

Here is an example of what using one of the classes above may look like.

```js
const pos = new alt.Vector3(0, 0, 0);
const vehicle = new alt.Vehicle('infernus', pos.x, pos.y, pos.z, 0, 0, 0);
const shape = new alt.ColshapeCylinder(pos.x, pos.y, pos.z, 5, 10);
```

### Properties

A property will usually exist inside of a class. They're accessible **without** parenthesis.

Here's an example using a car.

```js
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);
vehicle.engineOn = true;
```

### Methods

A method will usually exist inside of a class. They're accessible with parenthesis.

```js
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);
const result = vehicle.getDoorState(0);
vehicle.setArmoredWindowHealth(0, 100);
```
