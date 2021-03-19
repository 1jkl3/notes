/*
 * @Author: duhu
 * @Date: 2021-01-29 09:44:19
 * @LastEditTime: 2021-03-20 00:37:49
 * @LastEditors: Please set LastEditors
 * @Description: 事件 业务逻辑层
 * @FilePath: \vue-js\src\module\useEvent.js
 */
import {
    useMap,
    useLayer
} from './index'
import {
    InteractionHandler,
    defaultStyle
} from '@/plugin/ol-plugin';
let hander = null;
export const useEvent = (layerId) => {
    let defOptions = { map: null, layer: null }
    if (!hander) {
        defOptions.map = useMap().defaultMap;
        defOptions.layer = useLayer(layerId).currentLayer;
        defOptions.name = '自定义事件'
        hander = new InteractionHandler(defOptions)
    }
    return hander
}
// 注册交互事件
export const useEventSelect = ({ type, layerId }, callback) => {
    useEvent(layerId)
    hander.onSelect(type, (e) => {
        callback && callback(e)
    })
}
// 点击
export const useEventSelectClick = () => {
    useEventSelect('select', (e) => [

    ])
}
// 触动
export const useEventSelectMove = () => {
    useEventSelect('move', (e) => [

    ])
}
// 双击
export const useEventSelectDBclick = () => {
    useEventSelect('dbClick', (e) => [

    ])
}
// 注册绘制图形事件
export const useEventDraw = ({ type, src, layerId }, callback) => {
    useEvent(layerId)
    hander.onDraw({ type, src }, (e, self) => {
        let option = {
            feature: e.feature,
            layerSource: self.layer.getSource(),
            type,
            src,
            text: ''
        }
        callback && callback(option)
    })
}
// 配合异步添加样式
export const asyncStyleFun = ({
    feature,
    layerSource,
    type,
    src,
    text = ''
}) => {
    type === 'Icon' ? feature.setStyle(defaultStyle[type](src, text)) : feature.setStyle(defaultStyle[type](text));
    layerSource.addFeature(feature)
}
// 清除事件
export const unUseEvent = () => {
    hander && hander.clearDraw()
}