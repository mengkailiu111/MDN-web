> CSS盒模型
> 块级盒子（block box）、内联盒子（inline box）
> [https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model)

### 1. 盒模型
> 完整的CSS盒模型应用于块级盒子，内联盒子只使用盒模型定义中的部分内容。
> 标准盒模型、替代（IE）盒模型

#### 盒模型的组成
![盒模型](./images/box-model.png)

- **Content box**：显示内容，尺寸通过`width`和`height`属性设定
- **Padding box**：包围在内容区域外部的空白空间，大小通过`padding`属性设定
- **Border box**：边框盒包裹内容和内边距，大小通过`border`属性设定
- **Margin box**：最外部区域，盒子和其他元素之间的空白区域，大小通过`margin`属性设定

#### 标准盒模型
在标准模型中，如果你给盒设置`width`和`height`，实际设置的是**Content box**。`padding`和`border`再加上设置的宽高一起决定整个盒子的大小。
注: `margin`不计入实际大小 —— 当然，它会影响盒子在页面所占空间，但是影响的是盒子外部空间。盒子的范围到边框为止 —— 不会延伸到`margin`。
![标准盒模型](./images/standard-box-model.png)

#### 替代盒模型
替代盒模型所有宽度都是可见宽度，所以内容宽度是该宽度减去边框和填充部分。
![替代盒模型](./images/alternate-box-model.png)
- 默认浏览器会使用标准模型。如果需要使用替代模型，您可以通过为其设置`box-sizing: border-box`来实现
    ```css
    /*使两个box显示大小相同*/
    .box {
    border: 5px solid rebeccapurple;
    background-color: lightgray;
    padding: 40px;
    margin: 40px;
    width: 300px;
    height: 150px;
    }

    .alternate {
    box-sizing: border-box;
    /*300+40*2+5*2*/
    width: 390px;
    /*150+40*2+5*2*/
    height: 240px
    }
    ```

- 如果你希望所有元素都使用替代模式，设置`box-sizing`在`<html>`元素上，然后设置所有元素继承该属性
    ```css
    html {
    box-sizing: border-box;
    }
    *, *::before, *::after {
    box-sizing: inherit;
    }
    ```

#### 外边距折叠
如果你有两个外边距相接的元素，这些外边距将合并为一个外边距，即最大的单个外边距的大小。
```html
<div class="container">
  <p class="one">I am paragraph one.</p>
  <p class="two">I am paragraph two.</p>
</div>
```
```css
/*顶部段落的页margin-bottom为50px，第二段的margin-top为30px。*/
/*因为外边距折叠的概念，所以框之间的实际外边距是50px，而不是两个外边距的总和。*/
/*将第2段的margin-top设置为0，两个段落之间的可见边距不会改变。*/
.one {
  margin-bottom: 50px;
}

.two {
  margin-top: 30px;
}
```



### 2. 块级盒子
一个被定义为块级的盒子会表现出以下特点：
- 盒子在内联方向上扩展并占据父容器在该方向上的所有可用空间（绝大多数情况下，盒子和父容器一样宽）
- 每个盒子都会换行
- `width`和`height`属性可以发挥作用
- 内边距`padding`、外边距`margin`和边框`border`控制盒子周围的距离

除非特殊指定，诸如标题`<h1>`和段落`<p>`等默认情况下都是块级盒子。

### 3. 内联盒子
一个被定义为内联的盒子会表现出以下特点：
- 盒子不会产生换行
- `width`和`height`属性不发挥作用
- 垂直方向的内边距、外边距以及边框会被应用，但是不会把其他处于内联`inline`状态的盒子推开
- 水平方向的内边距、外边距以及边框会被应用，且会把其他处于内联`inline`状态的盒子推开

用在链接的`<a>`、`<span>`、`<em>`以及`<strong>`都默认处于`inline`状态。
通过对盒子`display`属性的设置，可以切换盒子的外部显示类型（`inline`和`block`）。
```html
<p>
    I am a paragraph and this is a <span>span</span> inside that paragraph. A span is an inline element and so does not respect width and height.
</p>
```
```css
/* 宽度和高度被忽略了，但是外边距、内边距和边框是生效的。
/* 但它们不会改变其他内容与内联盒子的关系，因此内边距和边框会与段落中的其他单词重叠。*/
span {
  margin: 20px;
  padding: 20px;
  width: 80px;
  height: 50px;
  background-color: lightblue;
  border: 2px solid blue;
}
```

### 4. 内部显示类型和外部显示类型
CSS的盒模型有一个外部显示类型来决定盒子是块级还是内联。同样盒模型还有内部显示类型，它决定了盒子内部元素是如何布局的。默认情况下是按照[正常文档流布局](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow)，也意味着它们和其他块元素以及内联元素一样。
但是，我们可以通过使用类似`flex`的`display`属性值来更改内部显示类型。如果设置`display: flex`，在一个元素上外部显示类型是`block`，但是内部显示类型修改为`flex`。 该盒子的所有直接子元素都会成为flex元素，会根据[弹性盒子（Flexbox ）](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)规则进行布局。