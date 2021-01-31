/*
 * @Author: your name
 * @Date: 2021-01-29 09:10:08
 * @,@LastEditTime: ,: 2021-02-01 01:56:19
 * @,@LastEditors: ,: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-js\src\plugin\ol-plugin\core\utils.js
 */
// import Feature from "ol/feature";

/**
 * @description  图标方向计算 条件 （当图标为箭头方向是正上方时）
 * @param {Array<Coordinate>}} start 开始坐标 [x,y]
 * @param {Array<Coordinate>}} end 结束坐标 [x,y]
 * @returns {Number} direction 角度
 */
function computeDirection(start, end) {
    let dx = end[0] - start[0];
    let dy = end[1] - start[1];
    let direction = Math.atan2(dy, dx) - (Math.PI / 2)
    return -direction;
}
/**
 * 获取线的所有坐标
 * @param {Feature} feature 
 */
function getCoordinates(feature) {
    let lineStringForl = feature.getGeometry();
    return lineStringForl.getCoordinates();
}
/**
 * 计算点是否在线上
 * @param {Array<Coordinate>} line 线坐标数组
 * @param {Array<Coordinate>} point 点坐标数组
 * @returns {Boolean}
 */
function pointInLine(line, point) {
    let pi = line[0];
    let pj = line[1];
    if ((point[0] - pi[0]) * (pj[1] - pi[1]) == (pj[0] - pi[0]) * (point[1] - pi[1]) && Math.min(pi[0], pj[0]) <=
        point[0] && point[0] <= Math.max(pi[0], pj[0]) && Math.min(pi[1], pj[1]) <= point[1] && point[1] <= Math.max(pi[1],
            pj[1])) {
        // console.log("再线段上");
        return true;
    } else {
        // console.log("不再线段上");
        return false;
    }
}
/**
 * 动态位置
 * @param {Array<Coordinate>} pixel 经纬度
 * @param {Number} w dom宽度
 * @param {Number} h dom高度
 * @param {HTMLDocument} target map地图所在dom
 */
function overlayPoistion(pixel, w, h, target, offset) {
    // const offset = [-(w), -(h + 5)];
    // const offset = [-w * 2 + 10, -(h - 10)];
    if (pixel[0] + w > target.offsetWidth) {
        offset[0] = -(w)
    }
    if (pixel[1] + h > target.offsetHeight) {
        offset[1] = -(h)
    }
    return offset;
}

export {
    computeDirection,
    pointInLine,
    getCoordinates,
    overlayPoistion
}