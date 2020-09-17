# Základy jazyka JavaScript

Táto stránka vysvetľuje niektoré základné princípy JavaScriptu. Je to hlavne pre ľudí, ktorí sa odmietajú pozerať na stránku, ako je Code Academy, aby sa naučili programovať. Tu je však niekoľko kurzov, zatiaľ však iba v angličtine. Pre lepšie pochopenie odporúčam si pozrieť túto časť príručky v angličtine [tu](../../en/introduction/2_javascript_primer.html).

-   [https://learnxinyminutes.com/docs/javascript/](https://learnxinyminutes.com/docs/javascript/)
-   [https://www.learn-js.org/](https://www.learn-js.org/)
-   [https://bonsaiden.github.io/JavaScript-Garden/](https://bonsaiden.github.io/JavaScript-Garden/)

## Premenné (Variables)

V dnešnej dobe by ste mali používať dva typy premenných v JavaScripte.

```js
const myVariable = 'example';
let myVariableName = 'example';
```

**const** znamená, že premenná je konštantná. To znamená, že typ premennej sa nemôže meniť a vlastnosti obsahu možno znova priradiť. Taktiež musí mať pridelenú hodnotu.

**let** je typ premennej, ktorej hodnota sa môže opätovné priradiť. To znamená, že sa dá opakovane používať. Hodnota je voliteľná.


```js
let myVariable;
myVariable = 'test';
myVariable = 25;
myVariable = {
    myProperty: 'Cool Stuff'
};
```

## Základná matematika

Matematika je väčšinou podobná ako v iných programovacích jazykoch.

```js
let result;

// Sčítanie
result = 5 + 5;
result += 1;
console.log(result);

// Odčítanie
result = 10 - 5;
result -= 1;
console.log(result);

// Násobenie
result = 10 * 5;
result *= 2;
console.log(result);

// Delenie
result = 10 / 5;
console.log(result);
```

## Základné funkcie (functions)

Funkcie sú špeciálne bloky kódu, ktoré je možné volať z iných blokov kódu. Môžu byť tiež exportované a importované do iných súborov a byť volané. Hneď pod touto časťou si povieme niečo o *import-och*.

Môžete tiež písať funkcie rôznymi spôsobmi.

**Príklad tradičnej funkcie**

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
// Vo výsledku sa vytlačí 5.
```

**Príklad šípkovej funkcie (Arrow Function)**

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
// Vo výsledku sa vytlačí 5.
```

## Export funkcií

Export je veľkou súčasťou procesu pri práci s alt:V. Export však nie je bežný v bežnom JS. Syntax ES6 používame pre väčšinu importov a exportov. To sa mierne líši, ak ste zvyknutí, že exportujete celý modul v bežnom JS.

Predpokladajme, že tieto súbory sú v rovnakom adresári.

**Súbor 1 - file1.js**

```js
export function myFunction(arg1, arg2) {
    console.log(arg1, arg2);
}
```

**Súbor 2 - file2.js**

```js
import { myFunction } from './file1.js';

myFunction('hello', 'world');
```

**Súbor 2 (alternatívny) - file2.js**

```js
import * as myFuncs = from './file1.js'

myFuncs.myFunction('hello', 'world');
```

Manipulácia s nimi je celkom jednoduchá a tieto exportované a importované funkcie budeme používať všade, keď dôjde na vytvorenie pevnej štruktúry súborov.

## For Loops

Smyčky (Loop-i) sa v Javascripte používajú na toľko rôznych vecí a mali by sa použiť v každej časti vašej súpravy nástrojov, aby vám pomohli napísať menej kódu. Smyčka for (for loop) nám umožňuje opakovane prechádzať blokom kódu, čo nám umožňuje robiť s výsledkami v poli rôzne veci.

Majte na pamäti, že polia začínajú na nule (0). Toto nie je Lua. To znamená, že prvý prvok v poli je vždy nula.

```js
const data = ['test0', 'test1', 'test2'];

function saySomething(msg) {
    console.log(msg);
}

// i++ zvýši číslo o 1
for (let i = 0; i < data.length; i++) {
    saySomething(data[i]);
}
```

Vyššie uvedený kód sa pre vyššie uvedené pole vytlačí trikrát. Najprv vytlačí súbory `test0`, `test1` a potom `test2`. To sa deje odovzdaním údajov do poľa na základe čísla prvku, ktorým je `i`.
