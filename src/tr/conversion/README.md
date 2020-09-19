# Başka bir istemciden geçiş yapmak

Öncelikle sana yalnız olmadığını söylemek isterim.

alt:V bir çok imkan sunuyor olsa da istemci (client-side) tarafında bazı hususlar mevcut.
alt:V has a lot to offer but there are some considerations when using this client.

-   Sunucu (server-side) kodlaması için sadece JS, C# veya LUA kullanabilirsiniz.
-   İstemci (client-side) tarafında sadece JS kullanabilirsiniz.
-   Herhangi bir dilin kullanılmasını sağlamak için WASM (WebAssembly) ile bir modül oluşturuluyor.
-   Native isimleri Rockstar'ın Native isimleri ile aynıdır.

alt:V hakkında bilinmesi gereken önemli hususlar bunlardır.

Önemli başka hususlar ise; 

✔️ alt:V kıyafet eklentilerini destekler.

✔️ alt:V çoğu modifikasyona izin verir ve destekler.

✔️ alt:V MLO eklentilerini destekler.

✔️ alt:V Özel haritaları destekler.

alt:V'nin sahip olmadığı şeyler;

❌ İstemci (client-side) tarafında LUA kullanılamaz.

❌ ESX Yok.

❌ ELS Yok. (Dex++ isimli bir paylaşımcı bunun üzerinde çalışıyor)

❌ Sansür yok, yanlış kişiyle şakalaşma.

❌ ENB, .dll ve .asi dosyaları desteklenmez.

❌ ScriptHookV desteği yok.

<br />

---

## FiveM'den alt:V'ye

alt:V ve FiveM arasında bazı farklar mevcut.

### Sunucu (Server-Side) ve İstemci (Client-Side)

Evet, Sunucu (server-side) ve istemci (client-side) taraflarımız var. alt:V'de kisi birbirinden ayrı ve farklı sınırlarda çalıştıkları için injectionlar çok yaygın bir problem değil. İstemci tarafı manipülasyonu bu konunun dışında, ancak sınırlar mevcut olduğu için sunucu tarafında hiç bir etkisi yok. Çok çok iyi bir programcı karşısında hiç bir şey güvenli değildir, bunu da unutmayalım.

[Burada istemci (client-side) ve sunucu (server-side) taraflarını anlatan bir video mevcut.](https://www.youtube.com/watch?v=z-knlYI_QZM)

### Yerel Oyuncu Nasıl Çağırılır?

Yerel oyuncuya (oyunu oynayan oyuncu) erişmek için `local playerPed = PlayerPedId()` kullanmıyoruz.

Bunun için `alt.Player.local.scriptID` kullanıyoruz.

### Yerel Oyuncunun Aracı Nasıl Çağırılır?

Native kullanmaya ihtiyacımız yok çünkü alt:V bize bu imkanı API içerisinde sağlıyor.

```js
alt.Player.local.vehicle;
```
Bize oyuncunun aracını döndürecektir.

### Thread'ler?

Bir thread oluşturmak için `interval` ve `timeout` fonksiyonlarını kullanıyoruz.

Aynı zamanda `alt.everyTick` gibi bir olanağımızda var. Her bir tick bir frame anlamına gelir. 0ms üzerinde çalışan bir `interval`'dir. 

```js
const myInterval = alt.setInterval(doSomething, 5000);
const myTimeout = alt.setTimeout(doSomethingElse, 10000);

function doSomething() {
    alt.log(`Her 5 saniyede bu çalışacak.`);
}

function doSomethingElse() {
    alt.log(`10 saniye sonra bu çalışacak.`);
}

alt.everyTick(() => {
    alt.log(`Konsolun bu mesaj ile kaplanacak.`);
});
```

### Eventler?

Eventler her şekilde veya her boyutta olabilir. Bu adrese bakabilirsiniz : [API Eventler](../api/events)

### Nativeler?

Native fonksiyonlar alt:V içinde mevcut ve sadece istemci (client-side) tarafında kullanılabilir.

Native fonksiyonlar için [alt:V Native Veritabanı](https://natives.altv.mp) adresini ziyaret edebilirsiniz.

### Yükleme ekranları?

Şu an için yükleme ekranları için bir destek yok. Bunu çoklu oyuncu sistemlerinde kullanmanın gereksiz olduğunu düşünüyoruz.

---

## RAGE:MP'den alt:V'ye

alt:V ve RAGE:MP arasında bazı farklar mevcut.

### Local Player?

Yerel oyuncuya (oyunu oynayan oyuncu) erişmek için `local playerPed = PlayerPedId()` kullanmıyoruz.

Bunun için `alt.Player.local.scriptID` kullanıyoruz.

### mp.events.add('render')

Bir thread oluşturmak için `interval` ve `timeout` fonksiyonlarını kullanıyoruz.

Aynı zamanda `alt.everyTick` gibi bir olanağımızda var. Her bir tick bir frame anlamına gelir. 0ms üzerinde çalışan bir `interval`'dir. 

```js
const myInterval = alt.setInterval(doSomething, 5000);
const myTimeout = alt.setTimeout(doSomethingElse, 10000);

function doSomething() {
    alt.log(`Her 5 saniyede bu çalışacak.`);
}

function doSomethingElse() {
    alt.log(`10 saniye sonra bu çalışacak.`);
}

alt.everyTick(() => {
    alt.log(`Konsolun bu mesaj ile kaplanacak.`);
});
```

### mp.events.add & mp.events.call

Eventler her şekilde veya her boyutta olabilir. Bu adrese bakabilirsiniz : [API Eventler](../api/events)

alt:V eventleri üzerinde daha fazla kontrole sahibiz.

### Yazılar, Markerlar vb.

Dökümanda "Örnekler" kısmında bulabilirsiniz.
