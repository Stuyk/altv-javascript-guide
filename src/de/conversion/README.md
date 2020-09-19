# Du wechselst von einer anderen Mehrspielermodifikation?

Wirklich, du bist nicht der einzige, der das getan hat.

alt:V hat einiges zu bieten, allerdings sind Entscheidungen zu treffen, wenn man auf diesem Mod aufbauen will.

-   Servercode kann in den Programmiersprachen JS, C# oder LUA geschrieben werden.
-   Clientcode kann momentan nur in JS geschrieben werden.
-   Es wird an einem Modul gearbeitet, welches durch `WASM` **alle** Programmiersprachen erlauben wird.
-   Die nativen Funktionen basieren auf den von Rockstar Games selbst gegebenen Funktionsnamen.

Dies sind die grundlegendsten Sachen über alt:V.

Hier sind weitere wichtige Aspekte.

✔️ Ja alt:V unterstützt Anziehsachenmodifikationen (clothing addons).

✔️ Ja alt:V unterstützt die meisten Modifikationen.

✔️ Ja alt:V unterstützt MLOs.

✔️ Ja alt:V unterstützt selbsterstellte Maps.

Hier sind ein paar Dinge, die alt:V nicht hat.

❌ Kein LUA clientseitig

❌ Kein ESX

❌ Kein ELS (Dex++ funktioniert)

❌ Kein Zensur wenn du mal eine Person eventuell angehst.

❌ Keine Injektionen von .asi, .dll, or ENB Dateien.

❌ Kein ScriptHookV.

<br />

---

## FiveM zu alt:V

Hier sind einige Unterschiede zwischen alt:V und FiveM.

### Serverseitig und Clientseitig

Ja wir haben serverseitigen und clientseitigen Code. Dies bedeutet das Injektionen kein wirkliches Problem auf alt:V darstellen. Nichtsdestotrotz, ist nichts sicher für einen erfahrenen Programmierer.

[Hier ist ein Video, in welchem es darum geht, die Serverseite mit der CLientseite zu vergleichen](https://www.youtube.com/watch?v=z-knlYI_QZM)

### Lokaler Spieler (Local player)?

Wir benutzen `local playerPed = PlayerPedId()` nicht, um den lokalen Spieler auszulesen.

Wir benutzen `alt.Player.local.scriptID`.

### Lokaler Spieler mit Fahrzeug (Vehicle)?

Wir benutzen keine nativen FUnktionen, wenn wir es nicht müssen.

```js
alt.Player.local.vehicle;
```

### Threads?

Wir benutzen Intervalle und Timeouts, um Code zeitbasierend ausführen zu lassen.

Außerdem existiert die `alt.everyTick` Funktion, welche identisch mit einem Intervall von 0ms ist.

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

Events existieren in allen Arten und Formen. Mehr unter [der API:Events Sektion.](../api/events)

### Natives?

Native Funktionen sind import und könnten nur clientseitig ausgeführt werden.

Besuche die [alt:V Native Datenbank](https://natives.altv.mp), um besser verstehen zu können, welche Funktionen verfügbar sind.

### Ladebildschirme?

Momentan unterstüzten wir keine eigenen Ladebildschirme oder ähnliches. Wir denken, dass es kein notwendiges Feature für eine Mehrspielermodifikation ist.

---

## RAGE:MP zu alt:V

Hier sind einige Unterschiede zwischen alt:V und RAGE:MP.

### Lokaler Spieler (Local Player)?

Wir benutzen `const localPlayer = mp.players.local;` nicht, um den lokalen Spieler auszulesen.

Wir benutzen `const localPlayer = alt.Player.local`.

### mp.events.add('render')

Wir benutzen Intervalle und Timeouts, um Code zeitbasierend ausführen zu lassen.

Außerdem existiert die `alt.everyTick` Funktion, welche identisch mit einem Intervall von 0ms ist.

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

Events existieren in allen Arten und Formen. Mehr unter [der API:Events Sektion.](../api/events)

Wir haben viel mehr Kontrolle über unsere Events auf alt:V.

### Text Labels, Marker, etc.

Schau mal bei der Codeschnipselsektion vorbei!
