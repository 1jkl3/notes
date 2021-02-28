/*
 * @Author: your name
 * @Date: 2021-01-29 09:44:10
 * @LastEditTime: 2021-01-29 15:19:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-js\src\module\useFeature.js
 */
import { useMap, useLayer } from './index'
import { FeaturePro, Target, Track } from '@/plugin/ol-plugin'
export const useFeature = (layerId, option = { map: null, layer: null }) => {
    option.map = useMap().defaultMap;
    option.layer = useLayer(layerId).currentLayer;
    return new FeaturePro(option)
}
export const useTarget = (option) => {
    option.map = useMap().defaultMap;
    option.layer = useLayer().currentLayer;
    return new Target(option)
}
export const useTrack = (option) => {
    option.map = useMap().defaultMap;
    option.layer = useLayer().currentLayer;
    return new Track(option)
}