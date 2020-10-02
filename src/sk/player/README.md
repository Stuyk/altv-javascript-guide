# Úvod do Hráča

Hráč si ty. Ste hráčom. Váš priateľ je hráč. Hráč je každý.

Hráči tiež prichádzajú s mnohými vlastnosťami a funkciami. K hráčovi sa najčastejšie pristupuje prostredníctvom *eventov*.

Význam udalosti vám umožní prístup k inštancii hráča v závislosti od správania hráča.

## Vlastnosti hráča

Tu uvádzame niektoré veľmi často používané vlastnosti.

### Na strane servera

[Skontrolujte použitie vlastností serverového hráča](./1_server_props).

| Názov vlastnosti | Anglický popis                                               |
| ---------------- | ------------------------------------------------------------ |
| armour           | Set player armour. 0 - 100                                   |
| currentWeapon    | Get player's current armour.                                 |
| dimension        | Player's Virtual World. 0 By Default                         |
| health           | Set player's health. 100-200                                 |
| hwidHash         | Unique Hardware Hash                                         |
| hwidExHash       | Unique Ex Hardware Hash                                      |
| id               | Their server-side id                                         |
| ip               | Their IP Address                                             |
| model            | Read or set the player's model.                              |
| name             | Readonly Player Set Name                                     |
| ping             | Current Ping                                                 |
| pos              | Current Player Position                                      |
| vehicle          | If a vehicle is present this lets you get that vehicle. Null otherwise. |
| socialId         | A non-unique spoofable social club id. Don't use this for identification. |
| valid            | A way to determine if the entity still exists.               |

[alt:V serverové *Typings* hráča](https://altmp.github.io/altv-typings/classes/_alt_server_.player.html)

### Client Side

| Property Name | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| pos           | The player's position. If exiting stream range, position is frozen. |
| vehicle       | The player's vehicle if they're in one. Null if otherwise.          |
| scriptID      | The ped handle of the player. Used for working with natives.        |

[alt:V klientské *Typings* hráča](https://altmp.github.io/altv-typings/classes/_alt_client_.player.html)