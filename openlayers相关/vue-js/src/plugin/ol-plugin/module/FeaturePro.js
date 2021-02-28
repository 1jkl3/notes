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
        this.map = props.map;
        this.features = [];
    }
    /**
     * 创建图形
     * @param {String} featureType 必选 要创建的feature类型
     * @param {Number || String} featureId 必选 赋予的id
     * @param {Stirng} content 可选 文字样式
     * @param {Array<Coordinate>} coord 必选 定位
     * @param {Stirng} srcName 可选 featureType为icon时需要传的参数 
     * @description srcName 数据为config.js中commonIcons对象所对应的value
     */
    createFeature(featureId, coord, content = { text: '', radius: 0 }, featureType = "Point", srcName) {
        if (!featureId) {
            console.error("please add id to feature")
            return;
        }
        if (this.getFeatureById(featureId)) {
            console.error("The feature already exists")
            return;
        }
        let geometry = Geometrys[featureType](coord, content.radius);
        let StyleType = featureType === "MultiLineString" ? "LineString" : featureType === "MultiPoint" ? "Point" : featureType === "MultiPolygon" ? "Polygon" : featureType;
        let feature = new Feature({
            geometry,
            id: featureId,
            name: featureType
        })
        feature.setStyle(featureType === "Icon" ? defaultStyle[StyleType](srcName, content.text) : defaultStyle[StyleType](content.text))
        console.log(feature);
        this.layer.getSource().addFeature(feature);
        this.features.push({
            id: featureId,
            feature
        })
        return feature;
    }
    /**
    * 获取转换后单位的半径
    * @param {Number} radius 以米为单位的半径的值
    * @returns {Number} circleRadius 以投影的单位为单位的半径的值
    */
    conversionRadius(radius) {
        let metersPerUnit = this.map.getView().getProjection().getMetersPerUnit();
        let circleRadius = radius / metersPerUnit;
        return circleRadius;
    }
    getFeatureById(id) {
        return this.features.find(item => item.id === id);
    }
    getFeatures() {
        return this.features;
    }
}