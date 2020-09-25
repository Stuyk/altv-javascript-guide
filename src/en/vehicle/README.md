# Introduction to the Vehicle

Vehicle's also come with plenty of properties and functions. A vehicle is most often accessed through the player that is seated inside of the vehicle. This is done through `player.vehicle`.

## Vehicle Properties

Here are some very commonly used properties.

### Server Side

[Check Server Vehicle Properties](./1_server_props) for usage.

| Property Name        | Description                                                                            |
| -------------------- | -------------------------------------------------------------------------------------- |
| activeRadioStation   | The ID for the active radio station.                                                   |
| bodyAdditionalHealth |                                                                                        |
| bodyHealth           | The vehicles body health. Must use natives to repair body damage.                      |
| customPrimaryColor   | The vehicle primary color. Uses `{r, g, b, a}` object for setting.                     |
| customSecondaryColor | The vehicle secondary color. Uses `{r, g, b, a}` object for setting.                   |
| customTires          |                                                                                        |
| darkness             |                                                                                        |
| dashboardColor       | The index of the dashboard color of the vehicle.                                       |
| daylightOn           | The the vehicles lights on in the day.                                                 |
| destroyed            | If the vehicle is destroyed.                                                           |
| dimension            | The vehicle's current dimension.                                                       |
| dirtLevel            | The vehicles amount of dirty on its appearance.                                        |
| driver               | The current vehicle's driver.                                                          |
| engineHealth         | The engineHealth of a vehicle.                                                         |
| engineOn             | The vehicles engine state. True for on. False for off.                                 |
| flamethrowerActive   |                                                                                        |
| frontWheels          | Used for setting wheel mods on motorcycles.                                            |
| handbrakeActive      |                                                                                        |
| hasArmoredWindows    | If the vehicle has armored windows.                                                    |
| headlightColor       | The index color of the headlights.                                                     |
| id                   | Get a unique server-side id of the vehicle.                                            |
| interiorColor        | The index color of the interior.                                                       |
| lightsMultiplier     | Used to increase brightness of headlights. `1.0` is default.                           |
| livery               | Get or set the index of the livery on a vehicle if a livery is available.              |
| lockState            | 0 - No Lock, 1 - Unlocked, 2 - Locked, 3 - Lockout Players, 4 - Can Get In Can't Leave |
| manualEngineControl  |                                                                                        |
| modKit               | Set this to allow mods on a vehicle when modKitsCount returns 1.                       |
| modKitsCount         | Used in tandem with setting a modkit.                                                  |
| model                | The current model of the vehicle.                                                      |
| neon                 | Used to turn neon on or off. `{back: true, left: true: right: true, front: true}`      |
| neonColor            | Set the neon color. `{r, g, b, a}`                                                     |
| nightlightOn         | Used to turn on an overhead light in the vehicle on or off.                            |
| numberPlateIndex     | Used to change the appearance of a number plate.                                       |
| numberPlateText      | Set the text on a number plate.                                                        |
| pearlColor           |                                                                                        |
| petrolTankHealth     |                                                                                        |
| pos                  | The current position of the vehicle.                                                   |
| primaryColor         | Set the primary index color of the vehicle.                                            |
| rearWheels           |                                                                                        |
| repairsCount         |                                                                                        |
| roofLivery           |                                                                                        |
| roofOpened           |                                                                                        |
| rot                  | Get the current rotation of the vehicle.                                               |
| secondaryColor       | Set the secondary index color of the vehicle.                                          |
| sirenActive          | Get if the siren is currently active.                                                  |
| tireSmokeColor       |                                                                                        |
| valid                | Check if the vehicle still exists and has not been destroyed.                          |
| wheelColor           |                                                                                        |
| wheelType            |                                                                                        |
| wheelsCount          |                                                                                        |
| windowTint           |                                                                                        |

[alt:V Vehicle Server Typings](https://altmp.github.io/altv-typings/classes/_alt_server_.vehicle.html)

### Client Side

| Property Name | Description |
| ------------- | ----------- |
| gear          |             |
| id            |             |
| model         |             |
| pos           |             |
| rot           |             |
| rpm           |             |
| scriptID      |             |
| speed         |             |
| speedVector   |             |
| valid         |             |
| wheelsCount   |             |

[alt:V Vehicle Client Typings](https://altmp.github.io/altv-typings/classes/_alt_client_.vehicle.html)
