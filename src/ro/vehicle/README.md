# Ce este defapt Vehiculul?

Vehiculul vine, de asemenea, cu o mulțime de proprietăți și funcții. Un vehicul este accesat cel mai adesea prin intermediul jucătorului care este așezat în interiorul acestuia. Acest lucru se face prin `player.vehicle`.

## Proprietățile unui Vehicul

Iată câteva proprietăți foarte frecvent utilizate.

### Server Side

[Verificați proprietățile unui vehicul în server](./1_server_props) pentru utilizare.

| Property Name        | Description                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------- |
| activeRadioStation   | ID-ul postului de radio activ.                                                                |
| bodyAdditionalHealth |                                                                                               |
| bodyHealth           | Starea caroseriei unui vehicul. Trebuie să folosiți native pentru a repara daunele.           |
| customPrimaryColor   | Culoarea primară a vehiculului. Folosește `{r, g, b, a}` pentru a o modifica.                 |
| customSecondaryColor | Culoarea secundară a vehiculului. Folosește `{r, g, b, a}` pentru a o modifica.               |
| customTires          |                                                                                               |
| darkness             |                                                                                               |
| dashboardColor       | Index-ul culorii dashboard-ului unui vehicul.                                                 |
| daylightOn           | Luminile vehiculelor se aprind pe timp de zi.                                                 |
| destroyed            | Dacă vehiculul este distrus.                                                                  |
| dimension            | Dimensiunea actuală a vehiculului.                                                            |
| dirtLevel            | Starea de murdărie pe care vehiculul o are asupra aspectului său.                             |
| driver               | Șoferul vehiculului actual.                                                                   |
| engineHealth         | engineHealth-ul unui vehicul .                                                                |
| engineOn             | Starea motorului unui vehicul. True pentru on. False pentru off.                              |
| flamethrowerActive   |                                                                                               |
| frontWheels          | Folosit pentru setarea modurilor de roți pe motociclete.                                      |
| handbrakeActive      |                                                                                               |
| hasArmoredWindows    | Dacă vehiculul are geamuri blindate.                                                          |
| headlightColor       | Index-ul culorii farurilor.                                                                   |
| id                   | Obțineți un ID unic al vehiculului în server-side.                                            |
| interiorColor        | Index-ul culorii interiorului                                                                 |
| lightsMultiplier     | Folosit pentru a crește luminozitatea farurilor. `1.0` este default.                          |
| livery               | Get or set the index of the livery on a vehicle if a livery is available.                     |
| lockState            | 0 - No Lock, 1 - Unlocked, 2 - Locked, 3 - Lockout Players, 4 - Can Get In Can't Leave        |
| manualEngineControl  |                                                                                               |
| modKit               | Trebuie setat pentru a permite modificări asupra unui vehicul când modKitsCount returnează 1. |
| modKitsCount         | Folosit în tandem cu setarea unui modKit.                                                     |
| model                | Modelul curent al vehiculului.                                                                |
| neon                 | Folosit pentru a porni/opri neonul. `{back: true, left: true: right: true, front: true}`      |
| neonColor            | Setați culoarea neonului. `{r, g, b, a}`                                                      |
| nightlightOn         | Folosit pentru a porni sau opri o lampă de iluminat din vehicul.                              |
| numberPlateIndex     | Folosit pentru a schimba aspectul unei plăcuțe de înmatriculare.                              |
| numberPlateText      | Setați textul pe o plăcuță de înmatriculare.                                                  |
| pearlColor           |                                                                                               |
| petrolTankHealth     |                                                                                               |
| pos                  | Poziția actuală a vehiculului.                                                                |
| primaryColor         | Setați index-ul culorii principale a vehiculului.                                             |
| rearWheels           |                                                                                               |
| repairsCount         |                                                                                               |
| roofLivery           |                                                                                               |
| roofOpened           |                                                                                               |
| rot                  | Obțineți rotația curentă a vehiculului.                                                       |
| secondaryColor       | Setați index-ul culorii secundale a vehiculului.                                              |
| sirenActive          | Verificați dacă sirena este activă în prezent.                                                |
| tireSmokeColor       |                                                                                               |
| valid                | Verificați dacă vehiculul mai există și nu a fost distrus.                                    |
| wheelColor           |                                                                                               |
| wheelType            |                                                                                               |
| wheelsCount          |                                                                                               |
| windowTint           |                                                                                               |

[alt:V Vehicle Server Typings](https://altmp.github.io/altv-typings/classes/_alt_server_.vehicle.html)

### Client Side

| Numele proprietății | Descriere                                   |
| ------------------- | ------------------------------------------- |
| gear                | Treapta în care este vehiculul              |
| id                  |                                             |
| model               | Modelul vehiculului                         |
| pos                 | Poziția vehiculului                         |
| rot                 | Rotația vehiculului                         |
| rpm                 | Valoarea turometrului ( Rotații pe minut)   |
| scriptID            |                                             |
| speed               | Viteza de deplasare                         |
| speedVector         |                                             |
| valid               |                                             |
| wheelsCount         | Numărul roților                             |

[alt:V Vehicle Client Typings](https://altmp.github.io/altv-typings/classes/_alt_client_.vehicle.html)
