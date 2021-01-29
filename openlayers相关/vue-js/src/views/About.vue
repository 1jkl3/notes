<!--
 * @Author: your name
 * @Date: 2021-01-29 09:10:08
 * @LastEditTime: 2021-01-29 15:43:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-js\src\views\About.vue
-->
<template>
  <div class="about">
    <chat-map />
    <div class="tabs" @click="select"></div>
    <button @click="inse">点击</button>
  </div>
</template>

<script>
import { useEvent, useEventDraw, destory } from "@/module";
import chatMap from "@/components/chatMap";
export default {
  name: "About",
  components: {
    chatMap,
  },
  data() {
    return {};
  },
  methods: {
    select() {
      useEvent({
        name: "自定义事件",
      });
      // Polygon Circle 
      useEventDraw("Point",null);
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
  width: 100px;
  height: 50px;
  background-color: #000;
}
</style>