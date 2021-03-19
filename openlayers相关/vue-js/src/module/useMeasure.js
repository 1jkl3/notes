/*
 * @Author: duhu
 * @Date: 2021-01-31 01:32:49
 * @LastEditTime: 2021-03-09 21:46:20
 * @Description: 测量工具
 * @FilePath: \vue-js\src\module\useMeasure.js
 */
import {
    useLayer,
    useMap
} from './index'
import {
    Measure
} from '@/plugin/ol-plugin'


/**
 * @param {string} measureType 测量类型 { 距离测量(线)，面积测量（面） }
 * @return {*}
 */
export const useMeasure = (measureType,layerId = 'measure_id') => {
    let map = useMap().defaultMap;
    let layer = useLayer(layerId).currentLayer;
    let measure = Measure.getInstance({
        map,
        layer,
        name: '测量工具'
    })
    // 绘制测量控件
    measure.onDraw((e) => {
        console.log(e.feature.getGeometry().getCoordinates());
        // console.log(e.feature.getStyle().getImage());
    },measureType)
    // hover移动点击开始dom控件
    measure.onEvent()
}