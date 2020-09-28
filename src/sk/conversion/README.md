# Prechod z iného klienta?

Nie ste jediný používateľ, ktorý to urobil.

alt:V má čo ponúknuť, ale pri používaní tohto klienta treba zobrať pár veci do úvahy.

- Kód servera môže byť iba v **JS, C#** alebo **LUA**.
- Kód klienta môže byť iba v **JS**.
- Vytvára sa modul umožňujúci **akýkoľvek** jazyk pomocou **WASM**.
- *Natives* vychádzajú zo skutočných **Rockstar Native** názvov.

To sú jediné podstatné veci, ktoré treba o alt:V zobrať do úvahy.

Inak je tu niekoľko ďalších dôležitých aspektov.

✔️ alt:V podporuje doplnky k oblečeniu.

✔️ alt:V podporuje väčšinu modifikácii.

✔️ alt:V podporuje MLO.

✔️ alt:V podporuje vlastné mapy.

Tu je niekoľko vecí, ktoré alt:V nemá.

❌ Žiadna LUA na strane klienta

❌ Žiadne ESX

❌ Žiadne ELS (Dex++ na tom pracuje)

❌ Žiadna cenzúra, ak narazíte na nesprávnu osobu

❌ alt:V nepodporuje súbory .asi, .dll alebo ENB.

❌ alt:V nepodporuje program ScriptHookV.

<br />

---

## Z FiveM na alt:V

Tu je niekoľko kľúčových rozdielov medzi alt:V a FiveM.

### Na strane servera a na strane klienta

Áno, v skutočnosti alt:V má stranu servera a klient, čo znamená, že injekcie nie sú veľmi častým problémom pre alt:V. A už vôbec nie manipulácia s klientom. Pred skúseným programátorom však nie je nič bezpečné.

[Tu je video zaoberajúce sa stranou servera vs stranou klienta. (video je v angličtine)](https://www.youtube.com/watch?v=z-knlYI_QZM)

### Miestny hráč ?

Na získanie miestneho hráča alt:V nepoužíva `local playerPed = PlayerPedId()`.

Namiesto toho sa používa `alt.Player.local.scriptID`.

### Vozidlo miestneho hráča ?

*Natives* nepoužívame, keď nemusíme. Namiesto toho sa použije:

```js
alt.Player.local.vehicle;
```

### Vlákna (Threads) ?

Na generovanie vlákien sa používajú intervaly a *timeout-y*.

Máme tiež prístup k `alt.everyTick`, čo je v podstate interval o 0ms.

```js
const myInterval = alt.setInterval(doSomething, 5000);
const myTimeout = alt.setTimeout(doSomethingElse, 10000);

function doSomething() {
    alt.log(`Toto sa volá každých 5 sekúnd.`);
}

function doSomethingElse() {
    alt.log(`Toto sa volá každých 10 sekúnd.`);
}

alt.everyTick(() => {
    alt.log(`Vaša konzola "zomrie" s týmto volaným každý tick`);
});
```

### Eventy ?

Eventy prichádzajú vo všetkých tvaroch a veľkostiach. Pozrite si [API: Sekcia eventy.](../api/1_events)

### Natives ?

*Natives* sú importované a prístupné iba zo strany klienta.

Môžete navštíviť [alt:V Databáza Natives (v angličtine)](https://natives.altv.mp) aby ste lepšie pochopili, čo je k dispozícii.

### Načítavania (Loading Screens) ?

Momentálne alt:V nepodporuje načítavanie obrazoviek žiadneho druhu. Alt:V tím si myslí, že je to pre multiplayer zbytočná funkcia.

---

## Z RAGE:MP na alt:V

Tu je niekoľko kľúčových rozdielov medzi alt:V a RAGE:MP.

### Miestny hráč ?

Na získanie miestneho hráča alt:V nepoužíva `const localPlayer = mp.players.local;`.

Namiesto toho sa používa `alt.Player.local.scriptID`.

### mp.events.add('render')

Na generovanie vlákien sa používajú intervaly a *timeout-y*.

Máme tiež prístup k `alt.everyTick`, čo je v podstate interval o 0ms.

```js
const myInterval = alt.setInterval(doSomething, 5000);
const myTimeout = alt.setTimeout(doSomethingElse, 10000);

function doSomething() {
    alt.log(`Toto sa volá každých 5 sekúnd.`);
}

function doSomethingElse() {
    alt.log(`Toto sa volá každých 10 sekúnd.`);
}

alt.everyTick(() => {
    alt.log(`Vaša konzola "zomrie" s týmto volaným každý tick`);
});
```

### mp.events.add & mp.events.call

Eventy prichádzajú vo všetkých tvaroch a veľkostiach. Pozrite si [API: Sekcia eventy.](../api/1_events)

alt:V ponúka oveľa lepšiu kontrolu nad eventmi.

### Textové labely, markery atď.

Pozrite si [API: Sekciu snippet-ov.](../cookbook/)
