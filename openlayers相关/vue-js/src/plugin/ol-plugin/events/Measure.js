/*
 * @Author: duhu
 * @Description: 测量工具
 * @Date: 2021-02-01 22:53:33
 * @LastEditTime: 2021-02-28 22:19:44
 * @FilePath: \vue-js\src\plugin\ol-plugin\events\Measure.js
 */

import {
    getArea,
    getLength
} from 'ol/sphere';
import {
    Draw,
} from 'ol/interaction';
import {
    defaultStyle
} from '../core/config';
import InteractionHandler from './InteractionHandler'
import {
    FeaturePro
} from '../module'
import {
    CustomOverlay
} from '../index'
export default class Measure extends InteractionHandler {
    static instance = null;
    static getInstance(props) {
        if (!Measure.instance) {
            Measure.instance = new Measure(props)
        }
        return Measure.instance;
    }
    constructor(props) {
        super(props)
        this.helpTooltipElement = null;
        this.tooltip = '';
        this.helpText = '开始'
        this.listener = null;
        this.featurePro = new FeaturePro({
            layer: props.layer,
            name: '开始-结束',
        })
        this.helpOverlay = new CustomOverlay({
            map: props.map
        })
    }
    /**
     * @description: 创建测量数据展示控件
     * @param {*} id dom的id
     * @param {string} text 
     */
    createHelpDom(id = 'help', text = '') {
        let div = document.createElement('div');
        div.setAttribute("id", id)
        div.style.padding = '2px 5px'
        div.style.fontSize = '10px'
        div.style.display = 'block'
        div.style.backgroundColor = 'rgba(0,0,0,0.5)'
        div.style.color = '#FFF'
        div.style.textAlign = 'center'
        div.innerText = text
        document.body.appendChild(div)
        return div
    }
    /**
     * @description：创建基础dom
     * @param {type} text 添加到dom中的文字
     */
    createDom(text = '点击开始') {
        if(this.helpTooltipElement) return this.helpTooltipElement
        this.helpTooltipElement = document.createElement('div');
        this.helpTooltipElement.setAttribute("id", 'custom')
        this.helpTooltipElement.style.padding = '2px 5px'
        this.helpTooltipElement.style.fontSize = '10px'
        this.helpTooltipElement.style.display = 'block'
        this.helpTooltipElement.style.backgroundColor = 'rgba(0,0,0,0.5)'
        this.helpTooltipElement.style.color = '#FFF'
        this.helpTooltipElement.style.textAlign = 'center'
        this.helpTooltipElement.style.visibility = 'hidden'
        this.helpTooltipElement.innerText = text
        document.body.appendChild(this.helpTooltipElement)
        return this.helpTooltipElement
    }
    /**
     * @description：创建overlay
     * @param {id} id dom的id 
     * @param {Coordinate} coord 经纬度
     */
    createHelpOverlay(id, coord) {
        let overlay = this.helpOverlay.getOverlayById(id)
        this.helpTooltipElement.style.visibility = 'visible'
        if (!overlay) {
            this.helpOverlay.createHelpOverlay(id, id, coord)
        } else {
            this.helpOverlay.refreshPosition(id, id, coord)
        }
    }
    /**
     * @description: 重写绘制方法 实现测绘
     * @param {'LineString' | 'Polygon' } type 类型 默认LineString
     * @param {Function} callback 回调
     * @return {*}
     */
    onDraw(callback, type = "LineString") {
        let self = this, helpDom;
        if(this.Interaction){
            this.map.removeInteraction(this.Interaction)
        }
        this.Interaction = new Draw({
            type,
            style: defaultStyle[type]()
        })
        // 开始
        this.Interaction.on("drawstart", (e) => {
            let sketch = e.feature, tooltip;
            // 创建计算长度dom
            helpDom = this.createHelpDom('help' + this.helpOverlay.defaultOverlays.length);
            let id = helpDom.getAttribute('id');
            this.helpOverlay.createHelpOverlay(id, id, sketch.getGeometry().getLastCoordinate())
            this.helpTooltipElement.innerHTML = '点击结束'
            this.listener = sketch.getGeometry().on("change", function (params) {
                let geom = params.target
                if (geom.getType() === 'LineString') {
                    tooltip = self._formatLength(geom);
                } else if (geom.getType() === 'Polygon') {
                    tooltip = self._formatArea(geom);
                }
                helpDom.innerHTML = tooltip
            })
        })
        // 结束
        this.Interaction.on("drawend", (e) => {
            self.helpTooltipElement.innerHTML = '点击开始'
            e.feature.setStyle(defaultStyle[type]())
            self.layer.getSource().addFeature(e.feature)
            let options = {
                feature: e.feature,
                length: helpDom.innerHTML.split(' ')[0]
            }
            callback && callback(options)
        })
        this.map.addInteraction(this.Interaction);
    }
    /**
     * @description: 重写map响应事件
     * @param {*} callback
     * @param {'singleclick' | 'doubleClick' | 'moveend' | 'pointermove' } type
     * @return {*}
     */
    onEvent(type = 'pointermove') {
        console.log("进入");
        let dom = this.createDom();
        let id = dom.getAttribute('id');
        this.map.on(type, (e) => {
            this.createHelpOverlay(id, e.coordinate)
        })
    }
    /**
     * @description: 测量长度
     * @param {*} line
     * @return {*}
     */
    _formatLength(line) {
        //获取投影坐标系
        var sourceProj = this.map.getView().getProjection();
        //ol/sphere里有getLength()和getArea()用来测量距离和区域面积，默认的投影坐标系是EPSG:3857, 其中有个options的参数，可以设置投影坐标系
        var length = getLength(line, {
            projection: sourceProj
        });
        var output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
                ' ' + 'km';
        } else {
            output = (Math.round(length * 100) / 100) +
                ' ' + 'm';
        }
        return output;
    }
    // 测量面积
    _formatArea(polygon) {
        //获取投影坐标系
        var sourceProj = this.map.getView().getProjection();
        var area = getArea(polygon, {
            projection: sourceProj
        })
        var output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) +
                ' ' + 'm<sup>2</sup>';
        }
        return output;
    }
}