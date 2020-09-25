# Mischen eines Arrays

Wenn du irgendwann mal in die Situation kommen solltest, in der du ein Array mischen musst ist dass, die richtige Hilfe.

Hier ist eine relativ einfache Lösung für eine exportierte Mischfunktion.

```js
export function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
```

## Beispiel

```js
const myArray = [1, 2, 3, 4, 5];
const result = shuffle(myArray);
console.log(result);
```
