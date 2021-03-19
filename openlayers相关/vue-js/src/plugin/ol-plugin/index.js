/*
 * @Author: duhu
 * @Date: 2021-01-29 09:10:08
 * @LastEditTime: 2021-03-20 00:42:54
 * @LastEditors: Please set LastEditors
 * @Description: 合并所有类导出方式
 * @FilePath: \vue-js\src\plugin\ol-plugin\index.js
 */
import {
    InteractionHandler,
    Measure
} from './events/index';
export { default as BaseMap} from './BaseMap';
export { default as CustomLayer} from './CustomLayer';
export { default as CustomOverlay} from './CustomOverlay';
export * from './module';
export * from './core';
export * from './events';
export * from './layer';
// 注册插件
function registerPlugin(arg, callback) {
    if (Array.isArray(arg)) {
        arg.forEach(item => {
            BaseMap.plugins[item.prototype.constructor.name] = item
        })
    } else {
        BaseMap.plugins[arg.prototype.constructor.name] = arg
    }
    callback && callback(BaseMap)
}

export {
    InteractionHandler,
    Measure,
    registerPlugin
}