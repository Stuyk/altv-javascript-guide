# API : Giriş

API, alt:V üzerinde yazacağınız kodların çoğunluğunu oluşturur ve işlevsel kod yazmanıza yardımcı olur. 

Tek bilmeniz gereken fonksiyonuların çoğunun kullanımıyla ilgili birkaç örnek olmasıdır.

-   [https://altmp.github.io/altv-typings/](https://altmp.github.io/altv-typings/)

## API İcine Yolculuk

API'ı okumaya başladığınızda iki farklı alan olduğunu göreceksiniz. **Yukarıdaki linke tıklayın.**

-   alt-server

    -   API üzerinde sunucu (server-side) tarafında bulunan bütün fonksiyonları gösterir.

-   alt-client

    -   API üzerinde istemci (client-side) tarafında bulunan bütün fonksiyonları gösterir.

    -   Genellikle Native fonksiyonların yaptığı işlemleri yapar.

    -   Sadece oyuncunun oyununu etkiler.

## API'ı Okumak & Anlamak

API'ı okumaya başladığınızda fonksiyonlar ve sınıflar için bütün parametrelerin ve parametre türlerini görebileceksiniz.

Örnek olarak `alt.on` fonksiyonunu ele alalım.

```ts
on(eventName: "playerConnect", listener: (player: Player) => void): void
```

Eğer API'lar nasıl okunur, nasıl kullanılır bilmiyorsanız yukarıdaki kodu okuduğunuzda biraz kafa karıştırıcı olabilir.

-   Event dinleyebilmek için ana fonksiyonumuz `on`'dur.
-   İlk parametremiz `playerConnect`. Dinlediğimiz eventin ismidir.
-   İkinci parametremiz ise event içerisinde çalışacak fonksiyonumuzu gösteriyor. Şu an bu event bize `alt.Player` türünde bir `player` değişkeni döndürüyor.
    -   Player üzerine basarsanız size taşıdığı özellikleri ve sunduğu şeyleri görebilirsiniz.
    -   Bazı özellikler şunlardır; `name`, `ip` vb.
-   `:void`' ise geriye hiç bir şey döndürmeyen bir fonksiyon olduğunu bizlere söylüyor.

Aşağıda kullanım örneğini görebilirsiniz;

**NOT:** `playerConnect` Sunucu (server-side) için alt:V tarafından verilmiş bir eventtir. Bir oyuncunun sunucuya bağlanma evresini kontrol eder, oyuncu bağlandığında otomatik olarak oyuncuyu fonksiyon içerisine verir. 

```js
alt.on('playerConnect', handlePlayerConnect);

function handlePlayerConnect(player) {
    alt.log(`${player.name} sunucuya bağlandı.`);
}
```

Bir oyuncu sunucuya bağlandığında otomatik olarak `playerConnect` eventi tetiklenecek ve yazdığımız bu kod sayesinde bir oyuncu sunucuya bağlanma isteği gönderiğinde sunucu konsoluna `xxx sunucuya bağlandı` mesajını göreceğiz.


## API Kullanımı

Değişkenler, fonksiyonlar, sınıflar (class) vb. şeylerin bir çok farklı hali vardır.

Bunların ne anlama geldiğinden ve neye benzediğinden biraz bahsedelim.

### Fonksiyonlar

Fonksiyonlar her zaman fonksiyon gibi çalışır ve API içinde bunlar için bir bölüm vardır.

![](./img/functions.png)

Yukarıdaki fonksiyonların nasıl kullanıldığına ilişkin bir örnek aşağıda mevcut.

```js
alt.setTimeout(() => {
    alt.log(`Bu kod bloğu 5 saniye sonra çalışacak.`);
}, 5000);
```

### Sınıflar (Class)

Sınıflar normal `JavaScript` sınıfları ile aynı çalışma prensibine sahip. `alt-server` ve `alt-client` paketlerini kodlarınıza nasıl içe aktardığınız (import) ile alakalı değişiklik gösterebilir.

Ön ekimizin `alt` olduğunu varsayalım.

![](./img/classes.png)

Her sınıfı oluşturamayacağınızı ve her sınıfa erişemeyeceğinizi unutmayın.

Aşağıda, yukarıda ki sınıflardan bir kaçının kullanım örneğini görebilirsiniz.

```js
const pos = new alt.Vector3(0, 0, 0);
const vehicle = new alt.Vehicle('infernus', pos.x, pos.y, pos.z, 0, 0, 0);
const shape = new alt.ColshapeCylinder(pos.x, pos.y, pos.z, 5, 10);
```

### Özellikler (Property)

Özellikler sınıfların içerisinde bulunur. Parantezler **olmadan** erişilebilirler..

Bu özellikler sadece değiştirmek veya bir işlem yapmak için değiller. Aynı zamanda bunları özellikleri okumak için de kullanabilirsiniz.

Bazı özellikler sadece salt okunabilir yapıya sahiptir, değiştirilemez.

Araç sınıfı için aşağıda bir özellik (property) örneği mevcut.

```js
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);

if (vehicle.engineOn === false) {
    vehicle.engineOn = true;
}
```

Araç sınıfı ile oluşturduğumuz aracın motor durumunu kontrol etmek için (okuma işlemi) ve bunu değiştirmek için `.engineOn` özelliğini kullandık.

### Metodlar

Metodlar sınıfların içerisinde bulunur. Parantezlerle **birlikte** kullanılır.

Bazı metodlar sadece okuma işlemleri için kullanılabilir, değiştirilemez.

Aşağıda metodların nasıl kullanıldığı ile ilgili bir örnek mevcut.

```js
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);
const result = vehicle.getDoorState(0);
vehicle.setArmoredWindowHealth(0, 100);
```

