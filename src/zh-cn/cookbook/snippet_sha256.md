# 纯JS SHA256

如果您需要适用于客户端和服务器端的哈希算法，就可以像下面这样操作.

这是由 [https://username1565.github.io/sha256/](https://username1565.github.io/sha256/)

```js
export function sha256(ascii) {
    function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
    }

    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length';
    var i, j; // 用作整个文件的计数器
    var result = '';
    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8;
    var hash = (sha256.h = sha256.h || []);
    var k = (sha256.k = sha256.k || []);
    var primeCounter = k[lengthProperty];

    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) {
                isComposite[i] = candidate;
            }
            hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
            k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
        }
    }

    ascii += '\x80'; // 追加Ƈ'位（加上零填充）
    while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00'; // 更多零填充
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j >> 8) return; // ASCII检查：仅接受0-255范围内的字符
        words[i >> 2] |= j << (((3 - i) % 4) * 8);
    }
    words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
    words[words[lengthProperty]] = asciiBitLength;

    for (j = 0; j < words[lengthProperty]; ) {
        var w = words.slice(j, (j += 16)); // 该消息在迭代过程中扩展为64个单词
        var oldHash = hash;
        // 现在是未定义的工作哈希，通常标记为变量a ... g
        // (我们也必须截断，否则最后会累积额外的条目
        hash = hash.slice(0, 8);

        for (i = 0; i < 64; i++) {
            var i2 = i + j;
            // 将消息扩展为64个字
            // 在下面使用
            var w15 = w[i - 15],
                w2 = w[i - 2];

            // 重复
            var a = hash[0],
                e = hash[4];
            var temp1 =
                hash[7] +
                (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + // S1
                ((e & hash[5]) ^ (~e & hash[6])) + // ch
                k[i] +
                // 根据需要扩展消息计划
                (w[i] =
                    i < 16
                        ? w[i]
                        : (w[i - 16] +
                          (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) + // s0
                              w[i - 7] +
                              (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | // s1
                          0);
            // 它仅使用一次，因此可以将其移动到下面，但是只保存4个字节，使内容无法读取
            var temp2 =
                (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + // S0
                ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

            hash = [(temp1 + temp2) | 0].concat(hash); // 我们不必理会多余的部分，只要我们在执行slice()时将其截断，它们就不会造成伤害。
            hash[4] = (hash[4] + temp1) | 0;
        }

        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i]) | 0;
        }
    }

    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            var b = (hash[i] >> (j * 8)) & 255;
            result += (b < 16 ? 0 : '') + b.toString(16);
        }
    }
    return result;
}
```

## 用法示例

```js
const result = sha256(`test`);
console.log(result);
```
