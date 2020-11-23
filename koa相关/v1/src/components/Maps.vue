<template>
  <div class="map-contaier">
    <ECharts
      class="com-chart"
      ref="maps"
      initTheme="vintage"
      :option="option"
      :loadingOpts="{ text: '加载中...' }"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  onMounted,
  onBeforeUnmount,
  watch,
} from "vue";
import { nameMap } from "/@/util/mapUtil.js";
export default defineComponent({
  name: "maps",
  props: {
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
    province: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props, ctx) {
    const state = reactive({
      maps: null,
      isdb:true,
      option: {
        title: {
          text: "商家分布",
          left: 20,
          top: 20,
          fontSize: 66,
        },
        legend: {
          left: "5%",
          bottom: "5%",
          orient: "vertical",
        },
      },
    });
    const methods = {
      updataChart() {
        let { map, mapName } = props.options;
        const legendArr = map.map((item) => {
          return item.name;
        });
        const seriesArr = map.map((item) => {
          return {
            type: "effectScatter",
            name: item.name,
            rippleEffect: {
              scale: 5,
              brushType: "stroke",
            },
            data: item.children,
            // 配置散点图和地图结合
            coordinateSystem: "geo",
          };
        });
        const UpdataOption = {
          geo: {
            type: "map",
            map: mapName,
            top: "5%",
            bottom: "5%",
            itemStyle: {
              areaColor: "#2E72BF",
              borderColor: "#333",
            },
          },
          legend: {
            data: legendArr,
          },
          series: seriesArr,
        };
        state.maps.setOption(UpdataOption);
        state.maps.inst.on("click", (e) => {
          let value = "";
          for (let key in nameMap) {
            if (e.name == key) {
              value = nameMap[key];
              break;
            }
          }
          if(state.isdb){
            state.isdb = false;
            ctx.emit("hanldleMap", value);
          }
        });
        state.maps.inst.on("dblclick", () => {
          state.isdb = true;
          echarts.registerMap("china", props.options.maps);
          const returnOption = {
            geo: {
              map: "china"
            },
          };
          state.maps.setOption(returnOption);
        });
      },
      screenAdapter() {
        const titleFontSize = (state.maps.$el.offsetWidth / 100) * 3.6;
        const AdapterOption = {
          title: {
            textStyle: {
              fontSize: titleFontSize,
            },
          },
          legend: {
            itemWidth: titleFontSize / 2,
            itemHeight: titleFontSize,
            itemGap: titleFontSize / 2,
            textStyle: {
              fontSize: titleFontSize / 2,
            },
          },
        };
        state.maps.setOption(AdapterOption);
      },
    };
    watch(
      () => props.province,
      (province, prevProvince) => {
        echarts.registerMap(props.options.mapName, province);
        const changeOption = {
          geo: {
            map: props.options.mapName,
          },
        };
        state.maps.setOption(changeOption);
      }
    );
    onMounted(() => {
      echarts.registerMap(props.options.mapName, props.options.maps);
      methods.updataChart();
      window.addEventListener("resize", methods.screenAdapter, false);
      methods.screenAdapter();
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", methods.screenAdapter);
    });
    return {
      props,
      methods,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.map-contaier {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
