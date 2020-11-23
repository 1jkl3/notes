<template>
  <div class="seller">
    <ECharts
      class="com-chart"
      ref="seller"
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
} from "vue";
export default defineComponent({
  name: "seller",
  props: {
    charts: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, ctx) {
    // 响应式数据区
    const state = reactive({
      seller: null,
      option: {
        title: {
          text: "商品销售统计",
          left: 20,
          top: 20,
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "6%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "#2D3443",
            },
            z: 0,
          },
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "#FFF",
              },
            },
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#5052EE", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#AB6EE5", // 100% 处的颜色
                  },
                ],
                global: false,
              },
            },
          },
        ],
      },
      currentPage: 1,
      totalPage: Math.ceil(props.charts.length / 5),
      timer: null,
    });
    // 方法区
    const method = {
      // 更新图表数据
      updataChart() {
        let showSellers = [];
        if (state.currentPage * 5 > props.charts.length) {
          showSellers = props.charts.slice(
            (state.currentPage - 1) * 5 - 3,
            state.currentPage * 5
          );
        } else {
          showSellers = props.charts.slice(
            (state.currentPage - 1) * 5,
            state.currentPage * 5
          );
        }
        const sellerNames = showSellers.map((item) => item.name);
        const sellerValues = showSellers.map((item) => item.value);
        const option = {
          yAxis: {
            data: sellerNames,
          },
          series: [
            {
              data: sellerValues,
            },
          ],
        };
        state.seller.setOption(option);
      },
      // 屏幕适配
      screenAdapter() {
        const titleFontSize = (state.seller.$el.offsetWidth / 100) * 3.6;
        const adapterOption = {
          title: {
            textStyle: {
              fontSize: titleFontSize,
            }
          },
          tooltip: {
            axisPointer: {
              lineStyle: {
                width: titleFontSize,
              },
            },
          },
          series: [
            {
              barWidth: titleFontSize,
              itemStyle: {
                barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
              },
            },
          ],
        };
        state.seller.setOption(adapterOption);
      },
      // 不停切换
      startInterval() {
        state.timer = setInterval(() => {
          state.currentPage++;
          if (state.currentPage > state.totalPage) {
            state.currentPage = 1;
          }
          method.updataChart();
        }, 3000);
      },
    };
    // 生命周期区
    onMounted(() => {
      window.addEventListener("resize", method.screenAdapter, false);
      method.screenAdapter();
      method.updataChart();
      method.startInterval();
    });
    onBeforeUnmount(() => {
      clearInterval(state.timer);
    });
    return {
      ...toRefs(state),
      props,
      ...method,
    };
  },
});
</script>

<style lang="scss" scoped>
.seller {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .com-chart {
    width: inherit;
    height: inherit;
  }
}
</style>
