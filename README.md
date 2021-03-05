# taro-canvas-helper

基于 Taro 开发的 Canvas 绘制工具，能够快捷绘制矩形，图片，文字，二维码等

## 安装方法

    npm install taro-canvas-helper -s

## 使用方法

``` jsx
import CanvasHelper from 'taro-canvas-helper';
const ctx  = Taro.createCanvasContext('canvasId')
const helper=new CanvasHelper({
    ctx
});
helper.drawRect({
    width: 750,
    height: baseHeight,
    x: 0,
    y: 0,
    bgColor: '#e63127',
    radius:10
});
helper.initText({
    fontSize: 28,
    color: '#e93629',
    text: currentDate,
    x: 227,
    y: 167,
    lineHeight: 43,
    textAlign: 'center',
    fontWeight: 'bold'
});
// 绘制完成必须调用draw方法
helper.draw();
```

## API

### drawImage

#### 功能：绘制图片

``` jsx
helper.drawImage({
    width: 750,
    height: 100,
    x: 0,
    y: 0,
    url: '',
    radius:[10,20,30,10]
});
```

| 参数名 | 类型                                 | 介绍                                                     |
| ------ | ------------------------------------ | -------------------------------------------------------- |
| url    | string <必填>                        | 图片加载后的本地地址，图片必须先 load 后才能使用绘制 api |
| x      | number<必填>                         | x 轴起点                                                 |
| y      | number<必填>                         | y 轴起点                                                 |
| width  | number<必填>                         | 绘制宽度                                                 |
| height | number<必填>                         | 绘制高度                                                 |
| radius | number\|number[]<非必填，默认值为 0> | 圆角                                                     |

### loadImage

#### 功能：加载单张图片

``` jsx
const path=await helper.loadImage(url)
```

| 参数名 | 类型          | 介绍     |
| ------ | ------------- | -------- |
| url    | string <必填> | 图片地址 |

### loadImgs

#### 功能：加载多张图片

``` jsx
const imgs=await helper.loadImgs([])
```

| 参数名 | 类型            | 介绍         |
| ------ | --------------- | ------------ |
| urls   | string[] <必填> | 图片地址数组 |

### drawRect

#### 功能：绘制矩形

``` jsx
helper.drawRect({
    width: 750,
    height: 100,
    x: 0,
    y: 0,
    bgColor: '#e63127',
    radius:[10,20,30,10]
})
```

| 参数名  | 类型                                 | 介绍     |
| ------- | ------------------------------------ | -------- |
| bgColor | string <必填>                        | 背景颜色 |
| x       | number<必填>                         | x 轴起点 |
| y       | number<必填>                         | y 轴起点 |
| width   | number<必填>                         | 绘制宽度 |
| height  | number<必填>                         | 绘制高度 |
| radius  | number\|number[]<非必填，默认值为 0> | 圆角     |

### initText

#### 功能：绘制文本

``` jsx
helper.initText({
    text: '',
    x: 0,
    y: 0,
    color: '#fff',
    fontSize: 16,
    lineHeight: 26
})
```

| 参数名     | 类型                                           | 介绍     |
| ---------- | ---------------------------------------------- | -------- |
| color      | string <必填>                                  | 字体颜色 |
| fontSize   | number <必填>                                  | 字体大小 |
| fontWeight | 'bold'\|'normal' <非必填，默认值 normal>       | 字体粗细 |
| lineHeight | number <非必填，默认值为字体大小>              | 行高     |
| x          | number<必填>                                   | x 轴起点 |
| y          | number<必填>                                   | y 轴起点 |
| text       | number<必填>                                   | 内容     |
| textAlign  | 'left'\|'center'\|'right'<非必填，默认值 left> | 对齐方式 |
| textDecoration  | 'line-through'\|'none'<非必填，默认值 none> | 文本修饰 |

### breakText

#### 功能：字体换行，超出以... 结尾

``` jsx
const strArr=helper.breakText({
    str:'',
    maxByteLength:10,
    maxLine:1
})
```

| 参数名        | 类型          | 介绍                                             |
| ------------- | ------------- | ------------------------------------------------ |
| str           | string <必填> | 内容                                             |
| maxByteLength | number <必填> | 单行最大字节数(中文为 2 个字节，英文为 1 个字节) |
| maxLine       | number <必填> | 最大行数                                         |

### draw

#### 功能：完成绘制

``` jsx
helper.draw()
```
