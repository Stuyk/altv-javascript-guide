# Das Verstehen der ScriptID

Diese Nummer gibt uns die Möglichkeit andere Spieler oder uns Selber in unserem lokal geöffneten Spiel zu identifizieren.

Generelle Übersicht

-   Die scriptID ist einzigartig in jeder geöffneten Spielanwendung.
-   Die scriptID gibt uns die Möglichkeit, dass native Verhalten des Spielers zu beeinflussen.
-   Diese Nummer wird überwiegend für GTA originale Funktionen benutzt. (`handle` Parameter bei natives)
-   Diese Nummern sind einzigartig und unterschiedlich auf jedem Client für jeden Spieler.
    -   Versuche die scriptID nicht mit anderen Spielern zu teilen, also an dere Spielclients zu senden. Es wird nicht funktioneren.

## Wie du auf sie zugreifen kannst.

Die scriptID kann auf diesem Wege erhalten werden.

```js
alt.Player.local.scriptID;
```

Dies ist das Äquivalent von `local playerPed = PlayerPedId()` auf FiveM.

Für andere Spieler ist das zugreifen auf die scriptID davon abhängig, wie du deren Spielerinstanz beziehst.

### Serverseitig

```js
alt.on('playerConnect', player => {
    // Dieses event wird an alle Spieler auf dem Server gesendet
    alt.emitClient(null, 'joined', player);
});
```

### Clientseitig

```js
alt.onServer('joined', otherPlayer => {
    // Wenn der lokale Spieler dem gesendeten Spieler entspricht gehe in die IF-Anweisung
    if (otherPlayer === alt.Player.local) {
        // Nun werden wir uns bewegungsunfähig machen.
        // Dies sollte normalerweise nicht getan werden. Es ist nur ein Beispiel, um zu zeigen, wie die GTA-natives mit der scriptID funktionieren.
        alt.log(`You have frozen.`);
        native.freezeEntityPosition(alt.Player.local.scriptID, true);

        // Nach 5 Sekunden wirst du dich wieder bewegen können.
        alt.setTimeout(() => {
            alt.log(`You are unfrozen.`);
            native.freezeEntityPosition(alt.Player.local.scriptID, false);
        }, 5000);
        return;
    }

    // Dies wird die scriptID in die 'F8' Konsole ausgeben.
    alt.log(`Their scriptID is: ${otherPlayer.scriptID}`);
});
```
