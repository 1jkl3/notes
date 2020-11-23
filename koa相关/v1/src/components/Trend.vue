<template>
  <div class="trend">
    <div class="title">
      <span :style="conStyle">{{ currentText }}</span>
      <span @click="handleShow" :style="conStyle">下拉</span>
      <div class="select-con" v-show="show">
        <div
          class="select-item"
          v-for="(item, index) in currentTexts"
          :key="item.key"
          @click="handleType(item.key, index)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <ECharts
      class="com-chart"
      ref="trend"
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
  computed,
} from "vue";
const colorArr1 = [
  "rgba(11,168,44,0.5)",
  "rgba(44,110,255,0.5)",
  "rgba(22,242,217,0.5)",
  "rgba(254,33,30,0.5)",
  "rgba(250,105,0,0.5)",
];
const colorArr2 = [
  "rgba(11,168,44,0)",
  "rgba(44,110,255,0)",
  "rgba(22,242,217,0)",
  "rgba(254,33,30,0)",
  "rgba(250,105,0,0)",
];
export default defineComponent({
  name: "trend",
  props: {
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    // console.log(props.options);
    const state = reactive({
      trend: null,
      timer: null,
      show: false,
      titleFontSize:0,
      currentText: props.options.type[0].text,
      choiceType: "map",
      option: {
        color: colorArr1,
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
        grid: {
          top: "35%",
          left: "3%",
          right: "4%",
          bottom: "1%",
          containLabel: true,
        },
        legend: {
          left: 20,
          top: "15%",
          icon: "circle",
        },
        tooltip: {
          trigger: "axis",
        },
      },
    });
    const currentTexts = computed(() => {
      return props.options.type.filter(
        (item) => item.text !== state.currentText
      );
    });
    const conStyle = computed(()=>{
        return {
            fontSize:state.titleFontSize + "px"
        }
    })
    const methods = {
      updataChart() {
        const { common } = props.options;
        const valueArr = props.options[state.choiceType].data;
        const seriesArr = valueArr.map((item, index) => {
          return {
            type: "line",
            name: item.name,
            data: item.data,
            smooth: true,
            stack: state.choiceType,
            lineStyle: {
              color: colorArr1[index],
            },
            symbol: "none",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: colorArr1[index], // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: colorArr2[index], // 100% 处的颜色
                  },
                ],
                global: false,
              },
            },
          };
        });
        const legendArr = valueArr.map((item) => item.name);
        const Options = {
          xAxis: {
            data: common.month,
          },
          legend: {
            data: legendArr,
          },
          series: seriesArr,
        };
        state.trend.setOption(Options);
      },
      screenAdapter() {
        state.titleFontSize = (state.trend.$el.offsetWidth / 100) * 3.6;
        const adapeterOption = {
            legend:{
                itemWitdth:state.titleFontSize,
                itemHeight:state.titleFontSize,
                itemGao:state.titleFontSize,
                textStyle:{
                    fontSize:state.titleFontSize
                }
            }
        };
        state.trend.setOption(adapeterOption);
      },
      handleShow() {
        state.show = !state.show;
      },
      handleType(e, index) {
        state.choiceType = e;
        state.currentText = currentTexts.value[index].text;
        currentTexts.value = currentTexts.value.filter(
          (item) => item.text !== state.currentText
        );
        this.updataChart();
        state.show = false;
      },
    };
    onMounted(() => {
      methods.updataChart();
      window.addEventListener("resize", methods.screenAdapter, false);
      methods.screenAdapter();
    });
    onBeforeUnmount(()=>{
      window.removeEventListener("resize",methods.screenAdapter);
    })
    return {
      ...toRefs(state),
      props,
      currentTexts,
      conStyle,
      ...methods,
    };
  },
});
</script>

<style lang="scss" scoped>
.trend {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .com-chart {
    width: inherit;
    height: inherit;
  }
  .title {
    position: absolute;
    top: 20px;
    left: 20px;
    color: #fff;
    z-index: 10;
  }
}
</style>
