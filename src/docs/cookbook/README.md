# Snippets

These are going to assist with general server building.

## Extending Player Functionality

This is also known as prototyping.

They do **NOT** work in multiple resources. Single resource only.

```js
alt.Player.prototype.emitMeta = function emitMeta(key, value) {
    if (typeof value === 'function') {
        throw new Error(`Value cannot be a function. emitMeta.prototype`);
    }

    this.setMeta(key, value);
    alt.emitClient(this, 'meta:Emit', key, value);
};

alt.Player.prototype.init = function init() {
    this.data = {};
};

alt.Player.prototype.syncCash = function syncCash() {
    this.emitMeta('cash', this.data.cash);
};

alt.Player.prototype.setCash = function setCash(value) {
    if (isNaN(value)) {
        throw new Error(`Value is not a number. setCash.prototype`);
    }

    if (!this.data) {
        this.data = {};
    }

    this.data.cash = value;
    this.syncCash();
};

alt.Player.prototype.subCash = function subCash(value) {
    if (isNaN(value)) {
        throw new Error(`Value is not a number. subCash.prototype`);
    }

    if (!this.data) {
        this.data = {};
    }

    const absValue = Math.abs(parseFloat(value)) * 1;
    if (this.data.cash < absValue) {
        return false;
    }

    this.data.cash -= absValue;
    this.data.cash = Number.parseFloat(this.data.cash).toFixed(2) * 1;
    this.syncCash();
    return true;
};

// Add cash to the this.
alt.Player.prototype.addCash = function addCash(value) {
    if (isNaN(value)) {
        throw new Error(`Value is not a number. addCash.prototype`);
    }

    if (!this.data) {
        this.data = {};
    }

    const absValue = Math.abs(parseFloat(value));
    if (this.data.cash + absValue > 92233720368547757) {
        absValue = 92233720368547757;
    }

    this.data.cash += absValue;
    this.data.cash = Number.parseFloat(this.data.cash).toFixed(2) * 1;
    this.syncCash();
    return true;
};
```

### Example Usage

```js
player.init();
player.emitMeta('test', true);
player.setCash(25);
player.subCash(5);
player.addCash(2);
```

## Math Snippet

```js
/**
 * Get all players in a certain range of a position.
 * @param  {} pos
 * @param  {} range
 * @param  {} dimension=0
 * @returns {Array<alt.Player>}
 */
export function getPlayersInRange(pos, range, dimension = 0) {
    if (pos === undefined || range === undefined) {
        throw new Error('GetPlayersInRange => pos or range is undefined');
    }

    return alt.Player.all.filter(player => {
        return player.dimension === dimension && distance2d(pos, player.pos) <= range;
    });
}

/**
 * Get the forward vector of a player.
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
 * Get the distance from one vector to another.
 * Does take Z-Axis into consideration.
 * @param  {} vector1
 * @param  {} vector2
 * @returns {number}
 */
export function distance(vector1, vector2) {
    if (vector1 === undefined || vector2 === undefined) {
        throw new Error('AddVector => vector1 or vector2 is undefined');
    }

    return Math.sqrt(
        Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2)
    );
}

/**
 * Get the distance from one vector to another.
 * Does not take Z-Axis into consideration.
 * @param  {} vector1
 * @param  {} vector2
 * @returns {{x,y,z}}
 */
export function distance2d(vector1, vector2) {
    if (vector1 === undefined || vector2 === undefined) {
        throw new Error('AddVector => vector1 or vector2 is undefined');
    }

    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
}

/**
 * Check if a position is between two vectors.
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
 * Get a random position around a position.
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
 * Get the closest vector from a group of vectors.
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
 * Get the closest player to a player.
 * @param  {} player
 * @returns {Array<alt.Player>}
 */
export function getClosestPlayer(player) {
    return getClosestVector(player.pos, [...alt.Player.all]);
}

/**
 * Get the closest vehicle to a player.
 * @param  {alt.Vector3} player
 * @returns {Array<alt.Vehicle>}
 */
export function getClosestVehicle(player) {
    return getClosestVehicle(player.pos, [...alt.Vehicle.all]);
}
```

### Example Usage

```js
const dist1 = { x: 5, y: 2, z: 0 };
const dist2 = { x: 1, y: 1, z: 0 };

const dist = distance2d(dist1, dist2);
const closestVehicle = getClosestVehicle(player);
const closestPlayer = getClosestPlayer(player);
```

## Drawing Text 3D & 2D

```js
export function drawText2d(
    msg,
    x,
    y,
    scale,
    fontType,
    r,
    g,
    b,
    a,
    useOutline = true,
    useDropShadow = true,
    layer = 0,
    align = 0
) {
    let hex = msg.match('{.*}');
    if (hex) {
        const rgb = hexToRgb(hex[0].replace('{', '').replace('}', ''));
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
        msg = msg.replace(hex[0], '');
    }

    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(fontType);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextCentre(true);
    native.setTextColour(r, g, b, a);
    native.setTextJustification(align);

    if (useOutline) {
        native.setTextOutline();
    }

    if (useDropShadow) {
        native.setTextDropShadow();
    }

    native.endTextCommandDisplayText(x, y);
}

export function drawText3d(
    msg,
    x,
    y,
    z,
    scale,
    fontType,
    r,
    g,
    b,
    a,
    useOutline = true,
    useDropShadow = true,
    layer = 0
) {
    let hex = msg.match('{.*}');
    if (hex) {
        const rgb = hexToRgb(hex[0].replace('{', '').replace('}', ''));
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
        msg = msg.replace(hex[0], '');
    }

    native.setDrawOrigin(x, y, z, 0);
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(fontType);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextCentre(true);
    native.setTextColour(r, g, b, a);

    if (useOutline) {
        native.setTextOutline();
    }

    if (useDropShadow) {
        native.setTextDropShadow();
    }

    native.endTextCommandDisplayText(0, 0);
    native.clearDrawOrigin();
}
```

### Example Usage

```js
alt.everyTick(() => {
    drawText2d('Hello from Top Center of Screen', 0.5, 0.05, 0.4, 4, 255, 255, 255, 255);

    const playerPos = { ...alt.Player.local.pos };
    drawText3d(`This is You`, playerPos.x, playerPos.y, playerPos.z, 0.3, 4, 255, 255, 255, 255);
});
```
