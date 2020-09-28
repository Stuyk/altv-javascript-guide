# Získajte všetkých hráčov a vozidlá

Na strane servera existujú dve špeciálne polia (arrays), ktoré vám pomôžu určiť všetkých hráčov alebo vozidlá.

## alt.Player.all

Toto pole (array) konkrétne vracia zoznam všetkých hráčov, ktorí sú momentálne na vašom serveri.

Pri takomto použití polí (arrays) by ste mali pamätať na niekoľko vecí.

1. Vždy naklonujte svoje pole (array). Ušetrí vás to z nedefinovaných alebo neplatných problémov.

```js
const currentPlayers = [...alt.Player.all];
```

2. Keď prechádzate cez zoznam svojich hráčov, **potvrďte ich**.

```js
const currentPlayers = [...alt.Player.all];

// Prechádzanie hráčov.
for(let i = 0; i < currentPlayers.length; i++) {
    const aPlayer = currentPlayers[i];
    
    // Platnosť skontrolujeme kontrolou, či je hodnota 'aPlayer.valid' pravdivá.
    if (!aPlayer || !aPlayer.valid) {
        continue;
    }
    
    // Robte ďalšie veci.
}

// Ďalším spôsobom, ako prechádzať zoznam hráčov.
currentPlayers.forEach((player, index) => {
	// Opäť tu kontrolujeme platnosť.
    if (!player || !player.valid) {
        return;
    } 
});
```



## alt.Vehicle.all

Uistite sa, že ste si prečítali vyššie. Rovnaký postup a kontroly platnosti sa uplatňujú aj na vozidlá.

```js
const currentVehicles = [...alt.Vehicle.all];

// Prechádzanie vozidiel.
for(let i = 0; i < currentVehicles.length; i++) {
    const aVehicle = currentVehicles[i];
    
    // Platnosť skontrolujeme kontrolou, či je hodnota 'aVehicle.valid' pravdivá.
    if (!aVehicle || !aVehicle.valid) {
        continue;
    }
    
    // Robte ďalšie veci.
}

// Ďalším spôsobom, ako prechádzať zoznam vozidiel.
currentVehicles.forEach((vehicle, index) => {
	// Opäť tu kontrolujeme platnosť.
    if (!vehicle || !vehicle.valid) {
        return;
    } 
});
```
