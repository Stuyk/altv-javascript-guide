# Classes

Die meisten Klassen in JavaScript brauchen ein `new` um eine Instanz zu erstellen.

Hier ist der Konstruktor für die `alt.Vehicle` Klasse.

```ts
new Vehicle(model: string | number, x: number, y: number, z: number, rx: number, ry: number, rz: number): Vehicle
```

Wie man dort sehen kann nimmt der Konstruktor mehrere Parameter.

Wir können dieses Wissen nutzen um ein Fahrzeug zu erstellen.

```js
// Erstellt das Fahrzeug.
// Die 'vehicle' Variable ist eine Instanz von unserem Fahrzeug.
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);

// Aktiviert den Motor von unserem Fahrzeug.
vehicle.engineOn = true;

// Setzt die Hauptfarbe unseres Fahrzeuges auf Rot.
vehicle.customPrimaryColor = {
    r: 255,
    g: 0,
    b: 0,
    a: 255
};
```
