# MongoDB

MongoDB este o bază de date NoSQL care este incredibil de simplă de utilizat. Este foarte recomandat pentru mediile bazate pe JavaScript, deoarece lucrul cu MongoDB este o experiență perfectă în Typescript și JavaScript. Este ușor de început și există câteva ORM-uri bune care vă vor ajuta cu gestionarea bazei de date.

MongoDB poate concura cu MySQL, MariaDB, PostgreSQL, etc.

## Simply Mongo

Acesta este un mic repository pe care l-am creat, care vă permite să utilizați un simplu handler pentru baza de date, care este mai mult decât suficient pentru un dezvoltator. A fost creat excluziv pentru a ajuta noii dezvoltatori care doresc să stocheze date fără a le gândi prea mult.

[Citiți mai mult despre Simply Mongo's NPM Package](https://www.npmjs.com/package/simplymongo)

### Install by Command

```js
$ npm install simplymongo
```

### Cum să inițializați baza de date

Probabil că veți dori să utilizați acest model în fișierul dvs. `startup.js`din server-side.

**startup.js - server side**

Acesta este punctul principal de intrare pentru o resursă.

Aici ar trebui să inițializați baza de date.

```js
import * as sm from 'simplymongo';

sm.onReady(establishConnection);

async function establishConnection() {
    import('./bigImportFile.js');
    // Nu trebuie să așteptați vreunul dintre acestea pentru a le încărca. Doar un fyi.
}

new sm.Database('mongodb://localhost:27017', 'mydb', ['accounts', 'characters']);
// new sm.Database('mongodb://localhost:27017', 'mydb', ['accounts', 'characters'], 'username', 'password');
```

**bigImportFile.js - server side**

Acesta este un fișier care trebuie încărcat după ce baza de date este conectată și gata de utilizare.

```js
import('./someFile.js'); // Să presupunem că aceasta are o instanță db.
import('./someOtherFile.js');
```

**someFile.js - server side**

Acest fișier va reprezenta o modalitate de a obține în siguranță o bază de date în orice alt fișier încărcat după fișierul `startup.js`.

```js
import alt from 'alt-server';
import * as sm from 'simplymongo';

const db = sm.getDatabase();
```

### Cum să utilizați baza de date

După [inițializarea bazei de date și încărcarea următorului fișier](#cum-sa-initializati-baza-de-date) ar trebui să începeți să utilizați `sm.getDatabase()` pentru a prelua instanța bazei de date.

Acesta este modul în care începem să comunicăm cu baza noastră de date și îi trimitem instrucțiuni.

#### Preluarea conexiunii la baza de date existentă

```js
import alt from 'alt-server';
import * as sm from 'simplymongo';

const db = sm.getDatabase();
```

#### Înțelegeți ce înseamnă Await

Foarte rapid, este important să aveți o înțelegere de bază a evenimentelor de asincronizare.

```js
alt.on('playerConnect', handleAsyncEvent);

// <----- Folosim acest identificator pentru a spune funției că urmează să folosim `await`.
async function handleAsyncEvent(player) {
    // Această funcție va genera un eveniment separat în care așteaptă să returneze acest eveniment.
    // Aceasta nu va împiedica apelarea acestei funcții de mai  multe ori.
    // De fapt, puteți apela această funcție oricât doriți și nu va reține niciodată alt cod.
    const accounts = await db.fetchAllByField('socialclub', player.socialId, 'accounts');

    if (accounts.length >= 1) {
        console.log(`You found a document!`);
        console.log(accounts[0]); // Matricile încep de la 0. Nu 1. Muie LUA!
    }
}
```

#### Inserarea datelor noi și preluarea datelor existente

```js
// Să folosim socialClub ID-ul player-ului pentru a face niște lucruri.
// Este foarte recomandat să NU faceți acest lucru.
// Folosește-l doar ca pe un exemplu.
const socialclub = player.socialId;

// Obțineți toate conturile care se potrivesc cu socialClub ID-ul.
const accounts = await db.fetchAllByField('socialclub', socialclub, 'accounts');
let account;

// Verificați dacă nu există conturi la acest socialClub.
if (accounts.length <= 0) {
    // Construiți un document pentru player.
    const newDocument = {
        username: player.name,
        socialclub,
        lastip: player.ip,
        bank: 9000,
        cash: 9000,
        logins: 0
    };

    // Aceasta va insera un nou obiect document. Apoi returnează noul document cu _id-ul său.
    // (DocumentObject, CollectionName, returnDocument?)
    account = await db.insertData(newDocument, 'accounts', true);
} else {
    // Aceasta va atribui singurul document pe care l-am găsit dacă există. La variabila `account`.
    account = accounts[0];
}
```

#### Actualizarea datelor unui jucător

```js
// Actualizați adresa IP la fiecare autentificare.
// Da, viața maximă a unui jucător este 200.
await db.updatePartialData(account._id, { health: 200 }, 'accounts');

// Puteți actualiza simultan mai multe seturi de date pentru un jucător.
await db.updatePartialData(account._id, { health: player.health, armour: player.armour }, 'accounts');

// De asemenea, puteți actualiza un obiect player.data răspândindu-l în parent object.
// Acest lucru este cunoscut sub numele de `Save All`.
await db.updatePartialData(account._id, { ...player.data }, 'accounts');
```

#### Configurarea unui obiect `player.data`

Recomand acest lucru doar deoarece este foarte ușor să gestionați datele de pe un player în acest fel.

Rețineți că datele atribuite unui jucător nu pot fi partajate între resursele serverului.

```js
// Verificați ID-ul jucătorului. Acest lucru este unic pe baza căutării socialClub.
// Puteți înlocui cu siguranță socialClub-ul cu username-ul.
// Să mergem mai departe și să preluăm datele în funcție de ID.
const account = await db.fetchData('_id', account._id, 'accounts');

// Dacă nu cunoasteți ID-ul, puteți încerca cu alte tipuri de date.
// De exemplu, usernames, email, etc.
/*
    Aceasta ar trebui să returneze o structură similară cu următoarea.
    {
       _id,
       username,
       socialclub,
       lastip,
       logins,
        bank
    }
*/

// Acum, că avem un cont cu câteva date. Să vorbim despre accesarea și actualizarea datelor.
// Dacă folosiți o sigură resursă. Folosiți acest model.
player.data = account;
```

### Modelul de actualizare player.data

Acesta este un model foarte simplu pentru a vă menține baza de date eficientă.

Ar trebui să citești din baza de date doar din când în când și nu tot timpul.

```js
// Să presupunem că continuăm cu codul creat în fragmentul de mai sus.
player.data.money += 500;
player.data.bank -= 500;

player.setSyncedMeta('money', player.data.money);
player.setSyncedMeta('bnak', player.data.bank);

// Actualizați banii și datele bancare.
await db.updatePartialData(player.data._id, { money: player.data.money, bank: player.data.bank }, 'accounts');
```

Destul de ușor de actualizat și gestionat!

Puteți îmbunătăți acest lucru folosing Prototyping pe un Player pentru a le extinde funcționalitatea.

```js
alt.Player.local.prototype.saveField = async function(fieldName, fieldValue, sync = false) {
    if (sync) {
        this.setSyncedMeta(fieldName, this.data[fieldName]);
    }

    await db.updatePartialData(this.data._id, { [fieldName]: fieldValue }, 'accounts');
};
```

Apoi puteți pur si simplu apela de oriunde din interiorul unei singure resurse. Destul de drăguț.

```js
player.saveField('money', player.data.money, true);
```

#### Ștergerea unui document

Puteți șterge documente cu ajutorul unui `_id`.

```js
await db.deleteById(player.data._id, 'accounts');
```
