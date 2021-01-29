/*
 * @Author: duhu
 * @Date: 2021-01-29 09:44:19
 * @LastEditTime: 2021-01-29 16:33:48
 * @LastEditors: Please set LastEditors
 * @Description: 事件 业务逻辑层
 * @FilePath: \vue-js\src\module\useEvent.js
 */
import { useMap, useLayer } from './index'
import { InteractionHandler, getCoordinates, defaultStyle } from '@/plugin/ol-plugin';
let hander = null;
export const useEvent = (option) => {
    option.map = useMap().defaultMap;
    option.layer = useLayer().currentLayer;
    if (!hander) {
        hander = new InteractionHandler(option)
    }
    // 注册绘制图形事件
    // useEventDraw(option.type)
    return hander
}
// 注册交互事件
export const useEventSelect = (type) => {
    !hander && (hander = useEvent())
    hander.onSelect(type, (e) => {
        console.log(e.selected[0]);
        // console.log(e.selected[0].getGeometry());
    })
}
// 注册绘制图形事件
export const useEventDraw = (type, src) => {
    !hander && (hander = useEvent())
    src = src ? src : null;
    // let src = content && content.src ? content.src : null
    // let text = content && content.text ? content.text : null
    hander.onDraw(type, src, (e,self) => {
        // if (type === 'Icon') {
        //     e.feature.setStyle(defaultStyle[type](src, text))
        // } else {
        //     e.feature.setStyle(defaultStyle[type](text))
        // }
        if(confirm()){
            self.layer.getSource().addFeature(e.feature)
        }else{
            console.log(e.feature.getStyle());
        }
        // type === 'Icon' ? e.feature.setStyle(defaultStyle[type](content.src, content.text)) : e.feature.setStyle(defaultStyle[type](content.text));
        // console.log(e);
        // console.log(getCoordinates(e.feature));

        // unuseEvent()
    })
}
// 清除事件
export const unuseEvent = () => {
    hander && hander.clearDraw()
}