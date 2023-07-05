<template>
  <el-row style="margin: 10px;">
    <el-col style="padding: 30px;">
      <div style="height: 70px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-row :gutter="20" style="padding-top: 10px;">
          <el-col :span="8">
            <div>
              <el-statistic title="时间">
                <template slot="formatter"> {{ curBlood.date_step }} 分钟前</template>
              </el-statistic>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-statistic title="血糖">
                <template slot="formatter"> {{ curBlood.sgv_str }} mmol/L</template>
              </el-statistic>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-statistic title="趋势">
                <template slot="formatter"> {{ curBlood.direction_str }}</template>
              </el-statistic>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col>
      <div style="width:100%;height: 500px;" class="map" ref="mapChart"></div>
    </el-col>
  </el-row>
</template>
<script>

import request from '@/request'

export default {
  data() {
    return {
      el: null,
      echarts: null,
      myChart: null,
      curBlood: {},
      bloods: []
    }
  },
  mounted() {
    this.getCurBlood();
  },
  methods: {
    getCurBlood() {
      request({
        url: "/api/ns/GetCurBloodSugar",
        method: 'get',
        params: { serviceName: 'nightscout-template87' },//url参数
        data: {}//body参数,如果是get则不需要
      }).then(res => {
        console.log(res)
        if (res.success) {
          this.curBlood = res.response
          request({
            url: "/api/ns/GetBloodSugars",
            method: 'get',
            params: { serviceName: 'nightscout-template87', day: 0 },//url参数
            data: {}//body参数,如果是get则不需要
          }).then(res => {
            console.log(res)
            if (res.success) {
              this.bloods = res.response
              this.initMapChart();
            } else {
              this.$message("获取数据失败:" + res.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$message("获取数据失败:" + res.msg)
        }
      }).catch(err => {
        console.log(err)
      })


    },
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
          trigger: 'axis',
          // formatter: function (params) {
          //   console.log(params)
          //   return params;
          // }
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
          data: this.bloods.map(t => t.date_str),
          axisLabel: {
            // formatter: '{value}',
            formatter: function (value) {
              let t = value.substring(11, 16);
              return t;
            }
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
            data: this.bloods.map(t => t.sgv_str),
            type: 'line',
            smooth: true,
            symbol: "none"

          },
          // {
          //   name: '昨天',
          //   type: 'line',
          //   data: [3, 3, 6, 7, 8, 9, 6],
          //   type: 'line',
          //   smooth: true,
          //   symbol: "none"
          // },
          // {
          //   name: '前天',
          //   type: 'line',
          //   data: [6, 9, 8, 7, 6, 3, 3],
          //   type: 'line',
          //   smooth: true,
          //   symbol: "none"
          // },
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
                  label: { formatter: "低(5)" },
                },
                {
                  yAxis: 10,
                  name: "高",
                  lineStyle: { color: "red" },
                  label: { formatter: "高(10)" },
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

};
</script>

<style   scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
