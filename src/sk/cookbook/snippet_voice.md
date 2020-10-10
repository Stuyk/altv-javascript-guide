# Hlasový systém/Voice (Využite alt:V-čkov zabudovaný Hlasový systém)

alt:V má predvolene zabudovanú funkciu Voice, a tak ju môžete používať.

Tento hlas je možné použiť pre 3D alebo 2D hlasové riešenia na dodanie funkcií, ako sú:

-   3D a 2D hlasový chat
- Telefónne hovory
- Rádiová komunikácia
- oveľa viac

Fragment uvedený nižšie vám ukáže, ako implementovať 3D hlas pre *roleplay* servery s využitím *class-y* javascript

## Funkčné vysvetlenie

Rýchle vysvetlenie toho, aké hlasové funkcie sú k dispozícii prostredníctvom alt:V API

Vlastnosti hráča (na strane klienta)

`IsTalking` *boolean* - čo bude pravda, ak hráč hovorí

`micLevel` číslo - hlasitosť hráča

```js
import * as alt from 'alt-client';

let localPlayer = alt.Player.local;
alt.log('Hovorí hráč: ' + localPlayer.isTalking);
alt.log('Hlasitosť prehrávača: ' + localPlayer.micLevel);
```

**VoiceChannel *Class-a***

`nový VoiceChannel (isSpatial: boolean, maxDistance: number)` konštruktor - isPatial false znamená globálny hlasový kanál, isPatial true znamená 3D hlasový kanál, ktorý ako dosah používa maxDistance

Funkcia `addPlayer (player: alt.Player)` - pridá hráča na konkrétny kanál

Funkcia `removePlayer (player: alt.Player)` - odstráni hráča z konkrétneho kanála

funkcia `mutePlayer (prehrávač: alt.Player)` - vypnutie hráča v konkrétnom kanáli

Funkcia `unmutePlayer (prehrávač: alt.Player)` - vypnutie hráča v konkrétnom kanáli

Funkcia `isPlayerInChannel (player: alt.Player)` - skontroluje, či sa hráč už nachádza v konkrétnom kanáli

Funkcia `isPlayerMuted (player: alt.Player)` - skontroluje, či je hráč v konkrétnom kanáli stlmený

```js
import * as alt from 'alt-server';

let testChannel = new alt.VoiceChannel(true, 20);
alt.on('playerConnect', player => {
    testChannel.addPlayer(player);
    testChannel.unmutePlayer(player);
});

alt.on('playerDisconnect', player => {
    testChannel.removePlayer(player);
});

alt.on('playerDeath', player => {
    // stlmenie hráča v testovacom kanáli, ak je mŕtvy a pripojený k hlasu
    if (testChannel.isPlayerInChannel(player) && !testChannel.isPlayerMuted(player)) {
        testChannel.mutePlayer(player);
    }
});
// skontrolovať príklad
```

## Príklad použitia 3D (Na strane servera)

**Na strane servera**

```js
import * as alt from 'alt-server';

class AltvVoiceServerModule {
    constructor() {
        //kričiací kanál/yell channel
        this.longRangeChannel = new alt.VoiceChannel(true, 16);
        //hovorový kanál/speak channel
        this.midRangeChannel = new alt.VoiceChannel(true, 8);
        //šepkací kanál/whisper channel
        this.lowRangeChannel = new alt.VoiceChannel(true, 3);
        this.registerEvents();
        alt.log('AltvVoiceServerModule init');
    }

    registerEvents() {
        // alternatívne nazvať po úspešnom vytvorení prehrávača po autentifikácii
        alt.on('playerConnect', player => {
            this.addToVoiceChannels(player);
            this.changeVoiceRange(player);
        });
        // zvládnuť odpojenie hráča
        alt.on('playerDisconnect', this.removePlayerFromChannels.bind(this));
        // zvládnuť neplatnosť entity gamecrash / entity
        alt.on('removeEntity', this.removePlayerFromChannels.bind(this));
        // zvládnuť zmeny vzdialenosti hlasu hráča
        alt.onClient('server:ChangeVoiceRange', this.changeVoiceRange.bind(this));
    }

    /**
     * clear channels for given player
     * @param  {alt.Player} player
     * @returns {null}
     */
    removePlayerFromChannels(player) {
        if (this.lowRangeChannel.isPlayerInChannel(player)) {
            this.lowRangeChannel.removePlayer(player);
        }
        if (this.midRangeChannel.isPlayerInChannel(player)) {
            this.midRangeChannel.removePlayer(player);
        }
        if (this.longRangeChannel.isPlayerInChannel(player)) {
            this.longRangeChannel.removePlayer(player);
        }
    }

    /**
     * add player to all voice channels
     * @param  {alt.Player} player
     * @returns {null}
     */
    addToVoiceChannels(player) {
        this.lowRangeChannel.addPlayer(player);
        this.midRangeChannel.addPlayer(player);
        this.longRangeChannel.addPlayer(player);
    }

    /**
     * mute player in all voice channels
     * @param  {alt.Player} player
     * @returns {null}
     */
    muteInAllChannels(player) {
        this.lowRangeChannel.mutePlayer(player);
        this.midRangeChannel.mutePlayer(player);
        this.longRangeChannel.mutePlayer(player);
    }

    /**
     * takes a range for a player and mutes this player in all channels he shouldn´t be heard
     * @param  {alt.Player} player
     * @param  {number} range
     * @returns {null}
     */
    muteNotInRangeChannels(player, range) {
        switch (range) {
            case 3:
                this.midRangeChannel.mutePlayer(player);
                this.longRangeChannel.mutePlayer(player);
                break;
            case 8:
                this.lowRangeChannel.mutePlayer(player);
                this.longRangeChannel.mutePlayer(player);
                break;
            case 15:
                this.lowRangeChannel.mutePlayer(player);
                this.midRangeChannel.mutePlayer(player);
                break;
            default:
                break;
        }
    }

    /**
     * change the voice range of the given player and unmute in new range channel
     * @param  {alt.Player} player
     * @returns {null}
     */
    changeVoiceRange(player) {
        if (!player.voiceRange) {
            player.voiceRange = 0;
        }
        switch (player.voiceRange) {
            case 0:
                player.voiceRange = 3;
                this.muteNotInRangeChannels(player, 3);
                this.lowRangeChannel.unmutePlayer(player);
                alt.emitClient(player, 'client:UpdateCurrentAltVoiceRange', 3);
                break;
            case 3:
                player.voiceRange = 8;
                this.muteNotInRangeChannels(player, 8);
                this.midRangeChannel.unmutePlayer(player);
                alt.emitClient(player, 'client:UpdateCurrentAltVoiceRange', 8);
                break;
            case 8:
                player.voiceRange = 15;
                this.muteNotInRangeChannels(player, 15);
                this.longRangeChannel.unmutePlayer(player);
                alt.emitClient(player, 'client:UpdateCurrentAltVoiceRange', 15);
                break;
            case 15:
                player.voiceRange = 0;
                this.muteInAllChannels(player);
                alt.emitClient(player, 'client:UpdateCurrentAltVoiceRange', 0);
                break;
            default:
                break;
        }
    }
}

// inicializuje inštanciu hlasovej triedy
export const AltvVoiceServerModuleInstance = new AltvVoiceServerModule();
```

## Príklad použitia 3D (Na strane klienta)

**Na strane klienta**

```js
import * as alt from 'alt-client';

class AltvVoiceClientModule {
    constructor() {
        // skratka objektu localPlayer
        this.localPlayer = alt.Player.local;
        // interval na kontrolu zmien stavu
        this.interval = null;
        // hovorený stav vo vyrovnávacej pamäti
        this.talkingState = false;
        // rozsah hlasu vo vyrovnávacej pamäti
        this.currentRange = 0;
        this.registerEvents();
        alt.log('AltvVoiceClientModule init');
    }

    registerEvents() {
        alt.on('keydown', key => {
            if (key == 107) {
                // Stlačením Num + zmeníte rozsah, v ktorom vás ostatní hráči budú počuť
                alt.emitServer('server:ChangeVoiceRange');
            }
        });

        alt.onServer('client:UpdateCurrentAltVoiceRange', range => {
            this.currentRange = range;
            // emituje nový rozsah do vášho používateľského rozhrania
            /* example payload
                {
                muted: range === 0 ? true : false,
                range: range
                }
            */
        });

        this.registerTalkingInterval();
    }

    /*
     * interval to handle talking state changes
     * i.e show in your ui if this player is talking (like ts3 voice led)
     */
    registerTalkingInterval() {
        this.interval = alt.setInterval(() => {
            //only emit if state changed
            if (this.talkingState !== this.localPlayer.isTalking && this.currentRange !== 0) {
                this.talkingState = this.localPlayer.isTalking;
                // emitujé do vášho používateľského rozhrania zmenu stavu hovoru {this.talkingState}
            }
            if (this.talkingState && this.currentRange === 0) {
                // emitujé do vášho používateľského rozhrania zmenu stavu hovoru {false}
            }
        }, 444);
    }
}

// inicializuje inštanciu hlasovej triedy
export const AltvVoiceClientModuleInstance = new AltvVoiceClientModule();
```
