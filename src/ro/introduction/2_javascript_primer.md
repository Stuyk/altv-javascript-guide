# Principii de bază în JavaScript

Această pagină este pentru a explica câteva principii de bază în JavaScript. Acest lucru este destinat în principal persoanelor care refurză să se uite într-un loc precum Code Academy pentru a învăța cum să scrie cod. Cu toate acestea, iată câteva cursuri.

-   [https://learnxinyminutes.com/docs/javascript/](https://learnxinyminutes.com/docs/javascript/)
-   [https://www.learn-js.org/](https://www.learn-js.org/)
-   [https://bonsaiden.github.io/JavaScript-Garden/](https://bonsaiden.github.io/JavaScript-Garden/)

## Variabile

Există două tipuri de variabile pe care ar trebui să le utilizați în JavaScript în aceste zile.

```js
const myVariable = 'example';
let myVariableName = 'example';
```

**const** înseamnă că variabila este constantă. Acest lucru înseamnă că tipul variabilei nu se poate modifica și proprietățile conținutului pot fi realocate. De asemenea, trebuie să aibă o valoare în momenul declarări.

**let** este un tip de variabilă care poate avea valoarea realocată. Adică poate fi refolosit iar și iar. Valoarea este opțională la momentul declarări.

```js
let myVariable;
myVariable = 'test';
myVariable = 25;
myVariable = {
    myProperty: 'Cool Stuff'
};
```

## Matematica în JavaScript

Matematica în JavaScript este în mare parte similară cu cea din alte limbaje de programare.

```js
let result;

// Adunare
result = 5 + 5;
result += 1;
console.log(result);

// Scădere
result = 10 - 5;
result -= 1;
console.log(result);

// Înmulțire
result = 10 * 5;
result *= 2;
console.log(result);

// Împărțire
result = 10 / 5;
console.log(result);
```

## Funcții de bază

Funcțiile sunt blocuri speciale de cod care pot fi apelate din alte blocuri de cod. De asemenea, poti fi exportate și importate în alte fișiere și apelate. Vom vorbi despre importuri chiar sub această secțiune.

De asemenea, puteți scrie funcții într-o mulțime de moduri diferite. Prefer funcțiile tradiționale mai degrabă decât cele de tip `arrow`.

**Exemplu de funcție tradițională**

```js
function myFancyFunction(myArgument, myOtherArgument) {
    console.log(myArgument);
    console.log(myOtherArgument);
}

myFancyFunction('hello', 'world');

function add(n1, n2) {
    return n1 + n2;
}

const result = add(5, 5);
console.log(result);
// Printează 5 ca rezultat
```

**Exemplu de funcție de tip arrow**

```js
const myFancyFunction = (myArgument, myOtherArgument) => {
    console.log(myArgument);
    console.log(myOtherArgument);
};

myFancyFunction('hello', 'world');

const add = (n1, n2) => {
    return n1 + n2;
};

const result = add(5, 5);
console.log(result);
// Printează 5 ca rezultat
```

## Exportarea Funcțiilor

Exportul este o parte foarte importantă atunci când lucrați cu alt:V. Cu toate acestea, exporturile nu sunt cele de tip `common js`. Folosim sintaxa ES6, pentru majoritatea importurilor și exporturilor. Nu sunt foarte mari diferențe.

Să presupunem că aceste fișiere sunt în același director.

**File 1 - file1.js**

```js
export function myFunction(arg1, arg2) {
    console.log(arg1, arg2);
}
```

**File 2 - file2.js**

```js
import { myFunction } from './file1.js';

myFunction('hello', 'world');
```

**File 2 (Alternative) - file2.js**

```js
import * as myFuncs = from './file1.js'

myFuncs.myFunction('hello', 'world');
```

Destul de simplu de manevrat. Vom folosi aceste funcții exportate și importate peste tot atunci când vine vorba de crearea unei structuri de fișiere solide.

## Bucla de tip For

Buclele sunt folosite pentru atât de multe lucruri diferite în JavaScript și ar trebui folosite în fiecare parte a toolkit-ului pentru a vă ajuta să scrieți mai putin cod. O buclă de tip `for` ne permite să parcurgem un bloc de cod de mai multe ori. Ceea ce ne permite să facem lucruri diferite cu rezultatele din interiorul unei matrice.

Rețineți că matricele încep de la zero (0). Acesta nu este Lua. Adica primul element din matrice este întotdeauna un zero.

```js
const data = ['test0', 'test1', 'test2'];

function saySomething(msg) {
    console.log(msg);
}

// este un numar în această buclă
// i++ crește numărul cu 1, este același lucru ca și (i = i + 1)
for (let i = 0; i < data.length; i++) {
    saySomething(data[i]);
}
```

Codul de mai sus va printa de 3 ori pentru matricea de mai sus. Mai întăi va printa ‘test0’, ‘test1’ și apoi ‘test2’. Acest lucru se face prin trecerea datelor în interiorul matricei pe baza numărului care este i.
