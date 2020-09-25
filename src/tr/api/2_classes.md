# Sınıflar (Class)

JavaScript içinde bazı sınıflar, sınıfları oluşturmadan önce `new` belirtecine ihtiyaç duyar. 

Aşağıda `alt.Vehicle` sınıfı için bir örnek mevcut.


```ts
new Vehicle(model: string | number, x: number, y: number, z: number, rx: number, ry: number, rz: number): Vehicle
```

Yukarıda da gördüğümüz gibi birden fazla parametre istiyor.

Bu bilgiyi araç oluştururken kullanabiliriz.

```js
// Bir araç oluştur.
// 'vehicle' değişkeni aracınızı temsil edecek.
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);

// Aracın motorunu açık hale getir.
vehicle.engineOn = true;

// Aracın birincil rengini kırmızı yap.
vehicle.customPrimaryColor = {
    r: 255,
    g: 0,
    b: 0,
    a: 255
};
```
