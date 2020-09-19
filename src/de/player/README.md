# Was ist eigentlich der Player?

Es sollte eigentlich offensichtlich sein, dass mit dem `player` Objekt ein Spieler gemeint ist. Du bist ein Spieler. Dein Freund ist ein Spieler. Jeder auf dem Server ist ein Spieler.

Sollte hier auf der Webseite oder in alt:V von einem `player` Objekt gesprochen werden, ist die programmiertechnische Umsetzung eines Spielers gemeint.

Das Spielerobjekt kommt mit einigen Funktionen und Eigenschaften mit sich, welche beim Schreiben des Codes notwendig sind.

Außerdem wird das Spielerobjekt nahezu bei jedem Serverevent mitgeliefert, um auf Aktivitäten des Spielers auf dem Server reagieren zu können.

Programmierer sprechen hier auch oft von einer `Instanz (instance)` des Spielers.

## Spieler Eigenschaften

Nun folgen häufig benutzte Spielerobjekteigenschaften und dessen Bedeutung.

### Serverseitig

| Eigenschaftsname | Beschreibung                                                                                         | Zugriff           |
| ---------------- | ---------------------------------------------------------------------------------------------------- | ----------------- |
| armour           | Setzt die Rüstung (Schutzweste). 0 - 100                                                             | Lesen + Schreiben |
| currentWeapon    | Gibt den Wert der aktuell getragenen Waffe zurück                                                    | Lesen + Schreiben |
| dimension        | Die aktuelle Dimension des Spielers. Standardmäßig 0.                                                | Lesen + Schreiben |
| health           | Setzt das Leben des Spielers. 100-200                                                                | Lesen + Schreiben |
| hwidHash         | Einzigartiger Hardwarehash                                                                           | Lesen             |
| hwidExHash       | Einzigartiger Ex-Hardwarehash                                                                        | Lesen             |
| id               | Die Netzwerknummer des Spielers                                                                      | Lesen             |
| ip               | Die IP-Adresse des Spielers                                                                          | Lesen             |
| model            | Setzen des Spielermodels                                                                             | Lesen + Schreiben |
| name             | Gibt den Namen des Spielers zurück                                                                   | Lesen             |
| ping             | Momentaner Ping des Spielers                                                                         | Lesen             |
| pos              | Momentane Position des Spielers                                                                      | Lesen + Schreiben |
| vehicle          | Die Fahrzeuginstanz in der, der Spieler sitzt. Gibt `null` zurück, wenn kein Fahrzeug vorhanden ist. | Lesen + Schreiben |
| socialId         | Eine numerische ID der socialClubId. Diese ist manipulierbar (spoofable).                            | Lesen             |
| valid            | Eine Möglichkeit herauszufinden, ob die Spielerinstanz noch gültig für die benutzung ist             | Lesen             |

Für aktuelle Informationen solltest du immer die aktuellen Typendefinitionen der alt:V-typings im Auge behalten:

[alt:V Player Server Typings](https://altmp.github.io/altv-typings/classes/_alt_server_.player.html)

### Clientseitig

| Eigenschaftsname | Beschreibung                                                                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| pos              | Die momentane Position des Spielers. Ist ein anderer Spieler außerhalb der Streamingdistanz, hat dieser den zuletzt bekannten Wert.           |
| vehicle          | Die Fahrzeuginstanz, wenn der Spieler in einem Auto sitzt. Gibt `null` zurück, wenn kein Fahrzeug vorhanden ist                               |
| scriptID         | Die Identifikationsnummer des Spielers im Spielspeicher. Diese wird benutzt, um GTA-Funktionen nutzen und auf den Spieler anwenden zu können. |

Für aktuelle Informationen solltest du immer die aktuellen Typendefinitionen der alt:V-typings im Auge behalten:

[alt:V Player Client Typings](https://altmp.github.io/altv-typings/classes/_alt_client_.player.html)
