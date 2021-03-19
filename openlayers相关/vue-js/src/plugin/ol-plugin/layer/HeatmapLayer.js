/*
 * @Author: duhu
 * @Description: 热力图
 * @Date: 2021-03-19 00:06:44
 * @LastEditTime: 2021-03-20 00:18:59
 * @FilePath: \vue-js\src\plugin\ol-plugin\layer\HeatmapLayer.js
 */
import Heatmap from 'ol/layer/Heatmap';
import {
    Vector as VectorSource
} from 'ol/source';
import CustomLayer from '../CustomLayer';
export default class HeatmapLayer extends CustomLayer {
    constructor(props) {
        super(props)
    }
    // 创建热力图图层
    createHeatLayer() {
        this.currentLayer = new Heatmap({
            source: new VectorSource(),
            blur: 1,
            radius: 1
        })
        this.layers.push({
            id: id || Date.now(),
            layer: this.currentLayer
        });
        this.map.addLayer(this.currentLayer)
    }
}