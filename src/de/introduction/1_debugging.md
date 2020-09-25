# Einrichten des Clientseitigen debuggen

Zu diesem Zeitpunkt sollte dein alt:V Client fertig installiert sein.

Gehe in deinen alt:V Installationsordner und suche nach der altv.cfg.
![](../../img/edit_cfg.png)

## altv.cfg

Stelle sicher, dass dieser Parameter auf true gesetzt ist.

Erstelle diesen Parameter, wenn dieser nicht existiert.

```sh
debug: 'true'
```

## Wiederverbinden mit einem Server

Wenn ein Server neugestartet wird, wird die Verbindung zum Server getrennt. Du kannst dich ohne Clientneustart nur neuverbinden, wenn der Server in seiner Serverconfig den Parameter `debug` auf `true` gesetzt hat. Genau wie bei dir in der clientseitigen config.

Ganz simpel drücke `F8`

**Mit Passwort**

```
reconnect passwort_hierhin
```

**Ohne Passwort**

```
reconnect
```
