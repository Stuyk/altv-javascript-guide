# 加密 / 密码哈希

这需要一个名为 `sjcl`.

您可以通过以下方式将其安装在 package.json 中: `npm install sjcl`

**服务器端**

```js
import sjcl from 'sjcl';

/**
 * 用pbkdf2散列密码
 * @param {string} password
 * @returns {string} 密码哈希.
 */
export function encryptPassword(password) {
    const saltBits = sjcl.random.randomWords(2, 0);
    const salt = sjcl.codec.base64.fromBits(saltBits);
    const key = sjcl.codec.base64.fromBits(sjcl.misc.pbkdf2(password, saltBits, 2000, 256));
    return `${key}$${salt}`;
}

/**
 * 验证密码与pbkdf2匹配.
 * @param {string} password
 * @param {string} storedPasswordHash
 * @returns {bool} 如果密码正确，则为true
 */
export function verifyPassword(password, storedPasswordHash) {
    const [_key, _salt] = storedPasswordHash.split('$');
    const saltBits = sjcl.codec.base64.toBits(_salt);
    const derivedKey = sjcl.misc.pbkdf2(password, saltBits, 2000, 256);
    const derivedBaseKey = sjcl.codec.base64.fromBits(derivedKey);

    if (_key != derivedBaseKey) {
        return false;
    }

    return true;
}

/**
 * 根据字符串生成哈希.
 * @param {string} data
 */
export function generateHash(data) {
    let hashBytes = sjcl.hash.sha256.hash(data + Math.random(0, 900000000));
    return sjcl.codec.hex.fromBits(hashBytes);
}

/**
 * 根据字符串生成持久哈希.
 * @param {string} data
 */
export function persistentHash(data) {
    let hashBytes = sjcl.hash.sha256.hash(data);
    return sjcl.codec.hex.fromBits(hashBytes);
}
```

## 用法示例

**服务器端**

```js
const hash = encryptPassword('test');
const isCorrectPassword = verifyPassword('test', hash);

if (isCorrectPassword) {
    console.log(`这是一个正确的密码.`);
}

const randomDataHash = generateHash(`whatever ${hash} ${isCorrectPassword}`);
console.log(randomDataHash);

const persistent = persistentHash(`whatever`);
const persistent2 = persistentHash(`whatever`);

if (persistent === persistent2) {
    console.log(`它们匹配!`);
}
```
