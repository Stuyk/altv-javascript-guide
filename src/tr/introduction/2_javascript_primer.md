# JavaScript İpuçları

Bu sayfa basitçe JavaScript prensiplerini açıklayacaktır. 
This page is to explain some basic JavaScript principles. Bu sayfa kod yazmayı öğrenmek için araştırmaktan kaçınan ve kurs almayı reddeden insanlar için hazırlanmıştır. Aşağıda bazı kurslar bulunmakta;

-   [https://learnxinyminutes.com/docs/javascript/](https://learnxinyminutes.com/docs/javascript/)
-   [https://www.learn-js.org/](https://www.learn-js.org/)
-   [https://bonsaiden.github.io/JavaScript-Garden/](https://bonsaiden.github.io/JavaScript-Garden/)

## Değişkenler

JavaScript'in bu günlerde kullanabileceğimiz iki farklı değişken türü var.

```js
const myVariable = 'example';
let myVariableName = 'example';
```

**const**, sabit değişken anlamına gelir. Bir değere sahip olması zorunludur, boş tanımlanamaz. Bu değişken aynı zamanda tanımlandıktan sonra değiştirilemez ancak tekrar kullanılabilir.

**let**, değeri değişebilen değişken anlamına gelir. Tekrar tekrar kullanabileceğiniz ve içeriğini değiştirebileceğiniz bir değişken türüdür.

```js
let myVariable;
myVariable = 'test';
myVariable = 25;
myVariable = {
    myProperty: 'Cool Stuff'
};
```

## Basit Matematik

JavaScript üzerinde matematik diğer programlama dilleri ile çok benzerdir.

```js
let result;

// Toplama
result = 5 + 5;
result += 1;
console.log(result);

// Çıkarma
result = 10 - 5;
result -= 1;
console.log(result);

// Çarpım
result = 10 * 5;
result *= 2;
console.log(result);

// Bölme
result = 10 / 5;
console.log(result);
```

## Basit Fonksiyonlar

Fonksiyonlar farklı kod blokları üzerinde çalıştırabileceğiniz özel kod bloklarıdır. Fonksiyonlar aynı zamanda farklı dosyalarda çalıştırmak için `export` ve `import` edilebilir. Bu bölümün altında `import` ve `export` işlemlerine değineceğiz.

Fonksiyonlar bir çok farklı şekilde yazılabilir. Biz genelde `fat arrow fonksiyon` yerine geleneksel yöntemi tercih ediyoruz.

**Geleneksel Fonksiyon Örneği**

```js
function myFancyFunction(myArgument, myOtherArgument) {
    console.log(myArgument);
    console.log(myOtherArgument);
}

myFancyFunction('hello', 'world');

function add(n1, n2) {
    return n1 + n2;
}

const result = add(5, 5);
console.log(result);
// Geriye 10 değerini döndürür ve yazdırır.
```

**Fat Arrow Fonksiyonlar**

```js
const myFancyFunction = (myArgument, myOtherArgument) => {
    console.log(myArgument);
    console.log(myOtherArgument);
};

myFancyFunction('hello', 'world');

const add = (n1, n2) => {
    return n1 + n2;
};

const result = add(5, 5);
console.log(result);
// Geriye 10 değerini döndürür ve yazdırır.
```

## Fonksiyonlarda `export` işlemi

`export` işlemi alt:V üzerindeki çalışmalarımızın çoğunu kapsar ancak `export`. `export` işlemi JavaScript içerisinde yaygın değil. Bunun için ES6'nın yazım eklini `import` ve `export` işlemleri için kullanıyoruz. Bu işlem, JavaScript üzerinde tüm modülün dışa aktarılmasından biraz farklı çalışıyor.

Bu dosyaların aynı dizin içerisinde bulunduğunu varsayalım;

**Dosya 1 - file1.js**

```js
export function myFunction(arg1, arg2) {
    console.log(arg1, arg2);
}
```

**Dosya 2 - file2.js**

```js
import { myFunction } from './file1.js';

myFunction('hello', 'world');
```

**Dosya 2 (Alternatif) - file2.js**

```js
import * as myFuncs = from './file1.js'

myFuncs.myFunction('hello', 'world');
```

Kontrolü oldukça kolay. Sabit bir klasör yapısı içerisinde `export` ve `import` işlevlerini her yerde kullanacağız.

## For Döngüleri

Döngüler, JavaScript içinde çok farklı işlevlerde kullanılabilir. Daha az kod yazmınız için herhangi bir yerde kullanabileceğiniz bir araçtır. Döngü, bir döngü bitene kadar içine yazılan kod bloğunu defalarca çalıştıracaktır. Bir dizi veriyle bir çok şey yapmamızı sağlar.

Döngülerin sıfırdan (0) başladığını unutmayın. Bu Lua değil. Bir dizinin ilk elemanının adresi her zaman sıfırdır (0).

```js
const data = ['test0', 'test1', 'test2'];

function saySomething(msg) {
    console.log(msg);
}

// i, bu döngü içerisinde başlangıç numarasıdır.
// i++ i sayısını her döngünün sonunda birer birer arttırır. 
for (let i = 0; i < data.length; i++) {
    saySomething(data[i]);
}
```

Yukarıda ki kod `data` dizisi için 3 kez çalışacaktır. Önce ‘test0’, ardından ‘test1’ ve son olarak ‘test2’ yazdıracaktır. Bu işlem döngüde ki `i` sayısını kod bloğunun içinde kullanarak sağlanır.
