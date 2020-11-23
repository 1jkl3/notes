<template>
  <Rank :data="option" v-if="option" />
</template>

<script lang="">
import { get } from "/@/util/network";
import { defineComponent, reactive, toRefs } from "vue";
import Rank from "/@/components/Rank.vue";
export default defineComponent({
  name: "rankPage",
  components: { Rank },
  setup() {
    const state = reactive({
      option: null,
    });
    const methods = {
      async getData() {
        let res = await get("/rank");
        res.data.sort((a,b)=>{
            return b.value - a.value
        })
        state.option = res.data;
      },
    };
    methods.getData();
    return {
      ...toRefs(state),
      ...methods,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
