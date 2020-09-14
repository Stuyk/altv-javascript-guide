# MongoDB

If you have never used a NoSQL database before. You should definitely check out MongoDB.

It's pretty much SQL without an ORM and the whole SQL language.

Yet it can scale just as large as an SQL server without issue.

## Simply Mongo

This is a small repository that I have created that lets you utilize a very simple database handler that is more than enough for the average developer. It was solely created to help new developers who want to just store data without overthinking it.

Read up on what it offers here: [https://www.npmjs.com/package/simplymongo](https://www.npmjs.com/package/simplymongo)

Install By Command

```js
$ npm install simplymongo
```

### How to Initialize Your Database

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

Using your database is quite simple.

The above example on database instance fetching should be enough to get you started.

If you wish to insert data into your database. You need to create an object.

```js
import alt from 'alt-server';
import * as sm from 'simplymongo';

const db = sm.getDatabase();

alt.on('playerConnect', playerConnect);

// This must be async to use await.
async function playerConnect(player) {
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
            bank: 0,
            logins: 0
        };

        // This will insert a new document object. Then return the new document with its _id
        account = await db.insertData(newDocument, 'accounts', true);
    } else {
        account = accounts[0];
    }

    // Update the IP on each login.
    await db.updatePartialData(account._id, { lastip: player.ip }, 'accounts');

    // Check the ID of the player. This is unique based on the social club lookup.
    // You can definitely replace social club with username.
    // Lets go ahead and fetch the data down based on the id.
    account = await db.fetchData('_id', account._id, 'accounts');

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

    // Now you update player properties for data from anywhere in your single resource.
    player.data.logins += 1;
    player.data.bank += 25;

    // Then you can save this data in two ways.
    await db.updatePartialData(account._id, { logins: player.data.logins, bank: player.data.bank }, 'accounts');

    // You can also save all player data at once.
    await db.updatePartialData(account._id, { ...player.data }, 'accounts');

    // You should NOT be pulling data from the database often.
    // You should be updating the local data property on the player. Then saving that change to the database.

    // If you ever need to delete an entry in the databse.
    await db.deleteById(account._id, 'accounts');
}
```

It's relatively easy to update the database with this small addon.
