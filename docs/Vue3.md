---
title: Vue3
date: 2022-4-20
tags:
  - Vue3
categories:
  - Vue3
---

### v-for 中 key 属性的作用

- key 属性主要用在 Vue 的虚拟 DOM 算法中，在新旧节点对比时辨识虚拟节点的，如果不使用 key，Vue 会最大限度的减少动态元素，并尽可能的复用相同类型的元素，而使用 key 时，Vue 会基于 key 的变化重新排列元素顺序，并且销毁 key 不存在的元素。

  - VNode(虚拟节点)：无论是组件还是元素，在 Vue 中最终表示出来的都是一个个 VNode，VNode 的本质是一个 JavaScript 对象。

    ```
    <div class="title" style="fontSize: 20px; color: red">
    	<p>Hello World</P>
    </div>
    const VNode = {
    	type: 'div',
    	props:[
    		class:'title',
    		style:{
    			fontSize: '20px',
    			color: 'red'
    		}
    	],
    	children:[
    		{
    			type: 'p',
    			children: 'Hello World'
    		}
    	]
    }
    ```

  - 虚拟 DOM：Vue 中模板中的标签，会经过虚拟 DOM 算法先转化成虚拟 DOM 树，最终渲染成真实 DOM 显示在页面中。

  - 在 Vue 中对于相同父元素的子元素节点列表，Vue 并不会重新渲染整个列表，如果此时在子节点列表中插入一个子节点，Vue 实际上会对于有没有 key 属性调用不同的方法，如果有 key 属性，则调用 pacthKeyedChildren，对于没有 key 属性的，则调用 patchUnkeyedChildren 方法，

### vue3 与 vue2 相比性能更快的原因

1. ##### diff 算法优化

   - vue2 中的虚拟 DOM 采用双端比较进行全量对比。
   - vue3 中新增了静态标记（PatchFlag），在与上次的虚拟 DOM 进行比较的时候，只比较带有静态标记的节点，并且参照枚举列表，通过 flag 的信息得知当前节点要对比的具体内容。
   - 补：双端比较：就是新列表（虚拟 DOM 列表）和旧列表两个列表的头和尾互相比较，在对比的过程中指针会逐渐向内靠拢，直到某一个节点全部遍历过，对比停止。
   - 补：枚举列表
     - 1：TEXT，动态文本节点
     - 2：CLASS，动态 class
     - 4：STYLE，动态 style
     - 8：PROPS，动态属性，但不包含类名和样式
     - 16：FULL_PROPS，动态 KEY 属性，当 KEY 改变时，需要进行完整的 diff 比较
     - 32：HYDRATE_EVENTS，带有监听事件的节点
     - 64：STABLE_FRAGMENT,一个不会改变子节点顺序的 fragment
     - 128：KEYED_FRAGMENT,带有 KEY 属性的 fragment 或部分子节点有 KEY
     - 256：UNKEYED_FRAGMENT,子节点没有 KEY 的 fragment
     - 512：NEED_PATCH，一个节点只会进行非 props 比较
     - -2：BAIL，退出优化模式

2. ##### 静态提升

   - vue2 中无论元素是否参与更新，每次都会重新创建，然后在渲染

   - vue3 中对于不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用即可。

     ```javascript
     静态提升前：
     export function render(...) {
         return (
             _openBlock(),
             _createBlock('div', null, [
                 _createVNode('div', null, '共创1'),
                 _createVNode('div', null, '共创2'),
                 _createVNode(
                     'div',
                     null,
                     _toDisplayString(_ctx.name),
                     1 /* TEXT */
                 ),
             ])
         )
     }

     静态提升后
     const _hoisted_1 = /*#__PURE__*/ _createVNode(
         'div',
         null,
         '共创1',
         -1 /* HOISTED */
     )
     const _hoisted_2 = /*#__PURE__*/ _createVNode(
         'div',
         null,
         '共创2',
         -1 /* HOISTED */
     )

     export function render(...) {
         return (
             _openBlock(),
             _createBlock('div', null, [
                 _hoisted_1,
                 _hoisted_2,
                 _createVNode(
                     'div',
                     null,
                     _toDisplayString(_ctx.name),
                     1 /* TEXT */
                 ),
             ])
         )
     }
     ```

   - 静态提升：对于不参与更新的元素，只会在第一次渲染的时候创建，然后存储在全局变量中，在后续渲染时直接复用，通过静态提升可以避免每次渲染的时候都要重新创建这些对象，从而大大提高了渲染效率

3. ##### 事件侦听缓存

   - 在默认情况下，事件会被视为动态绑定，每次都会去追踪他的变化，但绑定的为同一个函数，所以没有必要追踪它的变化，直接存储复用即可。

4. ##### SSR 渲染

   - 当有大量静态内容的时候，这些内容会被当做纯字符串推进一个 Buffer 里边，即时存在动态绑定，也会通过模板插值潜入进去，这样会比通过虚拟 DOM 来渲染快的多。
   - 当静态内容大到一定数量的时候，会通过\_createStaticVNode 方法在客户端生成一个 static node (静态节点)，这些静态节点会被直接 innerHTML，就不需要创建虚拟 DOM 对象，然后根据对象渲染。

### Composition API

- setup

  - setup 函数是组合 API 的入口函数，在组合 API 中定义的变量和方法要想使用，必须通过 return 暴露出去。
  - setup 的执行时机：在 beforeCreate（组件刚刚被创建，data 和 methods 还没初始化）之前执行，created（组件创建完成，data 和 methods 初始化完成）。
  - setup 的注意点：由于执行 setup 函数时，组件还没有创建完成，所以 setup 函数中无法使用 data 中的数据源和 methods 中的方法，Vue3 为了避免我们错误的使用，直接将 this 指针修改成了 undefined。
  - setup 函数只能是同步执行的，不能是异步的。async setup (): 页面上毛都没有。

- reactive

  - reactive 是 Vue3 中提供的实现响应式数据的方法，在 Vue2 中响应式数据是通过 dedineProperty 来实现的，而在 Vue3 中响应式数据是通过 ES6 的 Proxy 实现的。

  - reactive 的参数必须是一个对象或则数组，如果 reactive 中传递了其他对象（number string），默认情况下会修改对象，但是界面不会刷新，此时要想界面更新，可以通过重新赋值。

    ```
    let state = reactive({
      time: new Date(), // 获取当前时间，返回的是一个字符串
    });
    // 通过方法修改state中的数据
    function handleState () {
        // 直接修改以前的值，天数加1，无法引起页面的重新渲染
        // state.time.setDate(state.time.getDate() + 1);

        // 重新赋值  页面重新渲染
        const newTime = new Date(state.time.getDate());
        newTime.setDate(state.time.getDate() + 1);
        state.time = newTime;
    };
    ```

- ref

  - 和 reactive 一样也是 Vue3 提供的一种数据响应式的一种方法，底层本质还是 reactive。当我们给 ref 函数传递一个值得时候，ref 函数底层会自动将 ref 转化成 reactive 的形式。

  - ref 只能监听简单类型的数据变化，不能监听复杂类型的数据变化、如：数组、对象。

  - 在 setup 函数中修改 ref 定义的简单数据类型的值得时候，在模板中直接使用，不用通过 .value 的形式获取，但是需要通过 .value 的方式进行修改才能引起页面的重新渲染。

    ```
    let count = ref(123);
    function handleCount(){
       // 不会引起页面的重新渲染
       count += 20;
       // 页面重新渲染
       count.value += 20;
    }
    ```

- ref 和 reactive 的区别

  - 如果在模板中使用 ref 类型的数据时，Vue 会自动帮我们添加 .value

  - 如果在模板中使用 reactive 类型的数据时，Vue 不会自动帮我们添加 .value

  - 根据对象中是否有一个私有属性 \_\_v_ref，有：自动添加 .value

  - 通过 isRef 和 isReactive 可以判断属于哪种数据类型

    ```
    let count = ref(123);
    let state = reactive({
    	num: 666,
    });
    function typeJudge(){
    	console.log(isRef(count)); // true
    	console.log(isReactive(count)); // false
    	console.log(isRef(state)); // false
    	console.log(isReactive(state)); // true
    }
    ```

- 递归监听

  - 默认情况下，无论是 ref 还是 reactive 创建的数据都是递归监听。

    ```
    let state = shallowReactive({
      grandfather:{
      	age: 80,
      	father:{
      	  age: 50,
      	  mine:{
      	    age: 20
      	  }
      	}
      }
    });
    function changeFather(){
      grandfather.father.age = 45; // 会引起页面的重新渲染
    }
    ```

  - Vue3 会将每一层的数据都包装成一个 Proxy 对象

  - 存在的问题：如果数据量比较大，非常消耗性能。

- 非递归监听

  - 实现：通过 shallowReactive, shallowRef 实现。

  - 应用场景：只有在监听数据量比较大时，才会使用非递归监听。

  - Vue3 只会将第一层数据包装成一个 Proxy 对象，只要第一层的数据不发生改变，即使第二层、第三层的数据发生改变，也不会引起页面的重新渲染。

    ```
    let state = shallowReactive({
      grandfather:{
      	age: 80,
      	father:{
      	  age: 50,
      	  mine:{
      	    age: 20
      	  }
      	}
      }
    });
    function changeFather(){
      grandfather.father.age = 45; // 不会引起页面的重新渲染
    }
    ```

  - 如果是通过 shallowRef 创建的数据，Vue3 监听的是 .value 的变化，并不是第一层的变化。

    ```
    let state = shallowRef({
      grandfather:{
      	age: 80,
      	father:{
      	  age: 50,
      	  mine:{
      	    age: 20
      	  }
      	}
      }
    });
    function changeOne(){
      state = {
      	grandfather:{
      	  age: 800,
      	  father:{
      	    age: 500,
      	    mine:{
      	      age: 200
      	    }
      	  }
        }
      }; // 不会引起页面的重新渲染

    function changeFatherTwo(){
      state.value = {
      	grandfather:{
      	  age: 800,
      	  father:{
      	    age: 500,
      	    mine:{
      	      age: 200
      	    }
      	  }
        }
      }; // 不会引起页面的重新渲染
    }
    ```

  - 以上可以看出：若不是修改的 value 的值（shallowRef），是不会引起页面的重新渲染的，此时可以通过 triggerRef 来修改变量的值，从而引起页面的重新渲染。

    ```
    function changeTwo(){
      state.grandfather.father.age = 5000;
      triggerRef(state);
    }
    ```

  - Vue3 中没有提供 triggerReactive 方法用于响应式修改 shallowReactive 定义的非第一层数据，也就是说修改 shallowReactive 定义的非第一层数据的时候，无法引起页面重新渲染。不要意淫。。。
