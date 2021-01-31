/*
 * @Author: duhu
 * @Date: 2021-01-29 10:02:07
 * @,@LastEditTime: ,: 2021-02-01 01:43:21
 * @,@LastEditors: ,: Please set LastEditors
 * @Description: 封装窗口类
 * @FilePath: \vue-js\src\plugin\ol-plugin\overlay\customOverlay.js
 */

import Overlay from 'ol/Overlay';
import {
    overlayPoistion
} from './core/utils'
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
    createOverlay(overlayId, target,coordinate) {
        let dom = document.querySelector(target);
        let position = overlayPoistion(coordinate,dom.height,dom.width,this.map.getTarget())
        let overlay = new Overlay({
            element: target,
            position
        })
        this.defaultOverlays.push({
            id: overlayId,
            overlay
        })
        this.map.addOverlay(overlay)
    }
    /**
     * @description: 创建一个测量工具窗口
     * @param {*} overlayId
     * @param {*} target
     * @param {*} position
     * @return {*}
     */
    createHelpOverlay(overlayId, target,position) {
        let span = document.querySelector('#' + target);
        let dom = span.getBoundingClientRect();
        let map = document.querySelector('#' + this.map.getTarget());
        let offset = overlayPoistion(this.map.getPixelFromCoordinate(position),dom.height,dom.width,map)
        let overlay = new Overlay({
            element: span,
            position,
            offset
        })
        this.defaultOverlays.push({
            id: overlayId,
            overlay
        })
        this.map.addOverlay(overlay)
    }
    /**
     * @description：根据id获取overlay
     * @,@param {type} id overlay id
     */
    getOverlayById(id){
        return this.defaultOverlays.find(e=>e.id === id)
    }
    /**
     * @description：刷新overlay位置
     * @,@param {type} overlayId I am argument overlayId. 
     * @,@param {type} target I am argument target. 
     * @,@param {type} position I am argument position. 
     */
    refreshPosition(overlayId,target,position){
        let span = document.querySelector('#' + target);
        let dom = span.getBoundingClientRect();
        let map = document.querySelector('#' + this.map.getTarget());
        let offset = overlayPoistion(this.map.getPixelFromCoordinate(position),dom.height,dom.width,map)
        let overlay = this.getOverlayById(overlayId);
        overlay.overlay.setPosition(position)
        overlay.overlay.setOffset(offset)
    }
}