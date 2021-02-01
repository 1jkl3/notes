<!--
 * @Author: your name
 * @Date: 2021-01-29 09:10:08
 * @LastEditTime: 2021-02-01 10:38:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-js\src\components\chatMap.vue
-->
<template>
  <div class="chat-map" ref="map" id="map"></div>
</template>

<script>
import {
  useMap,
  useLayer,
  useFeature,
  useEvent,
  useEventDraw,
  unuseEvent,
  useEventSelect,
  useMeasure
} from "@/module";
// import { drawStyle } from '@/utils/core/config';
// import {Draw} from 'ol/interaction'
export default {
  name: "basemap",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    useMap();
    useLayer();
    useMeasure()
    // console.log(layer);
    // let feature = useFeature({
    //   id:'1234',
    //   name: "自定义特色",
    // });
    // feature.createFeature(123, [119.21277701083604, 27.895728623848683],'测试');
    // feature.createFeature(1234, [112.21277701083604, 27.895728623848683],'测试');
    // useEvent({
    //   name: "自定义事件",
    // });
    // // useEventSelect('move')Polygon Circle
    // useEventDraw("Circle",{text:"哈哈"});
    // if (!window.baseMap) {
    // registerPlugin([CustomLayer, InteractionHandler], BaseMap => {
    //   window.baseMap = BaseMap.getInstance(this.mapOption);
    //   window.Layer = new BaseMap.plugins.CustomLayer({
    //     id: 123,
    //     name: "label",
    //     map: window.baseMap.defaultMap
    //   });
    //   window.Interaction = new BaseMap.plugins.InteractionHandler({
    //     id: 456,
    //     name: "event",
    //     map: window.baseMap.defaultMap,
    //     layer: window.Layer.currentLayer
    //   });
    //   // window.Interaction.onDraw("Polygon", (e, self) => {
    //   //   self.clearDraw();
    //   // });
    //   window.Interaction.onSelect("click", res => {
    //     console.log(res);
    //   });
    // });
    // }
  },
};
</script>

<style scoped>
.chat-map {
  width: 100%;
  height: 100%;
}
</style>
