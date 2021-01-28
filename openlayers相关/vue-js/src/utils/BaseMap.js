// 样式引入
import 'ol/ol.css';
// 绘制
import {
    Tile
} from 'ol/layer';
import {
    defaults
} from 'ol/control'
import Map from 'ol/Map';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
// 事件交互
import {
    dataSource,
    defaultViewOptions
} from '@/utils/core/config';
import {
    defaults as InteractionDefaults
} from 'ol/interaction';
/**
 * @description 地图总控
 * @function 创建地图及图层（配合CustomLayer类）不包括地图上个的图形
 */
export default class BaseMap {
    static plugins = {};

    // 单例
    static instance = null;
    static getInstance(data) {
        if (!BaseMap.instance) {
            BaseMap.instance = new BaseMap(data);
        }
        return BaseMap.instance;
    }
    /**
     * @param {String} key 唯一
     * @param {String} tile 默认瓦片实例
     * @param {Map} defaultMap 默认地图实例
     * @param {Document} defaultTarget 默认绑定dom元素
     * @param {Array<String>} defaultCenter 默认中心点
     * @param {Tile} defaultBaseLayer 默认原始底图
     * @param {events} defaultInteractions 默认交互列表
     * @param {Overlay} defaultOverlays 默认弹窗列表
     * @param {Array<VectorLayer>} defaultLayers 默认图层列表
     */
    constructor(props) {
        this.key = props.key || null;
        this.defaultMap = null;
        this.defaultTarget = props.target;
        this.defaultCenter = props.center || [118.14161001864854, 27.362891709786183];
        this.defaultBaseLayer = null;
        this.defaultOverlays = [];
        this.createMap.call(this);
        // this.craeteInteraction.call(this);
    }
    // 创建初始地图模型
    createMap() {
        // 报错需要指定dom做载体
        if (!this.defaultTarget) {
            console.error("need to target dom for in props");
            return;
        }
        // 报错需要指定map唯一的key
        if (!this.key) {
            console.error("need to set up key for the instance");
            return;
        }
        // 创建瓦片地图底图
        // 数据源 填写内容为core/config.js文件中的dataSource对象
        this.defaultBaseLayer = new Tile({
            source: dataSource["Gaode"]
        })
        // 创建地图对象
        this.defaultMap = new Map({
            controls: defaults({
                attribution: false,
                zoom: false,
                rotate: false
            }),
            interactions: InteractionDefaults({
                doubleClickZoom: false,
            }),
            layers: [this.defaultBaseLayer],
            target: this.defaultTarget,
            view: new View(defaultViewOptions)
        })
    }
    /**
     * 移动视角
     * @param {Array<coordinate>} center 坐标
     * @param {Boolean} animate 是否开启动画
     */
    translationView(center, animate) {
        if (animate) {
            this.defaultMap.getView().animate({
                center
            })
        } else {
            this.defaultMap.getView().setCenter(center)
        }
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
        this.defaultMap.addOverlay(overlay)
    }
    // 清除
    destory() {
        // this.defaultMap
        // 清除layers
        this.defaultMap.getLayers() && this.defaultMap.getLayers().clear()
        // 清除Overlays
        this.defaultMap.getOverlays() && this.defaultMap.getOverlays().clear()
        // 清除交互
        this.defaultMap.getInteractions() && this.defaultMap.getInteractions().clear()
        //清除地图数据源
        this.defaultBaseLayer.getSource().clear();
        this.defaultBaseLayer.setSource(null);
        this.defaultMap.removeLayer(this.defaultBaseLayer);
        this.defaultMap = null;
    }
}

// export const BaseMapIns = (option) => {
//     return BaseMap.getInstance(option)
// };