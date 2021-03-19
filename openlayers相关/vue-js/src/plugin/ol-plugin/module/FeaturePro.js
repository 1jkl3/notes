/*
 * @Author: your name
 * @Date: 2021-01-29 09:10:08
 * @LastEditTime: 2021-03-20 00:26:04
 * @LastEditors: Please set LastEditors
 * @Description: 申明为被继承类 封装为遮盖物基础结构 公共部分代码
 * @FilePath: \vue-js\src\plugin\ol-plugin\module\FeaturePro.js
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
     * @param {Number || String} featureId 必选 赋予的id
     * @param {Array<Coordinate>} coord 必选 定位
     * @param {Stirng} content 可选 文字样式
     * @param {String} featureType 必选 要创建的feature类型
     * @description srcName 数据为config.js中commonIcons对象所对应的value
     */
    createFeature({ id, coord, time, content = {}, featureType = "Point" }) {
        if (!id) {
            console.error("please add id to feature")
            return;
        }
        if (this.getFeatureById(id)) {
            console.error("The feature already exists")
            return;
        }
        let contents = { text: '', radius: 0 }
        Object.assign(contents, content)
        content.radius = this.conversionRadius(content.radius)
        let geometry = Geometrys[featureType](coord, content.radius);
        let StyleType = featureType === "MultiLineString" ? "LineString" : featureType === "MultiPoint" ? "Point" : featureType === "MultiPolygon" ? "Polygon" : featureType;
        let feature = new Feature({
            geometry,
            id,
            name: featureType
        })
        feature.setStyle(defaultStyle[StyleType](content.text))
        this.layer.getSource().addFeature(feature);
        this.features.push({
            id,
            feature,
            time
        })
        return feature;
    }
    /**
     * @description: 根据id删除Feature 
     * @param {*} id
     * @return {*}
     */
    deleteFeatureById(id) {
        let feature = this.getFeatureById(id).feature
        if (feature) {
            this.layer.getSource().removeFeature(feature)
            this.features = this.features.filter(item.id !== id)
        } else {
            return false
        }
        return true
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