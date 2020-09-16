# MongoDB

MongoDB is a NoSQL database that is incredibly simple to use. It is highly recommended for JavaScript based environments as working with MongoDB is a seamless experience in Typescript, and JavaScript. It's easy to get started with and there are a few good ORM's that will assist you with managing your database.

MongoDB can compete with the likes of MySQL, MariaDB, PostgreSQL, etc.

## Simply Mongo

This is a small repository that I have created that lets you utilize a very simple database handler that is more than enough for the average developer. It was solely created to help new developers who want to just store data without overthinking it.

 [Read More on Simply Mongo's NPM Package](https://www.npmjs.com/package/simplymongo)

### Install by Command

```js
$ npm install simplymongo
```

### How to Initialize your Database

You'll likely want to use this pattern in your `startup.js` file on your server-side.

**startup.js - server side**

This is the main entry point for a resource.

This is where you should define a new Database.

```js
import * as sm from 'simplymongo';

sm.onReady(establishConnection);

async function establishConnection() {
    import('./bigImportFile.js');
    // You don't have to actually wait on any of these to load. Just an fyi.
}

new sm.Database('mongodb://localhost:27017', 'mydb', ['accounts', 'characters']);
// new sm.Database('mongodb://localhost:27017', 'mydb', ['accounts', 'characters'], 'username', 'password');
```

**bigImportFile.js - server side**

This is a file that should be loaded after the database is connected and ready for use.

```js
import('./someFile.js'); // Let's say this one has a db instance in it.
import('./someOtherFile.js');
```

**someFile.js - server side**

This file will represent a way to safely obtain a database in any other file loaded after the `startup.js` file.

```js
import alt from 'alt-server';
import * as sm from 'simplymongo';

const db = sm.getDatabase();
```

### How to Use Your Database

After [initializing your database and loading your next file](#How to Initialize your Database) you should start using `sm.getDatabase()` to fetch your database instance.

This is how we begin speaking with our database and sending it instructions.

#### Fetching your Existing Database Connection

```js
import alt from 'alt-server';
import * as sm from 'simplymongo';

const db = sm.getDatabase();
```

#### Understand what Await Means

Real quick it's important you have a basic understanding of Asynchronization Events

```js
alt.on('playerConnect', handleAsyncEvent);

// <----- We use this identifier to tell the function it is meant to use 'await'.
async function handleAsyncEvent(player) {
	// This function will spin up a seperate event where it waits to return this event.
    // This will not block this function from being called multiple times.
    // In fact you can call this function as much as you want and it'll never hold up any other code.
	const accounts = await db.fetchAllByField('socialclub', player.socialId, 'accounts');
    
    if (accounts.length >= 1) {
        console.log(`You found a document!`)
        console.log(accounts[0]); // Arrays start at 0. Not 1. Fuck lua.
    }
}
```

#### Inserting New Data and Fetching Existing Data

```js
// Let's use the player's social club id to handle some things.
// It is HIGHLY recommended to NOT do this.
// Just use this as an example.
const socialclub = player.socialId;

// Fetch all accounts that match the social club id.
const accounts = await db.fetchAllByField('socialclub', socialclub, 'accounts');
let account;

// Check if no accounts exist with this social club.
if (accounts.length <= 0) {
    // Construct a document for the player.
    const newDocument = {
        username: player.name,
        socialclub,
        lastip: player.ip,
        bank: 9000,
        cash: 9000,
        logins: 0
    };

    // This will insert a new document object. Then return the new document with its _id
    // (DocumentObject, CollectionName, returnDocument?)
    account = await db.insertData(newDocument, 'accounts', true);
} else {
    // This will assign the only document we found if it exists. To the account variable.
    account = accounts[0];
}
```

#### Updating Data for a Player

```js
// Update the IP on each login.
// Yes player max health is 200.
await db.updatePartialData(account._id, { health: 200 }, 'accounts');

// You can also update multiple sets of data for a player at once.
await db.updatePartialData(account._id, { health: player.health, armour: player.armour  }, 'accounts');

// You can also update a player.data object by spreading it into the parent object.
// This is known as `Save All`.
await db.updatePartialData(account._id, { ...player.data  }, 'accounts');
```

#### Setting up a `player.data` Object

I only recommend this because it's very easy to manage data on a player this way.

Just keep in mind that data assigned to a player cannot be shared across server resources.

```js
// Check the ID of the player. This is unique based on the social club lookup.
// You can definitely replace social club with username.
// Lets go ahead and fetch the data down based on the id.
const account = await db.fetchData('_id', account._id, 'accounts');

// If you don't know an id lookup through other data types.
// Like usernames, emails, etc.
/*
    This should return a structure similar to the following.
    {
       _id,
       username,
       socialclub,
       lastip,
       logins,
        bank
    }
*/

// Now that we have account with some data in it. Let's talk about accessing and updating data.
// If you use a single resource. Use this pattern.
player.data = account;
```

### The player.data Update Pattern

This is a really simple pattern for keeping your database efficient.

You should only be reading from your database once in a while and not all of the time.

```js
// Assume we're continuing with the code created in the above snippet.
player.data.money += 500;
player.data.bank -= 500;

player.setSyncedMeta('money', player.data.money);
player.setSyncedMeta('bnak', player.data.bank);

// Update the money and bank data.
await db.updatePartialData(player.data._id, { money: player.data.money, bank: player.data.bank  }, 'accounts');
```

Pretty easy to update and manage!

You can improve this by using Prototyping on a Player to extend their functionality.

```js
alt.Player.local.prototype.saveField = async function(fieldName, fieldValue, sync = false) {
	if (sync) {
        this.setSyncedMeta(fieldName, this.data[fieldName]);
    }

    await db.updatePartialData(this.data._id, { [fieldName]: fieldValue }, 'accounts');
}
```

Then you can simply call from anywhere inside of a single resource. Pretty nice.

```js
player.saveField('money', player.data.money, true);
```

#### Deleting a Document

You can delete documents by supplying an `_id`.

```js
await db.deleteById(player.data._id, 'accounts');
```