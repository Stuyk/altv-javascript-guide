# Event Usage Guide

Eventlerin başlıklarını ve ne işe yaradıklarını gördünüz. Şimdiyse API'ı nasıl okuyacağınızı gösterelim.

_Bu bağlantılar güncel değilse. Stuyk'a haber verin._

-   [Sunucu API](https://altmp.github.io/altv-typings/modules/_alt_server_.html#on)
-   [Istemci API](https://altmp.github.io/altv-typings/modules/_alt_client_.html#on)

Aşağıdaki eventler için bazı yaygın kullanım durumları bulunuyor. Sadece bunları nasıl kullanmanız gerektiği ile ilgili birkaç örnek.

[Sözdizimi ve parametreleri incelemek için tıklayın.](./server_events)

## playerConnect eventi için Sunucu taraflı örnekler.

Bu event sunucunuza katılan herhangi bir kullanıcının giriş noktasıdır. Bu eventi tüm resourcelerinizde bir kez kullanmalısınız. Oyuncuların gönderdikleri bağlantıyı dinler. Yani bir oyuncuyu tamamen bağlanmadan önce oyundan atabilirsiniz.

**Sunucu Tarafı(Server Side)**

```js
// Bir oyuncu sunucuya bağlandığında handlPlayerConnect fonksiyonuna yönlendiriyoruz.
alt.on('playerConnect', handlePlayerConnect);

// Player alt.Player classını kullanır.
function handlePlayerConnect(player) {
    alt.log(`${player.name} sunucuya bağlandı.`);
}
```

Bir oyuncu sunucuya bağlandıktan sonra ** HIÇBIR ŞEY OLMADIĞINI ** anlamak önemlidir. Kullanıcıya otomatik olarak hiçbir şey verilmez(spawnlanmaz vs..).

Hiçbir oyuncu kendiliğinden spawnlanmaz. Kullanıcının karakterine bir model ayarlanmamıştır.

Şimdiyse oyuncu modelini ayarlamak ve oyuncuyu spawnlamak için bir örnek göstereceğiz.

**Sunucu Tarafı(Server Side)**

```js
/// <reference types="@altv/types-server" />
import alt from 'alt-server';

const spawn = {
    x: -1291.7142333984375,
    y: 83.43296813964844,
    z: 54.8916015625
};

alt.on('playerConnect', handlePlayerConnect);

function handlePlayerConnect(player) {
    player.spawn(spawn.x, spawn.y, spawn.z, 0);
    player.model = `mp_m_freemode_01`;
}
```

## connectionComplete eventi için İstemci taraflı örnekler.

`playerConnect` eventine alternatif, istemci tarafındaki `connectionComplete` eventidir. Bu, bir oyuncunun hem sunucu tarafında hem istemci tarafında sunucuya tam olarak bağlandığı zaman tetiklenir.

Bu event istemci tarafındadır. Oyuncunun bilgisayarında gerçekleşen bir kod dizilimi olduğu için oyuncunun kim olduğunuzu parametrelerde belirtmemize gerek yok.

Bu da demek oluyor ki bu event sadece oyuna bağlı oyuncular için değil tüm oyuncular için çalışır fakat sadece bağlı oyuncularda çalışır.

**İstemci Tarafı(Client-Side)**

```js
alt.on('connectionComplete', handleConnectionComplete);

function handleConnectionComplete() {
    const myClientPosition = { ...alt.Player.local.pos };

    alt.log(`Pozisyonum: ${JSON.stringify(myClientPosition)}`);
    alt.emitServer('helloFromClient', 'bu bir dize mesajı');
}
```

**Sunucu Tarafı(Server-Side)**

```js
alt.onClient('helloFromClient', handleHelloFromClient);

function handleHelloFromClient(player, msg) {
    console.log(`${player.name} bir eventi tetikledi.`);
    console.log(msg);
}
```

## playerDeath eventi sunucu tarafı ve istemci tarafı örneği.

Bir oyuncunun ölmesi oldukça yaygın bir eventtir. Eğer bir oyuncu ölürse o oyuncunun tüm işlevlerinin geri yüklenmesi için player.spawn fonksiyonunu çalıştırmanız gerekecek.

Ölmelerinden sonra uzun süre yerde klamlarını istiyorsanız ragdoll çekmelisiniz. Ragdoll çekmeden önce oyuncuya tekrar işlevsellik katmak için her türlü player.spawn fonksiyonunu çalıştırman gerekiyor.

### Sunucu Tarafı(Server-Side)

```js
alt.on('playerDeath', handlePlayerDeath);

function handlePlayerDeath(victim, killer, weaponHash) {
    if (!victim || !victim.valid) {
        return;
    }

    if (killer && killer.valid) {
        alt.log(`${victim.name} isimli oyuncu ${killer.name} tarafından öldürüldü.`);
    }

    alt.log(`${victim.name} 5 saniye içerisinde tekrar canlandırılacak...`);
    alt.setTimeout(() => {
        if (!victim || !victim.valid) {
            return;
        }

        victim.spawn(0, 0, 0);
        victim.health = 200;
    }, 60000 * 3); // 3 dakika sonra spawnlamak için bir zamanlayıcı koyuyoruz.
}
```

### Ortak Kullanım Durumu

Diyelim ki oyuncular öldüğünde ragdoll yaratmak istiyoruz ve yeniden doğma süreleri gelene kadar ragdoll olarak tutmak istiyoruz.

#### Sunucu Tarafı(Server-Side)

```js
alt.on('playerDeath', handlePlayerDeath);

function handlePlayerDeath(victim, killer, weaponHash) {
    // Ölen kişinin bulunup bulunmadığı doğrulamak için kullanıyoruz.
    if (!victim || !victim.valid) {
        return;
    }

    // Oyuncuyu tekrar spawnlıyoruz.
    victim.spawn(victim.pos.x, victim.pos.y, victim.pos.z);

    // Eğer oyuncuyu zaten ölü olarak işaretlediysek kodun devam etmesini engelliyoruz.
    if (victim.isDead) {
        return;
    }

    // Oyuncuyu ölü olarak işaretliyoruz.
    victim.isDead = true;
    alt.emitClient(victim, 'death:Handle', victim.isDead);

    // 5 saniyelik bir zaman aşımıyla oyuncuyu spawnlıyoruz.
    alt.setTimeout(() => {
        // 5 saniye sonra ölünün hala bulunup bulunmadığını kontrol ediyoruz.
        if (!victim || !victim.valid) {
            return;
        }

        // Respawn ardından oyuncuyu canlı olarak işaretliyoruz.
        victim.isDead = false;
        alt.emitClient(victim, 'death:Handle', victim.isDead);
        victim.spawn(0, 0, 0); // Oyuncu canlandığında nerede olacağının pozisyonlarını girebilirsiniz.
        victim.health = 200;
    }, 5000);
}
```

#### İstemci Tarafı(Client-Side)

```js
let interval;
let isDead = false;

// death:Handle eventi tetiklendiğinde gelen bilgileri kontrol ediyoruz.
alt.on('death:Handle', value => {
    // Yerel bilgiyi değiştiriyoruz.
    isDead = value;

    // Eğer bu veri olumsuzsa kodu devam ettirmiyoruz.
    if (!isDead) {
        return;
    }

    // Her 100milisaniyede çalışacak bir kod başlatıyoruz.
    interval = alt.setInterval(handleDeathTicks, 100);
});

function handleDeathTicks() {
    // Oyuncu artık ölü olarak işaretli değilse bu kod devam etmiyor.
    if (!isDead) {
        alt.clearInterval(interval);
        return;
    }

    // Eğer oyuncu ölü olarak işaretliyse ragdoll güncelleniyor.
    native.setPedToRagdoll(alt.Player.local.scriptID, 5000, 0, 0, true, true, false);
}
```

## playerLeftVehicle & playerEnteredVehicle eventleri için sunucu taraflı örnekler.

Bu iki event bir oyuncu araca bindiğinde veya indiğinde tetiklenir.

İşte oyuncu araçtan indikten sonra aracı silmek için basit bir örnek.

```js
alt.on('playerEnteredVehicle', handlePlayerEnteredVehicle);
alt.on('playerLeftVehicle', handlePlayerLeftVehicle);

function handlePlayerEnteredVehicle(player, vehicle, seat) {
    // Oyuncunun bindiği aracın bilgilerini player classının içerisinde saklayın.
    player.currentSeat = seat;
    player.lastVehicle = vehicle;
}

function handlePlayerLeftVehicle(player, vehicle, seat) {
    // Oyuncu araçtan indiğinde binerken girdiği koltuğun sürücü olup olmadığını kontrol edin. Ekstra olarak bindiği araç hala bulunuyor mu kontrol edin.
    if (player.currentSeat === -1 && player.lastVehicle.valid) {
        player.lastVehicle.destroy(); // aracı siler.
        player.lastVehicle = null;
        player.currentSeat = -2;
    }
}
```
