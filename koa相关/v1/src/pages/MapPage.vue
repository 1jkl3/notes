<template>
  <Maps :options="option" :province="mapData" v-if="option" @hanldleMap="cutMap" />
</template>

<script>
import { defineComponent, toRefs, reactive } from "vue";
import Maps from "/@/components/Maps.vue";
import { get } from "/@/util/network";
export default defineComponent({
  name: "mapPage",
  components: {
    Maps,
  },
  setup() {
    const state = reactive({
      option: null,
      mapData:null
    });
    const methods = {
      async getMaps() {
        let maps = await get("/getChina");
        let res = await get("/maps");

        state.option = { map: res.data, maps,mapName:"china"};
      },
      async cutMap(id) {
        let province = await get("/getProvince", { id });
        state.mapData = province;
        state.option.mapName = id;
      },
    };
    methods.getMaps();
    return {
      ...toRefs(state),
      ...methods
    };
  },
});
</script>

<style lang="" scoped>
</style>
