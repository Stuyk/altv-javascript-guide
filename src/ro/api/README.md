# Introducere în API

API-ul este locul în care puteți obține majoritatea informațiilor cu privire la funcționalitatea și codul scris pentru alt:V.

Singurul avertisment este că există puține exemple privind utilizarea majorității funcțiilor.

-   [https://altmp.github.io/altv-typings/](https://altmp.github.io/altv-typings/)

## Navigarea prin API

Când citiți API-ul, există două secțiuni. **(Click pe linkul de mai sus)**

-   alt-server

    -   Referindu-ne la toate funcționalitățile disponibile în server-side.

-   alt-client

    -   Referindu-ne la toate funcționalitățile disponibile în client-side.

    -   Adesea folosește funționalități native/din joc.

    -   Afectează doar clientul jucătorului.

## Citirea API-ului

Când vă uitați la API, toți parametrii și tipurile lor sunt definite pentru funcții și clase.

Iată un exemplu privind funcția `alt.on`.

```ts
on(eventName: "playerConnect", listener: (player: Player) => void): void
```

Citirea acestui lucru poate fi puțin confuză la început dacă nu știți cum să citiți API-urile.

-   Numele evenimenului este apelat cu `on`
-   Primul parametru este `playerConnect`
-   Al doilea parametru este un ascultător sau o funcție de tip callback. Și este atribuit tipului `alt.Player`.
    -   Puteți face click pe Player pentru a vedea ce proprietăți oferă.
    -   Unele dintre aceste propriețăți sunt `name`, `ip`, etc.
-   `:void` înseamnă că acest lucru nu returnează nimic.

Iată aceeași funcție în acțiune.

```js
alt.on('playerConnect', handlePlayerConnect);

function handlePlayerConnect(player) {
    alt.log(`${player.name} connected to the server.`);
}
```

## Folosirea API-ului

În general aveți câteva tipuri diferite de variabile, funcții, clase, etc.

Să vorbim despre ceea ce înseamnă fiecare dintre aceastea și cum arată în cod.

### Funcții

Funcțiile funcționează întotdeauna ca funcții (duh), iar API-ul are de obicei o secțiune pentru ele.

![](../../img/functions.png)

Iată un exemplu de cum ar putea arăta utilizarea uneia dintre funcțiile de mai sus.

```js
alt.setTimeout(() => {
    alt.log(`Hello. This triggered after 5 seconds.`);
}, 5000);
```

### Clasele

Clasele funcționează ca cele normale din JavaScript. Depinde doar de modul în care importați `alt-server` sau `alt-client`.

Să presupunem că aveți `alt` ca prefix pentru toate.

![](../../img/classes.png)

Rețineți că nu toate clasele sunt accesibile sau pot fi create.

Iată un exemplu de cum ar putea arăta utilizarea uneia dintre clasele de mai sus.

```js
const pos = new alt.Vector3(0, 0, 0);
const vehicle = new alt.Vehicle('infernus', pos.x, pos.y, pos.z, 0, 0, 0);
const shape = new alt.ColshapeCylinder(pos.x, pos.y, pos.z, 5, 10);
```

### Proprietăți

O proprietate va exista de obicei în interiorul unei calse. Sunt accesibile **fără** paranteze.

De asemenea, sunt lizibile, deci nu trebuie întotdeauna să le setați.

Iată un exemplu de utilizare a unei mașini.

```js
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);

if (vehicle.engineOn === false) {
    vehicle.engineOn = true;
}
```

### Metode

O metodă va exista de obicei în interiorul unei clase. Sunt accesibile cu paranteze.

```js
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);
const result = vehicle.getDoorState(0);
vehicle.setArmoredWindowHealth(0, 100);
```
