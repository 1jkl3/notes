/*
 * @Author: duhu
 * @Description: 热力图
 * @Date: 2021-03-19 00:06:44
 * @LastEditTime: 2021-03-26 23:27:56
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
    /**
     * @description: 创建热力图图层
     * @param {*} id
     * @param {*} blur 模糊程度
     * @param {*} radius 模糊半径
     * @return {*}
     */
    createHeatLayer(id, blur = 20, radius = 20) {
        console.log("进入" + id + '图层');
        if (this.currentLayer && this.currentLayer.get("id") == id) return;
        this.currentLayer = new Heatmap({
            id: id || Date.now(),
            source: new VectorSource({
                wrapX: false
            }),
            blur,
            radius
        })
        this.layers.push({
            id: id || Date.now(),
            layer: this.currentLayer
        });
        this.map.addLayer(this.currentLayer)
    }
}