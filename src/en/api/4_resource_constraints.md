# Single Resource vs Multi

Dependent on what direction you want to take your project you may be asking yourself if you should go with a single resource or multiple resources that can be toggled on and off. 

It's good to keep in mind that additional resources will receive their own thread.

Let's first look at some of the limitations of a multi-resource setup.

## Multi Resource Limitations

A limitation will be defined as what may cause a headache or a nuisance when building out your game mode.

### Prototypes Are Not Shared

If you enjoy extending the functionality of individual classes to add new functionality then a Multi Resource system is not going to help you very much. Let's talk about why that is.

Assume you have this prototype.

```js
alt.Player.local.addMoney = function addMoney(amount) {
    if (isNaN(amount)) {
        return false;
    }

	if (!this.money) {
        this.money = amount;
    } else {
        this.money += amount;
    }
    
    return true;
}
```

You will now only have access to the `addMoney` function in the resource that it is written in. 

There is no way for you to port this function to another resource and that is because variables are also no shared between resources.

### Custom Properties Are Not Shared

Ever wonder why `setMeta` and `getMeta` exist? This is why.

With the function above we can add money to the player but what if we want to get it in another resource?

Let's take a look at what your code might look like now.

```js
// Exporting this function because we can import it into other resources.
export function addMoney(amount) {
    if (isNaN(amount)) {
        return false;
    }
	
    if (!this.hasMeta('money')) {
        this.setMeta('money', amount);
    } else {
        let currentAmount = this.getMeta('money');
        currentAmount += amount;
    	this.setMeta('money', currentAmount);
    }
}

// Exporting this function because we can import it into other resources.
export function getMoney(amount) {
    if (!this.hasMeta('money')) {
        return 0;
    }
    
    return this.getMeta('money');
}
```

As you can see we've created two new functions that can be imported into any other resource as long as this resource is set as a dependency for the resource where we want to add and get money.

This is all fine and dandy but the only benefit of this would be the threads that are integrated at a lower level in C++.

Why bother with splitting all of this up and adding more headache to your project when you can do it all in a single resource (Not a single file. That's actually a horrible idea. This is not SAMP)

## Single Resource Limitations

Obviously the biggest thing you're going to miss when going with a single resource is the threads. However, most people making resources are likely not going to need them. This includes those of you who are writing roleplay game modes and want to pursue 'best practices'.

### Loss of State

When you restart a single resource. You lose the state of the resource that is storing state inside of it.

Meaning that you will need to reconnect to re-stablish your state.

An example would be `player.money` being 500 prior to restarting a resource.

Then `player.money` being 0 after restarting the resource because you did not setup your player state again.

### File Structure Maintenance

If you are building a very large game mode you are going to have a very large resource. Which means that if you do not have a very good folder structure you may find yourself struggling to keep all of your code organized. This is one of the major reasons why people will opt-in for a multi-resource system.

I've found that one of my favorite folder structures is as follows.

#### Client Folder Structure

```sh
├───anticheat 				# A folder for anticheat related systems.
├───events				    # A folder for handling client-side events only.
├───gamedata			    # A folder for object data related to the game.
├───html				    # A folder for all HTML/VUE interfaces.
│   ├───atm
│   ├───charactereditor
│   ├───characterselect
│   ├───clothing
│   ├───hud
│   ├───help
│   ├───inventory
│   ├───login
├───systems					# A folder of files with corresponding functionality on server-side.
│   ├───inventorySystem.js	 	# Handles general inventory functionality.
│   └───vehicleSystem.js		# Handles general vehicle functionality. ie. setIntoVehicle
├───utility					# Math Functions and Such
└───views					# Where you call all your WebView creation and removal.
    ├───atm.js				# Handles working with ATM's on client-side.
    └───chat.js				# Handles working with chat on client-side.
```

Keep in mind that individual folders can expand into more folders.

However, the trick with this folder structure is to keep a similar file name on the server-side so you know which files corresponds with which system.

#### Server Folder Structure

```sh
├───commands				# Different command handlers.
│   ├───cmdPlayer.js 			# Commands for players specifically.
│   └───cmdVehicle.js			# Commands for vehicles specifically.
├───configuration			# Anything configuration related. Spawn points, presets, etc.
├───events				    # Used to handle server-side events only.
├───extensions				# Prototypes for different alt:V API classes.
│   ├───player.js
│   ├───vehicle.js
│   └───colshape.js
├───gamedata
├───systems					# A folder of files with corresponding clones on client-side.
│   ├───inventorySystem.js	 	 # Handles general inventory functionality.
│   └───vehicleSystem.js		 # Handles general vehicle functionality. ie. setIntoVehicle
├───utility					# Math Functions and Such
└───views					# Corresponding folder that handles view functionality on server-side.
    ├───atm.js				# Handles working with ATM's on server-side.
    └───chat.js 			# A server side chat handler for routing messages.
```

## An Opinion

I believe that the added functionality of Prototypes greatly outweighs all of the downsides a single resource may have. With a good folder system and a good understanding of your code base it's very easy to work with a single resource as long as you split up your files into individual systems with corresponding names on both client and server side.

Most developers working with JavaScript on alt:V often opt out of using multi-resource solely because of this reason.

