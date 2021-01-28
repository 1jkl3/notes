import { Point } from "ol/geom";
import { defaultStyle,ActiveStyle } from "../core/config";
import FeaturePro from "./FeaturePro";
/**
 * 目标类
 */

export default class Target extends FeaturePro{
    constructor(props){
        super(props)
    }
    createModule(){
        super.feature = new Point(super.coord);
        super.feature.setStyle(defaultStyle["Icon"](super.icon,super.text))
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