<template>
  <div class="chat-map" ref="map" id="map"></div>
</template>

<script>
import { CustomLayer, registerPlugin, InteractionHandler,Target,useMap } from "@/utils";
// import { drawStyle } from '@/utils/core/config';
// import {Draw} from 'ol/interaction'
export default {
  name: "basemap",
  data() {
    return {
      mapOption: {
        key: new Date().getTime()
      }
    };
  },
  methods: {},
  mounted() {
    // console.log(Target);
    this.mapOption.target = "map";
    if (!window.baseMap) {
      registerPlugin([CustomLayer, InteractionHandler], BaseMap => {
        window.baseMap = BaseMap.getInstance(this.mapOption);
        window.Layer = new BaseMap.plugins.CustomLayer({
          id: 123,
          name: "label",
          map: window.baseMap.defaultMap
        });
        window.Interaction = new BaseMap.plugins.InteractionHandler({
          id: 456,
          name: "event",
          map: window.baseMap.defaultMap,
          layer: window.Layer.currentLayer
        });
        // window.Interaction.onDraw("Polygon", (e, self) => {
        //   self.clearDraw();
        // });
        window.Interaction.onSelect("click", res => {
          console.log(res);
        });
      });
    }
  }
};
</script>

<style scoped>
.chat-map {
  width: 100%;
  height: 100%;
}
</style>
