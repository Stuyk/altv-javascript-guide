# JavaScript Grundlagen

Folgende Webseiten sind für JavaScript Grundlagen gut geeignet.
Dies ist hauptsächlich für Leute gedacht, die sich weigern, in einen Ort wie die Code Academy zu schauen, um zu lernen, wie man programmiert. Wie auch immer hier sind einige Kurse zum lernen.

-   [https://learnxinyminutes.com/docs/javascript/](https://learnxinyminutes.com/docs/javascript/)
-   [https://www.learn-js.org/](https://www.learn-js.org/)
-   [https://bonsaiden.github.io/JavaScript-Garden/](https://bonsaiden.github.io/JavaScript-Garden/)

## Variablen

Hier sind zwie Variablen die du heutzutage in JavaScript kennen und benutzen solltest.

```js
const myVariable = 'example';
let myVariableName = 'example';
```

**const** bedeutet, dass diese Variable eine Konstante ist. Der Wert einer Konstanten kann nicht verändert werden durch Zuweisung oder Neudeklaration.

**let** ermöglicht es Variablen zu deklarieren, deren Gültigkeitsbereich auf den Block, den Befehl oder den Ausdruck beschränkt ist, in dem sie deklariert sind. Der Unterschied zum var Schlüsselwort ist, dass der Gültigkeitsbereich auf Blöcke und nicht auf Funktionen bzw. Global beschränkt ist. Der Wert kann jederzeit geändert werden.

```js
let myVariable;
myVariable = 'test';
myVariable = 25;
myVariable = {
    myProperty: 'Cool Stuff'
};
```

## Basis Mathematik

Die Mathematik funktionert in JS genauso wie in anderen Programmiersprachen.

```js
let result;

// Addition
result = 5 + 5;
result += 1;
console.log(result);

// Subtraktion
result = 10 - 5;
result -= 1;
console.log(result);

// Multiplikation
result = 10 * 5;
result *= 2;
console.log(result);

// Division
result = 10 / 5;
console.log(result);
```

## Basis Funktionen

Funktionen sind spezielle Codeblöcke, die von anderen Codeblöcken aufgerufen werden können. Diese Blöcke können aus Dateien exportiert und in anderen Dateien zum benutzen importiert werden. Über das Importieren von Funktionen sprechen wir in wenigen Augenblicken.

Funktionen können in verschiedensten Art und Weisen geschrieben werden. Ich persönlich bevorzuge die klassischen Funktionen, anstatt die sogenannten Pfeilfunktionen. Diese Funktionsarten haben allerdings unterschiedliches Verhalten.

**Klassisches Funktionsbeispiel**

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
// Gibt 5 als Ergebnis zurück.
```

**Pfeilfunktionen**

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
// Gibt 5 als Ergebnis zurück.
```

## Exportieren von Funktionen

Exportieren von Funktionen ist ein wichtiger und großer Bestandteil des Programmierens mit alt:V. Das exportieren von Funktionen gehört allerdings nicht zu der Standardversion von Javascript, auch commonjs genannt. Wir benutzen allerdings den sogenannten ES6 Standard, welcher es uns erlaubt diese Funktionen zu benutzen. Solltest du mit dem sogenannten Modulexport aus commonjs vertraut sein, wirst du nur eine Kleinigkeit dazu lernen müssen.

Gehe davon aus, dass sich diese Dateien in einem Ordner befinden.

**Datei 1 - file1.js**

```js
export function myFunction(arg1, arg2) {
    console.log(arg1, arg2);
}
```

**Datei 2 - file2.js**

```js
import { myFunction } from './file1.js';

myFunction('hello', 'world');
```

**Datei 2 (Alternative) - file2.js**

```js
import * as myFuncs = from './file1.js'

myFuncs.myFunction('hello', 'world');
```

Wie man sieht ist dies relativ einfach zu verwenden. Das Importieren und Exportieren von Funktionen werden wir überall benutzen, um eine ordentliche Projektstruktur.

## for Anweisung

Die for Anweisung beschreibt eine Schleife mit drei optionalen Ausdrücken und einer oder mehreren Anweisungen. Diese Schleife erlaubt es dir über iterierbare Objekte zu iterieren.

Behalte im Kopf, dass das erste Element in einem Array mit dem Index 0 startet.

```js
const data = ['test0', 'test1', 'test2'];

function saySomething(msg) {
    console.log(msg);
}

// is a number in this for loop
// i++ increments the number by 1
for (let i = 0; i < data.length; i++) {
    saySomething(data[i]);
}
```

Die oben gezeigte Schleife wird 3 mal etwas in die Konsole ausgeben. Es wird zuerst ‘test0’, ‘test1’ und dann ‘test2’ ausgeben. Dies wird durch das hereingeben der Variable `data` in die for Schleife ermöglicht. `i` bedeutet hier auf welche Position, also Index, in dem Array zugegriffen wird.
