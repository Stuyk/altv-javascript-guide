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

Functions are special blocks of code that can be called from other blocks of code. They can also be exported and imported into other files and called. We’ll talk about imports just below this section.

You can also write functions in a ton of different ways. I prefer traditional rather than the fat arrow functions.

**Traditionelles Funktionsbeispiel**

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
// Prints 5 as the result.
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
// Prints 5 as the result.
```

## Exportieren von Funktionen

Exporting is a big part of the process when working with alt:V. However, the exports are not common js. We use ES6 syntax for a majority of imports and exports. This is slightly different if you’re used to the whole module exports part of common js.

Assume these files are in the same directory.

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

Pretty simple to handle and we’ll be using these exported and imported functions all over the place when it comes down to creating a solid file structure.

## For Loops

Loops are used for so many different things in Javascript and should be used in every part of your toolkit to help you write less code. A for loop allows us to loop through a block of code multiple times. Which allows us to do different things with the results inside of an array.

Keep in mind that arrays start at zero (0). This isn’t Lua. Meaning the first element in the array is always a zero.

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

The above code will print for the above array 3 times. It will first print ‘test0’, ‘test1’, and then ‘test2’. This is done by passing the data inside of the array based on the element number which is i.
