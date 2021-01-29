/*
 * @Author: duhu
 * @Date: 2021-01-29 09:44:02
 * @LastEditTime: 2021-01-29 10:51:48
 * @LastEditors: Please set LastEditors
 * @Description: 图层 业务逻辑层
 * @FilePath: \vue-js\src\module\useLayer.js
 */
import { CustomLayer } from '@/plugin/ol-plugin'
import { useMap } from './index'
var layer = null;
export const useLayer = () => {
    let option = {
        name:'test1',
        map:useMap().defaultMap
    }
    if(!layer){
        layer = new CustomLayer(option);
    }
    return layer;
}