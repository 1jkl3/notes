/*
 * @Author: your name
 * @Date: 2021-01-29 09:10:08
 * @LastEditTime: 2021-01-29 09:37:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-js\src\plugin\ol-plugin\module\Track.js
 */
/**
 * 轨迹类
 */

import { LineString } from "ol/geom";
import { defaultStyle,ActiveStyle } from "../core/config";
import {
    getCoordinates
} from "../core/utils";
import FeaturePro from "./FeaturePro";

export default class Tarck extends FeaturePro {
    constructor(props) {
        super(props)
        this.times = [{
            date:props.time,
            coord:props.coord
        }];
        this._createModule()
    }
    _createModule() {
        super.feature = new LineString(super.coord);
        super.feature.setStyle(defaultStyle["LineString"](super.text))
    }
    // 添加新的coord到feature中 动态绘制
    addCoordinate(coord,time) {
        this.times.push({
            date:time,
            coord
        });
        // 从小到大排序
        this.times.sort((a,b)=>a.date - b.date);
        let coords = getCoordinates(super.feature);
        coords = coords.concat(coord);
        super.feature.setCoordinates(coords);
    }
    updataStyle(){}

}