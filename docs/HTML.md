<!--
 * @Author: daieh
 * @LastEditors: daieh
 * @Description: description
-->
---
title: HTML
date: 2023-2-22
tags:
  - HTML
categories:
  - HTML
---


#### src和href的区别

##### src

- src指向外部资源的位置，指向的内容将会嵌入在当前标签所在的位置，在请求src资源时，会将其指向的资源下载并应用到文档内
- 当浏览器解析到当前元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕

##### href

- 指向网络资源所在的位置，建立和当前元素或者当前文档之间的链接
- 当浏览器解析到当前元素时，会并行下载资源并且不会停止对当前文档的处理

#### script标签中defer和async的区别

- 如果没有defer和async属性，渲染引擎中断渲染和阻塞后续文档的加载，立即加载当前脚本，当脚本下载完毕后并执行，执行完毕进行后续页面的解析。
- defer和async属性都是异步加载外部的JS脚本文件，区别如下：
  - 多个带async的标签，不能保证脚本的加载顺序，多个带defer属性的标签，会按照顺序加载
  - defer要等到整个页面渲染结束才会执行脚本，async一旦脚本下载完成，渲染引擎就会中断渲染，执行这个脚本以后再进行渲染

#### img标签的srcset属性的作用

响应式页面中，经常用到根据不同的屏幕密度设置不同的图片，而srcset属性用于设置不同屏幕下，img会加载不同的图片

用法

```html
<img src="image-128.png" srcsrt="image-256.png 2x">
```

使用上面的代码，就能实现在屏幕密度为1x时加载image-128.png，屏幕密度为2x时加载image-256.png，对于srcset中的x可以理解为图片质量

#### HTML5有哪些更新

- 新增语义化标签：header nav section article aside footer
- 音视频标签：audio video source主要用于指定视频源
- 数据存储：localStorage  sessionStorage
- 通信协议：websocket
- 画布：canvas
- input表单属性：placeholder autofocus  required
- input表单类型：
  - email ：能够验证当前输入的邮箱地址是否合法
  - url ： 验证URL
  - number ： 只能输入数字，其他输入不了，而且自带上下增大减小箭头，max属性可以设置为最大值，min可以设置为最小值，value为默认值
  - search ： 输入框后面会给提供一个小叉，可以删除输入的内容
  - color ： 提供了一个颜色拾取器
  - time ： 时间选择器，时分秒
  - date :    日期选择器，年月日
  - week ：周控件
  - month ：月控件
- history API：go back pushstate
- 移除的元素
  - 纯表现元素：basefont big center font em tt u
  - 对可用性产生负面影响的元素：frame 

