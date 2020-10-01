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
for (let i = 0; i < oyuncuListesi.length; i++) {
    const Oyuncu = oyuncuListesi[i];

    // `Oyuncu.valid` ile Oyuncunun doğruluğunu kontrol ediyoruz.
    if (!Oyuncu || !Oyuncu.valid) {
        continue;
    }

    // Diğer kodlarınız...
}

// oyuncuListesi'ni döngüye almanın bir farklı yolu
oyuncuListesi.forEach((player, index) => {
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
for (let i = 0; i < mevcutAraclar.length; i++) {
    const Arac = mevcutAraclar[i];

    // `Arac.valid` ile aracın doğruluğunu kontrol ediyoruz.
    if (!Arac || !Arac.valid) {
        continue;
    }

    // Diğer kodlarınız...
}

// mevcutAraclar'ı döngüye almanın bir farklı yolu
mevcutAraclar.forEach((vehicle, index) => {
    // Tekrar doğruluğu kontrol ediyoruz
    if (!vehicle || !vehicle.valid) {
        return;
    }

    // Diğer kodlarınız...
});
```
