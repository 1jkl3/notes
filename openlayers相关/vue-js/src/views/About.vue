<!--
 * @Author: your name
 * @Date: 2021-01-29 09:10:08
 * @LastEditTime: 2021-03-09 22:19:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-js\src\views\About.vue
-->
<template>
  <div class="about">
    <chat-map :type="type" />
    <div class="tabs1" @click="selectLine">线</div>
    <div class="tabs" @click="selectPolygon">面</div>
    <button @click="inse">点击</button>
  </div>
</template>

<script>
import {
  useEventDraw,
  asyncStyleFun,
  destory,
  useMeasure,
  useFeature,
  useTarget,
  useTrack,
} from "@/module";
import chatMap from "@/components/chatMap";
export default {
  name: "About",
  components: {
    chatMap,
  },
  data() {
    return {
      type: "LineString",
      feature: null,
    };
  },
  mounted() {
    // 创建普通图形
    this.feature = useFeature();
    let options = {
      id: 123,
      coord: [114.298353, 30.623705],
      time: Date.now(),
      content: { text: "测试", radius: 22000 },
      featureType: "Circle",
    };
    this.feature.createFeature(options);
    // 创建目标
    let opts = {
      icon: "plane",
      text: "测试目标",
      id: "123",
      coord: [113.298353, 30.623705],
    };
    let target = useTarget();
    target.createTarget(opts);
    // 创建航迹
    let trackOpts = {
      id: 456,
      coord: [
        [117.93836294833604, 27.692481553536183],
        [117.64173208896104, 26.802588975411183],
        [118.85022818271104, 26.736671006661183],
      ],
      text: "",
      time: Date.now(),
    };
    let track = useTrack();
    track.createTrack(trackOpts);
    // 更新航迹
    setTimeout(() => {
      let coords = [
        [118.22400747958604, 27.879249131661183],
        [119.00403677646104, 28.230811631661183],
      ];
      track.addCoordinate(456, coords, Date.now());
    }, 2000);
  },
  methods: {
    selectPolygon() {
      this.type = "Polygon";
      useMeasure(this.type, 123);
    },
    selectLine() {
      this.type = "LineString";
      useMeasure(this.type, 123);
      // Polygon Circle
      // useEventDraw("LineString", null, (opts) => {
      //   // opts.text = "哈哈";
      //   asyncStyleFun(opts);
      // });
    },
    inse() {
      destory();
    },
  },
};
</script>
<style scoped>
.about {
  width: 100%;
  height: calc(100% - 80px);
}
.tabs {
  position: fixed;
  right: 10%;
  bottom: 20%;
  width: 20px;
  height: 20px;
  color: #fff;
  background-color: #000;
}
.tabs1 {
  position: fixed;
  right: 20%;
  bottom: 20%;
  width: 20px;
  height: 20px;
  color: #fff;
  background-color: #000;
}
</style>
