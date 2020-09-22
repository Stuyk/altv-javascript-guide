# Tüm Oyuncu ve Araçlara Erişmek

Oyuncu ve araçları karşılaştırmak, erişmek için iki tane farklı özel dizimiz mevcut.

## alt.Player.all

Bu kod, sunucunuza bağlı olan oyuncuların listesini içeren bir dizi döndürür (Array)

Bu dizileri kullanırken aklınızda tutmanız gereken bazı şeyler var.

1. Mutlaka dizinizi klonlayın. Bu sizi bazı yaşayabileceğiniz hatalardan kurtaracak.

```js
const oyuncuListesi = [...alt.Player.all];
```

2. Oyuncuları döngü içerisinde işleme alırken her zaman oyuncuları doğrulayın.

```js
const oyuncuListesi = [...alt.Player.all];

// oyuncuListesi'ni döngüye al
for (let i = 0; i < currentPlayers.length; i++) {
    const Oyuncu = currentPlayers[i];

    // `Oyuncu.valid` ile Oyuncunun doğruluğunu kontrol ediyoruz.
    if (!Oyuncu || !Oyuncu.valid) {
        continue;
    }

    // Diğer kodlarınız...
}

// oyuncuListesi'ni döngüye almanın bir farklı yolu
currentPlayers.forEach((player, index) => {
    // Tekrar doğruluğu kontrol ediyoruz
    if (!player || !player.valid) {
        return;
    }

    // Diğer kodlarınız...
});
```

## alt.Vehicle.all

Üst tarafta yazılanları okuduğunuza ve anladığınıza emin olun. Aynı işlemleri ve doğruluk kontrollerini burada da gerçekleştiriyoruz.

```js
const mevcutAraclar = [...alt.Vehicle.all];

// mevcutAraclar'ı döngüye alıyoruz.
for (let i = 0; i < currentVehicles.length; i++) {
    const Arac = currentVehicles[i];

    // `Arac.valid` ile aracın doğruluğunu kontrol ediyoruz.
    if (!Arac || !Arac.valid) {
        continue;
    }

    // Diğer kodlarınız...
}

// mevcutAraclar'ı döngüye almanın bir farklı yolu
currentVehicles.forEach((vehicle, index) => {
    // Tekrar doğruluğu kontrol ediyoruz
    if (!vehicle || !vehicle.valid) {
        return;
    }

    // Diğer kodlarınız...
});
```
