<template>
  <div class="about">
    <chat-map />
    <button @click="inse">点击</button>
  </div>
</template>

<script>
import chatMap from '@/components/chatMap';
export default {
  name: 'About',
  components: {
    chatMap
  },
  data(){
    return {}
  },
  methods:{
    inse(){
      // window.baseMap.getLayerById(123).layer.createFeature(123)
      window.baseMap.destory()
    }
  }
}
</script>
<style scoped>
.about{
  width: 100%;
  height: calc(100% - 80px);
}
</style>