# Sunucu Kurulumu

## Gerekli Programlar

Aşağıdaki programları indirerek başlayabiliriz.

-   [NodeJS 13+](https://nodejs.org/en/download/current/)
-   [Visual Studio Code](https://code.visualstudio.com/download)
-   [GIT](https://git-scm.com/downloads)
-   [alt:V Client](https://altv.mp/#/downloads)

## Genel Olarak Bilmeniz Gerekenler

Windows çalışma ortamında geliştirme yaptığınızı varsayarsak;

-   Windows Komut Satırı (CMD) veya PowerShell kullanmayı bilmelisiniz.
-   Windows Komut Satırı (CMD) veya PowerShell nasıl açılır bilmelisiniz.
-   Windows Komut Satırı (CMD) veya PowerShell üzerinde .exe uzantılı dosyaları çalıştırmayı bilmelisiniz.
-   Basit düzelyde JavaScript bilgisine sahip olmalısınız.

**Önemli**

`$` işareti ile başlayan kod satırları Windows Komut Satırı (CMD) veya PowerShell üezrinde çalıştırıldığı anlamına gelmektedir.

**SAKIN YAPMA:** komutları kopyalarken `$` işaretini dahil etmeyin.

## altv-pkg Kurulumu

[altv-pkg](https://github.com/stuyk/altv-pkg), hızlı bir şekilde Windows veya Linux üzerinde sunucu için gerekli dosyaları indirerek hazır hale getiren Stuyk tarafından oluşturulmuş bir yardımcı programdır. Üzerinde çalışmanız için size bir ***resource*** (script) tabanı hazırlar.

Windows Komut Satırı (CMD) veya PowerShell ile birlikte kurabilirsiniz.

```sh
$ npm install -g altv-pkg
```

Eğer kurulum sırasında bir problem yaşarsanız **Powershell**'i **Yönetici Olarak** çalıştırıp aşağıda ki rehberi izleyebilirsiniz;

```sh
$ Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted -Force;
```

Versiyon komutuyla kurulumun doğruluğunu test edebiliriz.

```sh
$ altv-pkg --version
```

## altv-pkg Kullanımı

Kurulumun ardından sunucu dosyalarını indirmeye başlayacağız.

Sunucunuz için bir klasör oluşturun. Windows Komut Satırını (CMD) bu klasörün içinde çalıştırın. Aşağıdaki komutu, komut satırı üzerinde çalıştırın.

```sh
$ altv-pkg d release
```

Kurulum sırasında oluşturduğunuz sunucu ve oyun madı için bazı sorular soracak.

Standart olarak sunucu dosyaları otomatik olarak bulunduğunuz dizinde oluşturulacaktır.

Ekran üzerinde ki yönergeleri izleyiniz.

-   Sesli Sohbet seçeneği için **N** 
-   Örnek resource için **Y**

![](./img/cmd_altvpkg.gif)

## İndirilen Dosyaları Anlamak



İndirdiğimiz sunucu dosyalarının ne işe yaradığını, nasıl bir klasör yapısında bulunduğunu anlamak ve algılamak çok önemli. Aşağıda `altv-pkg d release` komutu ile kurulumunu sağladığımız sunucu dosyalarımızın genel dosyalarını ve dosya-klasör yapısın görebiliriz.

```
|   altv-server.exe
|   libnode.dll
|   package-lock.json
|   package.json
|   server.cfg
|   update.json
|
+---data
|       vehmodels.bin
|       vehmods.bin
|
+---modules
|       js-module.dll
|
\node_modules
\---resources
    \---example
        |   resource.cfg
        |
        +---client
        |       startup.js
        |
        \---server
                startup.js
```

### altv-server.exe

Bu dosya sunucumuzu çalıştırmamız için gerekli olan ana dosya. Komut satırı üzerinden de çalıştırılabilir.

```
$ altv-server.exe
```

`Ctrl + C` kombinasyonu ile sunucunuzu kapatabilir, işlemleri sonlandırabilirsiniz.

### package.json

`node_modules` klasörü, hangi klasörün içerisinde yer alıyorsa `package.json` dosyası da o klasör içerisinde yer almalı. NPM paketlerinin (node_modules) tanımlandığı dosyadır. **Not:**NPM Modülleri (node_modules) sadece sunucu (server-side) taraflı çalışır, istemci (client-side) üzerinde hiçbir etkisi olmaz ve kullanılamaz.

```json
{
    "name": "altv-pkgserver",
    "version": "0.0.0",
    "description": "Don't worry we made this package.json for you.",
    "main": "index.js",
    "scripts": {
        "update": "altv-pkg d release"
    },
    "author": "stuyk",
    "type": "module",
    "prettier": {
        "printWidth": 120,
        "tabWidth": 4,
        "singleQuote": true,
        "bracketSpacing": true
    },
    "devDependencies": {
        "@altv/types-client": "^1.1.1",
        "@altv/types-natives": "^1.1.0",
        "@altv/types-server": "^1.4.2",
        "@altv/types-webview": "^1.0.2"
    }
}
```

Bu dosya üzerinden görebileceğimiz tanımlamalar;

-   [Prettier extension for VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) eklentisini kullanıyoruz ve ayarlarını bu dosya üzerinde belirledik. 
-   `"type": "module"` satırını ES6 desteği için kullanıyoruz. [ES6 Syntax](https://www.w3schools.com/js/js_es6.asp).
-   Server dosyalarımız `$ npm run update` komutunu çalıştırarak tek seferde güncelleyebiliriz

`package.json` dosyamızın genel olarak yapısı bu şekilde. Bir NodeJS projesi ile aynı işlevi görüyor.

### server.cfg

Sunucunuzun özel yapılandırmasını yapacağınız dosyadır.

```sh
name: "TestServer",
host: "0.0.0.0",
port: 7788,
players: 1024,
#password: "verysecurepassword",
announce: false,
#token: no-token,
gamemode: "Freeroam",
website: "test.com",
language: "en",
description: "test",
debug: false,
modules: [
  "js-module",
],
resources: [
    "example"
],
tags: [
  "customTag1",
  "customTag2",
  "customTag3",
  "customTag4"
]
```

#### password

`Password` isteğe bağlı bir parametredir. Eğer sunucunuza bir şifre koymak istiyorsanız "#" işaretini silerek şifrenizi belirleyebilir ve aktif edebilirsiniz.

#### token

`Token` isteğe bağlı bir parametredir. Bu özelliği kullanmak için "#" işaretini silmeniz gerekiyor. Token sahibi olmak için resmi alt:V Discord'unda sağ tarafta buluna üye listesinde `Helpers` başlığı altındaki "alt:V Master-Bot" adlı bota "token" yazmanız gerekiyor.

#### debug

Eğer sunucunuz geliştirme sürecindeyse, geliştirmenize yardımcı olması açısından bu özelliği aktif hale getirmenizi (false yazan yerin true olarak değiştirmeniz gerekiyor.) öneriyoruz. Bu özellik sayesinde "reconnect" komutunu F8 Konsol üzerinden kullanabileceksiniz. Sunucunuzu geliştirme sürecinden ayırıp oyuncuların giriş yapabileceği bir hale getireceğiniz zamanda ise tekrardan "true" olarak değiştirdiğimiz değeri "false" yapmanızı önemle ve şiddetle öneriyoruz. Bu ayar için [istemci konfigürasyonu](https://wiki.altv.mp/Altv.cfg) üzerinde de yapmanız gereken değişiklikler mevcut.

#### resources

`/resource` klasörü altında bulunan, sunucunuz için hazırladığınız her bir eklenti klasörünü bu parametre içerisinde tanımlayarak çalışmasını sağlayabilirsiniz. Her eklenti klasöründe `resource.cfg` bulunmalı. Aksi takdirde sunucuyu açtığımızda içinde `resource.cfg` olmayan eklentileri tanımayacaktır.

Aşağıda `/resources/example` eklentisi için örnek bir `resource.cfg` örneği bulunuyor.

```sh
type: js,
main: server/startup.js,
client-main: client/startup.js,
client-files: [
	client/*
],
deps: []
```

Eklentimizin sunucu tarafında (server-side) çalışacak kısmı `/resources/example/server/startup.js` yolunda bulunuyor.

İstemci tarafı için yazdığımız kodun yolu da aynı şekilde. Sadece `server` yerine `client` yazıyoruz.

### /data

Bu klasör içerisinde bulunan data dosyaları araçları tanımlamamız için yardımcı oluyor. Eğer bu dosyalar olmazsa araçları oluştururken araçların tanımlanmadığı ile ilgili hatalar alabiliriz. Bu dosyalar otomatik olarak indirilir ve kullanılır. Ekstra bir işlem yapmamıza gerek yok.

### /modules

Bu klasör ise kullandığınız farklı dil destekleri için kullandığınız `.dll` veya `.so` dosyaları barındırır. Örnek; C# Modülü, Lua Modülü vb. Bu modüller, alt:V Developerları veya topluluk içinde ki bazı kullanıcıların alt:V için geliştirdiği modüllerdir.

### /node_modules

Bu klasör, NPM ile yüklediğiniz paketlerin barındığı klasördür. Aşağıda ki örnek komut satırında çalıştırılacak kod ile `Stanford Javascript Crypto Library` paketi NPM tarafından otomatik olarak bu klasör içerisine yüklenecektir. 

```sh
$ npm i sjcl
```

### /resources

Yeni bir eklenti yazmaya başladığınızda bu klasörün içerisinde yeni bir klasör oluşturup kodlamaya başlayacağınız ana klasör burasıdır. Burada oluşturduğunuz eklenti klasörlerini `server.cfg` içinde `resources` parametresinde belirtebilirsiniz. Eğer eklentilerinizin boyutları büyükse veya çok fazla eklentiniz varsa performans açısından problem yaşamamanız için hepsini tek bir eklenti olarak birleştirmenizi şiddetle tavsiye ediyoruz. Böylece kontrol edilmesi ve kullanılması daha kolay olacaktır.

## Opening Up Your Workspace

alt:V Sunucunuzu kurduğunuz klasörü VS:Code üzerinde açalım.

Resimdeki gibi görünmeli.

![](./img/vscode_entry.png)

`resources/example/startup.js` dosyası içerisinde kodumuzu yazmaya başlayalım.

`server.cfg` içerisinde `resources` içinde `example` olduğuna emin olalım.

```sh
resources: [
  "example"
],
```

Herşeyin doğru olduğundan emin olmak için komut satırında sunucunuzu çalıştırın.

![](./img/cmd_loaded.png)

## Connecting

alt:V İstemcisinde `Hızlı Bağlan` ile sunucunuza ip adresi ve port bilgisi ile bağlanabilirsiniz.

Yerel makinenizde açtığınız sunucunun ip adresi her zaman `localhost` veya `127.0.0.1` dir (ikiside geçerli).

```
127.0.0.1:7788
```

## Server-Side

Sunucu tarafında çalışacak kodlar `server` klasörü içerisinde yazılmalı.

Aynı zamanda `types` kütüphanesini de import etmelisiniz.

```js
/// <reference types="@altv/types-server" />
import alt from 'alt-server';

alt.log('test');
```

Sunucu tarafında kod yazarken artık otomatik olarak tamamlayıcı çalışacak.

![](./img/vscode_server_test.png)

## Client-Side

İstemci kodları (client-side) `client` klasörü içerisinde yazılmalı.

İstemci tarafı aynı zamanda `native` kütüphanesini kullanabileceğiniz tek kısım.

Aynı zamanda `types` kütüphanesini de alt:V istemci tarafı için import etmelisiniz.

```js
/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import alt from 'alt-client';
import * as native from 'natives';

alt.log(`You connected! Nice!`);
```

İstemci tarafında kod yazarken artık otomatik olarak tamamlayıcı çalışacak.

![](./img/vscode_client_test.png)
