/*
 * @Author: duhu
 * @Date: 2021-01-29 09:44:02
 * @LastEditTime: 2021-03-20 00:49:27
 * @LastEditors: Please set LastEditors
 * @Description: 图层 业务逻辑层
 * @FilePath: \vue-js\src\module\useLayer.js
 */
import { CustomLayer, HeatmapLayer } from '@/plugin/ol-plugin'
import { useMap } from './index'
var layer;
var heatLayer;
export const useLayer = (id) => {
    let option = {
        name: '基础图层',
        map: useMap().defaultMap
    }
    if (!layer) {
        layer = new CustomLayer(option);
    }
    !!id && layer.createLayer(id)
    return layer;
}
export const useHeatLayer = (id) => {
    let option = {
        name: '热力图层',
        map: useMap().defaultMap
    }
    if (!heatLayer) {
        heatLayer = new HeatmapLayer(option);
    }
    !!id && heatLayer.createHeatLayer(id)
    return heatLayer;
}
// 查询图层
export const searchLayer = (id) => {
    if (!layer) {
        useLayer(id)
    }
    return layer.getLayerById(id)
}
// 查询热力图层
export const searchHeatLayer = (id) => {
    if (!heatLayer) {
        useLayer(id)
    }
    return heatLayer.getLayerById(id)
}