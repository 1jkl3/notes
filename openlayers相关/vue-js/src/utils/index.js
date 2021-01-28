/**
 * 合并所有类导出方式
 */
import InteractionHandler from './events/index';
import BaseMap from './BaseMap';
import CustomLayer from './CustomLayer';
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
var entity = null;
const useMap = () => {
    if(!entity){
        entity = new BaseMap({
            key:new Date.now(),
            target:'map'
        })
    }
    return entity;
}
export * from './module'
export {
    InteractionHandler,
    BaseMap,
    CustomLayer,
    useMap,
    registerPlugin
}