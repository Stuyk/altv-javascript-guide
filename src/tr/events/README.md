# Eventlere Giriş

Eventler alt:V ile çalışmanın tuzu biberidir.

Oyuncular yeni etkinlikler yaptığı zaman veri almaya yardımcı olurlar. Mesela sunucuya bağlanmak, araca binmek, araçtan inmek ve daha fazlası.

Haydi mevcut eventlere göz atalım.

## Sunucu Taraflı Eventler

| Event Adı                | Açıklama                                                                         |
| ------------------------ | -------------------------------------------------------------------------------- |
| playerConnect            | Bir kullanıcı sunucuya bağlandığında tetiklenir.                                 |
| playerDisconnect         | Bir kullanıcının sunucu ile olan bağlantısı kesildiğinde tetiklenir.             |
| anyResourceStart         | Herhangi bir kaynak başladığında tetiklenir.                                     |
| anyResourceStop          | Herhangi bir kaynak durdurulduğunda tetiklenir.                                  |
| anyResourceError         | Herhangi bir kaynak hata ile karşılaştığında tetiklenir.                         |
| resourceStart            | Belirli bir kaynak başlatıldığında tetiklenir.                                   |
| resourceStop             | Belirli bir kaynak durdurulduğunda tetiklenir.                                   |
| syncedMetaChange         | Bir varlığın syncedMeta'sı değiştiğinde tetiklenir.                              |
| streamSyncedMetaChange   | When an entity in a client's streaming range has their streamSyncedMeta changed. |
| playerDamage             | Bir kullanıcı başka birinden ya da başka bir şeyden hasar aldığında tetiklenir.  |
| playerDeath              | Bir kullanıcı öldüğünde tetiklenir.                                              |
| explosion                | Bir patlama yaratıldığında tetiklenir.                                           |
| weaponDamage             | Bir silah hasar verdiğinde tetiklenir.                                           |
| vehicleDestroy           | Bir araç yok edildiğinde tetiklenir.                                             |
| entityEnterColshape      | Bir varlık ColShape'ye girdiğinde tetiklenir.                                    |
| entityLeaveColshape      | Bir varlık ColShape'den çıkış yaptığında tetiklenir.                             |
| playerEnterVehicle       | Bir oyuncu araca bindiğinde tetiklenir.                                          |
| playerLeaveVehicle       | Bir oyuncu araçtan indiğinde tetiklenir.                                         |
| playerChangedVehicleSeat | Bir oyuncu araçta koltuk değiştirdiğinde tetiklenir.                             |
| removeEntity             | Bir varlık oyundan kaldırıldığında tetiklenir.                                   |
| consoleCommand           | Sunucu konsoluna herhangi bir mesaj yazıp ENTER tuşuna tıkladığında tetiklenir.  |

[Daha fazla bilgi için Sunucu Eventleri API'ını kontrol edin.](https://altmp.github.io/altv-typings/modules/_alt_server_.html#on)

## İstemci Taraflı Eventler

| Event Adı              | Açıklama                                                                         |
| ---------------------- | -------------------------------------------------------------------------------- |
| connectionComplete     | Bir kullanıcı istemci tarafında sunucuya tam olarak bağlandığında tetiklenir.    |
| disconnect             | Bir oyuncu ile sunucu tarafının bağlantısı kesildiğinde tetiklenir.              |
| anyResourceStart       | Herhangi bir kaynak başladığında tetiklenir.                                     |
| anyResourceStop        | Herhangi bir kaynak durdurulduğunda tetiklenir.                                  |
| anyResourceError       | Herhangi bir kaynak hata ile karşılaştığında tetiklenir.                         |
| resourceStart          | Belirli bir kaynak başlatıldığında tetiklenir.                                   |
| resourceStop           | Belirli bir kaynak durdurulduğunda tetiklenir.                                   |
| syncedMetaChange       | Bir varlığın syncedMeta'sı değiştiğinde tetiklenir.                              |
| streamSyncedMetaChange | When an entity in a client's streaming range has their streamSyncedMeta changed. |
| keydown                | Bir kullanıcı tuşa bastığında tetiklenir.                                        |
| keyup                  | Bir kullanıcı tuşa basılı tutmayı bıraktığında tetiklenir.                       |
| gameEntityCreate       | Bir varlık kullanıcının akış aralığına girdiğinde tetiklenir.                    |
| gameEntityDestroy      | Bir varlık kullanıcının akış aralığından çıktığında tetiklenir.                  |
| removeEntity           | Bir varlık oyundan kaldırıldığında tetiklenir.                                   |
| consoleCommand         | Sunucu konsoluna herhangi bir mesaj yazıp ENTER tuşuna tıkladığında tetiklenir.  |

[Daha fazla bilgi için İstemci Eventleri API'ını kontrol edin.](https://altmp.github.io/altv-typings/modules/_alt_client_.html#on)
