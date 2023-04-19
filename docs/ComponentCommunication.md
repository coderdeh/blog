---
title: Component-Communication
date: 2022-3-30
tags:
  - Component-Communication
categories:
  - Component-Communication
---

### 父子组件实现双向绑定

- 1、通过 .sync 实现

  ```
  父组件中：
  <Child :bothData="msg" />
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

- 2、Vue 2 通过 v-model 实现

  - 基础写法：限制了必须在 props 中接受的属性名为 value，emit 触发的事件必须为 input

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

  - 进阶写法：在子组件中使用 model 选项，来指定 props 中接受数据的属性名 和 emit 触发的事件名

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

  - 3、Vue 3 通过 v-model 实现：在自定义组件中使用 v-model 时，v-model 的默认 props 属性名和事件名更改了，更改为 modelValue 和 update:modelValue，并且移除了 model 选项，但同时也支持多个数据的双向绑定

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
