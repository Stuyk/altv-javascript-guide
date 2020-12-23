# 数学 & 距离

alt:V 默认情况下不附带用于获取距离的默认功能.

在 服务器端 或 客户端 使用这些功能.

```js
/**
 * 让所有玩家都处于某个位置的某个范围内.
 * @param  {} pos
 * @param  {} range
 * @param  {} dimension=0
 * @returns {Array<alt.Player>}
 */
export function getPlayersInRange(pos, range, dimension = 0) {
    if (pos === undefined || range === undefined) {
        throw new Error('GetPlayersInRange => 位置或范围未定义');
    }

    return alt.Player.all.filter(player => {
        return player.dimension === dimension && distance2d(pos, player.pos) <= range;
    });
}

/**
 * 获取玩家的前向矢量.
 * @param  {} rot
 * @returns {{x,y,z}}
 */
export function getForwardVectorServer(rot) {
    const z = -rot.z;
    const x = rot.x;
    const num = Math.abs(Math.cos(x));
    return {
        x: -Math.sin(z) * num,
        y: Math.cos(z) * num,
        z: Math.sin(x)
    };
}

/**
 * 获取一个向量到另一个向量的距离.
 * 是否考虑了Z轴.
 * @param  {} vector1
 * @param  {} vector2
 * @returns {number}
 */
export function distance(vector1, vector2) {
    if (vector1 === undefined || vector2 === undefined) {
        throw new Error('AddVector => vector1 或 vector2 未定义');
    }

    return Math.sqrt(
        Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2)
    );
}

/**
 * 获取一个向量到另一个向量的距离.
 * 不考虑Z轴.
 * @param  {} vector1
 * @param  {} vector2
 * @returns {{x,y,z}}
 */
export function distance2d(vector1, vector2) {
    if (vector1 === undefined || vector2 === undefined) {
        throw new Error('AddVector => vector1 或 vector2 未定义');
    }

    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
}

/**
 * 检查位置是否在两个向量之间.
 * @param  {} pos
 * @param  {} vector1
 * @param  {} vector2
 * @returns {boolean}
 */
export function isBetween(pos, vector1, vector2) {
    const validX = pos.x > vector1.x && pos.x < vector2.x;
    const validY = pos.y > vector1.y && pos.y < vector2.y;
    return validX && validY ? true : false;
}

/**
 * 在位置周围获得随机位置.
 * @param  {} position
 * @param  {} range
 * @returns {{x,y,z}}
 */
export function randomPositionAround(position, range) {
    return {
        x: position.x + Math.random() * (range * 2) - range,
        y: position.y + Math.random() * (range * 2) - range,
        z: position.z
    };
}

/**
 * 从一组向量中获取最接近的向量.
 * @param  {alt.Vector3} pos
 * @param  {Array<{x,y,z}> | Array<{pos:alt.Vector3}} arrayOfPositions
 * @returns {Array<any>}
 */
export function getClosestVectorFromGroup(pos, arrayOfPositions) {
    arrayOfPositions.sort((a, b) => {
        if (a.pos && b.pos) {
            return distance(pos, a.pos) - distance(pos, b.pos);
        }

        return distance(pos, a.pos) - distance(pos, b.pos);
    });

    return arrayOfPositions[0];
}

/**
 * 寻找离玩家最近的玩家.
 * @param  {} player
 * @returns {Array<alt.Player>}
 */
export function getClosestPlayer(player) {
    return getClosestVectorFromGroup(player.pos, [...alt.Player.all]);
}

/**
 * 获取最接近玩家的载具.
 * @param  {alt.Vector3} player
 * @returns {Array<alt.Vehicle>}
 */
export function getClosestVehicle(player) {
    return getClosestVectorFromGroup(player.pos, [...alt.Vehicle.all]);
}
```

## 用法示例

```js
const dist1 = { x: 5, y: 2, z: 0 };
const dist2 = { x: 1, y: 1, z: 0 };

const dist = distance2d(dist1, dist2);
const closestVehicle = getClosestVehicle(player);
const closestPlayer = getClosestPlayer(player);
```
