/*
 * @Author: duhu
 * @Description: 目标类
 * @Date: 2021-01-31 00:04:39
 * @LastEditTime: 2021-03-09 22:21:08
 * @FilePath: \vue-js\src\plugin\ol-plugin\module\Target.js
 */
import { defaultStyle, ActiveStyle, Geometrys } from "../core";
import { computeDirection } from '../core/utils'
import FeaturePro from "./FeaturePro";
import Feature from 'ol/Feature';

export default class Target extends FeaturePro {
    constructor(props) {
        super(props)
    }
    createTarget({ id, icon, text, coord, time }) {
        let geometry = Geometrys['Point'](coord);
        let style = defaultStyle['Icon'](icon, text, 0)
        let feature = new Feature({
            geometry,
            id,
            name: 'Icon'
        })
        feature.setStyle(style)
        this.layer.getSource().addFeature(feature);
        this.features.push({
            id,
            feature,
            time
        })
    }
    /**
     * @description: 指定目标修改位置信息
     * @param {*} id
     * @param {*} coord 经纬度
     * @param {*} lineLastCoords 线的最后一个坐标经纬度 作用为修正方向 数据结构 [[x,y],[x,y]]
     * @return {*}
     */
    updataTargetSiteById(id, coord, lineLastCoords) {
        let direction = computeDirection(lineLastCoords[0], lineLastCoords[1])
        this.setIconRotationById(direction)
        super.getFeatureById(id).feature.getGeometry.setCoordinates(coord);
    }

    /**
     * @description: 设置指定目标方向信息
     * @param {*} id
     * @param {*} rotation
     * @return {*}
     */
    setIconRotationById(id, rotation) {
        let style = super.getFeatureById(id).feature.getStyle()
        let image = style.getImage()
        image.setRotation(rotation)
    }
    /**
     * @description: 改变指定目标样式
     * @param {*} id
     * @param {*} styleName
     * @param {*} rotation
     * @return {*}
     */
    updataStyleById(id, styleName, rotation) {
        let style = ActiveStyle[styleName](rotation);
        super.getFeatureById(id).feature.setStyle(style);
    }
}