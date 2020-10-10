# Zamiešané pole (Shuffle Array)

Ak zistíte, že niekedy potrebujete zamiešať pole.

Tu je jednoduchá exportovaná funkcia na zamiešanie vášho poľa.

```js
export function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        // Vyberte zostávajúci prvok ...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // A zameníme ho za aktuálny prvok.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
```

## Príklad použitia

```js
const myArray = [1, 2, 3, 4, 5];
const result = shuffle(myArray);
console.log(result);
```
