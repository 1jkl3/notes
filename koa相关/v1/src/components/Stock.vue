<template>
  <div class="stock">
    <ECharts
      class="com-chart"
      ref="stock"
      initTheme="vintage"
      :option="option"
      :loadingOpts="{ text: '加载中...' }"
    />
  </div>
</template>

<script lang="">
import {
  defineComponent,
  reactive,
  onMounted,
  onBeforeUnmount,
  toRefs,
} from "vue";

export default defineComponent({
  name: "stock",
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props) {
    const state = reactive({
      stock: null,
      timer: null,
      currentIndex: 0,
      option: {
        title: {
          text: "库存和销量分析",
          left: 20,
          top: 20,
        },
      },
    });
    const method = {
      updataChart() {
        let centerArr = [
          ["18%", "40%"],
          ["50%", "40%"],
          ["82%", "40%"],
          ["34%", "75%"],
          ["66%", "75%"],
        ];
        let colorArr = [
          ["#4FF778", "#0BA82C"],
          ["#E5DD45", "#E8B11C"],
          ["#E8821C", "#E55445"],
          ["#5052EE", "#AB6EE5"],
          ["#23E5E5", "#2E72BF"],
        ];
        let showData = props.data.slice(
          state.currentIndex * 5,
          (state.currentIndex + 1) * 5
        );
        const seriesArr = showData.map((item, index) => {
          return {
            type: "pie",
            center: centerArr[index],
            data: [
              {
                name: item.name + "\n" + item.sales,
                value: item.sales,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 1,
                    x2: 0,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: colorArr[index][0], // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: colorArr[index][1], // 100% 处的颜色
                      },
                    ],
                    global: false,
                  },
                },
              },
              {
                value: item.stock,
                itemStyle: {
                  color: "#333843",
                },
              },
            ],
            hoverAnimation: false,
            labelLine: {
              show: false,
            },
            label: {
              position: "center",
              color: colorArr[index][0],
            },
          };
        });
        const updataOption = {
          series: seriesArr,
        };
        state.stock.setOption(updataOption);
      },
      screenAdapter() {
        const titleFontSize = (state.stock.$el.offsetWidth / 100) * 3.6;
        const innerRadius = titleFontSize * 2;
        const outterRadius = innerRadius * 1.125;
        const screenOption = {
            title:{
                textStyle:{
                    fontSize:titleFontSize
                }
            },
            series:[
                {
                    radius:[outterRadius,innerRadius],
                    label:{
                        fontSize:titleFontSize / 2
                    }
                },
                {
                    radius:[outterRadius,innerRadius],
                    label:{
                        fontSize:titleFontSize / 2
                    }
                },
                {
                    radius:[outterRadius,innerRadius],
                    label:{
                        fontSize:titleFontSize / 2
                    }
                },
                {
                    radius:[outterRadius,innerRadius],
                    label:{
                        fontSize:titleFontSize / 2
                    }
                },
                {
                    radius:[outterRadius,innerRadius],
                    label:{
                        fontSize:titleFontSize / 2
                    }
                },
            ]
        };
        state.stock.setOption(screenOption);
      },
      IntervalChar() {
        if (state.timer) clearInterval(state.timer);
        state.timer = setInterval(() => {
          state.currentIndex++;
          if (state.currentIndex > 1) state.currentIndex = 0;
          method.updataChart();
        }, 2000);
      },
    };
    onMounted(() => {
      state.stock.inst.on("mouseover", () => {
        clearInterval(state.timer);
      });
      state.stock.inst.on("mouseout", () => {
        method.IntervalChar();
      });
      method.updataChart();
      method.IntervalChar();
      window.addEventListener("resize", method.screenAdapter);
      method.screenAdapter()
    });
    onBeforeUnmount(() => {
      if (state.timer) clearInterval(state.timer);
      window.removeEventListener("resize", method.screenAdapter);
    });
    return {
      props,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.stock {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 20px;
  color: #fff;
  .com-chart {
    width: inherit;
    height: inherit;
  }
}
</style>
