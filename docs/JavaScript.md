---
title: JavaScript
date: 2022-3-30
tags:
  - JavaScript
categories:
  - JavaScript
---

##### 理解async 和 await

- async

async用来声明一个异步函数，这个函数返回一个Promise

如果function中返回的是一个值，async会直接用Promise.resolve包裹该值返回

async函数内部return语句的返回值，会成为then方法回调函数的参数

```javascript
async function test(){
    return 1
}
test().then(res => { 
    console.log(res)  // 1
})
// 等价于
function test(){
    return new Promise.resolve(1)
}
```

- await

await用于等待一个Promise对象，它只能在异步函数async中使用，await 会暂停async代码的执行，直到Promise处理完成

await的返回值返回Promise对象的处理结果、如果await后边跟的不是Promise对象，则返回该值

```javascript
async function test(){
	await 1
    // const res = await 100  ------ res: 100
}
// 等价于
function test(){
	return new Poomise.resolve(1).then(() => undefined)
}
```

###### Map & Object 两者的区别

1. Map 和 Object 都能储存键值对，key 属性都具有唯一性。

2. Object 的 key 值只能是 Number、String、Symbol 类型，而 Map 的 key 值可以是任意形式，如果 Object 的 key 值不是 String 类型，会自动调用 toString 方法将其转化为字符串。

3. Map 是可以迭代的、而 Object 不可以迭代。

4. Map 有 size 属性，而 Object 没有 size 属性。

5. Map 会记录属性的写入顺序，Object 不会记录写入的先后的顺序、甚至会进行排序。

6. 编码验证 Map 的 key 值唯一性，迭代

   ```javascript
   let testMap = new Map()
   testMap.set(1, 'aaaaa').set(2, 'bbbbb').set(3, 'ccccc')
   testMap.set(1, '11111')

   console.log(testMap) // {1 => '11111', 2 => 'bbbbb', 3 => 'ccccc'}
   console.log(testMap.size) // 3

   // 获取Map的迭代器对象

   for (let item of testMap) {
     console.log('item', item)
     // [1, '11111']  [2, 'bbbbb']  [3, 'ccccc']
   }
   ```

###### JS 数据类型

JS 有两种数据类型的值，一种是基本数据类型、一种是引用数据类型。

1. 基本数据类型

   JS 基本数据类型有：Undefined、Null、Boolean、Number、String、还有 ES6 新增的 Symbol 和 ES10 新增的 BigInt 类型。

   Symbol 表示创建后独一无二且不可修改的数据类型，可用来解决对象属性冲突与全巨变量冲突的问题。

   BigInt 是一种数字类型的数据(大整数)，可以表示任意精度格式的整数，即使这个整数超出了 Number 所表示的安全整数范围。

2. 引用数据类型

   JS 的引用数据类型有：Object、Array、Function

3. 两者的区别

   两者的主要区别在于他们的存储位置不同，基本数据类型的值保存在栈中，占据空间小、大小固定、属于被频繁使用的数据；而引用数据类型的值保存在堆中，在栈中存储了指针，该指针指向堆中实体的起始地址。当查询引用类型值的时候，首先检索其在栈中的指针地址，然后从堆中获取实体。

###### 什么是栈和堆，他们的联系是什么

1. 堆和栈的存在于操作系统中，内存被分为栈区和堆区。

2. 栈中数据的存取方式为后进先出，堆是一个优先队列，是按照优先级来进行排序的，优先级可以根据大小来规定。

3. 存储结构图

   ![stack_heap](/coderdeh/blog/js-images/stack_heap.png)

4. 栈内存和堆内存的优缺点

   1. 在 JS 中，基本数据类型变量大小固定，并且操作简单容易，所以把它们放入栈中存储。 引用类型变量大小不固定，所以分配给堆中，让他们申请空间的时候自己确定大小，这样把它们分开存储能够使得程序运行起来占用的内存最小。
   2. 栈内存由于它的特点，所以它的系统效率较高。 堆内存需要分配空间和地址，还要把地址存到栈中，所以效率低于栈

5. 两者的垃圾回收

   栈内存中变量一般在它的当前执行环境结束就会被销毁被垃圾回收制回收， 而堆内存中的变量则不会，因为不确定其他的地方是不是还有一些对它的引用。 堆内存中的变量只有在所有对它的引用都结束的时候才会被回收。

###### null 与 undefined 的区别

1. null 和 undefined 都是基本数据类型，这两个基本数据类型都分别只有一个值，那就是 null 和 undefined。
2. undefined 代表的含义是未定义，而 null 代表的是一个空对象。
3. 一般变量申明了但是没有定义，在引用时会返回 undefined。
4. null 主要用于赋值给一些可能返回值为对象的变量作为初始化。
5. undefined 在 js 中不是一个保留字，这意味着我们可以使用 undefined 来作为一个变量名，但是这样是非常危险的，它会影响我们对 undefined 值的判断。
6. 当使用 typeof 对 undefined 和 null 进行判断时，返回值为 undefined、object，当使用双等号进行比较比较时返回 true，使用三等号进行比较时返回 false。

###### JS 原型和原型链 通过实例了解

1. 在 js 中是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 prototype 属性值，这个属性值是一个对象。这个对象包含该构造函数的所有实例共享的属性和方法。当我们使用构造函数 new 一个对象后，在这个对象的内部将包含一个指针`__proto__`，该指针指向构造函数的 prototype 属性对应的值，这个指针被称为对象的原型，可以通过 Object.getPrototypeOf()来获取对象的原型。

2. 当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype 所以我们新建的对象为什么能够使用 toString() 等方法的原因。

3. prototype 设计之初就是为了实现继承，让某一个构造函数实例化的所有对象可以找到公共的方法和属性。有了 prototype 我们不需要为每一个实例创建重复的属性方法，而是将属性方法创建在构造函数的原型对象上（prototype）。那些不需要共享的才创建在构造函数中

4. 图解原型&原型链

   ![prototype](/coderdeh/blog/js-images/prototype.png)

   - 补充知识

     - `__proto__`通常称为隐式原型，`prototype`通常称为显式原型
     - 对象和函数之前的关系：函数其实也是对象的一种
     - 函数和构造函数的区别：任何函数都可以作为构造函数，但并不是任何函数都可以叫做构造函数，只有当一个函数通过 new 关键字调用的时候才能成为构造函数。
     - `__proto__`和 constructor 属性是对象所独有的
     - prototype 属性是函数所独有的，由于 JS 中函数也是对象的一种，所以函数也有`__proto__ `和 constructor 属性
     - prototype 属性可以看成是一块特殊的存储空间(琅嬛福地)，存储原型的共享的属性和方法
     - 图中 Parent 是构造函数，p1 是通过 Parent 实例化出来的一个对象

   - prototype 属性

     - 从图中可以看到它从一个函数指向另一个对象，代表这个对象是这个函数的原型对象，这个对象也是当前函数所创建的实例的原型对象。

     - 当我们想为通过 Parent 实例化的所有实例添加一个共享的属性 name 时，和原型方法 getAge 时

       ```javascript
       Parent.prototype.name = '我是Parent原型属性，所有的实例都可以共享我'
       Parent.prototype.getAge = function () {
         return this.age
       }
       ```

     - p1 是通过`__prpto__`知道他的原型对象上有这个属性和方法的

   - `__proto__`属性

     - 该属性指向的就是该对象的原型对象,`__proto__`属性相当于通往原型对象 prototype(琅嬛福地)唯一的出路(指针)。

     - 从图中可以看到`__proto__`属性是从一个对象指向另一个对象，即从一个对象指向该对象的原型对象，通过代码表示如下：

       ```
       p1.__proto__ === Parent.prototype // true
       Parent.prototype.__proto__ === Object.prototype // true
       ```

     - 可以说一个对象的隐式原型指向了该对象的构造函数的显式原型

     - 由此我们可以验证一个结论，万物继承自 Object.prototype。这也就是为什么我们可以实例化一个对象，并且可以调用该对象上没有的属性和方法了，比如：p1.toString() / p1.hasOwnProperty('name')等。

     - 当我们调用`p1.toString()`的时候，先在 p1 对象本身寻找，没有找到则通过`p1.__proto__`找到了原型对象`Parent.prototype`，也没有找到，又通过`Parent.prototype.__proto__`找到了上一层原型对象 Object.prototype，在这一层找到了 toString 方法，返回该方法供`p1`使用。当然如果找到 Object.prototype 上也没找到，就在`Object.prototype.__proto__`中寻找，但是`Object.prototype.__proto__ === null`所以就返回 undefined，这就是为什么当访问对象中一个不存在的属性时返回 undefined。

   - constructor

     - 从图中看到它是从一个对象指向一个函数的，指向的这个函数就是该对象的构造函数。每个对象都有构造函数，我们通过代码测试

       ```javascript
       console.log(p1.constructor) // ƒ Parent(){}
       console.log(Parent.constructor) // ƒ Function() { [native code] }
       console.log(Function.constructor) // ƒ Function() { [native code] }
       ```

     - 通过输出看到 Parent 函数的构造函数是 Function()，这一点也不奇怪，其实每次定义函数就是在调用 new Function，下边两种效果是一样的

       ```javascript
       let fn = new Function('msg', 'alert(msg)')

       function fn(msg) {
         alert(msg)
       }
       ```

     - 通过输出看到 Function 函数的构造函数就是它本身，也就可以说 Function 是所有函数的根构造函数

     - 链接：https://segmentfault.com/a/1190000021232132

   - 获取原型的方法

     - `p1.__proto__`
     - p1.constructor.prototype
     - Object.getPrototypeOf(p1)
##### for循环与forEach的区别

- 补：
  - 遍历：指对数据结构的每一个成员进行有规律且为一次的访问
  - 迭代：迭代是递归的一种形式，是迭代器提供的一种方法，默认情况下是按照一定的顺序逐个访问数据结构的成员，迭代也是一种遍历行为
  - 可迭代对象：拥有 [Symbol.iterator] 方法

1. 本质区别

   - forEach是挂载在可迭代对象原型上的方法，例如：Array、Set、Map，它其实是一个迭代器，它与for循环本质上的区别是：forEach是负责遍历可迭代对象的，而for循环是一种循环机制，只能通过它遍历出数组

2. for循环可以使用break跳出循环，但forEach不能

   ```javascript
   let arr = [1,2,3,4,5]
   for(let i = 0; i < arr.length; i++){
       console.log(arr[i]) // 1 2
       if(arr[i] === 2) break;
   }
   
   arr.forEach((self,index)=>{
       console.log(self)
       if(self === 2) break // 报错
   })
   ```

3. for循环中使用return会报错，forEach中使用return无效

   直接在for循环中使用return会报错，但是在函数中使用for循环可以return

   forEach中使用return不会报错，但return也不会生效

   ```javascript
   let arr = [1,2,3,4,5]
   function find(array, num){
       array.forEach((self,index)=>{
           if(self === num){
               return index
           }
       })
   }
   let index = find(arr, 2) // undefinded
   ```

   return并不会起到终止代码运行并返回值的作用，所以并不能找到数字2在arr数组中的索引

   ```javascript
   function find(array, num) {
       let _index
       array.forEach((self, index) => {
           if (self === num) {
               _index = index
           }
       })
       return _index
   }
   ```

4. forEach删除自身元素，index不会被重置

   ```javascript
   let arr = [1,2]
   arr.forEach((self,index)=>{
       arr.splice(index, 1)
       console.log(index) // 0
   })
   console.log(arr) // [2]
   ```

   数组不会被清空，这是因为forEach在遍历运行完回调函数之后，会隐形的让index自增，第一遍遍历完成后，index变成了1，此时数组的最大索引是0，不满足条件，退出循环

5. for循环可以控制循环起点，forEach只能默认从索引为0开始

6. for循环过程中可以修改索引值，但forEach做不到，底层控制索引值自增

##### 普通for循环的使用与性能提升

1. 如果数组长度在循环过程中不发生改变，将数组长度用变量存储起来，会有的更高的效率

   ```javascript
   const arr = [1, 2, 3];
   for(let i = 0; i　< arr.length; i++) {
       console.log(arr[i]);
   }
   
   // 改进
   for(let i = 0, len = arr.length; i < len; i++) {
       console.log(arr[i]);
   }
   ```

2. for-in循环遍历的是对象的属性，而不是数组的索引，因此for-in还可遍历对象，实际上凡是可枚举属性，for-in都可遍历。

   ```javascript
   const obj = {
       fname: "san",
       lname: "zhang",
       age: 29
   }
   for(key in person) {
       console.log("obj[" + key + "] = " + person[key])
   }
   ```

3. Array在JS中是一个对象，Array的索引是属性名，它的索引类型不是number类型的，而是string类型的

   ```javascript
   const arr = [1,2,3,4,5]
   for(index in arr){
       console.log(typeof index) // string
   }
   ```

4. for-in不仅仅遍历 array 自身的属性，其还遍历 array 原型链上的所有可枚举的属性

   ```javascript
   Array.prototype.fatherName = "Father";
   const arr = [1, 2];
   arr.name = "Son";
   for(index in arr) {
       console.log("arr[" + index + "] = " + arr[index]);
   }
   // 输出
   arr[0] = 1
   arr[1] = 2
   arr[name] = Hello world
   arr[fatherName] = Father
   ```

5. for-in并不适合用来遍历Array中的元素，其更适合来遍历对象中的属性，但是稀疏数组除外。

   ```javascript
   const arr = []
   arr[1] = 1
   arr[5] = 5
   for(key in arr){
       console.log(`arr[${key}]=`, arr[key])
   }
   for(let i = 0; i < arr.length; i++){
       console.log(`arr[${i}]=`,arr[i])
   }
   
   // 输出
   arr[1]= 1
   arr[5]= 5
   
   arr[0]= undefined
   arr[1]= 1
   arr[2]= undefined
   arr[3]= undefined
   arr[4]= undefined
   arr[5]= 5
   ```

##### 数组和链表的区别

- 数组和链表主要的区别在于他们的结构，数组是基于索引的数据结构，其中每个元素与索引相关联，而链表依赖于引用，其中每个节点有数据和对前一个和下一个数据的引用组成。

- 数组的查询效率高，新增和删除效率低，内存分配是连续的内存，扩容需要重新分配内存，而链表新增和修改效率高，只需要修改指针指向就好。链表查询效率低，需要从链表头依次查找。内存分配不需要连续的内存，占用连续内存少。

  - 数组是一组有序的元素的集合，那么在内存分配上，数组必须是一段连续的内存地址。

  - 数组如果申请的空间长度不够，扩展的时候会重新申请一段连续的内存空间。

  - 数组支持随机查找，数组元素之间是通过下标维护的，比如要查找index是5的值，只需要通过数组的下标找到index是7就能找到对应的值，所以数组的查询速度很快。

  - 数组的新增和删除效率低

    - 比如要在index为3的后边添加一个新元素，那么需要将index为3后边的所有元素都往后挪动一位，将数组长度增加，index为3的前边元素不变。
    - 比如要删除index为4的元素，那么需要将index为4的后边的所有元素都向前挪动一位，index为4的前边的元素不变。

  - 链表申请内存的时候不需要预先申请连续的内存，几个不连续的内存地址的链表通过next指针链接成一条链，如果想查找到某个元素，必须从头开始查找，根据next指针直接达到该元素。

  - 链表新增不需要移动元素的位置，只需要改变新加入位置的元素的前边指针的指向，将其指向为新加入元素，并将新加入的元素指向前一个元素的原指向。

  - 链表删除只需要将删除元素的前一个next指针指向删除元素后边的这个元素即可。

  - 链表与数组的数据存储结构图

    ![image-20220613160000657](C:/Users/DEH18/AppData/Roaming/Typora/typora-user-images/image-20220613160000657.png)

    ![image-20220613155906949](C:/Users/DEH18/AppData/Roaming/Typora/typora-user-images/image-20220613155906949.png)



##### JavaScript对象隐式转换&&装箱与拆箱

###### 数学运算符中的类型转换

由于JavaScript没有类型声明，所以任意两个变量或者字面量都可以做加减乘除操作

1. 减 乘 除

   在对各种非Number类型运用数学运算符（- * /）时，会先将非Number类型转换为Number类型

   ```javascript
   1 - true // 0， 首先把 true 转换为数字 1， 然后执行 1 - 1
   1 - null // 1,  首先把 null 转换为数字 0， 然后执行 1 - 0
   1 * undefined //  NaN, undefined 转换为数字是 NaN
   2 * [undefined] // 2
   2 * ['5'] //  10， ['5']首先会变成 '5', 然后再变成数字 5
   ```

2. 加法的特殊性

   - 当一侧为String类型时，被识别为字符串拼接，会优先将另一侧的转换为字符类型

   - 当一侧为Number类型时，另一侧为原始类型时（Null，Symbol，Undefined，Boolean），将原始类型转换为Number类型

   - 当一侧为基本类型另一侧为引用类型时，或者两侧都为引用类型时，将两侧转化为字符串后，进行字符串的拼接

     ```
     123 + '123' // 123123   （规则1）
     123 + null  // 123    （规则2）
     123 + true // 124    （规则2）
     123 + {}  // 123[object Object]    （规则3）
     ```

###### 逻辑语句中的类型转换

1. 单个变量

   如果只有单个变量，会先将变量转换为Boolean类型值，有一个小技巧：只有null，undefined，''，NaN，0，false这几个是false，其他的情况都是true，具体转换规则参考下表

   ![convert-table](https://lanhaooss.oss-cn-shenzhen.aliyuncs.com/images/convert-table.png)

2. 使用 == 比较中的5条规则

   - 规则1  NaN 和其他类型（包括NaN）比较永远返回false
   - 规则2  Boolean和其他类型比较，Boolean首先会被转化为Number类型
   - 规则3  String和Number比较，先将String转化为Number类型 
   - 规则4  null == undefined比较结果是true，除此之外，null，undefined和其他任何值的比较结果都为false
   - 规则5  原始类型和引用类型作比较时，引用类型会按照ToPrimitive规则转化为原始类型

###### ToPrimitive规则

是引用类型向原始类型转变的规则，它遵循先valueOf后toString的模式，期望得到一个原始类型值，如果还是没发得到一个原始类型值，就会抛出TypeError

###### valueOf方法及返回值

JavaScript调用valueOf方法将对象转化为原始值，很少需要自己调用该方法，当遇到要预期的原始值对象时，JavaScript会自动调用它

默认情况下，valueOf有Object的每一个对象继承，如果对象没有原始值则返回该对象本身

JavaScript的许多内置对象都重写了该函数，以实现更适合自身的功能需求，因此，不通类型对象的valueOf的返回值与返回类型均可能不相同

##### ![img](https://yqfile.alicdn.com/img_f363e4d02b779dad1d0f830ecb8c45e7.png)

###### Number强制转换Object对象

1. 先调用该对象的valueOf方法
2. 判断该方法的返回值是否为基础数据类型( Number  String  Boolean  Null Undefined Symbol )
3. 若返回值为基本数据类型，则转换规则按照相应类型的转化规则进行转换
4. 若返回值不是基本数据类型，则在该返回值的基础上继续调用toString方法
5. 判断toString的返回值是否为基本数据类型
6. toString返回值为基本数据类型，则进行步骤三操作
7. 若toString返回值仍旧不是基本数据类型，则报错

###### String强制转化Object对象

1. 先调用对象的toString方法
2. 判断该方法的返回值是否为基础数据类型
3. 若返回值为基础数据类型，则转换规则按照相应类型的转化规则进行转换
4. 若返回值不是基本数据类型，则在改返回值的基础上继续调用valueOf方法
5. 判断valueOf的返回值是否为基础数据类型
6. 若valueOf返回值为基础数据类型，则进行步骤三操作
7. 若valueOf返回值仍旧不是基本数据类型，则报错

###### 区别

Number强制转化Object类型数据是先调用valueOf，然后调用toString；而String正好相反，先调用toString然后调用valueOf

###### 练习(Chrome为例)

1. {} + [] = 0 第一个大括号被浏览器当成一个代码块，所以就变成了 +[] ，而数组对象被被 '+' 执行了隐式的Number类型转换，Number([].valueOf().toString())，所以结果是0
1. [] + {} =  '[object Object]'  实际上就是进行字符串的拼接，String([].toString()) + String({}.toString())区别

###### 装箱

在转换数据类型时，因为数据类型的不同，而拥有不同的执行过膝恒，把基本数据类型转换为引用数据类型时，会触发装箱操作。把引用数据类型转换为基本数据类型，会触发拆箱操作

所谓的装箱，是指将基本数据类型转换为对应的引用类型的操作，而装箱又分为隐式装箱和显式装箱

1. 隐式装箱

   ```javascript
   var a = 1;
   a.name = 'daieh';
   console.log(a.name); // undefined
   
   // 运行步骤2的表现为：
   var temp = new Number(1);
   temp.name = 'daieh';
   // 执行流结束，回收temp
   
   // 运行步骤3的表现为：
   var temp = new Number(a);
   打印 temp.name
   // 执行流结束，回收temp
   ```

   隐式装箱中，当读取一个基本数据类型的值时，JS会创建一个改基本类型所对应的**基本包装类型**对象（比如：temp），并且在该语句执行结束后都会回收该对象，所以这也是导致a.name为undefined的原因

   

2. 显示装箱

   ```javascript
   var person = new String('daieh');
   person.age = 25
   ```

   显式装箱中，由于是通过**基本包装类型**对象进行包装，通过new操作符创建的引用类型的实例，在执行流离开当前作用域之前一直保留在内存中，所以可以对new出来的对象进行属性和方法的添加

###### 拆箱

是指把引用类型转换成基本数据类型, 通常通过引用类型的valueOf()和toString()方法实现

##### Event Loop

参照阮一峰《JavaScript 运行机制详解：再谈Event Loop》文档   https://www.ruanyifeng.com/blog/2014/10/event-loop.html



#### npm包

项目源码地址：https://github.com/coderdeh/jsutil-leaflet.git

依赖安装

```javascript
// 全局安装rollup
npm install rollup@2.78.0 -g

// 安装Babel核心库及其插件 解析JS代码
npm install @babel/core -D
npm install @babel/preset-env -D

// Rollup处理在代码中使用的导入语句
npm install rollup-plugin-node-resolve -D

// 引入commonjs规范的包
npm install rollup-plugin-commonjs -D

// 转译JavaScript 新特性(ES6/ES2015 等)到ES5 版本
npm install rollup-plugin-babel -D

// 代码压缩丑化
npm install rollup-plugin-uglify -D

// rollup从json文件中读取数据
npm install @rollup/plugin-json -D

// 分离css
npm install rollup-plugin-postcss -D

//压缩css代码
npm install cssnano -D

// 图片转base64
npm install postcss-url -D
```

项目目录结构

```javascript
package
       |------ dist 打包后的文件目录
       |------ src 包源码地址
       |------ .babelrc babel配置文件
       |------ .gitignore git忽略文件
       |------ package.json 依赖及打包配置文件
       |------ rollup.cpmfig.js rollup配置文件
```

.babelrc

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ]
  ]
}
```

package.json

```
{
  "name": "sgup-jsutil-leaflet",
  "version": "1.0.0",
  "description": "leaflet基类",
  "main": "dist/sgup-jsutil-leaflet.js",
  "scripts": {
    "build": "rollup -c"
  },
  "keywords": [
    "JavaScript",
    "leaflet"
  ],
  "author": "daieh",
  "license": "ISC",
  "dependencies": {
    "@babel/preset-env": "^7.20.2",
    "@shzl/shzl-leaflet": "^1.3.0",
    "leaflet": "^1.5.1",
    "leaflet.heat": "^0.2.0",
    "leaflet.markercluster": "^1.5.3"
  },
  "devDependencies": {
    "@babel/core": "^7.20.12",
    "@rollup/plugin-json": "^6.0.0",
    "cssnano": "^5.1.14",
    "postcss": "^8.4.21",
    "postcss-url": "^10.1.3",
    "rollup-plugin-babel": "^4.4.0",
    "rollup-plugin-commonjs": "^10.1.0",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-postcss": "^4.0.2",
    "rollup-plugin-uglify": "^6.0.4"
  }
}
```

rollup.cpmfig.js

```
// Rollup处理在代码中使用的导入语句
import resolve from 'rollup-plugin-node-resolve'

import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

// 代码压缩丑化
import { uglify } from 'rollup-plugin-uglify'

// rollup从json文件中读取数据
import json from '@rollup/plugin-json'

// 分离css
import postcss from "rollup-plugin-postcss"

//压缩css代码
import cssnano from "cssnano"

// 图片转base64
import postcssurl from 'postcss-url'

export default {
  // 要打包的文件
  input: "src/jsutil-leaflet.js",
  output: {
    file: "dist/sgup-jsutil-leaflet.js", // 输出的文件 如果没有这个参数，则直接输出到控制台
    format: "esm", // Rollup 输出的文件类型
    name: 'sgup-jsutil-leaflet' // 输出文件的名字
  },
  plugins: [
    json(),
    resolve(),
    postcss({
      plugins: [
        postcssurl({
          url: 'inline',
        }),
        cssnano(),
      ],
      extract: 'leaflet.css'
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    uglify()
  ]
}
```
##### 冒泡排序

思路：通过两两比较相邻元素并交换元素的位置，从而使整个序列按照顺序排列。该算法一次排序后，最大值总是会移到数组最后边，那么接下来就不用再考虑一次排序后的最大值，以此类推，直到所有元素排序完成

```javascript
function bubbleSort(arr){
    const aLen = arr.length
    if(aLen < 2) return arr
    for(let i = 0; i < aLen; i++){
        for(let j = 0; j < aLen - 1; j++){
            if(arr[j] > arr[j+1]){
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
    }
    return arr 
}
```

##### 选择排序

思路：首先在未排序的数组中，找到最大(最小)元素，然后将其放置在数列的起始位置，接着，再从剩余未排序的元素中继续寻找最大(最小)元素，然后将其放置在已排序数列的尾部，以此类推，直到所有元素排序完成

```
/**
* 首先循环遍历整个数组，预设最小元素的索引为当前循环的索引
* 在后边的元素中寻找最小元素，如果找到就记录其索引
* 如果当前元素的索引不是最小数的索引，就交换他们的位置
**/

function selectionSort(arr){
	for(let i = 0; i < arr.length; i++){
		// 假设当前最小元素的下标为当前元素下标
		let minIndex = i
		for(let j = i + 1; j < arr.length; j++){
			if(arr[j] < arr[minIndex]){
				// 找到更小的元素时，记录其索引
				minIndex = j
			}
		}
		// 如果当前遍历索引不是最小索引，就交互他们的值
		if(i !== minIndex){
			[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
		}
	}
	return arr
}
```
