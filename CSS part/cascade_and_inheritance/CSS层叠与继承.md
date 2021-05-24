> CSS层叠样式表
> 层叠与继承
> [https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance)

### 1. 样式表继承
#### 理解继承
在父元素上的一些CSS属性是可以被子元素继承的，即在设置一个元素的部分CSS属性时，在里面的每个子元素都会有相同的属性，除非直接在子元素上设置属性。
```html
<!-- color应用在直接子元素，也影响其他后代 — 直接子元素<li>以及第一个嵌套列表中的子项。 -->
<!-- 然后添加了一个 special 类到第二个嵌套列表，其中使用了不同的颜色。-->
<ul class="main">
    <li>Item One</li>
    <li>Item Two
        <ul>
            <li>2.1</li>
            <li>2.2</li>
        </ul>
    </li>
    <li>Item Three
        <ul class="special">
            <li>3.1
                <ul>
                    <li>3.1.1</li>
                    <li>3.1.2</li>
                </ul>
            </li>
            <li>3.2</li>
        </ul>
    </li>
</ul>
```
```css
.main {
    color: rebeccapurple;
    border: 2px solid #ccc;
    padding: 1em;
}

.special {
    color: black;
    font-weight: bold;
}
```
#### 控制继承
控制继承的四个通用属性值：
- inherit
设置该属性会使子元素属性和父元素相同。

- initial
设置属性值和浏览器默认样式相同。（如果浏览器默认样式中未设置，且该属性是自然继承的，那么会设置为inherit。）

- unset
将属性重置为自然值，也就是如果属性是自然继承那么等同于inherit，否则等同于initial。

- revert
新属性，仅少部分浏览器支持。<br />[https://developer.mozilla.org/en-US/docs/Web/CSS/revert](https://developer.mozilla.org/en-US/docs/Web/CSS/revert)

```html
<ul>
    <li>Default <a href="#">link</a> color</li>
    <li class="my-class-1">Inherit the <a href="#">link</a> color</li>
    <li class="my-class-2">Reset the <a href="#">link</a> color</li>
    <li class="my-class-3">Unset the <a href="#">link</a> color</li>
</ul>
```
```css
body {
    color: green;
}
          
.my-class-1 a {
    color: inherit;
}
          
.my-class-2 a {
    color: initial;
}
          
.my-class-3 a {
    color: unset;
}

/*在添加a属性之后，只有第一个列表项会变红*/
/*inherit: 父元素<ul>的color属性是绿色，所以继承为绿色*/
/*initial: 设置浏览器默认属性为黑色*/
/*unset: 设置为从父元素继承的默认值*/
a {
		color: red;
}
```
#### 重置所有属性值
```html
<blockquote>
  <p>This blockquote is styled</p>
</blockquote>

<blockquote class="fix-this">
  <p>This blockquote is not styled</p>
</blockquote>
```
```css
blockquote {
    background-color: red;
    border: 2px solid green;
}
        
.fix-this {
    all: unset;
}
```
### 2. 样式表重叠
层叠定义了在不止一个元素的时候如何应用CSS规则，主要有三个因素需要考虑：

1. 重要程度
1. 优先级
1. 资源顺序

由上而下，重要性依次增加。
#### 资源顺序
当应用两条同级别的规则到一个元素的时候，后面定义的就是实际使用的规则
```css
/*最终显示效果为蓝色*/
h1 {
  color: red;
}

h1 {
  color: blue;
}
```
#### 优先级
一个选择器的优先级可以说是由四个部分相加 (分量)，可以认为是个十百千 — 四位数的四个位数：

1. **千位**： 如果声明在`style`的属性（内联样式）则该位得一分。（这样的声明没有选择器，所以它得分总是1000。）
1. **百位**：选择器中包含ID选择器则该位得一分。
1. **十位**：选择器中包含类选择器、属性选择器或者伪类则该位得一分。
1. **个位**：选择器中包含元素、伪元素选择器则该位得一分。

注: 通用选择器 (*)，组合符 (+, >, ~, ' ')，和否定伪类 (:not) 不会影响优先级。

**优先级计算示例**：
| 选择器 | 千位 | 百位 | 十位 | 个位 | 优先级 |
| --- | --- | --- | --- | --- | --- |
| h1 | 0 | 0 | 0 | 1 | 0001 |
| h1 + p::first-letter | 0 | 0 | 0 | 3 | 0003 |
| li > a[href*="en-US"] > .inline-warning | 0 | 0 | 2 | 2 | 0022 |
| #identifier | 0 | 1 | 0 | 0 | 0100 |
| 内联样式 | 1 | 0 | 0 | 0 | 1000 |

**代码示例**：
```html
<div id="outer" class="container">
    <div id="inner" class="container">
        <ul>
            <li class="nav"><a href="#">One</a></li>
            <li class="nav"><a href="#">Two</a></li>
        </ul>
    </div>
</div>
```
```css
/* specificity: 0101 */
#outer a {
    background-color: red;
}
        
/* specificity: 0201 */
#outer #inner a {
    background-color: blue;
}

/* specificity: 0104 */
#outer div ul li a {
    color: yellow;
}

/* specificity: 0113 */
#outer div ul .nav a {
    color: white;
}

/* specificity: 0024 */
div div li:nth-child(2) a:hover {
    border: 10px solid black;
}

/* specificity: 0023 */
div li:nth-child(2) a:hover {
    border: 10px dashed black;
}

/* specificity: 0033 */
div div .nav:nth-child(2) a:hover {
    border: 10px double black;
}

a {
    display: inline-block;
    line-height: 40px;
    font-size: 20px;
    text-decoration: none;
    text-align: center;
    width: 200px;
    margin-bottom: 10px;
}

ul {
    padding: 0;
}

li {
    list-style-type: none;
}   
```

- 前面两个选择器都是链接背景颜色的样式 — 第二个赢了使得背景变成蓝色因为它多了一个ID选择器：优先级 201 vs. 101。
- 第三四个选择器都是链接文本颜色样式 — 第二个（第四个）赢了使得文本变成白色因为它虽然少一个元素选择器，但是多了一个类选择器，多了9分。所以优先级是 113 vs. 104。
- 第5到7个选择器都是鼠标悬停时链接边框样式。第六个显然输给第五个优先级是 23 vs. 24 — 少了个元素选择器。 第七个，比第五第六都高 — 子选择器数量相同，但是有一个元素选择器变成类选择器。所以最后优先级是 33 vs. 23 和 24。
#### 优先级覆盖
```html
<p class="better">This is a paragraph.</p>
<p class="better" id="winning">One selector to rule them all!</p>
```
```css
#winning {
    background-color: red;
    border: 1px solid black;
}
    
.better {
    background-color: gray;
    border: none !important;
}
    
p {
    background-color: blue;
    color: white;
    padding: 5px;
}   
```

- 你会发现第三个规则`color`和`padding`的值被应用了，但是`background-color`没有，因为顺序规则是后面覆盖前面。
- 两个元素都有`better`，但是第二个有`id`。因为ID选择器比类选择器优先级更高 (一个页面只能有一个独特的ID，但是很多元素都有相同的类)，红色背景和`border`应该被应用到第二个元素，第一个元素应该是灰色背景和no border。
- 第二个元素有红色背景但是没有边框。因为`!important`声明在第二条规则里 — 在`border: none`后面，说明即使计算优先级低这个属性也需要使用这个值。
