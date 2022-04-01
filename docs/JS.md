---
title: JS
date: 2022-3-30
tags:
  - JS
categories:
  - JS
---

##### JS

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
