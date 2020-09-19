# Einleitung für Events

Events sind extrem wichtig, wenn es darum geht mit alt:V zu arbeiten.

Sie helfen dir dabei die Spielerinstanz, also das Spielerobjekt, zu bekommen. Immer dann, wenn der Spieler eine Aktivität begeht die solch ein event auslöst. Beispiele sind hier: Das verbinden mit dem Server, das einsteigen in ein Auto und viele mehr.
Let's take a look at the current available events

## Serverseitige Events

| Event Name               | Beschreibung                                                                                 |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| playerConnect            | Wenn sich ein Spieler mit dem Server verbindet.                                              |
| playerDisconnect         | Wenn ein Spieler den server verlässt.                                                        |
| anyResourceStart         | Wenn eine Serverresource gestartet wird.                                                     |
| anyResourceStop          | Wenn eine Serverresource gestoppt wird.                                                      |
| anyResourceError         | Wenn in einer Serverresource ein Fehler auftritt.                                            |
| resourceStart            | Wenn eine spezifische Serverresource gestartet wird.                                         |
| resourceStop             | Wenn eine spezifische Serverresource gestoppt wird.                                          |
| syncedMetaChange         | Wenn eine Entität ihr syncedMeta verändert.                                                  |
| streamSyncedMetaChange   | Wenn eine Entität ihr streamSyncedMeta verändert, während diese in der Streamingdistanz ist. |
| playerDamage             | Wenn der Spieler Schaden erleidet.                                                           |
| playerDeath              | Wenn der Spieler stirbt.                                                                     |
| explosion                | Wenn eine Explosion stattgefunden hat.                                                       |
| weaponDamage             | Wenn durch eine Waffe Schaden erlitten wurde.                                                |
| vehicleDestroy           | Wenn ein Fahrzeug zerstört wurde. (Nicht mehr fahrbar ist)                                   |
| entityEnterColshape      | Wenn eine Entität in eine ColShape eintritt.                                                 |
| entityLeaveColshape      | Wenn eine Entität eine ColShape verlässt.                                                    |
| playerEnterVehicle       | Wenn ein Spieler in ein Fahrzeug einsteigt.                                                  |
| playerLeaveVehicle       | Wenn ein Spieler aus einem Fahrzeug steigt.                                                  |
| playerChangedVehicleSeat | Wenn ein Spieler seinen Sitz im Fahrzeug wechselt.                                           |
| removeEntity             | Wenn eine Entität aus dem Spiel entfernt wurde, also für ungültig erklärt wird.              |
| consoleCommand           | Wenn du eine Nachricht in deine Serverkonsole eingibst.                                      |

[Besuche die Server Events API für mehr Informationen](https://altmp.github.io/altv-typings/modules/_alt_server_.html#on)

## Clientseitige Events

| Event Name             | Beschreibung                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| connectionComplete     | Wenn ein Spieler erfolgreich und komplett clientside verbunden wurde.                        |
| disconnect             | Wenn die Verbindung mit dem Server unterbrochen wurde.                                       |
| anyResourceStart       | Wenn eine clientseitige Resource startet.                                                    |
| anyResourceStop        | Wenn eine clientseitige Resource stoppt.                                                     |
| anyResourceError       | Wenn in einer clientseitigen Resource ein Fehler auftritt.                                   |
| resourceStart          | Wenn eine spezifische clientseitige Resource startet.                                        |
| resourceStop           | Wenn eine spezifische clientseitige Resource stoppt.                                         |
| syncedMetaChange       | Wenn eine Entität ihr syncedMeta verändert.                                                  |
| streamSyncedMetaChange | Wenn eine Entität ihr streamSyncedMeta verändert, während diese in der Streamingdistanz ist. |
| keydown                | Wenn eine Taste gedrückt wird.                                                               |
| keyup                  | Wenn eine Taste losgelassen wird.                                                            |
| gameEntityCreate       | Wenn eine Entität in die Streamingdistanz eines Spielclients kommt.                          |
| gameEntityDestroy      | Wenn eine Entität die Streamingdistanz eines Spielclients verlässt.                          |
| removeEntity           | Wenn eine Entität aus dem Spiel entfernt wurde, also für ungültig erklärt wird.              |
| consoleCommand         | Wenn du eine Nachricht in deine Clientkonsole eingibst. (F8-Taste)                           |

[Besuche die Client Events API für mehr Informationen](https://altmp.github.io/altv-typings/modules/_alt_client_.html#on)
