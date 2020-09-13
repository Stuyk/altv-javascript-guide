# Converting from another Client?

Well, you're not the only user who has done this.

alt:V has a lot to offer but there are some considerations when using this client.

-   Server code can only be in JS, C#, or LUA.
-   Client code can only be in JS.
-   A module is being created to allow **any** language with WASM.
-   Natives are based on Rockstar's Actual Native Names

Those are the only major things to consider about alt:V.

Otherwise here's some other important aspects.

-   Yes alt:V supports clothing addons.
-   Yes alt:V supports most modifications.
-   Yes alt:V supports MLOs.
-   Yes alt:V supports custom maps.

Here are some things alt:V does not have.

-   No LUA on client-side
-   No ESX
-   No ELS (Dex++ is working on this)
-   No censorship if you poke the wrong person.

<br />

---

## FiveM to alt:V

Here are some key differences between alt:V and FiveM.

### Server Side and Client Side

Yes, we actually have a server side and a client side. Which means that injections are not a very common issue for alt:V. Let alone client manipulation. However, nothing is safe from an expert programmer.

[Here is a video covering serverside vs clientside.](https://www.youtube.com/watch?v=z-knlYI_QZM)

### Local Player?

We don't use `local playerPed = PlayerPedId()` to get our local player.

We use `alt.Player.local.scriptID`.

### Local Player Vehicle?

We don't use natives when we don't have to.

```js
alt.Player.local.vehicle;
```

### Threads?

We use intervals and timeouts to generate threads.

We also have access to `alt.everyTick` which is basically an interval at 0ms.

```js
const myInterval = alt.setInterval(doSomething, 5000);
const myTimeout = alt.setTimeout(doSomethingElse, 10000);

function doSomething() {
    alt.log(`This was called at every 5 seconds.`);
}

function doSomethingElse() {
    alt.log(`This was called after 10 seconds.`);
}

alt.everyTick(() => {
    alt.log(`Your console will die with this every tick`);
});
```

### Events?

Events come in all shapes and sizes. Checkout [the API:Events section.](../api/events)

### Natives?

Natives are imported and only accessible from client-side.

You can visit [alt:V Native Database](https://natives.altv.mp) to better understand what is available.

### Loading Screens?

We do not currently support loading screens of any sort. We feel it is an unnecessary feature for multiplayer.

---

## RAGE:MP to alt:V

Here are some key differences between alt:V and RAGE:MP.

### Local Player?

We don't use `local playerPed = PlayerPedId()` to get our local player.

We use `alt.Player.local.scriptID`.

### mp.events.add('render')

We use intervals and timeouts to generate threads.

We also have access to `alt.everyTick` which is basically an interval at 0ms.

```js
const myInterval = alt.setInterval(doSomething, 5000);
const myTimeout = alt.setTimeout(doSomethingElse, 10000);

function doSomething() {
    alt.log(`This was called at every 5 seconds.`);
}

function doSomethingElse() {
    alt.log(`This was called after 10 seconds.`);
}

alt.everyTick(() => {
    alt.log(`Your console will die with this every tick`);
});
```

### mp.events.add & mp.events.call

Events come in all shapes and sizes. Checkout [the API:Events section.](../api/events)

We get a lot finer control over our events for alt:V.

### Text Labels, Markers, etc.

Check out the snippets section of this document.
