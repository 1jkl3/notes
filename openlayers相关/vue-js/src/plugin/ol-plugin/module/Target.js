/*
 * @Author: your name
 * @Date: 2021-01-31 00:04:39
 * @LastEditTime: 2021-01-31 02:32:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-js\src\plugin\ol-plugin\module\Target.js
 */
import { Point } from "ol/geom";
import { defaultStyle,ActiveStyle } from "../core/config";
import FeaturePro from "./FeaturePro";
/**
 * 目标类
 */

export default class Target extends FeaturePro{
    constructor(props){
        super(props)
        this.icon = props.icon;
        this.coord = props.coord;
        this.text = props.text;
    }
    createModule(){
        super.feature = new Point(this.coord);
        super.feature.setStyle(defaultStyle["Icon"](this.icon,this.text))
    }
    /**
     * 更新目标物位置信息
     */
    updateCoord(){}
    updataStyle(styleName){
        console.log(super.feature.getStyle());
        // let style = ActiveStyle[styleName]();
        // super.feature.setStyle(style);
    }
}