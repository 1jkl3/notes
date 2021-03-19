/*
 * @Author: your name
 * @Date: 2021-01-29 09:21:38
 * @LastEditTime: 2021-03-20 00:30:10
 * @LastEditors: Please set LastEditors
 * @Description: 操作处理类
 * @FilePath: \vue-js\src\plugin\ol-plugin\events\InteractionHandler.js
 */
import {
    singleClick,
    doubleClick,
    pointerMove
} from 'ol/events/condition';
import {
    Select,
    Draw,
    DragPan
} from 'ol/interaction';
import {
    defaultStyle
} from '../core/config';
// import {
//     createBox
// } from 'ol/interaction/Draw';
const events = {
    "select": singleClick,
    "dbClick": doubleClick,
    "move": pointerMove
}
export default class InteractionHandler {
    constructor(props) {
        this.id = props.id || Date.now();
        this.name = props.name;
        this.map = props.map;
        this.layer = props.layer;
        this.Interaction = null;
    }

    /**
     * 关闭地图拖拽
     * @param {Boolean} off 控制拖拽开关
     */
    switchDragPan(off = false) {
        this.map.getInteractions().forEach(function (element) {
            if (element instanceof DragPan) {
                element.setActive(off)
            }
        });
    }
    /**
     * 绘制图形
     * @param {String} type 图形类型
     * @param {Object} content { text,src }
     * @param {Function<Event<Feature,Draw,string>} callback 回调函数
     */
    onDraw({ type = "Piont", src }, callback) {
        let self = this;
        this.Interaction = new Draw({
            type,
            style: type === 'Icon' ? defaultStyle[type](src) : defaultStyle[type](),
            // geometryFunction: type === "Circle" ? createBox() : ""
        })
        this.Interaction.on("drawend", (e) => {

            callback && callback(e, self)
        })
        this.map.addInteraction(this.Interaction);
    }
    // feature事件
    onSelect(type = "select", callback) {
        // 解决样式丢失问题
        let style = null;
        let select = new Select({
            condition: events[type],
            multi: false,
            filter: (feature, layer) => {
                style = feature.getStyle();
                if (this.layer.get("id") === layer.get("id")) {
                    return true;
                } else {
                    return false;
                }
            }
        });
        select.on('select', (e) => {
            e.selected[0] && e.selected[0].setStyle(style);
            callback && callback(e, this)
        })
        this.map.addInteraction(select);
        this.Interaction = select;
    }
    // 底图事件
    onEvent(callback, type = "singleClick") {
        this.map.on(type, (e) => {
            callback && callback(e);
        })
    }
    /**
     * 清除当前图层中的图画及交互
     */
    clearDraw() {
        this.map.removeInteraction(this.Interaction);
    }
}