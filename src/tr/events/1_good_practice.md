# Event Kullanım Pratikleri

Eventleri kullanmanın birçok yolu vardır ve çoğunlukla görülen problemlerden biri olayların içerisinde olayları başlatmaktır.

## Eventlerin İçerisinde Event Başlatmak

Eğer ki sen de bir event içerisinde event başlatan biriysen çoğu zaman memory-leak oluşturuyorsun.

### Genel Sunucu Taraflı Event Kullanımı

**BUNU YAPMAYIN** ⚠️

```js
alt.on('playerConnect', handleConnection);

function handleConnection(player) {
    alt.on('doSomething', player => {
        player.health = 200;
    });

    alt.emit('doSomething', player); // <--- Bu bir problem.
}
```

Üstteki yöntem yerine alttaki event tetikleme yöntemi daha mantıklıdır ve yapmanız gereken budur.

**DAHA İYİ** ✔️

```js
alt.on('playerConnect', handleConnection);
alt.on('doSomething', handleDoSomething);

function handleConnection(player) {
    alt.emit('doSomething', player);
}

function handleDoSomething(player) {
    player.health = 200;
}
```

**NEDEN** ❓

Bunu bu şekilde yapmamanızın sebebi, bir oyuncu sunucuya her bağlandığında aynı olayları birden çok defa başlatmanızdır. Bir oyuncu sunucuya her girdiğinde her eventin ekstra tekrardan oluşturulduğunu düşünün.

Tek bir eventin kullanıcı başına bir defa tetiklenmesini istiyorsak olayın dışında sadece bir defa yapmak doğru kullanımdır.

### Genel WebView Taraflı Event Kullanımı

İstemci tarafı API'ını kullanan başka bir örnek:

**BUNU YAPMAYIN** ⚠️

```js
const url = `https://resource/client/html/index.html`;
let view;
let somethingToSend;

alt.onServer('show:WebView', handleOpen);
alt.onServer('close:WebView', handleClose)

function handleOpen(_somethingToSend) {
    somethingToSend = _somethingToSend;
    
    // Yeni bir webview oluşturuyor.
	if (!view) {
        view = new alt.WebView(url);
    }
    
    // Eventi Ekliyor.
    view.on('load', handleLoad); // <-- Bu bir problem.
    view.on('close', handleClose);
}

function handleClose() {
    if (!view) {
        return;
    }
    
    view.destroy();
    view = null;
}

function handleLoad() {
    if (!view) {
        return;
    }
    
    view.emit('sendSomething', somethingToSend);
}

```

Yukarıdaki benzer örneklerde olduğu gibi, vurgulanan(yorum satırının bulunduğu yer) satırın bir sorun olmasının nedeni vardır.

Bir webView oluşturduğunuzda, tek bir örnek oluşturduğunuzu düşünün. 

Bu tek örneği oluşturduktan sonra eventlerinizi eklemek istersiniz.

However, these events only need to be hooked into *once*.

**DAHA İYİ** ✔️

```js
const url = `https://resource/client/html/index.html`;
let view;
let somethingToSend;

alt.onServer('show:WebView', handleOpen);
alt.onServer('close:WebView', handleClose)

function handleOpen(_somethingToSend) {
    somethingToSend = _somethingToSend;
    
	if (!view) {
        // Yeni webView oluşturup eventleri ekliyoruz.
        view = new alt.WebView(url);
        view.on('load', handleLoad);
        view.on('close', handleClose);
    }
}

function handleClose() {
    if (!view) {
        return;
    }
    
    view.destroy();
    view = null;
}

function handleLoad() {
    if (!view) {
        return;
    }
    
    view.emit('sendSomething', somethingToSend);
}

```



## Kullanılmayan Eventleri Devre Dışı Bırakma

Eğer çok fazla eventiniz bulunuyorsa bazı eventlerin sonunda artık gerekli olmadığını fark edeceksiniz.

Eventleri, nerede olduklarına bağlı olarak birkaç şekilde devre dışı bırakabilirsiniz.

| Type of Off Event         | Açıklama                                                             |
| ------------------------- | -------------------------------------------------------------------- |
| `alt.off`                 | İstemci veya sunucu tarafındaki herhangi bir eventi kaptabilirsiniz. |
| `alt.offClient`           | İstemciden gelen herhangi bir eventi kapatın.                        |
| `alt.offServer`           | Sunucudan gelen herhangi bir eventi kapatın.                         |
| `yourWebViewVariable.off` | WebView tarafından gelen herhangi bir eventi kapatın.                |

All of these events require a `function` to be turned off. That means that you cannot create a fat arrow function or a callback in place of a function if you want to turn off your events. There are some examples below.

Tüm bu eventler bir fonksiyonunun kapalı olmasının gerektirir. Bu, eventlerinizi devre dışı bırakmak istiyorsanız bir işlev yerine bir fat arrow işlevi veya callback oluşturamayacağınız anlamına gelir. Aşağıda bazı örnekler bulunuyor.

### 'alt.off' kullanımı

Bu, istemci veya sunucu tarafında yapılabilir.

`alt.off`'i nasıl kullanacağına dair bir örnek.

```js
alt.on('doSomething', handleDoSomething);

function handleDoSomething() {
    // Bu fonksiyon herhangi bir yerden çağırılabilir.
    // Eventin içerisinde kapatmak zorunda değilsiniz.
    alt.off('doSomething', handleDoSomething); // <--- Bu fonksiyon.
}

```

### 'alt.offClient' kullanımı

Bu **sadece** sunucu tarafında kullanılabilir.

`alt.offClient`'i nasıl kullanacağınız hakkında bir örnek.

```js
alt.onClient('doSomething', handleDoSomething);

function handleDoSomething() {
    // Bu fonksiyon herhangi bir yerden çağırılabilir.
    // Eventin içerisinde kapatmak zorunda değilsiniz.
    alt.offClient('doSomething', handleDoSomething); // <--- Bu fonksiyon.
}
```

### 'alt.offServer' kullanımı

Bu **sadece** istemci(client) tarafında kullanılabilir.

`alt.offServer`'i nasıl kullanacağınız hakkında bir örnek.

```js
alt.onServer('doSomething', handleDoSomething);

function handleDoSomething() {
    // Bu fonksiyon herhangi bir yerden çağırılabilir.
    // Eventin içerisinde kapatmak zorunda değilsiniz.
    alt.offServer('doSomething', handleDoSomething); // <--- Bu fonksiyon.
}
```

### 'yourWebView.off' kullanımı

Bu örnek, **sadece** WebView tarafında kullanılabilir.

```js
const url = `https://resource/client/html/index.html`;
let view;
let somethingToSend;

alt.onServer('show:WebView', handleOpen);
alt.onServer('close:WebView', handleClose)

function handleOpen(_somethingToSend) {
    somethingToSend = _somethingToSend;
    
	if (!view) {
        // Yeni bir webView oluşturuyoruz ve eventleri ekliyoruz.
        view = new alt.WebView(url);
        view.on('load', handleLoad);
        view.on('close', handleClose);
    }
}

function handleLoad() {
    if (!view) {
        return;
    }
    
    view.emit('sendSomething', somethingToSend);
    
    // Diyelim ki webView'i oluşturduktan hemen sonra bir eventi kapatmak istiyoruz.
    // Bunu nasıl yapacağınızı aşağıdaki satırda gösteriyorum.
    view.off('load', handleLoad); // <-- Fonksiyon
}

```

## Kapanış Konuşması

Bir eventi devre dışı bırakırsanız, kullanmak için yeniden başlatmanız gerektiğini unutmayın.

Bu avantajı kullanmak ve her olayı kapatmak gerekmiyor. Bu sadece bir özelliktir ve her olayı kapatmanız gerekmez.