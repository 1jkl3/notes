<template>
  <div class="rank">
    <ECharts
      class="com-chart"
      ref="rank"
      initTheme="vintage"
      :option="option"
      :loadingOpts="{ text: '加载中...' }"
    />
  </div>
</template>

<script lang="">
import {
  defineComponent,
  toRefs,
  reactive,
  onMounted,
  onBeforeUnmount,
} from "vue";
export default defineComponent({
  name: "rank",
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
      rank: null,
      startValue: 0,
      endValue: 9,
      timer:null,
      option: {
        title: {
          text: "地区销售排行",
          left: 20,
          top: 20,
        },
        grid: {
          top: "40%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip: {
          show: true,
        },
        dataZoom:{
            show:false
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
          },
        ],
      },
    });
    const method = {
      updataChart() {
        const colorArr = [
          ["#0BA82C", "#4FF778"],
          ["#2E72BF", "#23E5E5"],
          ["#5052EE", "#AB6EE5"],
        ];
        let XArr = props.data.map((item) => item.name);
        let yArr = props.data.map((item) => item.value);
        const updataOption = {
          xAxis: {
            data: XArr,
          },
          dataZoom: {
            startValue: state.startValue,
            endValue: state.endValue,
          },
          series: [
            {
              data: yArr,
              itemStyle: {
                color: (obj) => {
                  let itemColor = null;
                  if (obj.value > 300) {
                    itemColor = colorArr[0];
                  } else if (obj.value > 130) {
                    itemColor = colorArr[1];
                  } else {
                    itemColor = colorArr[2];
                  }
                  return {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: itemColor[0], // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: itemColor[1], // 100% 处的颜色
                      },
                    ],
                    global: false,
                  };
                },
              },
            },
          ],
        };
        state.rank.setOption(updataOption);
      },
      IntervalChar() {
        state.timer = setInterval(() => {
            state.startValue++;
            state.endValue++;
            if(state.endValue > props.data.length - 1){
                state.startValue = 0;
                state.endValue = 9;
            }
            method.updataChart();
        }, 2000);
      },
      screenAdapter() {
        const titleFontSize = (state.rank.$el.offsetWidth / 100) * 3.6;
        const adapterOption = {
            title:{
                textStyle:{
                    fontSize:titleFontSize
                },
            },
            series:[
                {
                    barWidth:titleFontSize,
                    itemStyle:{
                        barBorderRadius:[titleFontSize / 2 ,titleFontSize / 2,0,0]
                    }
                }
            ]
        };
        state.rank.setOption(adapterOption);
      },
    };
    onMounted(() => {
      window.addEventListener("resize", method.screenAdapter, false);
      method.screenAdapter();
      method.updataChart();
      method.IntervalChar();
    });
    onBeforeUnmount(()=>{
        if(state.timer) clearInterval(state.timer);
        state.timer = null;
        
    })
    return {
      ...toRefs(state),
      ...method,
      ...props,
    };
  },
});
</script>

<style lang="scss" scoped>
.rank {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .com-chart {
    width: inherit;
    height: inherit;
  }
}
</style>
