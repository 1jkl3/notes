/*
 * @Author: your name
 * @Date: 2021-01-29 09:10:08
 * @LastEditTime: 2021-01-31 02:36:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-js\src\plugin\ol-plugin\module\Track.js
 */
/**
 * 轨迹类
 */

import {
    LineString
} from "ol/geom";
import {
    defaultStyle,
    ActiveStyle
} from "../core/config";
import {
    getCoordinates
} from "../core/utils";
import FeaturePro from "./FeaturePro";

export default class Tarck extends FeaturePro {
    constructor(props) {
        super(props)
        this.time = props.time;
        this.coord = props.coord;
        this.text = props.text;
        this.times = [{
            date: props.time,
            coord: props.coord
        }];
        this._createModule()
    }
    _createModule() {
        this.feature = new LineString(this.coord);
        this.feature.setStyle(defaultStyle["LineString"](this.text))
    }
    // 添加新的coord到feature中 动态绘制
    addCoordinate(coord, time) {
        this.times.push({
            date: time,
            coord
        });
        // 从小到大排序
        this.times.sort((a, b) => a.date - b.date);
        let coords = getCoordinates(this.feature);
        coords = coords.concat(coord);
        this.feature.setCoordinates(coords);
    }
    updataStyle() {}

}