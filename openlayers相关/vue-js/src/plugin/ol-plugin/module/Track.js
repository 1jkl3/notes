/*
 * @Author: duhu
 * @Description: 轨迹类
 * @Date: 2021-01-31 00:04:39
 * @LastEditTime: 2021-03-09 22:25:56
 * @FilePath: \vue-js\src\plugin\ol-plugin\module\Track.js
 */
import {
    ActiveStyle
} from "../core/config";
import FeaturePro from "./FeaturePro";

export default class Tarck extends FeaturePro {
    constructor(props) {
        super(props)
    }
    /**
     * @description: 创建航迹线
     * @param {*} id
     * @param {*} coord
     * @param {*} text
     * @param {*} time
     * @return {*}
     */
    createTrack({ id, coord, text, time }) {
        super.createFeature({ id, coord, content: { text }, time, featureType: 'LineString' })
        super.getFeatureById(id).time = [{ date: time, coord }]
    }
    /**
     * @description: 添加新的coord到指定航迹中 动态绘制
     * @param {*} id
     * @param {*} coord 数据结构 [[x,y],[x,y]]
     * @param {*} time
     * @return {*}
     */
    addCoordinate(id, coord, time) {
        let current = this.addCoordinateAndTime(id, coord, time)
        let coords = [];
        current.time.forEach(item => {
            coords.push(...item.coord)
        })
        console.log(current.feature.getGeometry().getLastCoordinate());
        current.feature.getGeometry().setCoordinates(coords);
    }
    /**
     * @description: 根据id将航迹坐标和时间预记录（配置updateCoordinateByTime方法实现） 
     * @param {*} id
     * @param {*} coord 数据结构 [[x,y],[x,y]]
     * @param {*} time
     * @return {*}
     */
    addCoordinateAndTime(id, coord, time) {
        let current = super.getFeatureById(id);
        if (!current) return false;
        current.time.push({ date: time, coord })
        // 从小到大排序
        current.time.sort((a, b) => a.date - b.date);
        return current;
    }
    /**
     * @description: 根据id和时间显示隐藏航迹 
     * @param {*} time
     * @return {*}
     */
    updateCoordinateByTime(id, time) {
        let current = super.getFeatureById(id);
        if (!current) return false;
        current.time.filter(item => item.date < time)
        if (current.time.length === 0) {
            // this.deleteTrackById(id)
            current.feature.getGeometry().setCoordinates([]);
        } else {
            let coords = [];
            current.time.forEach(item => {
                coords.push(item.coord)
            })
            current.feature.getGeometry().setCoordinates(coords);
        }
    }
    /**
     * @description: 改变指定目标样式
     * @param {*} id
     * @param {*} styleName
     * @return {*}
     */
    updataStyleById(id, styleName) {
        let style = ActiveStyle[styleName]();
        super.getFeatureById(id).feature.setStyle(style);
    }

}