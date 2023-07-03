<template>
  <div style="width:100%;height: 500px;" class="map" ref="mapChart"></div>
</template>
<script>

import request from '@/request'

export default {
  data() {
    return {
      el: null,
      echarts: null,
      myChart: null,
    }
  },
  methods: {
    initMapChart() {
      this.el = this.$refs.mapChart;
      console.info("this.el", this.el)
      this.echarts = require("echarts");
      this.myChart = this.echarts.init(this.el);
      this.show();



    },
    show() {
      const option = {
        title: {
          text: '小羊Ns'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['今天', '昨天', '前天', '高低线']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
             
          }
        },
        xAxis: {
          // type: '',
          data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '23:00'],
          axisLabel: {
            formatter: '{value}'
          },
          boundaryGap: false,//x轴与z轴线对应
          axisLine: { onZero: false },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          splitLine: {    //网格线
            lineStyle: {
              type: 'dashed'    //设置网格线类型 dotted：虚线   solid:实线
            },
            show: true //隐藏或显示
          }
        },
        yAxis: {
          type: 'value',
          splitLine: { //网格线
            lineStyle: {
              type: 'dashed' //设置网格线类型 dotted：虚线 solid:实线
            },
            show: true //隐藏或显示
          },
          min: 0,
          // min 是最小的值
          max: 24,
          // max 是最大的值
          splitNumber: 7,

          // splitNumber 可以理解为中间多少个标签
        },
        series: [
          {
            name: '今天',
            data: [5, 6, 7, 8, 15, 18, 3],
            type: 'line',
            smooth: true,
            symbol: "none"

          },
          {
            name: '昨天',
            type: 'line',
            data: [3, 3, 6, 7, 8, 9, 6],
            type: 'line',
            smooth: true,
            symbol: "none"
          },
          {
            name: '前天',
            type: 'line',
            data: [6, 9, 8, 7, 6, 3, 3],
            type: 'line',
            smooth: true,
            symbol: "none"
          },
          {
            name: '高低线',
            type: 'line',
            data: [],
            smooth: true,
            markLine: {
              symbol: "none", //标线箭头取消
              data: [
                {
                  yAxis: 5,
                  name: "低",
                  lineStyle: { color: "blue" },
                  label: { formatter: "低" },
                },
                {
                  yAxis: 10,
                  name: "高",
                  lineStyle: { color: "red" },
                  label: { formatter: "高" },
                },
              ],
              label: {
                position: "insideEndTop",
                color: "red",
                fontSize: 10,
                fontFamily: "SourceHanSansCN-Regular",
              },
              lineStyle: {
                type: "solid",
                width: 1,
              },
            }
          },


        ],
        // 添加标线
        graphic: [
          {
            type: 'line',
            left: 'xAxis',
            top: 'yAxis',
            shape: {
              x1: '10%', y1: '80%',
              x2: '90%', y2: '80%'
            },
            style: {
              stroke: 'red',
              lineDash: [4, 4] // 虚线样式
            }
          },
          {
            type: 'line',
            left: 'xAxis',
            top: 'yAxis',
            shape: {
              x1: '10%', y1: '120%',
              x2: '90%', y2: '120%'
            },
            style: {
              stroke: 'green',
              lineDash: [4, 4] // 虚线样式
            }
          }
        ]
      };




      console.log("加载中...")
      this.myChart.setOption(option);
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    }
  },
  mounted() {
    this.initMapChart();
  },
};
</script>

<style   scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
