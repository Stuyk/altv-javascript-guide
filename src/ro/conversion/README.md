# Veniți de pe alt Client?

Ei bine, nu ești singurul care a făcut asta.

alt:V are o gramada de oferit, dar există câteva considerații atunci când utilizați acest client.

-   Codul serverului poate fi numai în JavaScript, C# sau LUA.
-   Codul clientului poate fi numai în JavaScript.
-   Un modul este creat pentru a permite **orice** limbă cu WASM.
-   Nativele se bazează pe numele reale ale nativelor din Rockstar.

Acestea sunt singurele lucruri majore de luat în considerare despre alt:V.

În caz contrar, iată câteva alte aspecte importante.

✔️ Da! alt:V suportă clothing addons

✔️ Da! alt:V acceptă majoritatea modificărilor.

✔️ Da! alt:V suportă MLOs.

✔️ Da! alt:V suportă mape custom.

Iată câteva lucuri pe care alt:V nu le are.

❌ Fără LUA în client-side

❌ Fără ESX

❌ Fără ELS (Dex++ lucrează la asta)

❌ No censorship if you poke the wrong person

❌ Nu, nu acceptăm fișiere .asi, .dll sau fisiere ENB.

❌ Nu, nu acceptăm ScriptHookV.

<br />

---

## FiveM to alt:V

Iată câteva diferențe cheie între alt:V și FiveM.

### Server Side și Client Side

Da, avem de fapt server-side și client-side. Ceea ce înseamnă că injecțiile nu sunt o problemă foarte frecventă pentru alt:V. Să nu vorbim de manipularea client-ului. Cu toate acestea, nimic nu este sigur de la un programator expert.

[Iată un video care acoperă serverside-ul și clientside-ul](https://www.youtube.com/watch?v=z-knlYI_QZM)

### Local Player?

Nu folosim `local playerPed = PlayerPedId()` pentru a obține player-ul nostru local.

Folosim `alt.Player.local.scriptID`.

### Local Player Vehicle?

Nu folosim native atunci când nu trebuie.

```js
alt.Player.local.vehicle;
```

### Threads?

Folosim intervals și timeouts pentru a genera threads.

Avem de asemenea, acces la `alt.everyTick`, care este practic un interval de 0ms.

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

Evenimentele vin în toate formele și dimensiunile. Aruncați un ochi în secțiunea [API:Events.](../api/events)

### Natives?

Nativele sunt importante și accesibile doar din client-side.

Puteți arunca un ochi în [alt:V Native Database](https://natives.altv.mp) pentru a înțelege mai bine ce este disponibil.

### Loading Screens?

În prezent nu acceptam loading screens de niciun fel. Considerăm că este o caracteristică inutilă pentru multiplayer.

---

## RAGE:MP to alt:V

Iată câteva diferențe cheie între alt:V si RAGE:MP.

### Local Player?

Nu folosim `local playerPed = PlayerPedId()` pentru a obține player-ul nostru local.

Folosim `alt.Player.local.scriptID`.

### mp.events.add('render')

Folosim intervals și timeouts pentru a genera threads.

Avem, de asemenea, acces la `alt.everyTick`, care este practic un interval de 0ms.

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

Evenimentele vin în toate formele și dimensiunile. Aruncați un ochi în secțiunea [API:Events.](../api/events)

Obținem un control mult mai finuț asupra evenimentelor noaste din alt:V.

### Text Labels, Markers, etc.

Consultați secțiunea snippets din acest document.
