# Clase

Majoritatea claselor în JavaScript necesită `new` înainte de a le construi.

Iată constructorul pentru clasa `alt.Vehicle`.

```ts
new Vehicle(model: string | number, x: number, y: number, z: number, rx: number, ry: number, rz: number): Vehicle
```

După cum puteți vedea, pe baza a ceea ce am citit mai sus, este nevoie de mai mulți parametrii.

Putem folosi aceste cunoștințe pentru a genera un vehicul.

```js
// Crează vehiculul
// Variabila 'vehicle' este o instanță a vehiculului nostru.
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);

// Porniți vehiculul
vehicle.engineOn = true;

// Ajustați culoarea primară a vehiculului în roșu.
vehicle.customPrimaryColor = {
    r: 255,
    g: 0,
    b: 0,
    a: 255
};
```
