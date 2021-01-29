/*
 * @Author: duhu
 * @Date: 2021-01-29 09:40:22
 * @LastEditTime: 2021-01-29 15:41:01
 * @LastEditors: Please set LastEditors
 * @Description: 地图 业务逻辑层 单例全局属性
 * @FilePath: \vue-js\src\module\useOpenLayer.js
 */
import { BaseMap } from "@/plugin/ol-plugin";
import { } from './index'

var basemap = null;
export const useMap = () => {
    if (!basemap) {
        basemap = new BaseMap({
            key: Date.now(),
            target: 'map'
        })
    }
    return basemap;
}
export const destory = () => {
    basemap && basemap.destory()
}