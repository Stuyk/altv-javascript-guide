# Configurați Depanarea Client-ului

Ar trebui să aveți configurarea serverului alt:V în acest stadiu.

Mergeți la locația folderului unde se află executabilul altv.exe și căutați fișierul altv.cfg.

![](./img/edit_cfg.png)

## altv.cfg

Asigurați-vă că acest parametru este setat pe true.

Dacă nu este, setați-l.

```sh
debug: 'true'
```

## Reconectarea

După repornirea server-ului, veți fi deconectat automat. Vă puteți reconecta doar la un server care are parametrul `debug` setat pe `true`, de asemenea trebuie să fie setat parametrul `debug` pe `true` și în propriul config din client.

Pur și simplu apăsați tasta `F8`.

**Cu Parolă**

```
reconnect password_goes_here
```

**Fără Parolă**

```
reconnect
```
