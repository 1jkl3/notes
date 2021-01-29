/*
 * @Author: duhu
 * @Date: 2021-01-29 09:10:08
 * @LastEditTime: 2021-01-29 11:43:09
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
        this.createLayer.call(this);
    }
    /**
     * @description 创建图层
     */
    createLayer() {
        this.currentLayer = new VectorLayer({
            id:this.id,
            source: new VectorSource({
                wrapX:false
            })
        })
        this.layers.push({
            id: this.id,
            layer: this.currentLayer
        });
        this.map.addLayer(this.currentLayer)
    }
    // 隐藏图层
    setLayerVisible(id,isShow){
        this.getLayerById(id).layer.setVisible(isShow)
    }
    /**
     * @description 根据id查询图层
     * @param {string | number}} id 
     */
    getLayerById(id){
        return this.layers.find(item => item.id === id);
    }
}