rem移动端适配

​	1.rem.js

​		说明：这里的方程为 100 * 屏幕宽度 / 设计稿的宽度

```js
window.addEventListener("resize",setRem,false);
setRem();
function setRem(){
    const layout = 750;
    const html = document.documentElement;
    const width = document.documentElement.clientWidth || window.innerWidth;
    html.style.fontSize = (100 * width / layout) + 'px';
}
```

2.common.less

​	说明：这里的@px * 2 是因为需要对填入的px单位做转化时，手机普遍宽度是375，少了刚好一半

```less
.rem(@px,@name) {
  @{name}: (@px * 2 / 100) * 1rem;
}
```

3.pxtorem.js

​	说明：这里我创建了多种转化方式来满足不同开发需求

```js
const html = document.documentElement;
// 当前根节点fontsize值
const variable = html.style.fontSize.replace("px","");
// px转rem 带像素
function pxTorem(px){
    return (px * 2 / 100) + 'rem';
}
// 计算传入px值转化为rem时相对于根节点px值
export function pxToremAxisNumber(px,isInt = false){
    if(isInt){
        return Math.round((px / 100) * Number(variable) * 2);
    }else{
        return (px / 100) * Number(variable) * 2;
    }
}
// rem转px 只有number
export function rem2pxAxisNumber(rem){
    return (rem * 100) * Number(variable) / 2;
}
// rem转px 带像素
export function rem2px(rem){
    return (rem * 100) * Number(variable) / 2 + 'px';
}
export default pxTorem;
```

