<!--
 * @Author: your name
 * @Date: 2021-01-29 09:10:08
 * @,@LastEditTime: ,: 2021-02-04 22:24:31
 * @,@LastEditors: ,: Please set LastEditors
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
    this.feature = useFeature(345);
    this.feature.createFeature(
      123,
      [114.298353, 30.623705],
      { text: "测试", radius: this.feature.conversionRadius(22000) },
      "Circle"
    );
    this.feature.createFeature(
      345,
      [113.298353, 30.623705],
      { text: "测试1"},
    );
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
