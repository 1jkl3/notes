<template>
  <Stock v-if="data" :data="data" />
</template>

<script lang="">
import { defineComponent, reactive, toRefs } from "vue";
import { get } from "/@/util/network";
import Stock from "/@/components/Stock.vue";
export default defineComponent({
  name: "stockpage",
  components: {
    Stock,
  },
  setup() {
    const state = reactive({
      data: null,
    });
    const method = {
      async getStockList() {
        let res = await get("/stock");
        console.log(res.data);
        state.data = res.data;
      },
    };
    method.getStockList();
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="" scoped>
</style>
