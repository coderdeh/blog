<!--
 * @Author: daieh
 * @LastEditors: daieh
 * @Description: description
-->
---
title: CSS
date: 2022-3-30
tags:
  - CSS
categories:
  - CSS
---

### CSS知识点

#### display的属性值及其作用

- none：元素不显示，并且会从文档流中移除
- block：块元素，元素会独占一行，多个元素会另起一行，默认宽度为父元素的宽度，可以设置元素的width、height、margin、padding属性
- inline：行内元素，元素不会独占一行，默认宽度为内容宽度，设置width、height属性无效，但可以设置水平方向的margin、padding属性，不能设置垂直方向上的margin、padding属性
- inline-block：行内快元素，默认宽度为内容宽度，可设置宽高，同行展示

#### CSS隐藏元素的方式

- dispaly: none;  渲染树不会包含该渲染对象，因此元素不会再页面中占据位置，也不会响应绑定的监听事件
- visibility: hidden;  元素在页面中仍占据空间，但是不会响应绑定的监听事件
- opacity: 0; 将元素的透明度设置为0，以此来实现元素的隐藏，元素在页面中仍然占据空间，并且能够响应元素的监听事件
- z-index: -1；使其他元素遮盖住该元素，以此来实现隐藏
- transform: scale(0,0)；将元素缩放为0，来实现元素的隐藏，元素仍然在页面中占据位置，但是不会响应绑定的监听事件

#### transition与animation的区别

- transition：是过渡属性（从一个状态缓慢过渡到另外一个状态，如：背景色由红色缓慢过渡到绿色），强调过渡，它的实现需要触发一个事件(比如鼠标移动到元素上，聚焦，点击等)才执行动画

- animation：是动画属性（一个元素运动的情况，如：从上到下或者从左到右的运动），它的实现不需要触发事件，设置好时间之后可以自己执行，且可以循环一个动画，可以通过@keyframe设置多个关键帧，以此来完成动画

- 实现

  ```javascript
  <div class="transition">实现过渡的DOM元素</div>
  <div class="animation">实现动画的DOM元素</div>
  
  @keyframes leftToRight {
    0% {
      transform: translateX(-200px);
    }
    50% {
      transform: translateX(-100px);
    }
    100% {
      transform: translateX(0px);
    }
  }
  
  .transition {
      margin-top: 20px;
      padding: 20px;
      background: #0b79d3;
      color: #fff;
      width: 200px;
      cursor: pointer;
      transition: width 2s;
      &:hover {
        width: 500px;
      }
    }
  
    .animation {
      margin-top: 20px;
      padding: 20px;
      background: #dc540a;
      color: #fff;
      width: 200px;
      cursor: pointer;
      animation: leftToRight 2s linear;
    }
  ```

#### display: none 与 visibility: hidden 的区别

这两个属性都可以让元素隐藏，具体区别如下：

- dispaly: none；会让元素完全从渲染数中消失，渲染时不会占据任何空间，而visibility: hidden；不会让元素从渲染树中消失，渲染的元素还是会占据响应的空间，只是内容不可见
- dispaly: none；是非集成属性，子孙节点会随着父节点从渲染树消失，通过修改子孙节点的属性也无法显示，而visibility: hidden；是继承属性，子孙节点之所以不显示，是因为继承了hidden，通过设置visibility: visible；可以让子孙节点显示
- 修改常规文档流中元素的display通常会造成文档的重排，而修改visibility属性只会造成本元素的重绘

#### 盒模型

盒模型都是有四个部分组成，分别是margin  border  padding   content

- 标准盒模型的实际宽高属性，只包含content
- IE盒模型的宽高属性包含 content、padding、border
- 可通过修改元素的box-sizing属性，来改变元素的盒模型，默认值content-box
  - box-sizing: content-box;表示标准盒模型
  - box-sizing: border-box;表示IE盒模型

#### 用translate来改变元素位置而不是用定位的原因

translate是transform的一个属性值，改变transform或者opacity不会触发浏览器的重排或者重绘，而是触发复合。而改变绝对定位会触发重新布局，进而触发浏览器的重排和重绘，比较消耗性能。

transform是浏览器为元素创建一个GPU图层，但改变绝对定位会使用到CPU，使用transform改变元素位置时，元素依然占据原始空间，因此transform更加高效。

#### li标签之间会存在空白间隙，是什么原因引起的？怎么解决？

浏览器会把inline内敛元素间的空白字符（空格、换行、Tab等）渲染成一个空格。通常是一个li标签占据一行，这导致li标签换行后产生了一个换行字符，它变成了一个空格，占据了一个字符的宽度。

解决办法：

- 为li标签设置css属性：flot: left；
- 将左右的li标签写在同一行
- 设置ul或ol标签的css属性：font-size: 0；
- 消除ul或者ol标签的字符间隔：letter-spacing：-8px; 同时设置li标签的li标签的字符间隔为默认值 letter-spacing：normal;

#### line-height与height的区别

line-height：是行高的意思，决定了元素内文本内容的高度，而height则是定义元素自身的高度

- 当元素高度与line-height保持一致时，文本垂直居中展示
- 当line-height大于元素高度时，文字超出元素展示
- 当容器没有设置高度时，撑开容器高度的line-height属性，而不是文本内容

line-height赋值方式

- 带单位：px是固定值，而em会参照父元素font-size属性值，自行计算行高
- 纯数字：会把比列传递给后代，例如：父级行高为1.5，子元素font-size属性为18px，则子元素行高为1.5 * 18px = 27px

#### 单行、多行文本溢出

单行文本溢出

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

多行文本溢出

```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式：垂直排列
-webkit-line-clamp: 3; // 设置显示行数
```

#### 媒体查询

媒体查询可以针对不同的媒体类型定义不同的样式，即根据不同的屏幕尺寸设置不同的样式

```css
// link元素中的媒体查询
<link rel="stylesheet" media="(max-width: 1440px)" href="style1440.css"></link>

// 样式表中的css媒体查询
@media(max-width: 1440px){
    .main{
        line-height: 30px;
    }
}
```

#### 常见的CSS布局单位

常见的布局单位有像素px、百分比%，em、rem、vw/vh

- 像素px：是页面布局的基础，一个像素表示终端（电脑、手机、平板）屏幕所能显示的最小区域，像素分为两种：css像素和物理像素

  - css像素：在css中使用的一个抽象单位
  - 物理像素：置于设备的硬件密度有关，任何设备的物理像素都是固定的

- 百分比%：当浏览器的宽度或者高度发生变化时，通过百分比单位，可以使浏览器中的DOM随浏览器的宽度和高度发生变化，从而影响响应式的效果。一般认为子元素的百分比是相对于直接父元素

- em、rem：都是相对单位，em相对于父元素字体尺寸(font-size属性值)大小倍数，rem现对于根元素的字体尺寸(font-size属性值)大小倍数进行设置

  - em：文本相对长度单位，相对于当前元素的直接父元素的font-size属性值进行样式设置，如果父元素的font-size属性值未进行认为设置，则相对于浏览器的默认字体尺寸(16px)进行设置

  - rem：是css3新增的一个相对单位，相对于根元素（html）的font-size属性值的倍数

    作用：使用rem可以实现简单的响应式布局，可以利用html标签中font-szie属性值，实现当屏幕分辨率发生变化是让元素也随之变化

- vw/vh是与视图窗口有关的单位，vw表示相当于视图窗口的宽度，vh相当于视图窗口的高度，除了vw和vh外，还有vmin和vmax两个相关的单位

  - vw：相对于视图的宽度，试图的宽度为100vw
  - vh：相对于视图的高度，试图的高度为100vh
  - vmin：vw和vh中的较小值
  - vmax：vw和vh中的较大值

- vw/vh和百分比%的区别

  - 百分比%：大部分相对于父元素，也有相对于自身的情况，比如：border-radius、translate等
  - vh/vw：相对于视窗的尺寸

- px、em、rem的区别与使用使用场景

  区别

  - px是固定像素，一旦设置了就无法适应页面大小二改变
  - em是相对于其父元素的font-size属性值来进行设置，进行任何元素设置时，都可能需要知道其父元素的font-size属性值
  - rem是相对于根元素font-size属性值进行样式设置，需要在根元素确定参考值

  使用场景

  - 对于只需要适配少部分设备，且分辨率对页面影响不大的情况下，使用px即可
  - 对于需要适配各种移动设备，使用rem，例如需要适配iPhone和iPad等分辨率差别比较大的设备











