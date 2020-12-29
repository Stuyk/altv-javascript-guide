# MongoDB

MongoDB je NoSQL databáza, ktorá sa neuveriteľne ľahko používa. Dôrazne sa odporúča pre prostredia založené na JavaScripte, pretože práca s MongoDB je bezproblémovou skúsenosťou v TypeScripte a JavaScripte. Je ľahké s ním začať a existuje niekoľko dobrých ORM (Objektovo-relačné mapovanie/Object-relational mapping), ktoré vám pomôžu so správou vašej databázy.

MongoDB môže konkurovať napríklad s MySQL, MariaDB, PostgreSQL atď.

## Simply Mongo

Toto je malé *repository*, ktoré Stuyk vytvoril a ktoré vám umožní využiť veľmi jednoduchý obslužný program databázy, ktorý je pre priemerného vývojára viac než dosť. Bol vyvinutý výhradne na pomoc novým vývojárom, ktorí chcú iba ukladať údaje bez toho, aby ich prehnali.

 [Prečítajte si viac o Simply Mongo NPM *package*](https://www.npmjs.com/package/simplymongo)

### Inštalácia príkazom

```js
$ npm install simplymongo
```

### Ako inicializovať databázu

Pravdepodobne budete chcieť tento vzor použiť v súbore `startup.js` na strane servera.

**startup.js - strana servera **

Toto je hlavný vstupný bod pre *resource*.

Tu by ste mali definovať novú databázu.

```js
import * as sm from 'simplymongo';

sm.onReady(establishConnection);

async function establishConnection() {
    import('./bigImportFile.js');
    // Nemusíte čakať na načítanie ničoho z tohoto.
}

new sm.Database('mongodb://localhost:27017', 'mydb', ['accounts', 'characters']);
// new sm.Database('mongodb://localhost:27017', 'mydb', ['accounts', 'characters'], 'username', 'password');
```

**bigImportFile.js - strana servera**

Toto je súbor, ktorý by sa mal načítať po pripojení databázy a byť pripravený na použitie.

```js
import('./someFile.js'); // Povedzme, že tento má v sebe inštanciu db.
import('./someOtherFile.js');
```

**someFile.js - strana servera**

Tento súbor bude predstavovať spôsob, ako bezpečne získať databázu v akomkoľvek inom súbore načítanom po súbore `startup.js`.

```js
import alt from 'alt-server';
import * as sm from 'simplymongo';

const db = sm.getDatabase();
```

### Ako používať vašu databázu

Po [inicializácii databázy a načítaní ďalšieho súboru](#Ako inicializovať databázu) by ste mali začať používať `sm.getDatabase()` na načítanie inštancie databázy.

Takto začneme hovoriť s našou databázou a posielať jej pokyny.

#### Načítava sa vaše existujúce pripojenie k databáze

```js
import alt from 'alt-server';
import * as sm from 'simplymongo';

const db = sm.getDatabase();
```

#### Pochopte, čo znamená Await

Je dôležité, aby ste mali základné znalosti o a-synchronizačných *eventoch*.

```js
alt.on('playerConnect', handleAsyncEvent);

// <----- Tento identifikátor používame na to, aby sme povedali funkcii, že má používať „await“.
async function handleAsyncEvent(player) {
	// Táto funkcia rozbehne samostatný *event*, kde čaká na návrat tejto udalosti.
	// To nezabráni tomu, aby bola táto funkcia volaná viackrát.
	// Túto funkciu môžete v skutočnosti volať, koľko chcete, a nikdy nebude obsahovať žiadny iný kód.
	const accounts = await db.fetchAllByField('socialclub', player.socialId, 'accounts');
    
    if (accounts.length >= 1) {
        console.log(`You found a document!`)
        console.log(accounts[0]); // Polia začínajú na 0. Nie 1.
    }
}
```

#### Vkladanie nových údajov a načítanie existujúcich údajov

```js
// Použijme ID hráča v 'social club-u' (Rockstarov Social Club) na vybavenie niektorých vecí.
// VYSOKO sa odporúča NEROBIŤ to.
// Použite to len ako príklad.
const socialclub = player.socialId;

// Načíta všetky účty, ktoré zodpovedajú 'social club' ID.
const accounts = await db.fetchAllByField('socialclub', socialclub, 'accounts');
let account;

// Skontrolujte, či neexistujú žiadne účty s týmto ID.
if (accounts.length <= 0) {
    // Vytvorte dokument pre hráča.
    const newDocument = {
        username: player.name,
        socialclub,
        lastip: player.ip,
        bank: 9000,
        cash: 9000,
        logins: 0
    };

    // Týmto sa vloží nový objekt dokumentu. Potom vráti nový dokument s jeho _id
    // (DocumentObject, CollectionName, returnDocument?)
    account = await db.insertData(newDocument, 'accounts', true);
} else {
    // Týmto sa priradí jediný dokument, ktorý sme našli, ak existuje. Do premennej účtu.
    account = accounts[0];
}
```

#### Aktualizácia údajov pre hráča

```js
// Aktualizácia adresy IP pri každom prihlásení.
// Áno, maximálny *healt* hráča je 200.
await db.updatePartialData(account._id, { health: 200 }, 'accounts');

// Môžete tiež aktualizovať viac súborov dát hráča naraz.
await db.updatePartialData(account._id, { health: player.health, armour: player.armour  }, 'accounts');

// Objekt player.data môžete tiež aktualizovať jeho rozšírením do nadradeného objektu.
// Toto je známe ako `Uložiť všetko`.
await db.updatePartialData(account._id, { ...player.data  }, 'accounts');
```

#### Nastavenie objektu `player.data`

To len odporúčam, pretože takto je veľmi ľahké spravovať dáta v prehrávači.

Nezabudnite, že údaje priradené prehrávaču nemožno zdieľať medzi *resource-ami* servera.

```js
// Skontrolujte ID hráča. Toto je jedinečné na základe vyhľadávania v 'social club-u'.
// 'social club' môžete určite nahradiť používateľským menom.
// Pokračujme a načítame údaje nadol na základe ID.
const account = await db.fetchData('_id', account._id, 'accounts');

// Ak nepoznáte vyhľadávanie ID prostredníctvom iných dátových typov.
// ako používateľské mená, e-maily atď.
/*
    Toto by malo vrátiť štruktúru podobnú nasledujúcej.
    {
       _id,
       username,
       socialclub,
       lastip,
       logins,
        bank
    }
*/

// Teraz, keď máme účet, v ktorom sú nejaké údaje. Hovorme o prístupe a aktualizácii údajov.
// Ak používate jeden resource. Použite tento resource.
player.data = account;
```

### player.data aktualizačný vzor

Toto je skutočne jednoduchý vzor na zaistenie efektivity vašej databázy.

Mali by ste čítať zo svojej databázy iba raz za čas a nie stále.

```js
// Predpokladajme, že pokračujeme s kódom vytvoreným v snippet-e vyššie.
player.data.money += 500;
player.data.bank -= 500;

player.setSyncedMeta('money', player.data.money);
player.setSyncedMeta('bank', player.data.bank);

// Aktualizácia peňazí a bankových údajov.
await db.updatePartialData(player.data._id, { money: player.data.money, bank: player.data.bank  }, 'accounts');
```

Celkom ľahko aktualizovať a spravovať!

Môžete to vylepšiť použitím prototypov na prehrávači na rozšírenie ich funkčnosti.

```js
alt.Player.prototype.saveField = async function(fieldName, fieldValue, sync = false) {
	if (sync) {
        this.setSyncedMeta(fieldName, this.data[fieldName]);
    }

    await db.updatePartialData(this.data._id, { [fieldName]: fieldValue }, 'accounts');
}
```

Potom môžete jednoducho zavolať odkiaľkoľvek v rámci jedného *resource-u*. Celkom pekné.

```js
player.saveField('money', player.data.money, true);
```

#### Odstránenie dokumentu

Dokumenty môžete odstrániť zadaním `_id`.

```js
await db.deleteById(player.data._id, 'accounts');
```
