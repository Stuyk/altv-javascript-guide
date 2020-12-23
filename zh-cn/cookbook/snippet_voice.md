# 语音 (利用 alt:V 内置语音)

alt:V 默认情况下具有内置的语音功能，这就是使用它的方式.

此语音可用于3D或2D语音解决方案，功能例如:

-   3D & 2D 语音聊天
-   电话通话
-   无线电通讯
-   更多

**下面的代码段将向您展示如何使用JavaScript类为角色扮演服务器实现3D语音**

## 功能说明

通过 alt:V API提供的语音功能简要说明

**玩家属性 (客户端)**

`isTalking` 布尔值 - 如果玩家正在讲话，则为true

`micLevel` 数字类型 - 玩家语音音量

```js
import * as alt from 'alt-client';

let localPlayer = alt.Player.local;
alt.log('正在说话的玩家: ' + localPlayer.isTalking);
alt.log('玩家说话音量: ' + localPlayer.micLevel);
```

**语音频道类别**

`new VoiceChannel(isSpatial: boolean, maxDistance: number)` 建设者 - isPatial false表示全局语音频道，isPatial true表示使用maxDistance作为范围的3D语音频道

`addPlayer(player: alt.Player)` 功能类型 - 将玩家添加到特定频道

`removePlayer(player: alt.Player)` 功能类型 - 将玩家移至特定频道

`mutePlayer(player: alt.Player)` 功能类型 - 使特定频道内的玩家静音

`unmutePlayer(player: alt.Player)` 功能类型 - 在特定频道内取消玩家静音

`isPlayerInChannel(player: alt.Player)` 功能类型 - 检查玩家是否已经在特定频道中

`isPlayerMuted(player: alt.Player)` 功能类型 - 检查玩家是否在特定频道中被静音

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
    //如果玩家死亡状态测试频道并连接到语音，则将测试频道中的玩家静音
    if (testChannel.isPlayerInChannel(player) && !testChannel.isPlayerMuted(player)) {
        testChannel.mutePlayer(player);
    }
});
//检查例子
```

## 3D用法示例 (服务器端)

_Serverside_

```js
import * as alt from 'alt-server';

class AltvVoiceServerModule {
    constructor() {
        //大喊频道
        this.longRangeChannel = new alt.VoiceChannel(true, 16);
        //说话频道
        this.midRangeChannel = new alt.VoiceChannel(true, 8);
        //耳语频道
        this.lowRangeChannel = new alt.VoiceChannel(true, 3);
        this.registerEvents();
        alt.log('AltvVoiceServerModule init');
    }

    registerEvents() {
        //或者在玩家通过身份验证成功生成之后调用它
        alt.on('playerConnect', player => {
            this.addToVoiceChannels(player);
            this.changeVoiceRange(player);
        });
        //处理玩家断开连接
        alt.on('playerDisconnect', this.removePlayerFromChannels.bind(this));
        //处理玩家的 游戏崩溃 / entity invalidity
        alt.on('removeEntity', this.removePlayerFromChannels.bind(this));
        //处理玩家语音范围变化
        alt.onClient('server:ChangeVoiceRange', this.changeVoiceRange.bind(this));
    }

    /**
     * 清除给定玩家的频道
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
     * 将玩家添加到所有语音频道
     * @param  {alt.Player} player
     * @returns {null}
     */
    addToVoiceChannels(player) {
        this.lowRangeChannel.addPlayer(player);
        this.midRangeChannel.addPlayer(player);
        this.longRangeChannel.addPlayer(player);
    }

    /**
     * 使所有语音频道中的玩家静音
     * @param  {alt.Player} player
     * @returns {null}
     */
    muteInAllChannels(player) {
        this.lowRangeChannel.mutePlayer(player);
        this.midRangeChannel.mutePlayer(player);
        this.longRangeChannel.mutePlayer(player);
    }

    /**
     * 为玩家设定范围，并在所有不应该听到的频道中将该玩家静音
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
     * 更改给定玩家的声音范围，并在新的范围频道中取消静音
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

//初始化语音类实例
export const AltvVoiceServerModuleInstance = new AltvVoiceServerModule();
```

## 3D用法示例 (客户端)

_Clientside_

```js
import * as alt from 'alt-client';

class AltvVoiceClientModule {
    constructor() {
        //localPlayer本地玩家对象的快捷方式
        this.localPlayer = alt.Player.local;
        //检查状态变化的间隔
        this.interval = null;
        //缓存的说话状态
        this.talkingState = false;
        //缓存语音范围
        this.currentRange = 0;
        this.registerEvents();
        alt.log('AltvVoiceClientModule init');
    }

    registerEvents() {
        alt.on('keydown', key => {
            if (key == 107) {
                //按 Num+ 更改其他玩家听到的声音范围
                alt.emitServer('server:ChangeVoiceRange');
            }
        });

        alt.onServer('client:UpdateCurrentAltVoiceRange', range => {
            this.currentRange = range;
            //向您的用户界面发出新范围
            /* 有效负载示例
                {
                muted: range === 0 ? true : false,
                range: range
                }
            */
        });

        this.registerTalkingInterval();
    }

    /*
     * 处理说话状态更改的时间间隔
     * 即在您的用户界面中显示该玩家是否在讲话（例如ts3语音指示灯）
     */
    registerTalkingInterval() {
        this.interval = alt.setInterval(() => {
            //仅在状态更改时发出
            if (this.talkingState !== this.localPlayer.isTalking && this.currentRange !== 0) {
                this.talkingState = this.localPlayer.isTalking;
                //向用户UI界面发出说话状态更改{this.talkingState}
            }
            if (this.talkingState && this.currentRange === 0) {
                //向您的用户UI界面发出说话状态更改 {false}
            }
        }, 444);
    }
}

//初始化语音类实例
export const AltvVoiceClientModuleInstance = new AltvVoiceClientModule();
```
