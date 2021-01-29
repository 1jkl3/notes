/*
 * @Author: duhu
 * @Date: 2021-01-29 09:10:08
 * @LastEditTime: 2021-01-29 10:13:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-js\src\utils\index.js
 */
/**
 * 合并所有类导出方式
 */
import InteractionHandler from './events/index';
import BaseMap from './BaseMap';
import CustomLayer from './CustomLayer';
import CustomOverlay from './CustomOverlay';
export * from './module';
export * from './core';
export * from './events';
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
    BaseMap,
    CustomLayer,
    CustomOverlay,
    registerPlugin
}