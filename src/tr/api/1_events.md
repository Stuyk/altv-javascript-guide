# Eventler

Eventler özel bir şekilde çalışır ve kendi aralarındaki olan iletişimi anlamak çok önemli.

Sunucu (Server) herhangi bir istemci (Client) ile iletişim kurabilir.
İstemci (Client) sadece WebView (CEF) ve Sunucu (Server) ile iletişim kurabilir. 

Bir istemci (Client) başka bir istemci (Client) ile **iletişim kuramaz**.


| Function Name  | Description                                                                                |
| -------------- | ------------------------------------------------------------------------------------------ |
| alt.emit       | Sunucu (server) veya istemci (client) tarafında bir event tetikler. Sadece tetiklendiği taraftan erişilebilir (Client -> Client, Server -> Server) |
| alt.on         | Bir event dinler. Sunucu üzerinde sadece sunucudan gelen eventler dinlenir. İstemci üzerinde sadece istemciden gelen eventler dinlenir. |
| alt.onServer   | İstemci tarafında, sunucudan istemciye gönderilen bir eventi dinler. `alt.emitClient` ile sunucu tarafından tetiklenir. |
| alt.emitClient | Spesifik bir istemciye (client) bir event göndermeye yarar. İstemci tarafında (client) `alt.onServer` ile dinlenebilir. |
| alt.onClient   | İstemci tarafından sunucuya gönderilen bir eventi dinler. `alt.emitServer` ile istemci tarafından tetiklenir. |
| alt.emitServer | İstemciden sunucu tarafına bir event gönderir. `alt.onClient` ile sunucu tarafında dinlenir. |

## Sunucudan İstemciye (Server -> Client)

Sunucu (Server) sadece bir istemciye (Client) event gönderebilir. Bu işlem `Player` parametresine ihtiyaç duyan `alt.emitClient` ile gerçekleşir.

Sadece bir oyuncuya bir event göndermek yerine `Player` parametresini `null` olarak değiştirirseniz bütün oyunculara bu eventi gönderecektir.

**Sunucu Tarafı (Server Side)**

```js
alt.on('playerConnect', player => {
    alt.emitClient(player, 'merhabaDunya');
});
```

**İstemci Tarafı (Client Side)**

```js
alt.onServer('merhabaDunya', () => {
    alt.log('Hello world.');
});
```

## İstemciden Sunucuya (Client -> Server)

Bir istemci, sunucu tarafına `alt.emitServer` ile event gönderir.

Sunucu tarafına gönderilen herhangi bir event içinde oyuncu verisinide taşır. Sunucu tarafında çalıştıracağımız fonksiyonun ilk parametresi eventi gönderen oyuncunun kendisi olacaktır.

**İstemci Tarafı (Client Side)**

```js
alt.on('connectionComplete', () => {
    alt.emitServer('hosgeldin');
});
```

**Sunucu Tarafı (Server Side)**

```js
alt.onClient('hosgeldin', player => {
    alt.log(`${player.name} Sunucuya Hoşgeldin!`);
});
```

## Sunucudan Sunucuya (Server -> Server)

`on` ve `emit` fonksiyonları, Sunucunun kendi içinde iletişim kurabilmesi için tek yoldur.

**Sunucu Tarafı (Server Side)**

```js
alt.emit('hello', 'Burada bir mesaj yazıyor.');

alt.on('hello', msg => {
    alt.log(msg);
});
```

## İstemciden İstemciye (Client -> Client)

`on` ve `emit` fonksiyonları, Yerel istemcinin kendi içinde iletişim kurabilmesi için tek yoldur.

**Not:** İstemci sadece kendi istemcisini tetikleyebilir, başka bir istemciyi tetikleyemez.


**İstemci Tarafı (Client Side)**

```js
alt.emit('hello', 'Burada bir mesaj yazıyor.');

alt.on('hello', msg => {
    alt.log(msg);
});
```

## İstemciden WebView'e (Client -> CEF)

**Not:** HTTP adresinde ki `resource` şu anda kod yazdığınız `resource`'u ifade eder.

**İstemci Tarafı (Client Side)**

```js
const webview = new alt.WebView('http://resource/client/html/index.html');
webview.on('test2', handleFromWebview);

function handleFromWebview(msg) {
    alt.log(msg);
}

alt.setTimeout(() => {
    webview.emit('test', 'İstemciden Selamlar!');
}, 500);
```

**İstemci Tarafında (Client Side) HTML Sayfası**

```html
<html>
    <head>
        <title>Merhaba Dünya!</title>
    </head>
    <body>
        <p>Kelimeler</p>
        <script type="text/javascript">
            if ('alt' in window) {
                alt.on('test', msg => {
                    console.log(msg);
                    alt.emit('test2', "WebView'den Selamlar!");
                });
            }
        </script>
    </body>
</html>
```
