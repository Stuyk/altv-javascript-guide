# Introducere în Evenimente

Evenimentele sunt pâinea și untul în dezvoltarea pe alt:V.

Acestea vă ajută să recuperați o instanță de jucatori ori de câte ori efectuează un anumit eveniment. Un exemplu ar fi conectarea pe server, intrarea intr-un vehicul, ieșirea dintr-un vehicul și multe altele.

Să aruncâm o privire la evenimentele actuale disponibile.

## Server Side Events

| Numele Evenimentului     | Descriere                                                                        |
| ------------------------ | -------------------------------------------------------------------------------- |
| playerConnect            | Când un jucător se conectează pe server.                                         |
| playerDisconnect         | Când un jucător se deconectează de pe server.                                    |
| anyResourceStart         | Când orice resursă intră în funcțiune.                                           |
| anyResourceStop          | Când orice resursă se oprește din funcțiune.                                     |
| anyResourceError         | Când într-o orice resursă apare o eroare.                                        |
| resourceStart            | Când o resursă întră in funcțiune.                                               |
| resourceStop             | Când o resursă se oprește din funcțiune.                                         |
| syncedMetaChange         | Când o entitate are syncedMeta modificat.                                        |
| streamSyncedMetaChange   | Când o entitate din zona de stream a unui client are streamSyncedMeta modificat. |
| playerDamage             | Când un jucător primeste damage de la altcineva sau ceva.                        |
| playerDeath              | Când un jucător moare.                                                           |
| explosion                | Când se crează o explozie.                                                       |
| weaponDamage             | Când o armă acordă damage.                                                       |
| vehicleDestroy           | Când un vehicul este distrus.                                                    |
| entityEnterColshape      | Când o entitate întra într-un ColShape.                                          |
| entityLeaveColshape      | Când o entitate iese dintr-un ColShape.                                          |
| playerEnterVehicle       | Când un jucător intra într-un vehicul.                                           |
| playerLeaveVehicle       | Când un jucător iese dintr-un vehicul.                                           |
| playerChangedVehicleSeat | Când un jucător schimbă locurile într-un vehicul.                                |
| removeEntity             | Când o entiate este eliminată din joc.                                           |
| consoleCommand           | Când introduceți un mesaj în consola serverului și apăsați Enter.                |

[Verificați Server Events API pentru mai multe informații](https://altmp.github.io/altv-typings/modules/_alt_server_.html#on)

## Client Side Events

| Numele Evenimentului   | Descriere                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------- |
| connectionComplete     | Când un jucător este complet conectat la server din client-side.                      |
| disconnect             | Când un jucător se deconectează de la server, acest lucru declanșează client-side-ul. |
| anyResourceStart       | Când orice resursă intră în funcțiune.                                                |
| anyResourceStop        | Când orice resursă se oprește din funcțiune.                                          |
| anyResourceError       | Când într-o orice resursă apare o eroare.                                             |
| resourceStart          | Când o resursă întră in funcțiune.                                                    |
| resourceStop           | Când o resursă se oprește din funcțiune.                                              |
| syncedMetaChange       | Când o entitate are syncedMeta modificat.                                             |
| streamSyncedMetaChange | Când o entitate din zona de stream a unui client are streamSyncedMeta modificat.      |
| keydown                | Când un jucător apasă o tastă.                                                        |
| keyup                  | Când un jucător eliberează o tastă.                                                   |
| gameEntityCreate       | Când o entitate intră în raza stream-ului unui client.                                |
| gameEntityDestroy      | Când o entitate iese în raza stream-ului unui client.                                 |
| removeEntity           | Când o entiate este eliminată din joc.                                                |
| consoleCommand         | Când introduceți un mesaj în consola serverului și apăsați Enter.                     |

[Verificați Client Events API pentru mai multe informații](https://altmp.github.io/altv-typings/modules/_alt_client_.html#on)
