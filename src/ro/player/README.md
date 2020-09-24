# Ce este defapt Player-ul?

Player-ul ești tu. Tu ești player-ul. Amicul tău este player-ul. Toată lumea este un player.

De asemenea, player-ul vine cu o mulțime de proprietăți și funcții. Player-ul este accesat cel mai adesea prin evenimente.

Adică un eveniment vă va oferi acces la o instanță de player, în funcție de comportamentul player-ului.

## Proprietățile Player-ului

Iată câteva proprietăți foarte frecvent utilizate.

### Server Side

[Verificați Proprietățile Player-ului în Server](./1_server_props) pentru utilizare.

| Property Name | Description                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| armour        | Setează armura player-ului. 0 - 100                                                                     |
| currentWeapon | Obține armura actuală a player-ului.                                                                    |
| dimension     | Lumea virtuală a jucătorului. 0 default.                                                                |
| health        | Setează viața player-ului. 0 - 200                                                                      |
| hwidHash      | Obține Hardware Hash-ul unic al player-ului.                                                            |
| hwidExHash    | Obține Hardware Ex Hash-ul unic al player-ului.                                                         |
| id            | ID-ul lor de pe server.                                                                                 |
| ip            | Adresa IP a acestora.                                                                                   |
| model         | Citiți sau setați modelul player-ului.                                                                  |
| name          | Citiți numele player-ului. (READONLY)                                                                   |
| ping          | Ping-ul său curent.                                                                                     |
| pos           | Poziția lui curentă.                                                                                    |
| vehicle       | Dacă este prezent un vehicul, acest lucru vă va permite să obțineți acel vehicul. În caz contrar, NULL. |
| socialId      | Un socialClub fals. Nu utilizați acest lucru pentru identificare.                                       |
| valid         | O modalitate de a determina dacă entitatea mai există.                                                  |

[alt:V Player Server Typings](https://altmp.github.io/altv-typings/classes/_alt_server_.player.html)

### Client Side

| Property Name | Description                                                           |
| ------------- | --------------------------------------------------------------------- |
| pos           | Poziția player-ului. Dacă ieșiți din stream, poziția primește freeze. |
| vehicle       | Vehiculul player-ului dacă este într-unul. În caz contrar, NULL.      |
| scriptID      | Ped handler-ul player-ului. Folosit pentru lucrul cu native.          |

[alt:V Player Client Typings](https://altmp.github.io/altv-typings/classes/_alt_client_.player.html)
