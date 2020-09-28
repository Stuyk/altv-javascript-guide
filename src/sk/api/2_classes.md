# Triedy/Klasy (Classes)


Väčšina tried/klás (classes) v JavaScript-e vyžaduje pred ich zostavením slovo `new`.

Tu je konštruktor (constructor) pre triedu/klasu (class) `alt.Vehicle`.

```ts
new Vehicle(model: string | number, x: number, y: number, z: number, rx: number, ry: number, rz: number): Vehicle
```

Ako vidíte, na základe toho, čo sme si prečítali vyššie, je potrebných niekoľko parametrov.

Tieto znalosti môžeme použiť na *spawnutie* vozidla.

```js
// Vytvorte vozidlo.
// Premenná (variable) „vehicle“ je inštanciou nášho vozidla.
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);

// Zapnite motor vozidla.
vehicle.engineOn = true;

// Primárnu farbu vozidla upravte na červenú.
vehicle.customPrimaryColor = {
    r: 255,
    g: 0,
    b: 0,
    a: 255
};
```
