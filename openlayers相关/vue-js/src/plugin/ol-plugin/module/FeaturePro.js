/*
 * @Author: your name
 * @Date: 2021-01-29 09:10:08
 * @LastEditTime: 2021-01-31 02:58:50
 * @LastEditors: Please set LastEditors
 * @Description: 申明为被继承类 封装为遮盖物基础结构 公共部分代码
 * @FilePath: \vue-js\src\utils\module\FeaturePro.js
 */
import {
    defaultStyle,
    Geometrys
} from '../core';
import Feature from 'ol/Feature';
export default class FeaturePro {
    constructor(props) {
        this.id = props.id || Date.now();
        this.name = props.name;
        this.layer = props.layer;
        this.features = [];
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
        let geometry = Geometrys[featureType]();
        geometry.setCoordinates(coord)
        let StyleType = featureType === "MultiLineString" ? "LineString" : featureType === "MultiPoint" ? "Point" : featureType === "MultiPolygon" ? "Polygon" : featureType;
        let feature = new Feature({
            geometry,
            id: featureId,
            name: featureType
        })
        feature.setStyle(featureType === "Icon" ? defaultStyle[StyleType](srcName, text) : defaultStyle[StyleType](text))
        this.layer.getSource().addFeature(feature);
        this.features.push({
            id: featureId,
            feature
        })
        return feature;
    }
    getFeatureById(id) {
        return this.features.find(item => item.id === id);
    }
    getFeatures(){
        return this.features;
    }
}