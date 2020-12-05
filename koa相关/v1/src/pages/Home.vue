<template>
  <!-- <div>首页1{{ store.state.count }}</div> -->
  <Seller :charts="chart1" v-if="chart1" />
  <button @click="getSocket">获取事件</button>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import Seller from "/@/components/Seller.vue";
import { get } from "/@/util/network";
import Socket from '/@/util/socket';
export default defineComponent({
  name: "Home",
  components: {
    Seller,
  },
  setup(ctx) {
    const store = useStore();
    const state = reactive({
      chart1: null,
    });
    const methods = {
      getSellerList: async () => {
        let res = await get("/seller");
        res.data.sort((a, b) => a.value - b.value);
        state.chart1 = res.data;
      },
      async getSocket(){
        let payload = {
          action:"data",
          socketType:"seller",
          chartName:"seller"
        }
        await Socket.send(payload);
        Socket.messgae((res)=>{
          console.log(res.data);
        });
      }
    };
    methods.getSellerList();
    return {
      ...toRefs(state),
      store,
      ...methods,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
