# Introduction to Events

Events are the bread and butter to working with alt:V.

They help you retrieve a player instance whenever they perform a specific event. Examples would be connecting to the server, entering a vehicle, exiting a vehicle, and many more.

Let's take a look at the current available events

## Server Side Events

| Event Name               | Description                                                                      |
| ------------------------ | -------------------------------------------------------------------------------- |
| playerConnect            | When a player connects to the server.                                            |
| playerDisconnect         | When a player disconnects from the server.                                       |
| anyResourceStart         | When any resource starts.                                                        |
| anyResourceStop          | When any resource stops.                                                         |
| anyResourceError         | When any resource runs into an error.                                            |
| resourceStart            | When a specific resource starts.                                                 |
| resourceStop             | When a specific resource stops.                                                  |
| syncedMetaChange         | When an entity has their syncedMeta changed.                                     |
| streamSyncedMetaChange   | When an entity in a client's streaming range has their streamSyncedMeta changed. |
| playerDamage             | When a player takes damage from someone else or something.                       |
| playerDeath              | When a player dies.                                                              |
| explosion                | When an explosion is created. ie. Running into a gas pump.                       |
| weaponDamage             | When a weapon does damage.                                                       |
| vehicleDestroy           | When a vehicle is destroyed.                                                     |
| entityEnterColshape      | When an entity enters a ColShape.                                                |
| entityLeaveColshape      | When an entity leaves a ColShape.                                                |
| playerEnterVehicle       | When a player enters a vehicle. Fires when they sit down.                        |
| playerLeaveVehicle       | When a player leaves a vehicle.                                                  |
| playerChangedVehicleSeat | When a player is swapping seats in a vehicle.                                    |
| removeEntity             | When an entity is removed from the game.                                         |
| consoleCommand           | When you type a message into your server console and press enter.                |

[Check the Server Events API for Info](https://altmp.github.io/altv-typings/modules/_alt_server_.html#on)

## Client Side Events

| Event Name             | Description                                                                      |
| ---------------------- | -------------------------------------------------------------------------------- |
| connectionComplete     | When a player is fully connected to the server on client-side.                   |
| disconnect             | When a player disconnects from the server this triggers client-side.             |
| anyResourceStart       | When any resource starts.                                                        |
| anyResourceStop        | When any resource stops.                                                         |
| anyResourceError       | When any resource runs into an error.                                            |
| resourceStart          | When a specific resource starts.                                                 |
| resourceStop           | When a specific resource stops.                                                  |
| syncedMetaChange       | When an entity has their syncedMeta changed.                                     |
| streamSyncedMetaChange | When an entity in a client's streaming range has their streamSyncedMeta changed. |
| keydown                | When a player presses a key down.                                                |
| keyup                  | When a key is released.                                                          |
| gameEntityCreate       | When an entity enters the streaming range of a client.                           |
| gameEntityDestroy      | When an entity leaves the streaming range of a client.                           |
| removeEntity           | When an entity is removed from the game.                                         |
| consoleCommand         | When you type a message into your server console and press enter.                |

[Check the Client Events API for Info](https://altmp.github.io/altv-typings/modules/_alt_client_.html#on)
