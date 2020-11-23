<template>
  <Trend :options="charts2" v-if="charts2" />
</template>

<script lang="">
import { get } from "/@/util/network";
import { defineComponent, reactive, toRefs } from "vue";
import Trend from '/@/components/Trend.vue';
export default defineComponent({
  name: "trendPage",
  components: {
      Trend
  },
  setup() {
    const state = reactive({
      charts2: null,
    });
    const methods = {
      getTrendInfo: async () => {
        let res = await get("/trend");
        state.charts2 = res.data;
      },
    };
    methods.getTrendInfo();
    return {
      ...toRefs(state)
    };
  },
});
</script>

<style lang="" scoped>
</style>
