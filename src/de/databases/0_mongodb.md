# MongoDB

MongoDB ist ein NoSQL Datenbanksystem, die sehr simpel zu bedienen ist. Es wird sehr empfohlen es in JavaScript Umgebungen zu verwenden, da es einwandfrei mit TypeScript und JavaScript funktioniert.
Man kann ganz einfach beginnen es zu verwenden und es gibt einige gute ORM's die einem dabei helfen.

MongoDB kann mit Datenbanksystemen wie MySQL, MariaDB, PosteSQL, etc. mithalten.

## Simply Mongo

Simply Mongo ist ein kleines Package von Stuyk zum einfachen verwalten von MongoDB Datenbanken und sollte für den durchschnittlichen Entwickler komplett ausreichen.
Es wurde erstellt um neuen Enwicklern zu helfen MongoDB zu verwenden ohne einen großen Kopf darum machen zu müssen.

 [Mehr Informationen gibt es im offiziellen Repository](https://www.npmjs.com/package/simplymongo)

### Installation per Kommandozeile

```js
$ npm install simplymongo
```

### Wie setze ich meine Datenbank in JS auf

Dies ist der empfohlene Weg um MongoDB in alt:V Serverside zu verwenden. Dies sollte in der Datei `startup.js` (oder dergleichen) sein.

**startup.js - server side**

Dies ist die Hauptdatei deiner Resource.

Hier sollte man die Datenbankverbindung erstellen.

```js
import * as sm from 'simplymongo';

sm.onReady(establishConnection);

async function establishConnection() {
    import('./bigImportFile.js');
    // Hier muss man den import nicht awaiten, als Randinformation
}

new sm.Database('mongodb://localhost:27017', 'mydb', ['accounts', 'characters']);
// new sm.Database('mongodb://localhost:27017', 'mydb', ['accounts', 'characters'], 'username', 'password');
```

**bigImportFile.js - server side**

Dies ist die Datei die geladen wird nachdem die Datenbank verbunden ist und verwendet werden kann.

```js
import('./someFile.js'); // Diese Datei verwendet beispielweise unsere Datenbankverbindung
import('./someOtherFile.js');
```

**someFile.js - server side**

Diese Datei stellt uns einen einfachen Weg bereit um unsere Datenbank in anderen Dateien zu verwenden.

```js
import alt from 'alt-server';
import * as sm from 'simplymongo';

const db = sm.getDatabase();
```

### Wie verwende ich meine Datenbank

Nachdem du deine [Datenbank aufgesetzt hast](#Wie setze ich meine Datenbank in JS auf) solltest du `sm.getDatabase()` verwenden um deine Datenbankverbindung zu erhalten.

Damit können wir dann mit unserer Datenbank kommunizieren.

#### Vorhandene Datenbankverbindung erhalten

```js
import alt from 'alt-server';
import * as sm from 'simplymongo';

const db = sm.getDatabase();
```

#### Verstehen was das await Keyword bedeutet

Hier eine kleine Einführung um das Grundwissen über asynchrone Events zu erhalten.

```js
alt.on('playerConnect', handleAsyncEvent);

// <----- Wir verwenden das async Keyword um zu sagen dass unsere Funktion das await Keyword verwenden wird
async function handleAsyncEvent(player) {
    // Diese Funktion wird eine seperates Event erstellen das wartet bis dieses Event fertig ist.
    // Dies blockiert aber nicht das mehrere aufrufen dieser Funktion.
    // Du kannst diese Funktion so oft ausführen wie du willst, es wird niemals deinen anderen Code blockieren.
	const accounts = await db.fetchAllByField('socialclub', player.socialId, 'accounts');
    
    if (accounts.length >= 1) {
        console.log(`Wir haben ein Dokument gefunden!`)
        console.log(accounts[0]); // Arrays starten bei 0, nicht bei 1.
    }
}
```

#### Neue Daten einfügen und bestehende Daten erhalten

```js
// Als Beispiel verwenden wir die Social Club id vom Spieler um einige Dinge zu vereinfachen.
// Dies sollte man in der Realität NIEMALS wirklich tun! 
// Dies ist nur ein Beispiel.
const socialclub = player.socialId;

// Wir suchen nach allen Accounts die unsere gesuchte Social Club id haben
const accounts = await db.fetchAllByField('socialclub', socialclub, 'accounts');
let account;

// Wir überprüfen ob kein Account mit dieser Social Club id existiert
if (accounts.length <= 0) {
    // Wir erstellen ein neues Dokument für den Spieler.
    const newDocument = {
        username: player.name,
        socialclub,
        lastip: player.ip,
        bank: 9000,
        cash: 9000,
        logins: 0
    };

    // Dies erstellt ein neues Dokumentenobjekt in der Datenbank und gibt es uns mit der erstellten ID wieder zurück.
    // (DocumentObject, CollectionName, returnDocument?)
    account = await db.insertData(newDocument, 'accounts', true);
} else {
    // Hier setzen wir den gefundenen Account zu unserer account Variable, falls ein Account gefunden wurde.
    account = accounts[0];
}
```

#### Daten für einen Spieler aktualisieren

```js
// Wir aktualisieren die IP des Spielers bei jedem Login.
// Die normale Max HP ist 200.
await db.updatePartialData(account._id, { health: 200 }, 'accounts');

// Man kann auch mehrere Sachen gleichzeitig aktualisieren.
await db.updatePartialData(account._id, { health: player.health, armour: player.armour  }, 'accounts');

// Man kann auch die Daten speichern indem man Object Spread verwendet,
// Dies bezeichnet man als `Save All`.
await db.updatePartialData(account._id, { ...player.data  }, 'accounts');
```

#### Verwendung von einem `player.data` Objekt

Dies wird empfohlen da es damit einfacher ist die Daten eines Spielers zu verwalten.

Man darf aber nicht vergessen das diese Daten nicht über mehrere Ressourcen geteilt wird.

```js
// Wir überprüfen die ID des Spielers. Dies ist ein eindeutiger Identifikator der auf unserem Social Club id System basiert.
// Man kann die Social club id auch mit dem Nutzernamen ersetzen.
// Wir holen uns nun also die Daten mit unserer ID.
const account = await db.fetchData('_id', account._id, 'accounts');

// Wenn du nicht weißt was eine ID ist, guck dir die anderen Datentypen an.
// Wie Nutzernamen, Emails etc.
/*
    Dies sollte eine Struktur wie dies zurückgeben:
    {
       _id,
       username,
       socialclub,
       lastip,
       logins,
        bank
    }
*/

// Nun haben wir einen account mit Daten. Nun müssen wir diese Daten auch noch erhalten und aktualisieren.
// Wenn man nur eine Ressource verwendet sollte man es so machen.
player.data = account;
```

### Aktualisieren von Daten mit player.data

Dies ist ein simpler Weg um die Datenbank so effizient wie möglich zu halten.

Man sollte die Daten aus der Datenbank nur so oft auslesen wie benötigt.

```js
// Wir nehmen an dass wir mit dem Snippet von oben weitermachen.
player.data.money += 500;
player.data.bank -= 500;

player.setSyncedMeta('money', player.data.money);
player.setSyncedMeta('bnak', player.data.bank);

// Wir aktualisieren das Bargeld und das Geld auf dem Konto
await db.updatePartialData(player.data._id, { money: player.data.money, bank: player.data.bank  }, 'accounts');
```

Nun können wir ganz einfach unsere Daten aktualisieren und verwalten!

Wir können das noch weiter verbessern indem wir den Prototype des Spielers erweitern.

```js
alt.Player.prototype.saveField = async function(fieldName, fieldValue, sync = false) {
	if (sync) {
        this.setSyncedMeta(fieldName, this.data[fieldName]);
    }

    await db.updatePartialData(this.data._id, { [fieldName]: fieldValue }, 'accounts');
}
```

Dann kann man das nun so überall in der Ressource verwenden. Ziemlich einfach.

```js
player.saveField('money', player.data.money, true);
```

#### Daten löschen

Wir können einen Account löschen indem wir die `_id` des Accounts angeben.

```js
await db.deleteById(player.data._id, 'accounts');
```