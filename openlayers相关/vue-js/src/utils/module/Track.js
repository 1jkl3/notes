/**
 * 轨迹类
 */

import { LineString } from "ol/geom";
import { defaultStyle,ActiveStyle } from "../core/config";
import {
    getCoordinates
} from "../core/utils";
import featurePro from "./FeaturePro";

export default class Tarck extends featurePro {
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