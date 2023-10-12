---
title: VUE
date: 2023-3-16
tags:
  - VUE
categories:
  - VUE
---


##### 父子组件实现双向绑定

- 1、通过 .sync 实现

  ```
  父组件中：
  <Child :bothData.sync="msg" />
  data(){
    return {
    	msg: '父子组件共享的数据'
    }
  }
  
  子组件中：
  <button @click="changeData" />
  props:{
    bothData:{
    	type: String,
    	default: () => ''
    }
  }
  
  methods:{
    changeData(){
      this.$emit('update: msg', '新数据')
    }
  }
  ```

- 2、Vue 2 通过v-model实现 

  - 基础写法：限制了必须在props中接受的属性名为value，emit触发的事件必须为input

    ```
    父组件中：<Child v-model="msg" />
    data(){
      return {
      	msg: '父子组件共享的数据'
      }
    }
    
    子组件中：
    <button @click="changeData" />
    props:{
      value:{
      	type: String,
      	default: () => ''
      }
    }
    
    methods:{
      changeData(){
        this.$emit('input', '新数据')
      }
    }
    ```

  - 进阶写法：在子组件中使用model选项，来指定props中接受数据的属性名 和 emit触发的事件名

    ```
    父组件中：<Child v-model="msg" />
    data(){
      return {
      	msg: '父子组件共享的数据'
      }
    }
    
    子组件中：
    <button @click="changeData" />
    model:{
      // prop属性用来指定props属性中的哪个值用来接收父组件v-model传递的值
      // event的值对应emit时要提交的事件名
      prop: 'acceptVal',
      event: 'changeMsg'
    }
    props:{
      acceptVal:{
      	type: String,
      	default: () => ''
      }
    }
    
    methods:{
      changeData(){
        this.$emit('changeMsg', '新数据')
      }
    }
    ```

  - 3、Vue 3 通过v-model实现：在自定义组件中使用v-model时，v-model的默认props属性名和事件名更改了，更改为modelValue 和 update:modelValue，并且移除了model选项，但同时也支持多个数据的双向绑定

    ```
    父组件中：
    <Child v-model="name" v-model:address="address" />
    <script setup>
      const name = ref('coderdeh')
      const address = ref('河南驻马店')
    </script>
    
    子组件中：
    <button @click="handleData" />
    <script setup>
      const props = defineProps({
        modelValue: {
          type: String,
          default: () => ''
        },
        address: {
          type: String,
          default: () => ''
        }
      })
      
      const emit = defineEmits(['update:modelValue','update:address'])
      const handleData = () => {
        emit('update:modelValue', '新名字')
        emit('update:address', '新地址')
      }
    </script>
    ```

##### v-model的原理

- v-model是一个语法糖，实际上是v-bind:value 和 v-on:input 或者 v-on:change 的结合体，v-model在内部为不通的元素绑定属性，并抛出不同的事件，在input标签中绑定input事件、checkbox和radio中绑定change事件

##### v-for中key属性的作用

- key属性主要用在Vue的虚拟DOM算法中，在新旧节点对比时辨识虚拟节点的，如果不使用key，Vue会最大限度的减少动态元素，并尽可能的复用相同类型的元素，而使用key时，Vue会基于key的变化重新排列元素顺序，并且销毁key不存在的元素。

  - VNode(虚拟节点)：无论是组件还是元素，在Vue中最终表示出来的都是一个个VNode，VNode的本质是一个JavaScript对象。

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

  - 虚拟DOM：Vue中模板中的标签，会经过虚拟DOM算法先转化成虚拟DOM树，最终渲染成真实DOM显示在页面中。

  - 在Vue中对于相同父元素的子元素节点列表，Vue并不会重新渲染整个列表，如果此时在子节点列表中插入一个子节点，Vue实际上会对于有没有key属性调用不同的方法，如果有key属性，则调用pacthKeyedChildren，对于没有key属性的，则调用patchUnkeyedChildren方法，

##### vue3与vue2相比性能更快的原因

1. ##### diff算法优化
   
   - vue2中的虚拟DOM采用双端比较进行全量对比。
   - vue3中新增了静态标记（PatchFlag），在与上次的虚拟DOM进行比较的时候，只比较带有静态标记的节点，并且参照枚举列表，通过flag的信息得知当前节点要对比的具体内容。
   - 补：双端比较：就是新列表（虚拟DOM列表）和旧列表两个列表的头和尾互相比较，在对比的过程中指针会逐渐向内靠拢，直到某一个节点全部遍历过，对比停止。
   - 补：枚举列表
     - 1：TEXT，动态文本节点
     - 2：CLASS，动态class
     - 4：STYLE，动态style
     - 8：PROPS，动态属性，但不包含类名和样式
     - 16：FULL_PROPS，动态KEY属性，当KEY改变时，需要进行完整的diff比较
     - 32：HYDRATE_EVENTS，带有监听事件的节点
     - 64：STABLE_FRAGMENT,一个不会改变子节点顺序的fragment
     - 128：KEYED_FRAGMENT,带有KEY属性的fragment或部分子节点有KEY
     - 256：UNKEYED_FRAGMENT,子节点没有KEY的fragment
     - 512：NEED_PATCH，一个节点只会进行非props比较
     - -2：BAIL，退出优化模式
   
2. ##### 静态提升
   
   - vue2中无论元素是否参与更新，每次都会重新创建，然后在渲染
   
   - vue3中对于不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用即可。
   
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
   
4. ##### SSR渲染
   
   - 当有大量静态内容的时候，这些内容会被当做纯字符串推进一个Buffer里边，即时存在动态绑定，也会通过模板插值潜入进去，这样会比通过虚拟DOM来渲染快的多。
   - 当静态内容大到一定数量的时候，会通过_createStaticVNode方法在客户端生成一个static node (静态节点)，这些静态节点会被直接innerHTML，就不需要创建虚拟DOM对象，然后根据对象渲染。

##### Composition API

- setup

  - setup函数是组合API的入口函数，在组合API中定义的变量和方法要想使用，必须通过return暴露出去。
  - setup的执行时机：在beforeCreate（组件刚刚被创建，data和methods还没初始化）之前执行，created（组件创建完成，data和methods初始化完成）。
  - setup的注意点：由于执行setup函数时，组件还没有创建完成，所以setup函数中无法使用data中的数据源和methods中的方法，Vue3为了避免我们错误的使用，直接将this指针修改成了undefined。
  - setup函数只能是同步执行的，不能是异步的。async setup (): 页面上毛都没有。

- reactive

  - reactive是Vue3中提供的实现响应式数据的方法，在Vue2中响应式数据是通过dedineProperty来实现的，而在Vue3中响应式数据是通过ES6的Proxy实现的。

  - reactive的参数必须是一个对象或则数组，如果reactive中传递了其他对象（number string），默认情况下会修改对象，但是界面不会刷新，此时要想界面更新，可以通过重新赋值。

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

  - 和reactive一样也是Vue3提供的一种数据响应式的一种方法，底层本质还是reactive。当我们给ref函数传递一个值得时候，ref函数底层会自动将ref转化成reactive的形式。

  - ref只能监听简单类型的数据变化，不能监听复杂类型的数据变化、如：数组、对象。

  - 在setup函数中修改ref定义的简单数据类型的值得时候，在模板中直接使用，不用通过 .value 的形式获取，但是需要通过 .value 的方式进行修改才能引起页面的重新渲染。

    ```
    let count = ref(123);
    function handleCount(){
       // 不会引起页面的重新渲染
       count += 20;
       // 页面重新渲染
       count.value += 20;
    }
    ```

- ref 和 reactive的区别

  - 如果在模板中使用ref类型的数据时，Vue会自动帮我们添加 .value

  - 如果在模板中使用reactive类型的数据时，Vue不会自动帮我们添加 .value

  - 根据对象中是否有一个私有属性 __v_ref，有：自动添加 .value

  - 通过isRef  和  isReactive可以判断属于哪种数据类型

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

  - 默认情况下，无论是ref还是reactive创建的数据都是递归监听。

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

  - Vue3会将每一层的数据都包装成一个Proxy对象

  - 存在的问题：如果数据量比较大，非常消耗性能。

- 非递归监听

  - 实现：通过 shallowReactive, shallowRef实现。

  - 应用场景：只有在监听数据量比较大时，才会使用非递归监听。

  - Vue3只会将第一层数据包装成一个Proxy对象，只要第一层的数据不发生改变，即使第二层、第三层的数据发生改变，也不会引起页面的重新渲染。

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

  - 如果是通过shallowRef创建的数据，Vue3监听的是 .value 的变化，并不是第一层的变化。

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

  - 以上可以看出：若不是修改的value的值（shallowRef），是不会引起页面的重新渲染的，此时可以通过 triggerRef来修改变量的值，从而引起页面的重新渲染。

    ```
    function changeTwo(){
      state.grandfather.father.age = 5000;
      triggerRef(state);
    }
    ```

  - Vue3中没有提供 triggerReactive 方法用于响应式修改shallowReactive定义的非第一层数据，也就是说修改 shallowReactive 定义的非第一层数据的时候，无法引起页面重新渲染。不要意淫。。。

##### new Vue()发生了什么

- 调用_init方法
  - 定义$set $get $delete $watch等方法
  - 定义$on $off $emit $once等事件
  - 定义_update $beforeUpdate $destroy等生命周期
- 调用initState方法完成 props methods data computed watch的初始化
- 调用$mount进行页面的挂载，挂载的时候主要通过mountComponent方法
- 定义updateComponent更新函数
- 执行render函数生成虚拟DOM
- _update将虚拟DOM生成真实DOM并渲染到页面中

##### vue3+vite项目中TSX语法的使用

插件安装与配置

```javascript
npm install @vitejs/plugin-vue-jsx -D
npm install @vitejs/plugin-vue -D

// vite.config.ts配置
import { defineConfig } form 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig{
    plugins:[vue(), vueJsx()]
}

// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "useDefineForClassFields": true,
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment",
    "sourceMap": true,
    "resolveJsonModule": true,
    "isolatedModules": false,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- tsx支持v-model的使用

  ```
  import { ref } from "vue";
  let vModel = ref<string>("我是tsxv-model")
  const renderDom = () => {
    return (
      <div>
        <div>hellow tsx</div>
        <input type="text" v-model={vModel.value} />
        <div class='red'>{vModel.value}</div>
      </div >
    )
  }
   
  export default renderDom
  ```

- tsx支持v-show的使用

  ```
  import { ref } from "vue";
  let flag = true
  const renderDom = () => {
    return (
      <div>
        <div>hellow tsx</div>
        <div v-show={flag}>我是v-show=true</div>
        <div v-show={!flag}>我是v-show=false</div>
      </div >
    )
  }
   
  export default renderDom;
  ```

- tsx不支持v-if的使用，但可以使用三元表达式

  ```
  import { ref } from "vue";
  let flag = true
  const renderDom = () => {
    return (
      <div>
        <div>hellow tsx</div>
        {flag ? <div>我是v-if=true</div> : <div>我是v-if=false</div>}
      </div >
    )
  }
   
  export default renderDom;
  ```

- tsx不支持v-for的使用，但可以使用Array.map

  ```
  import { ref } from "vue";
  let arr = [1, 2, 3, 4, 5]
  const renderDom = () => {
    return (
      <div>
        <div>hellow tsx</div>
        {
          arr.map(v => {
            return (<div data-index={v}>{v}</div>)
          })
        }
      </div >
    )
  }
   
  export default renderDom;
  ```

- v-on绑定事件

  - 所有事件由on开头
  - 所有事件名称首字母大写 例如：Click   Mousemove
  - 绑定onClick={ ontapClick }
  - 传参使用bind()或箭头函数

  ```
   let arr = [11, 22, 33, 44, 54]
  const renderDom = () => {
    return (
      <div>
        {
          arr.map(v => {
            return (<div onClick={ontapClick.bind(this, v)} data-index={v}>{v + '我是bind传参'}</div>)
          })
        }
        <div>
          <div onClick={() => onCcc('我是箭头')}>我是箭头函数传参</div>
        </div>
      </div >
    )
  }
  let ontapClick = (index: any) => {
    console.log("点击了", index)
  }
  let onCcc = (msg: string) => {
    console.log("点击了", msg)
  }
  
  export default renderDom;
  ```

- props传值

  ```
  import { ref } from "vue";
   
  type Props = {
    title: string
  }
   
  const renderDom = (props: Props) => {
    return (
      <div>
        <div>{props.title}</div>
      </div >
    )
  }
   
  export default renderDom;
   
  //父组件
  <renderDom title="我是tsx"></renderDom>
  ```

- emit派发事件

  ```
  import { ref } from "vue";
  let arr = [11, 22, 33, 44, 54]
  type Props = {
    title: string
  }
  const renderDom = (props: Props, ctx: any) => {
    return (
      <div>
        <div>{props.title}</div>
       
        {
          arr.map(v => {
            return (<div onClick={ontapClick.bind(this, v, ctx)} data-index={v}>{v}</div>)
          })
        }
      
      </div >
    )
  }
   
  let ontapClick = (index: any, ctx: any) => {
    console.log("点击了", index)
    ctx.emit("on-click", index)
  }
   
  export default renderDom;
  
  // 父组件
  <renderDom title="我是tsx" @on-click="getNum"></renderDom>
  let getNum = (e: any) => {
    console.log("父组件接收了", e)
  }
  ```
  
  

##### SPA与MPA

- 什么是SPA：是一种网络应用程序或者网站的模型，翻译过来就是单页面应用程序，只有一个主页面和多个页面片段组成，所有HTML，CSS，JavaScript代码都是通过单个页面的加载而检索，通过动态重写当前页面来与用户交互

- 什么是MPA：翻译过来就是多页面应用程序，每一个页面都是主页面，在访问页面时，需要从新加载HTML，CSS，JavaScript文件

- 区别

  1. SPA由一个主页面和多个页面片段组成，而MPA由多个主页面组成
  2. SPA是局部刷新，MPA是整页刷新
  3. SPA路由是hash模式，MPA是history模式
  4. SPA的数据传递比较容易实现，而MPA需要借助URL，Cookie，localStorage等进行传递
  5. SPA页面切换的速度快，用户体验好，MPA切换需要重新加载资源，速度慢

- 优缺点

  优点

  1. 具有页面应用的即时行，网站的可移植性和可访问性
  2. 用户体验好，内容的改变不需要重新加载整个页面以及重新加载HTML，CSS，JavaScript
  3. 良好的前后端分离，分工更明确

  缺点

  1. 不利于搜索引擎的抓取，不利于SEO
  2. 首次渲染速度相对较慢

- 实现一个SPA

  原理

  1. 监听地址栏中hash变化，驱动页面变化
  2. 用pushstate记录浏览器的历史，驱动页面发送变化

  实现

  1. hash模式  

     核心是监听URL中的hash来进行路由跳转

     ```javascript
     // 页面初次加载，获取哈hash值
      document.addEventListener('DOMContentLoaded', () => {
          console.log('hash:', location.hash)
      })
     // 监听hash值的变化
     window.onhashchange = (event) => {
         console.log('old url', event.oldURL)
         console.log('new url', event.newURL)
         console.log('hash:', location.hash)
     }
     // 修改url中的hash值
     document.getElementById('btn1').addEventListener('click', () => {
         location.href = '#/user'
     })
     ```

  2. history模式

     核心是借助HTML5的history api

     - history.pushState 浏览器路由栈顶添加记录
     - history.replaceState 使用新路由替换浏览器路由栈顶路由
     - history.popState history路由发生变化时触发

     ```javascript
     document.addEventListener('DOMContentLoaded', () => {
         console.log('load', location.pathname)
     })
     
     // 打开一个新的路由  pushState浏览器不会刷新页面
     document.getElementById('btn1').addEventListener('click', () => {
         const state = { name: 'page1' }
         console.log('切换路由到', 'page1')
         history.pushState(state, '', 'page1')
     })
     
     // 监听浏览器前进、后退
     window.onpopstate = (event) => {
         console.log('onpopstate', event.state, location.pathname)
     }
     ```


##### SPA首屏加载

首屏加载时间指的是浏览器从输入URL地址，到完成首屏内容渲染的时间，可以通过DOMContentLoaded事件来进行计算

```javascript
document.addEventListener('DOMContentLoaded', event => {
  console.log('首屏加载时间', event.timeStamp)
})
```

加载慢的原因：

- 网络延迟
- 资源文件体积过大
- 重复发送请求加载资源
- 加载脚本时，渲染内容堵塞了

解决方案

- 减小入口文件的体积——常用的手段是路由懒加载，把不同路由对应的组件分割成不通的代码块，待路由被加载时，会单独打包路由，使得入口文件体积变小。以函数的形式加载路由，就可以把各自的路由文件分别打包

  ```javascript
  {
      text: '智慧综治',
      name: 'wisdom',
      id: 'wisdom',
      path: '/wisdom',
      component: () => import('@/views/wisdom/index.vue'),
      isShow: true
  }
  ```

- UI框架按需加载——只加载项目中使用到的UI组件

  ```javascript
  import {
    Select,
    Option,
    Button,
    Input,
    Message,
    Form,
    FormItem
  } from '@cci/cui'
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Button)
  Vue.use(Input)
  Vue.use(Message)
  Vue.use(Form)
  Vue.use(FormItem)
  ```

- 图片资源的压缩——对页面上使用到的icon，可以使用在线字体图标，或者雪碧图，将众多小的图标合并到一张图上，以减轻http请求压力

- 开启gzip压缩

  ```javascript
  nmp i compression-webpack-plugin -D
  
  vue.config.js
  const CompressionPlugin = require('compression-webpack-plugin')
  
  configureWebpack: (config) => {
          if (process.env.NODE_ENV === 'production') {
              // 为生产环境修改配置...
              config.mode = 'production'
              return {
                  plugins: [new CompressionPlugin({
                      test: /\.js$|\.html$|\.css/, //匹配文件名
                      threshold: 10240, //对超过10k的数据进行压缩
                      deleteOriginalAssets: false //是否删除原文件
                  })]
              }
          }
  }
  
  在服务器也需要做响应的配置 nginx
  server:{
      gzip on;
  }
  ```
