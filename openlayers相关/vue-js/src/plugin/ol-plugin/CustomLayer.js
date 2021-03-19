/*
 * @Author: duhu
 * @Date: 2021-01-29 09:10:08
 * @LastEditTime: 2021-03-20 00:24:17
 * @LastEditors: Please set LastEditors
 * @Description: 自定义图层 创建新图层并自定义图层内容 如features
 * @FilePath: \vue-js\src\plugin\ol-plugin\CustomLayer.js
 */
import {
    Vector as VectorSource
} from 'ol/source';
import {
    Vector as VectorLayer
} from 'ol/layer';

export default class CustomLayer {
    constructor(props) {
        this.id = props.id || Date.now();
        this.name = props.name || "";
        this.map = props.map;
        this.layers = [];
        this.currentLayer = null;
        // this.createLayer.call(this);
    }
    /**
     * @description 创建图层
     */
    createLayer(id) {
        console.log("进入" + id + '图层');
        if (this.currentLayer && this.currentLayer.get("id") == id) return;
        this.currentLayer = new VectorLayer({
            id: id || Date.now(),
            source: new VectorSource({
                wrapX: false
            })
        })
        this.layers.push({
            id: id || Date.now(),
            layer: this.currentLayer
        });
        this.map.addLayer(this.currentLayer)
    }
    // 隐藏图层
    setLayerVisible(id, isShow) {
        this.getLayerById(id).layer.setVisible(isShow)
    }
    /**
     * @description 根据id查询图层
     * @param {string | number}} id 
     */
    getLayerById(id) {
        return this.layers.find(item => item.id === id);
    }
    /**
     * @description: 删除图层
     * @param {*} id
     * @return {*}
     */
    deleteLayerById(id) {
        let layer = this.getLayerById(id);
        if (layer) {
            this.map.removeLayer(layer)
            this.layers = this.layers.filter(item => item.id !== id)
        } else {
            return false
        }
        return true
    }
}