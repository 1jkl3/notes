const html = document.documentElement;
// 当前根节点fontsize值
const variable = html.style.fontSize.replace("px","");
// px转rem 带像素
function pxTorem(px){
    return (px / 100) * 2 + 'rem';
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