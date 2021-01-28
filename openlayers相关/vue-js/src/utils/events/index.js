/**
 * 操作处理类 具体业务实现
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
    drawStyle
} from '../core/config';
// import {
//     createBox
// } from 'ol/interaction/Draw';
const events = {
    "click": singleClick,
    "dbClick": doubleClick,
    "move": pointerMove
}
export default class InteractionHandler {
    constructor(props) {
        this.id = props.id;
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
     * @param {Function<Event<Feature,Draw,string>} callback 回调函数
     */
    onDraw(type = "Piont", callback) {
        // if(this.Interaction) this.map.removeInteraction(this.Interaction);
        let self = this;
        this.Interaction = new Draw({
            // source: self.layer.getSource(),
            type,
            style: drawStyle[type],
            // freehand: false,
            // geometryFunction: type === "Circle" ? createBox() : ""
        })
        this.Interaction.on("drawend", (e) => {
            e.feature.setStyle(drawStyle[type])
            self.layer.getSource().addFeature(e.feature)
            callback && callback(e, self)
            // this.map.removeInteraction(this.Interaction)
        })
        this.map.addInteraction(this.Interaction);
    }
    // feature事件
    onSelect(type = "click", callback) {
        if (this.Interaction) this.map.removeInteraction(this.Interaction);
        let select = new Select({
            condition: events[type],
            multi: false,
            // filter: (feature, layer) => {
            //     if (this.layer.get("id") === layer.id) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // }
        });
        select.on("click", (e) => {
            console.log(e);
            callback && callback(e, this)
            // this.map.removeInteraction(this.Interaction)
        })
        this.map.addInteraction(select);
        this.Interaction = select;
    }
    // 底图事件
    onEvent(type = "singleClick", callback) {
        this.map.on(type, (e) => {
            callback && callback(e);
        })
    }
    /**
     * 清除当前图层中的图画及交互
     */
    clearDraw() {
        // this.layer.getSource().clear();
        this.map.removeInteraction(this.Interaction);
    }
}