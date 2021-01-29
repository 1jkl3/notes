/*
 * @Author: duhu
 * @Date: 2021-01-29 10:02:07
 * @LastEditTime: 2021-01-29 10:12:18
 * @LastEditors: Please set LastEditors
 * @Description: 封装窗口类
 * @FilePath: \vue-js\src\plugin\ol-plugin\overlay\customOverlay.js
 */

import Overlay from 'ol/Overlay';

export default class CustomOverlay {
    constructor(props) {
        this.id = props.id || Date.now();
        this.name = props.name || '动态窗口';
        this.map = props.map;
        this.defaultOverlays = [];
    }
    /**
     * 创建窗口 popup
     * @param {DOMCLASS} target dom
     */
    createOverlay(overlayId, target) {
        let overlay = new Overlay({
            element: target,
            // position
        })
        this.defaultOverlays.push({
            id: overlayId,
            overlay
        })
        this.map.addOverlay(overlay)
    }
}