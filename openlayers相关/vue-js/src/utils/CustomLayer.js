/**
 * @description 自定义图层
 * @function 创建新图层并自定义图层内容 如features
 * @param props 
 */

import {
    defaultStyle,
    Geometrys
} from '@/utils/core/config';
import {
    Vector as VectorSource
} from 'ol/source';
import {
    Vector as VectorLayer
} from 'ol/layer';
import Feature from 'ol/Feature';
import Target from './module/Target';
import Track from './module/Track';

export default class CustomLayer {
    constructor(props) {
        this.id = props.id || Date.now();
        this.name = props.name || "";
        this.map = props.map;
        this.features = [];
        this.layers = [];
        this.currentLayer = null;
        this.createLayer.call(this);
    }
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
    setLayerVisible(id,isShow){
        this.getLayerById(id).layer.setVisible(isShow)
    }
    getLayerById(id){
        return this.layers.find(item => item.id === id);
    }
    getFeatureById(id) {
        return this.features.find(item => item.id === id);
    }
    /**
     * 创建模型
     * @param {String || Number} id 必选
     * @param {Array} coord 必选
     * @param {String} moduleName 必选  目前只有两种 Target 为point点 track 为线
     * @param {Date} time 必选
     * @param {String} text 可选
     * @param {String} icon 可选
     */
    createFeatureModule(id, coord, moduleName, time, text, icon) {
        let obj = {
            id,
            coord,
            name: moduleName,
            time,
            text,
            icon
        }
        let module = moduleName === "Target" ? new Target(obj) : new Track(obj);
        this.currentLayer.addFeature(module.feature);
        this.features.push({
            id,
            feature: module
        })
    }
    /**
     * 创建图形
     * @param {String} featureType 必选 要创建的feature类型
     * @param {Number || String} featureId 必选 赋予的id
     * @param {Stirng} text 可选 文字内容
     * @param {Array<Coordinate>} coord 必选 定位
     * @param {Stirng} srcName 可选 featureType为icon时需要传的参数 
     * @description srcName 数据为config.js中commonIcons对象所对应的value
     */
    createFeature(featureId, coord, text = "", featureType = "Point", srcName) {
        if (!featureId) {
            console.error("please add id to feature")
            return;
        }
        if (this.getFeatureById(featureId)) {
            console.error("The feature already exists")
            return;
        }
        let geometry = Geometrys[featureType];
        geometry.setCoordinates(coord)
        let StyleType = featureType === "MultiLineString" ? "LineString" : featureType === "MultiPoint" ? "Point" : featureType === "MultiPolygon" ? "Polygon" : featureType;
        let feature = new Feature({
            geometry,
            id: featureId,
            name: featureType
        })
        feature.setStyle(featureType === "Icon" ? defaultStyle[StyleType](srcName, text) : defaultStyle[StyleType](text))
        this.currentLayer.getSource().addFeature(feature);
        this.features.push({
            id: featureId,
            feature
        })
        return feature;
    }
}