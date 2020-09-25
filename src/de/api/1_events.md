# Events

Events funktionieren in einem ganz bestimmten Weg, und diese zu verstehen ist sehr wichtig.

Der Server kann mit jedem Client kommunizieren.
Der Client kann nur mit seinen WebViews und dem Server kommunizieren.

Ein Client kann **NICHT** mit einem anderen Client kommunizieren.

| Function Name  | Description                                                                                |
| -------------- | ------------------------------------------------------------------------------------------ |
| alt.emit       | Sendet ein Event an den Server oder an den Client. Wird nur auf der Seite empfangen auf der es gesendet wurde.     |
| alt.on         | Empfängt ein Event. Der Server erhält nur Serverevents, der Client erhält nur Clientevents. |
| alt.onServer   | Empfängt Clientside ein Event vom Server. Gesendet mit `alt.emitClient`. |
| alt.emitClient | Sendet ein Event an den Client, das mit `alt.onServer` empfangen wird.                  |
| alt.onClient   | Empfängt Serverside ein Event vom Client. Gesendet mit `alt.emitServer`. |
| alt.emitServer | Sendet ein Event an den Server, das mit `alt.onClient` empfangen wird.                          |

## Server zu Client

Der Server kann nur Daten zu einem Client senden indem er emitClient verwendet, welches einen Spieler benötigt.
Aber der Spieler kann auch mit null ersetzt werden um das Event an alle Spieler zu senden.

**Serverside**

```js
alt.on('playerConnect', player => {
    alt.emitClient(player, 'sayHello');
});
```

**Clientside**

```js
alt.onServer('sayHello', () => {
    alt.log('Hello from server.');
});
```

## Client zu Server

Der Server kann nur Daten zum Server senden indem er emitServer verwendet.
Das Serverside onServer Event empfängt den Spieler automatisch im Event Handler.

**Clientside**

```js
alt.on('connectionComplete', () => {
    alt.emitServer('sayHello');
});
```

**Serverside**

```js
alt.onClient('sayHello', player => {
    alt.log(`${player.name} is saying hello`);
});
```

## Server Ressource zu Server Ressource

Der Server kann nur mit sich selber kommunizieren indem er die on und emit Funktionen verwendet.
Der Client kann nur mit sich selber kommunizieren indem er die on und emit Funktionen verwendet.
Diese gelten auch über mehrere Ressourcen.

**Serverside**

```js
alt.emit('hello', 'this is a message');

alt.on('hello', msg => {
    alt.log(msg);
});
```

## Client Ressource zu Client Ressource

**Clientside**

```js
alt.emit('hello', 'this is a message');

alt.on('hello', msg => {
    alt.log(msg);
});
```

## Client zu WebView und zurück

**Anmerkung:** `resource` in der WebView URL steht für die Ressource die gerade verwendet wird.

**Clientside**

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

**Clientside HTML Seite**

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
