<template>
  <div class="product">
    <ECharts
      class="com-chart"
      ref="product"
      initTheme="vintage"
      :option="option"
      :loadingOpts="{ text: '加载中...' }"
    />
    <span class="left" @click="cutPie(-1)" :style="comStyle">左</span>
    <span class="right" @click="cutPie(1)" :style="comStyle">右</span>
    <span class="cat-name" :style="comStyle">{{ data[currtenIndex].name }}</span>
  </div>
</template>

<script lang="">
import {
  defineComponent,
  reactive,
  onMounted,
  onBeforeUnmount,
  computed,
  toRefs,
} from "vue";
export default defineComponent({
  name: "product",
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const state = reactive({
      product: null,
      currtenIndex: 0,
      length: 0,
      titleFontSize: 0,
      option: {
        title: {
          text: "热销商品占比",
          left: 20,
          top: 20,
        },
        tooltip: {
          show: true,
          formatter: (arg) => {
            let total = 0,
              Titles = "";
            arg.data.children.forEach((item) => {
              total += item.value;
            });
            arg.data.children.forEach((item) => {
              Titles += `${item.name}:${parseInt(
                (item.value / total) * 100
              )}%<br/>`;
            });
            return Titles;
          },
        },
        legend: {
          top: "15%",
          icon: "circle",
        },
        series: [
          {
            type: "pie",
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
              },
              labelLine: {
                show: false,
              },
            },
          },
        ],
      },
    });
    const comStyle = computed(() => {
      return {
        fontSize: state.titleFontSize + "px",
      };
    });
    state.length = props.data.length;
    const method = {
      updataChart() {
        let seriesData = props.data[state.currtenIndex].children.map((item) => {
          return {
            name: item.name,
            value: item.value,
            children: item.children,
          };
        });
        let legendData = props.data[state.currtenIndex].children.map((item) => {
          return item.name;
        });
        const updataOption = {
          legend: {
            data: legendData,
          },
          series: [
            {
              data: seriesData,
            },
          ],
        };
        state.product.setOption(updataOption);
      },
      screenAdapter() {
        state.titleFontSize = (state.product.$el.offsetWidth / 100) * 3.6;
        const screenOption = {
          title: {
            textStyle: {
              fontSize: state.titleFontSize,
            },
          },
          legend: {
            itemWidth: state.titleFontSize / 2,
            itemHeight: state.titleFontSize / 2,
            itemGap: state.titleFontSize / 2,
            textStyle: {
              fontSize: state.titleFontSize / 2,
            },
          },
          series: [
            {
              radius: state.titleFontSize * 4.5,
              center: ["50%", "60%"],
            },
          ],
        };
        state.product.setOption(screenOption);
      },
      cutPie(index) {
        state.currtenIndex = state.currtenIndex + index;
        if (state.currtenIndex <= 0) {
          state.currtenIndex = 0;
        } else if (state.currtenIndex > state.length - 1) {
          state.currtenIndex = state.length - 1;
        }
        method.updataChart();
      },
    };
    onMounted(() => {
      method.updataChart();
      window.addEventListener("resize", method.screenAdapter);
      method.screenAdapter();
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", method.screenAdapter);
    });
    return {
      ...toRefs(state),
      ...method,
      comStyle
    };
  },
});
</script>

<style lang="scss" scoped>
.product {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  color: #fff;
  .com-chart {
    width: inherit;
    height: inherit;
  }
  .left {
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .right {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .cat-name {
    position: absolute;
    left: 80%;
    bottom: 20px;
  }
}
</style>
