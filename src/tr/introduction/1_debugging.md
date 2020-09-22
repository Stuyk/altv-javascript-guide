# İstemciyi Debugging için ayarlamak

Bu aşamada alt:V İstemcisini kurmuş olmanız gerekmekte.

`altv.exe`'nin bulunduğu konuma gidip `altv.cfg`'yi bulalım.

**NOT:** _Bu ayarlar sadece debugging yapacağınız zaman geçerlidir. Eğer gireceğiniz sunucuda debug modu açık değilse sunucuya bağlanamazsınız._

![](../../img/edit_cfg.png)

## altv.cfg

Bu parametrenin değerinin `true` olduğuna emin olun.

Eğer böyle bir parametre yoksa oluşturun.

```sh
debug: 'true'
```

## Reconnecting

Sunucunuzu yeniden başlattığınızda otomatik olarak sunucudan atılacaksınız. Eğer sunucunuzun konfigürasyonunda debug modu açıksa ve istemciniz üzerinde de debug modu açıksa
`reconnect` komutunu kullanabileceksiniz. Aksi takdirde bağlantınızın kesildiği bir sunucuya tekrar girmek için istemciyi yeniden başlatmanız gerekiyor.

`F8` tuşuna bas ve;

**Sunucu Şifreliyse**

```
reconnect sunucunuzun_sifresi
```

**Sunucu Şifresizse**

```
reconnect
```
