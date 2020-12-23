# 类别


JavaScript中的大多数类在构造它们之前都需要 `new`.

这是 `alt.Vehicle` 类的构造函数.

```ts
new Vehicle(model: string | number, x: number, y: number, z: number, rx: number, ry: number, rz: number): Vehicle
```

如您所见，根据上面的内容，它需要多个参数.

我们可以利用这些已知参数生成车辆.

```js
// 创建车辆.
// 'vehicle' 变量是我们的车辆的一个实例.
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);

// 启动车辆的引擎. 
vehicle.engineOn = true;

// 将车辆的原色调整为红色.
vehicle.customPrimaryColor = {
    r: 255,
    g: 0,
    b: 0,
    a: 255
};
```
