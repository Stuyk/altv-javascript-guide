# Classes


Most classes in JavaScript require `new` before constructing them.

Here's the constructor for the `alt.Vehicle` class.

```ts
new Vehicle(model: string | number, x: number, y: number, z: number, rx: number, ry: number, rz: number): Vehicle
```

As you can see based on what we've read above it takes multiple parameters.

We can use that knowledge to spawn a vehicle.

```js
// Create the vehicle.
// The 'vehicle' variable is an instance of our Vehicle.
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);

// Set the vehicle's engine on. 
vehicle.engineOn = true;

// Adjust the primary color of the vehicle to red.
vehicle.customPrimaryColor = {
    r: 255,
    g: 0,
    b: 0,
    a: 255
};
```
