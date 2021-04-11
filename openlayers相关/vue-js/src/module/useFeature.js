/*
 * @Author: duhu
 * @Date: 2021-01-29 09:44:10
 * @LastEditTime: 2021-03-26 21:24:25
 * @Description: 创建图形
 * @FilePath: \vue-js\src\module\useFeature.js
 */
import { useMap, useLayer, useHeatLayer } from './index'
import { FeaturePro, Target, Track } from '@/plugin/ol-plugin'
// 标注图形
export const useFeature = (labelId = 'label') => {
    let defOptions = { map: null, layer: null }
    defOptions.map = useMap().defaultMap;
    defOptions.layer = useLayer(labelId).currentLayer;
    return new FeaturePro(defOptions)
}
// 目标
export const useTarget = (targetId = 'target') => {
    let defOptions = { map: null, layer: null }
    defOptions.map = useMap().defaultMap;
    defOptions.layer = useLayer(targetId).currentLayer;
    return new Target(defOptions)
}
// 航迹
export const useTrack = (targetId = 'target') => {
    let defOptions = { map: null, layer: null }
    defOptions.map = useMap().defaultMap;
    defOptions.layer = useLayer(targetId).currentLayer;
    return new Track(defOptions)
}
// 热力图点
export const useHeat = (heatId = 'heatmap') => {
    let defOptions = { map: null, layer: null }
    defOptions.map = useMap().defaultMap;
    defOptions.layer = useHeatLayer(heatId).currentLayer;
    return new FeaturePro(defOptions)
}