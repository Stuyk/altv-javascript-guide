# Server Event Examples

This is a document that will provide an example for every server event. This is necessary to really ensure you get a firm grasp on how an event is triggered and handled.

## anyResourceError

This is triggered when you load a resource in your `server.cfg` and it **errors**.

-   resourceName is the name of a resource in your `server.cfg`

```js
alt.on('anyResourceError', handleEvent);

function handleEvent(resourceName) {
    console.log(`${resourceName} has failed to load.`);
}
```

## anyResourceStart

This is triggered when you load a resource in your `server.cfg` and it loads correctly.

-   resourceName is the name of a resource in your `server.cfg`

```js
alt.on('anyResourceStart', handleEvent);

function handleEvent(resourceName) {
    console.log(`${resourceName} has loaded.`);
}
```

## anyResourceStop

This is triggered when you forcefully stop a resource programmatically or through the console.

-   resourceName is the name of a resource in your `server.cfg`

```js
alt.on('anyResourceStop', handleEvent);

function handleEvent(resourceName) {
    console.log(`${resourceName} has been stopped. Restarting the resource.`);
    alt.restartResource(resourceName); // <-- This triggers the resource that stopped to restart automatically.
}
```

## consoleCommand

This is triggered when you type some data into your alt:V server console. It automatically separates your words after you press enter.

-   args is an Array of strings

```js
alt.on('consoleCommand', handleEvent);

function handleEvent(args) {
    const cmd = args[0];

    if (cmd !== 'kickall') {
        return;
    }

    // This kicks all players currently online.
    const players = [...alt.Player.all];
    for (let i = 0; i < players.length; i++) {
        if (!players[i] || !players[i].valid) {
            continue;
        }

        players[i].kick();
    }
}
```

Assume we typed the following:

```
kickall
```

## entityEnterColshape

If you want to check if a player enters a specific area on the server-side. You can use a ColShape.

They come in [various shapes and sizes](https://altmp.github.io/altv-typings/classes/_alt_server_.colshape.html) and we will be using a Cylinder in this example.

-   colshape can be any colshape where a player enters it.
-   entity can be a Vehicle or a Player.

```js
// Create a ColshapeCylinder
// (x, y, z, radius, height) Parameters
const cs = new alt.ColshapeCylinder(0, 0, 0, 3, 200);

// This is a fat arrow function we can access from the colshape's isntance.
cs.doSomething = player => {
    console.log(`You have a player in your grasp.`);
};

// Create the event.
alt.on('entityEnterColshape', handleEvent);

// Handle the event.
function handleEvent(colshape, entity) {
    // Strain out any Entities that are not a player.
    if (typeof entity !== alt.Player) {
        return;
    }

    // Check if the function exists. Then execute the function.
    if (typeof cs.doSomething === 'function') {
        cs.doSomething(entity); // <-- Calling the fat arrow function and passing the player.
    }
}
```

## entityLeaveColshape

If you want to check if a player leaves a specific area on the server-side. You can use a ColShape.

They come in [various shapes and sizes](https://altmp.github.io/altv-typings/classes/_alt_server_.colshape.html) and we will be using a Cylinder in this example.

-   colshape can be any colshape where a player enters it.
-   entity can be a Vehicle or a Player.

```js
// Create a ColshapeCylinder
// (x, y, z, radius, height) Parameters
const cs = new alt.ColshapeCylinder(0, 0, 0, 3, 200);

// This is a fat arrow function we can access from the colshape's isntance.
cs.doSomething = player => {
    console.log(`You no longer have a player in your grasp.`);
};

// Create the event.
alt.on('entityLeaveColshape', handleEvent);

// Handle the event.
function handleEvent(colshape, entity) {
    // Strain out any Entities that are not a player.
    if (typeof entity !== alt.Player) {
        return;
    }

    // Check if the function exists. Then execute the function.
    if (typeof cs.doSomething === 'function') {
        cs.doSomething(entity); // <-- Calling the fat arrow function and passing the player.
    }
}
```

## explosion

Explosion is a really unique event. In most servers they'll often turn off explosions. This is one of those events that you can throw a `return false` at the end to stop all explosions from doing damage on the server.

-   Entity is the source of the damage.
-   explosionType is a number.
-   position is the location of the explosion
-   exposionFx is the hash of the ScreenFx used for the explosion
-   target is who this explosion was targeted for.

```js
alt.on('explosion', handleEvent);

function handleEvent(entity, explosionType, position, explosionFxNumberOrHash, target?) {
    if (explosionType === 0) {
        return false; // Don't Do Damage to Players
    }

    return true; // Do Damage to Players
}
```

### Explosions Table

| Index | Explosion Name |
| ----- | -------------- |
| 0     | Grenade        |
| 1     | GrenadeL       |
| 2     | StickyBomb     |
| 3     | Molotov1       |
| 4     | Rocket         |
| 5     | TankShell      |
| 6     | HiOctane       |
| 7     | Car            |
| 8     | Plane          |
| 9     | PetrolPump     |
| 10    | Bike           |
| 11    | Steam          |
| 12    | Flame          |
| 13    | WaterHydrant   |
| 14    | GasCanister    |
| 15    | Boat           |
| 16    | ShipDestroy    |
| 17    | Truck          |
| 18    | Bullet         |
| 19    | SmokeGL        |
| 20    | SmokeG         |
| 21    | BZGas          |
| 22    | Flare          |
| 23    | GasCanister2   |
| 24    | Extinguisher   |
| 25    | ProgramAR      |
| 26    | Train          |
| 27    | Barrel         |
| 28    | Propane        |
| 29    | Blimp          |
| 30    | FlameExplode   |
| 31    | Tanker         |
| 32    | PlaneRocket    |
| 33    | VehicleBullet  |
| 34    | GasTank        |
| 35    | FireWork       |
| 36    | SnowBall       |
| 37    | ProxMine       |
| 38    | Valkyrie       |

## playerChangedVehicleSeat

This event is called when a player is shuffling from one seat to another.

-   player is a player instance of who is performing the shuffling.
-   vehicle is the vehicle that this is currently taking place in
-   oldSeat is the old seat the player was in.
-   newSeat is the new seat the player is in.

```js
alt.on('playerChangedVehicleSeat', handleEvent);

function handleEvent(player, vehicle, oldSeat, newSeat) {
    if (oldSeat === -1 && newSeat !== -1) {
        console.log(`${player.name} has left the driver's seat!`);
    }
}
```

### Seat Table

| Index | Description                                                 |
| ----- | ----------------------------------------------------------- |
| -1    | Driver                                                      |
| 0     | Front Right Passenger                                       |
| 1     | Back Left Passenger                                         |
| 2     | Back Right Passenger                                        |
| 3     | Further Back Left Passenger (Anything larger than 4 seats)  |
| 4     | Further Back Right Passenger (Anything larger than 4 seats) |

## playerConnect

This is the event that occurs when a player has connected to the server. The player can have their connection cancelled by running `player.kick()` command.

-   player is the player who joined the server.

```js
alt.on('playerConnect', handleEvent);

function handleEvent(player) {
    console.log(`${player.name} has joined the server.`);
    console.log(`${player.name} has will now see himself out.`);

    alt.setTimeout(() => {
        if (!player || !player.valid) {
            return;
        }

        player.kick();
    }, 5000);
}
```

## playerDamage

This is event that occurs when a player takes damage. Damage can be negated by adding back missing health.

It is recommended to not use this event in place of playerDeath. They have their own respective uses.

If you want body parts damaged and other information see [weaponDamage](#weaponDamage)

-   player is the player who is being damaged
-   attacker is the player who is attacking the player
-   weaponHash is the hash number for a weapon
-   damage is the damage done to the player

```js
alt.on('playerDamage', handleEvent);

function handleEvent(player, attacker, weaponHash, damage) {
    player.health += damage;

    if (player.health > 200) {
        player.health = 200;
    }

    if (player.health <= 100) {
        // They're dead
        player.spawn(player.pos.x, player.pos.y, player.pos.z);
    }

    return false; // This will negate all damage taken. It will not respawn a player.
}
```

## playerDeath

If you suddenly lose all of your health and die. This is the event that gets triggered.

-   player is the player who died.
-   attacker is the player who caused this player to die. It can sometimes be the player.
-   weaponHash is the hash of the weapon used.

```js
alt.on('playerDamage', handleEvent);

function handleEvent(player, attacker, weaponHash) {
    console.log(`${player.name} has died in the hands of ${attacker.name}.`);
    player.spawn(player.pos.x, player.pos.y, player.pos.z, 5000); // This will respawn the player in place after 5 seconds.
}
```

### Cause of Death Object

This is incredibly long and I really need to limit the size of these code blocks.

```js
const CauseOfDeath = {
    2460120199: 'Antique Cavalry Dagger',
    2508868239: 'Baseball Bat',
    4192643659: 'Bottle',
    2227010557: 'Crowbar',
    2725352035: 'Fist Ignore',
    2343591895: 'Flashlight',
    1141786504: 'Golf Club',
    1317494643: 'Hammer',
    4191993645: 'Hatchet',
    3638508604: 'Knuckle',
    2578778090: 'Knife',
    3713923289: 'Machete',
    3756226112: 'Switchblade',
    1737195953: 'Nightstick',
    419712736: 'Pipe Wrench',
    3441901897: 'Battle Axe',
    2484171525: 'Pool Cue',
    940833800: 'Stone Hatchet',
    453432689: 'Pistol',
    3219281620: 'Pistol MK2',
    1593441988: 'Combat Pistol',
    584646201: 'AP Pistol',
    911657153: 'Stun Gun',
    2578377531: 'Pistol .50',
    3218215474: 'SNS Pistol',
    2285322324: 'SNS Pistol MK2',
    3523564046: 'Heavy Pistol',
    137902532: 'Vintage Pistol',
    1198879012: 'Flare Gun',
    3696079510: 'Marksman Pistol',
    3249783761: 'Heavy Revolver',
    3415619887: 'Heavy Revolver MK2',
    2548703416: 'Double Action',
    2939590305: 'Up-n-Atomizer',
    324215364: 'Micro SMG',
    736523883: 'SMG',
    2024373456: 'SMG MK2',
    4024951519: 'Assault SMG',
    171789620: 'Combat PDW',
    3675956304: 'Machine Pistol',
    3173288789: 'Mini SMG',
    1198256469: 'Unholy Hellbringer',
    487013001: 'Pump Shotgun',
    1432025498: 'Pump Shotgun MK2',
    2017895192: 'Sawed-Off Shotgun',
    3800352039: 'Assault Shotgun',
    2640438543: 'Bullpup Shotgun',
    2828843422: 'Musket',
    984333226: 'Heavy Shotgun',
    4019527611: 'Double Barrel Shotgun',
    317205821: 'Sweeper Shotgun',
    3220176749: 'Assault Rifle',
    961495388: 'Assault Rifle MK2',
    2210333304: 'Carbine Rifle',
    4208062921: 'Carbine Rifle MK2',
    2937143193: 'Advanced Rifle',
    3231910285: 'Special Carbine',
    2526821735: 'Special Carbine MK2',
    2132975508: 'Bullpup Rifle',
    2228681469: 'Bullpup Rifle MK2',
    1649403952: 'Compact Rifle',
    2634544996: 'MG',
    2144741730: 'Combat MG',
    3686625920: 'Combat MG MK2',
    1627465347: 'Gusenberg Sweeper',
    100416529: 'Sniper Rifle',
    205991906: 'Heavy Sniper',
    177293209: 'Heavy Sniper MK2',
    3342088282: 'Marksman Rifle',
    1785463520: 'Marksman Rifle MK2',
    2982836145: 'RPG',
    2726580491: 'Grenade Launcher',
    1305664598: 'Smoke Grenade Launcher',
    1119849093: 'Minigun',
    2138347493: 'Firework Launcher',
    1834241177: 'Railgun',
    1672152130: 'Homing Launcher',
    125959754: 'Compact Grenade Launcher',
    3056410471: 'Ray Minigun',
    2481070269: 'Grenade',
    2694266206: 'BZ Gas',
    4256991824: 'Smoke Grenade',
    1233104067: 'Flare',
    615608432: 'Molotov',
    741814745: 'Sticky Bomb',
    2874559379: 'Proximity Mine',
    126349499: 'Snowball',
    3125143736: 'Pipe Bomb',
    600439132: 'Baseball',
    883325847: 'Jerry Can',
    101631238: 'Fire Extinguisher Ignore',
    4222310262: 'Parachute Ignore',
    2461879995: 'Electric Fence Ignore',
    3425972830: 'Hit by Water Cannon Ignore',
    133987706: 'Vehicle Death Ignore',
    2741846334: 'Vehicle Death Ignore',
    3452007600: 'Fall Ignore',
    4194021054: 'Animal Ignore',
    324506233: 'Airstrike Rocket',
    2339582971: 'Bleeding Ignore',
    2294779575: 'Briefcase Ignore',
    28811031: 'Briefcase 02 Ignore',
    148160082: 'Cougar Ignore',
    1223143800: 'Barbed Wire Ignore',
    4284007675: 'Drowning Ignore',
    1936677264: 'Drowning In Vehicle Ignore',
    539292904: 'Explosion Ignore',
    910830060: 'Exhaustion Ignore',
    3750660587: 'Fire Ignore',
    341774354: 'Vehicle Heli Crash Ignore',
    3204302209: 'Vehicle Rocket Ignore',
    2282558706: 'Vehicle Akula Barrage Ignore',
    431576697: 'Vehicle Akula Minigun Ignore',
    2092838988: 'Vehicle Akula Missile Ignore',
    476907586: 'Vehicle Akula Turret Dual Ignore',
    3048454573: 'Vehicle Akula Turret Single Ignore',
    328167896: 'Vehicle APC Cannon Ignore',
    190244068: 'Vehicle APC MG Ignore',
    1151689097: 'Vehicle APC Missile Ignore',
    3293463361: 'Vehicle Ardent MG Ignore',
    2556895291: 'Vehicle Avenger Cannon Ignore',
    2756453005: 'Vehicle Barrage Rear GL Ignore',
    1200179045: 'Vehicle Barrage Rear MG Ignore',
    525623141: 'Vehicle Barrage Rear Minigun Ignore',
    4148791700: 'Vehicle Barrage Top MG Ignore',
    1000258817: 'Vehicle Barrage Top Minigun Ignore',
    3628350041: 'Vehicle Bombushka Cannon Ignore',
    741027160: 'Vehicle Bombushka Dual MG Ignore',
    3959029566: 'Vehicle Cannon Blazer Ignore',
    1817275304: 'Vehicle Caracara MG Ignore',
    1338760315: 'Vehicle Caracara Minigun Ignore',
    2722615358: 'Vehicle Cherno Missile Ignore',
    3936892403: 'Vehicle Comet MG Ignore',
    2600428406: 'Vehicle Deluxo MG Ignore',
    3036244276: 'Vehicle Deluxo Missile Ignore',
    1595421922: 'Vehicle Dogfighter MG Ignore',
    3393648765: 'Vehicle Dogfighter Missile Ignore',
    2700898573: 'Vehicle Dune Grenade Launcher Ignore',
    3507816399: 'Vehicle Dune MG Ignore',
    1416047217: 'Vehicle Dune Minigun Ignore',
    1566990507: 'Vehicle Enemy Laser Ignore',
    1987049393: 'Vehicle Hacker Missile Ignore',
    2011877270: 'Vehicle Hacker Missile Homing Ignore',
    1331922171: 'Vehicle Halftrack Dual MG Ignore',
    1226518132: 'Vehicle Halftrack Quad MG Ignore',
    855547631: 'Vehicle Havok Minigun Ignore',
    785467445: 'Vehicle Hunter Barrage Ignore',
    704686874: 'Vehicle Hunter Cannon Ignore',
    1119518887: 'Vehicle Hunter MG Ignore',
    153396725: 'Vehicle Hunter Missile Ignore',
    2861067768: 'Vehicle Insurgent Minigun Ignore',
    507170720: 'Vehicle Khanjali Cannon Ignore',
    2206953837: 'Vehicle Khanjali Cannon Heavy Ignore',
    394659298: 'Vehicle Khanjali GL Ignore',
    711953949: 'Vehicle Khanjali MG Ignore',
    3754621092: 'Vehicle Menacer MG Ignore',
    3303022956: 'Vehicle Microlight MG Ignore',
    3846072740: 'Vehicle Mobileops Cannon Ignore',
    3857952303: 'Vehicle Mogul Dual Nose Ignore',
    3123149825: 'Vehicle Mogul Dual Turret Ignore',
    4128808778: 'Vehicle Mogul Nose Ignore',
    3808236382: 'Vehicle Mogul Turret Ignore',
    2220197671: 'Vehicle Mule4 MG Ignore',
    1198717003: 'Vehicle Mule4 Missile Ignore',
    3708963429: 'Vehicle Mule4 Turret GL Ignore',
    2786772340: 'Vehicle Nightshark MG Ignore',
    1097917585: 'Vehicle Nose Turret Valkyrie Ignore',
    3643944669: 'Vehicle Oppressor MG Ignore',
    2344076862: 'Vehicle Oppressor Missile Ignore',
    3595383913: 'Vehicle Oppressor2 Cannon Ignore',
    3796180438: 'Vehicle Oppressor2 MG Ignore',
    1966766321: 'Vehicle Oppressor2 Missile Ignore',
    3473446624: 'Vehicle Plane Rocket Ignore',
    1186503822: 'Vehicle Player Buzzard Ignore',
    3800181289: 'Vehicle Player Lazer Ignore',
    1638077257: 'Vehicle Player Savage Ignore',
    2456521956: 'Vehicle Pounder2 Barrage Ignore',
    2467888918: 'Vehicle Pounder2 GL Ignore',
    2263283790: 'Vehicle Pounder2 Mini Ignore',
    162065050: 'Vehicle Pounder2 Missile Ignore',
    3530961278: 'Vehicle Radar Ignore',
    3177079402: 'Vehicle Revolter MG Ignore',
    3878337474: 'Vehicle Rogue Cannon Ignore',
    158495693: 'Vehicle Rogue MG Ignore',
    1820910717: 'Vehicle Rogue Missile Ignore',
    50118905: 'Vehicle Ruiner Bullet Ignore',
    84788907: 'Vehicle Ruiner Rocket Ignore',
    3946965070: 'Vehicle Savestra MG Ignore',
    231629074: 'Vehicle Scramjet MG Ignore',
    3169388763: 'Vehicle Scramjet Missile Ignore',
    1371067624: 'Vehicle Seabreeze MG Ignore',
    3450622333: 'Vehicle Searchlight Ignore',
    4171469727: 'Vehicle Space Rocket Ignore',
    3355244860: 'Vehicle Speedo4 MG Ignore',
    3595964737: 'Vehicle Speedo4 Turret MG Ignore',
    2667462330: 'Vehicle Speedo4 Turret Mini Ignore',
    968648323: 'Vehicle Strikeforce Barrage Ignore',
    955522731: 'Vehicle Strikeforce Cannon Ignore',
    519052682: 'Vehicle Strikeforce Missile Ignore',
    1176362416: 'Vehicle Subcar MG Ignore',
    3565779982: 'Vehicle Subcar Missile Ignore',
    3884172218: 'Vehicle Subcar Torpedo Ignore',
    1744687076: 'Vehicle Tampa Dual Minigun Ignore',
    3670375085: 'Vehicle Tampa Fixed Minigun Ignore',
    2656583842: 'Vehicle Tampa Missile Ignore',
    1015268368: 'Vehicle Tampa Mortar Ignore',
    1945616459: 'Vehicle Tank Ignore',
    3683206664: 'Vehicle Technical Minigun Ignore',
    1697521053: 'Vehicle Thruster MG Ignore',
    1177935125: 'Vehicle Thruster Missile Ignore',
    2156678476: 'Vehicle Trailer Dualaa Ignore',
    341154295: 'Vehicle Trailer Missile Ignore',
    1192341548: 'Vehicle Trailer Quad MG Ignore',
    2966510603: 'Vehicle Tula Dual MG Ignore',
    1217122433: 'Vehicle Tula MG Ignore',
    376489128: 'Vehicle Tula Minigun Ignore',
    1100844565: 'Vehicle Tula Nose MG Ignore',
    3041872152: 'Vehicle Turret Boxville Ignore',
    1155224728: 'Vehicle Turret Insurgent Ignore',
    729375873: 'Vehicle Turret Limo Ignore',
    2144528907: 'Vehicle Turret Technical Ignore',
    2756787765: 'Vehicle Turret Valkyrie Ignore',
    4094131943: 'Vehicle Vigilante MG Ignore',
    1347266149: 'Vehicle Vigilante Missile Ignore',
    2275421702: 'Vehicle Viseris MG Ignore',
    1150790720: 'Vehicle Volatol Dual MG Ignore',
    1741783703: 'Vehicle Water Cannon Ignore'
};
```

## playerDisconnect

This is the disconnect event for when a player leaves the server.

-   player is the player who has left the server.
-   reason is why the player has left the server.

```js
alt.on('playerDisconnect', handleEvent);

function handleEvent(player, reason) {
    // You should check if the player is valid. Data from prototyping can be lost if they're invalid.
    if (!player || !player.valid) {
        console.error(`Could not get data for a player. ${player.name}`);
    } else {
        // Clone your data you want to save here asap.
        // Do a database save statement here.
        // After this function ends the player data is lost.
    }

    console.log(`${player.name} has disconnected.`);
}
```

## playerEnteredVehicle

This event is trigger when a player has **sat down** in a vehicle. **Not** **Entering**. **Not Beginning To Enter**.

-   player who entered the vehicle.
-   vehicle the player has sat down inside of.
-   seat is the seat the player is sitting in. See [seat table for more info](#Seat Table)

```js
alt.on('playerEnteredVehicle', handleEvent);

function handleEvent(player, vehicle, seat) {
    console.log(`${player.name} left the ${vehicle.model} by entering seat ${seat}`);
    vehicle.engineOn = true; // <-- Car goes brr.
}
```

## playerLeftVehicle

This event is triggered when the player has completely left a vehicle. **Not Leaving**. **Not Beginning to Leave**.

-   player who left the vehicle.
-   vehicle the player is standing outside of.
-   seat is the seat the player was sitting in. See [seat table for more info](#Seat Table)

```js
alt.on('playerLeftVehicle', handleEvent);

function handleEvent(player, vehicle, seat) {
    console.log(`${player.name} left the ${vehicle.model} by leaving seat ${seat}`);
    vehicle.engineOn = true; // <-- Car goes brr.
}
```

## removeEntity

This event is when a entity is destroyed; such as a player, vehicle, blip, and colshape.

-   object is either `player, vehicle, blip, or colshape`.

```js
alt.on('removeEntity', handleEvent);

function handleEvent(someObject) {
    if (typeof someObject === alt.Player) {
        console.log(`A player got yeeted.`);
    }

    if (typeof someObject === alt.Vehicle) {
        console.log(`A vehicle got yeeted.`);
    }

    if (typeof someObject === alt.Blip) {
        console.log(`A blip got yeeted.`);
    }

    if (typeof someObject === alt.ColShape) {
        console.log(`A player got yeeted.`);
    }
}
```

## resourceStart

This is called when your resource is starting.

-   errored lets us know if the resource failed to load.

```js
alt.on('resourceStart', handleEvent);

function handleEvent(errored) {
    if (errored) {
        throw new Error(`Something went horribly wrong and I have no idea why.`);
    }

    console.log(`Guess everything loaded okay.`);
}
```

## resourceStop

This is called when your resource has stopped. Its final breathe before it gives up on life.

```js
alt.on('resourceStop', handleEvent);

function handleEvent() {
    console.log(`He's dead Jim.`);
}
```

## syncedMetaChange

This is called when a synced meta value changes for any player, vehicle, colshape, or blip.

Keep in mind that **syncedMeta** can be **accessed from server and client side.**

-   entity is a `player, vehicle, colshape, or blip`
-   key is an identifier that data is identified with. Think of it as a key in a map for JavaScript.
-   value is the value associated with the key.
-   oldValue is the value previous to the current value being passed.

```js
alt.on('playerConnect', player => {
    player.setSyncedMeta('Connected', true);
});

alt.on('syncedMetaChange', handleEvent);

function handleEvent(entity, key, value, oldValue) {
    // Filter out non-player types.
    if (typeof entity !== alt.Player) {
        return;
    }

    // Compare the key if it's what we are looking for.
    if (key !== 'connected') {
        return;
    }

    // We just made an overly complicated console.log for a player connected. Yay!
    console.log(`${player.name} has connected.`);
}
```

## streamSyncedMetaChange

This is called when a synced meta value changes for any player, vehicle, colshape, or blip.

Keep in mind that **streamSyncedMeta** can be **accessed from server and client side** by players who are within other's streaming range.

-   entity is a `player, vehicle, colshape, or blip`
-   key is an identifier that data is identified with. Think of it as a key in a map for JavaScript.
-   value is the value associated with the key.
-   oldValue is the value previous to the current value being passed.

```js
alt.on('playerConnect', player => {
    player.setStreamedSyncedMeta('Connected', true);
});

alt.on('setStreamedSyncedMeta', handleEvent);

function handleEvent(entity, key, value, oldValue) {
    // Filter out non-player types.
    if (typeof entity !== alt.Player) {
        return;
    }

    // Compare the key if it's what we are looking for.
    if (key !== 'connected') {
        return;
    }

    // We just made an overly complicated console.log for a player connected. Yay!
    console.log(`${player.name} has connected.`);
}
```

## globalMetaChange

We will skip this one until it is implemented. Currently **not implemented**.

## globalSyncedMetaChange

We will skip this one until it is implemented. Currently **not implemented**.

## vehicleDestroy

This is called when a vehicle has been damaged to the point where it has been destroyed.

```js
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);
vehicle.currentModel = 'infernus';

alt.on('vehicleDestroy', handleEvent);

function handleEvent(vehicle) {
    const newPosition = { ...vehicle.pos };
    const newModel = vehicle.currentModel;

    if (vehicle.valid && vehicle.destroy) {
        vehicle.destroy();
    }

    // Respawns the vehicle when its destroyed.
    new alt.Vehicle(oldModel, newPosition.x, newPosition.y, newPosition.z, 0, 0, 0);
}
```

## weaponDamage

This is event that occurs when a player does damage with a weapon. Damage can be negated by adding back missing health.

It is recommended to not use this event in place of playerDeath. They have their own respective uses.

-   player is the player who is being damaged
-   target is the player who is being attacked by the player
-   weaponHash is the hash number for a weapon
-   damage is the damage done to the player
-   offset is a vector3 representing where the player got hit exactly
-   bodyPart is the bone index of where the player got hit

```js
alt.on('weaponDamage', handleEvent);

function handleEvent(player, target, weaponHash, damage, offset, bodyPart) {
    console.log(`${player.name} attacked ${target.name}`);
    console.log(`${target.name} took ${damage} from ${weaponHash} at the bone index of ${bodyPart}`);
    console.log(`Denying Damage`);
    return false;
}
```

## startFire

We will skip this one until it is implemented. Currently **not implemented**.

## startProjectile

We will skip this one until it is implemented. Currently **not implemented**.

## playerWeaponChange

This is when a player switches from and old weapon to a new weapon.

-   player is the player who is swtiching weapons.
-   oldWeapon is the number or hash of the old weapon used.
-   newWeapon is the number or hash of the new weapon being used.

```js
alt.on('playerWeaponChange', handleEvent);

function handleEvent(player, oldWeapon, newWeapon) {
    // Prevent Weapon Swapping
    player.currentWeapon = oldWeapon;
}
```
