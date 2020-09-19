# Evenimente

Evenimentele funcționează într-un mod foarte specific și înțelegerea lor este foarte importantă.

Serverul poate comunica cu orice client.
Clientul poate comunica numai cu WebViews-urile și serverul.

Un client **NU POATE** comunica cu alt client.

| Function Name  | Description                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| alt.emit       | Emiteți un eveniment în server sau clientside. Primit doar de pe partea din care a fost emis.                            |
| alt.on         | Obțineți un eveniment. Serverul primește numai evenimentele serverului. Clientul primește numai evenimentele clientului. |
| alt.onServer   | Obțineți un eveniment emis de pe server din partea clientului. Declanșat cu `alt.emitClient`.                            |
| alt.emitClient | Emiteți un eveniment unui anumit client pe care ulterior îl primesc cu `alt.onServer`.                                   |
| alt.onClient   | Obțineți un eveniment emis de la client catre server. Declanșat cu `alt.emitServer`.                                     |
| alt.emitClient | Emiteți un eveniment în server care este primit cu `alt.onClient`.                                                       |

## Din Server în Client

Serverul poate emite date către client numai cu emitClient care necesită un Player.
Cu toate acestea, Player-ul poate fi înlocuit și cu null, care va emite tuturor jucătorilor.

**Server Side**

```js
alt.on('playerConnect', player => {
    alt.emitClient(player, 'sayHello');
});
```

**Client Side**

```js
alt.onServer('sayHello', () => {
    alt.log('Hello from server.');
});
```

## Din Client în Server

Clientul poate emite date către server numai cu emitServer.
Evenimentul onServer de la server va primi automat un Player în event handler.

**Client Side**

```js
alt.on('connectionComplete', () => {
    alt.emitServer('sayHello');
});
```

**Server Side**

```js
alt.onClient('sayHello', player => {
    alt.log(`${player.name} is saying hello`);
});
```

## Din Server Resource în Server Resource

Serverul poate comunica cu el însuși numai cu funcțiile on și emit.
Clientul poate comunica cu el însuși numai cu funcțiile on și emit.
Comunică și între resurse.

**Server Side**

```js
alt.emit('hello', 'this is a message');

alt.on('hello', msg => {
    alt.log(msg);
});
```

## Din Client Resource în Client Resource

**Client Side**

```js
alt.emit('hello', 'this is a message');

alt.on('hello', msg => {
    alt.log(msg);
});
```

## Din Client în WebView și Înapoi

**Notă:** Resursa din adresa HTTP se referă la resursa pentru care scrieți în prezent codul.

**Client Side**

```js
const webview = new alt.WebView('http://resource/client/html/index.html');
webview.on('test2', handleFromWebview);

function handleFromWebview(msg) {
    alt.log(msg);
}

alt.setTimeout(() => {
    webview.emit('test', 'Hello from Client');
}, 500);
```

**Client Side HTML Page**

```html
<html>
    <head>
        <title>Hello World</title>
    </head>
    <body>
        <p>Words</p>
        <script type="text/javascript">
            if ('alt' in window) {
                alt.on('test', msg => {
                    console.log(msg);
                    alt.emit('test2', 'hello from webview');
                });
            }
        </script>
    </body>
</html>
```
