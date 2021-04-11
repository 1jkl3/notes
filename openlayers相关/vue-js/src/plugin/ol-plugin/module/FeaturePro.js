/*
 * @Author: your name
 * @Date: 2021-01-29 09:10:08
 * @LastEditTime: 2021-04-07 00:21:51
 * @LastEditors: Please set LastEditors
 * @Description: 申明为被继承类 封装为遮盖物基础结构 公共部分代码
 * @FilePath: \vue-js\src\plugin\ol-plugin\module\FeaturePro.js
 */
import {
    defaultStyle,
    Geometrys
} from '../core';
import Feature from 'ol/Feature';
import { Polygon } from 'ol/geom';
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
        let contents = { text: '', radius: 0, lineDash: [] }
        Object.assign(contents, content)
        contents.radius = this.conversionRadius(content.radius)
        let geometry = Geometrys[featureType](coord, contents.radius);
        let StyleType = featureType === "MultiLineString" ? "LineString" : featureType === "MultiPoint" ? "Point" : featureType === "MultiPolygon" ? "Polygon" : featureType;
        let feature = new Feature({
            geometry,
            id,
            type: featureType
        })
        feature.setStyle(defaultStyle[StyleType](contents.text, contents.lineDash))
        this.layer.getSource().addFeature(feature);
        this.features.push({
            id,
            feature,
            time
        })
        return feature;
    }
    /**
     * @description: 创建一个扇形
     * @param {*} id
     * @param {*} coord [x,y]
     * @param {*} time
     * @param {*} content  结构{ text: 文字内容, radius: 半径, angle: 方向角度, radian: 开口角度, sides: 边线点数量 }
     * @return {*}
     */
    createSectorFeature({ id, coord, time, content = {} }) {
        if (!id) {
            console.error("please add id to feature")
            return;
        }
        if (this.getFeatureById(id)) {
            console.error("The feature already exists")
            return;
        }
        let contents = { text: '', lineDash: [], radius: 0, angle: 0, radian: 45, sides: 200, zIndex: 1 }
        Object.assign(contents, content)
        contents.radius = this.conversionRadius(contents.radius)
        let geometry = this.GetMarcoXyArcArray(coord, contents.radius, contents.sides, contents.radian, contents.angle)
        let feature = new Feature({
            geometry,
            type: 'Sector',
            population: 4000
        })
        let style = defaultStyle['Sector'](contents.text, contents.lineDash, contents.zIndex)
        feature.setStyle(style);
        this.layer.getSource().addFeature(feature);
        this.features.push({
            id,
            feature,
            time
        })
        return feature;
    }
    /**
     * @description: 绘制扇形功能
     * @param {*} origin 圆心
     * @param {*} radius 半径 大小km
     * @param {*} sides 边数 扇形圆边点数量 （越大越圆）
     * @param {*} r 弧度 扇形开角幅度
     * @param {*} angel 方向角 扇形圆边朝向
     * @return {Polygon}
     */
    GetMarcoXyArcArray(origin, radius, sides, r, angel) {
        let x = [];
        x[0] = [origin[0], origin[1]];
        for (let j = 1; j < sides; j++) {
            let tx = origin[0] + radius * Math.cos(Math.PI / 180 * (90 - angel + (sides / 2 - j) * r / (sides - 2)));

            let ty = origin[1] + radius * Math.sin(Math.PI / 180 * (90 - angel + (sides / 2 - j) * r / (sides - 2)));

            x[j] = [tx, ty];
        }
        return new Polygon([x]);
    }
    /**
     * @description: 创建热力图上的数据
     * @param {*} id
     * @param {*} coord 结构[x,y]
     * @param {*} time
     * @return {*}
     */
    createHeatFeature({ id, coord, time }) {
        if (!id) {
            console.error("please add id to feature")
            return;
        }
        if (this.getFeatureById(id)) {
            console.error("The feature already exists")
            return;
        }
        let geometry = Geometrys['Point'](coord);
        let feature = new Feature({
            geometry,
            id,
            type: 'HeatPoint'
        })
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