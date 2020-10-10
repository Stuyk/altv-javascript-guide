# Prototypovanie (Prototyping)

Prototypovanie umožňuje rozšíriť funkčnosť predvolenej triedy pre hráče, vozidlá atď.

Je dôležité si uvedomiť, že všetky súbory prototypov by sa mali načítať ihneď po inicializácii databázy.

Váš prototyp má databázové funkcie.

**Nepracujú** vo viacerých zdrojoch. Iba jeden zdroj.

### **Príklad JavaScript-u na strane servera**

```js
alt.Player.prototype.emitMeta = function emitMeta(key, value) {
    if (typeof value === 'function') {
        throw new Error(`Value cannot be a function. emitMeta.prototype`);
    }

    this.setMeta(key, value);
    alt.emitClient(this, 'meta:Emit', key, value);
};

alt.Player.prototype.init = function init() {
    this.data = {};
};

alt.Player.prototype.syncCash = function syncCash() {
    this.emitMeta('cash', this.data.cash);
};

alt.Player.prototype.setCash = function setCash(value) {
    if (isNaN(value)) {
        throw new Error(`Value is not a number. setCash.prototype`);
    }

    if (!this.data) {
        this.data = {};
    }

    this.data.cash = value;
    this.syncCash();
};

alt.Player.prototype.subCash = function subCash(value) {
    if (isNaN(value)) {
        throw new Error(`Value is not a number. subCash.prototype`);
    }

    if (!this.data) {
        this.data = {};
    }

    const absValue = Math.abs(parseFloat(value)) * 1;
    if (this.data.cash < absValue) {
        return false;
    }

    this.data.cash -= absValue;
    this.data.cash = Number.parseFloat(this.data.cash).toFixed(2) * 1;
    this.syncCash();
    return true;
};

alt.Player.prototype.addCash = function addCash(value) {
    if (isNaN(value)) {
        throw new Error(`Value is not a number. addCash.prototype`);
    }

    if (!this.data) {
        this.data = {};
    }

    const absValue = Math.abs(parseFloat(value));
    if (this.data.cash + absValue > 92233720368547757) {
        absValue = 92233720368547757;
    }

    this.data.cash += absValue;
    this.data.cash = Number.parseFloat(this.data.cash).toFixed(2) * 1;
    this.syncCash();
    return true;
};
```

### **Príklad TypeScript-u na strane servera**

```ts
// Pomocou `alt-client` urobte prototypovanie na strane klienta.
declare module 'alt-server' {
    export interface Player {
        cash?: number;
        bank?: number;

        // Musíte deklarovať svoje funkčné rozhrania.
        addToCash(value: number): boolean;
        addToBank(value: number): boolean;
    }
}

// Potom môžete definovať svoje prototypové funkcie.
alt.Player.prototype.addToCash = function addToCash(value: number) {
    if (!this.cash) {
        this.cash = value;
    } else {
        this.cash += value;
    }

    return true;
};

alt.Player.prototype.addToBank = function addToBank(value: number) {
    if (!this.bank) {
        this.bank = value;
    } else {
        this.bank += value;
    }

    return true;
};
```

## Príklad použitia

**Na strane servera**

```js
player.init();
player.emitMeta('test', true);
player.setCash(25);
player.subCash(5);
player.addCash(2);
```
