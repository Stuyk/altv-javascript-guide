# Pochopenie ScriptID

Toto je spôsob, ako môžeme identifikovať iného hráča alebo seba na strane klienta.

Všeobecný prehľad

- ID skriptu je jedinečné iba pre stranu klienta.
- scriptID nám poskytne spôsob, ako upraviť natívne správanie hráča.
- Najčastejšie sa používajú v spojení s *native-ami*.
- Sú jedinečné pre každého klienta a hráča.
     - Nepokúšajte sa zdieľať scriptID s iným hráčom. Nebude to fungovať.

## Ako ho získať.

Týmto spôsobom je možné získať scriptID svojho hráča.

```js
alt.Player.local.scriptID;
```

Toto je ekvivalent `local playerPed = PlayerPedId()` z FiveM.

Pre jednotlivých hráčov však záleží na tom, ako prijmete ich inštanciu hráča.

### Na strane servera

```js
alt.on('playerConnect', player => {
    // Toto sa vydá všetkým hráčom
    alt.emitClient(null, 'joined', player);
});
```

### Strana klienta

```js
alt.onServer('joined', otherPlayer => {
    // Skontrolujte, či som to sám. Ignorovať seba.
    if (otherPlayer === alt.Player.local) {
        // Zmrazme sa.
	    // Nerobte to. Toto je len ukážka, ako väčšina native-ov pracuje so scriptID.
        alt.log(`Zamrzli ste.`);
        native.freezeEntityPosition(alt.Player.local.scriptID, true);

        // Rozmrazíme sa o 5 sekúnd.
        alt.setTimeout(() => {
            alt.log(`Odmrzli ste`);
            native.freezeEntityPosition(alt.Player.local.scriptID, false);
        }, 5000);
        return;
    }

    // Log-neme ich scriptID do konzoly 'F8'.
    alt.log(`Their scriptID is: ${otherPlayer.scriptID}`);
});
```
