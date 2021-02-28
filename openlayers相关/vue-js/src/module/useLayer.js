/*
 * @Author: duhu
 * @Date: 2021-01-29 09:44:02
 * @,@LastEditTime: ,: 2021-02-04 22:29:27
 * @,@LastEditors: ,: Please set LastEditors
 * @Description: 图层 业务逻辑层
 * @FilePath: \vue-js\src\module\useLayer.js
 */
import { CustomLayer } from '@/plugin/ol-plugin'
import { useMap } from './index'
var layer;
export const useLayer = (id) => {
    let option = {
        name: 'test1',
        map: useMap().defaultMap
    }
    if (!layer) {
        layer = new CustomLayer(option);
    }
    !!id && layer.createLayer(id)
    console.log(layer.layers);
    return layer;
}
// 查询图层
export const searchLayer = (id) => {
    if (!layer) {
        useLayer(id)
    }
    return layer.getLayerById(id)
}