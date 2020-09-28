# Ce este defapt scriptID-ul?

Aceasta este o modalitate pentru noi de a identifica un alt player sau pe noi înșine în client-side.

O prezentare generală:

-   Un scriptID este unic numai pentru client-side.
-   scriptID-ul ne va oferi o modalitate de a modifica comportamentul nativ al unui player.
-   Sunt folosite cel mai des în tandem cu funcțiile native.
-   Acestea sunt unice per client per player.
-   Nu încercați să partajați scriptID-ul cu alt player. Nu fa funcționa.

## Cum îl obținem?

scriptID-ul dvs. pentru player-ul dvs. poate fi obținut în acest fel.

```js
alt.Player.local.scriptID;
```

Acesta este echivalentul a `local playerPed = PlayerPedId()` din FiveM.

Cu toate acestea, pentru playerii individuali depinde de modul în care primiți instanța lor de player.

### Server Side

```js
alt.on('playerConnect', player => {
    // Aceasta emite tuturor jucătorilor.
    alt.emitClient(null, 'joined', player);
});
```

### Client Side

```js
alt.onServer('joined', otherPlayer => {
    // Verifică dacă tu ești. Te ignoră.
    if (otherPlayer === alt.Player.local) {
        // Hai să ne dăm freeze!
        // Nu facem asta defapt. Acesta este modul în care majoritatea funcțiilor native lucrează cu scriptID-ul.
        alt.log(`You have frozen.`);
        native.freezeEntityPosition(alt.Player.local.scriptID, true);

        // Vom primi unfreeze în 5 secunde.
        alt.setTimeout(() => {
            alt.log(`You are unfrozen.`);
            native.freezeEntityPosition(alt.Player.local.scriptID, false);
        }, 5000);
        return;
    }

    // Trimiteți scriptID-ul în consolă. 'F8'
    alt.log(`Their scriptID is: ${otherPlayer.scriptID}`);
});
```
