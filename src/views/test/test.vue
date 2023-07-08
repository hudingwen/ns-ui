<template>
  <el-row style="margin: 10px;">
    <el-col style="padding: 8px 5px;">
      <div style="height: 85px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-row :gutter="5" style="padding-top: 10px;">
          <el-col :span="8">
            <div>
              <el-statistic title="时间">
                <template slot="formatter">
                  <el-row>
                    <el-col style="font-size: 14px;"> {{ curBlood.date_step }} 分钟前</el-col>
                  </el-row>
                  <el-col style="font-size: 12px;color: silver;">
                    {{ curBlood.date_time }}
                  </el-col>

                </template>
              </el-statistic>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-statistic title="血糖">
                <template slot="formatter">
                  <el-row>
                    <el-col>
                      <label
                        :style="{ 'color': (curBlood.sgv_str > 10 || curBlood.sgv_str < 3.9 ? 'red' : 'green'), 'font-weight': 900, 'font-size': '21px', 'margin-top': '10px' }">{{
                          curBlood.sgv_str }}</label>
                    </el-col>
                    <el-col>
                      <label style="font-size: 14px;">mmol/L</label>
                    </el-col>
                  </el-row>


                </template>
              </el-statistic>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-statistic title="趋势">
                <template slot="formatter"> <label style="margin-top:10px;font-size: 21px;">{{ curBlood.direction_str
                }}</label></template>
              </el-statistic>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col>
      <div style="width:100%;height: calc(100vh - 270px);" class="map" ref="mapChart"></div>
    </el-col>
    <el-col>

      <el-divider content-position="left">{{ curDate }}</el-divider>
      <p style="margin: 0 15px;text-align: center;font-size: 12px;">{{ curBlood.saying }}</p>
      <el-divider content-position="right">{{ curBlood.title }}</el-divider>
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
      curDate: '',
      curTime: '',
      day0: [],
      day1: [],
      day2: [],
      xList: [],
      selectLegend: {
        "今天": true,
        "前天": false,
        "昨天": false
      }
    }
  },
  mounted() {
    this.initMapChart();
    this.getCurBlood();
    setInterval(() => {
      this.getCurBlood();
    }, 305000);
    window.onresize = () => {
      this.myChart.resize();
    }
    this.myChart.on('legendselectchanged', (params) => {
      this.selectLegend = JSON.parse(JSON.stringify(params.selected))
    })
  },
  methods: {
    getDate() {
      if (this.curBlood.date_str)
        this.curDate = this.curBlood.date_str.substring(0, 11)
    },
    getCurBlood() {
      request({
        url: "/api/ns/GetCurBloodSugar",
        method: 'get',
        params: { serviceName: 'nightscout-template95' },//url参数
        data: {}//body参数,如果是get则不需要
      }).then(res => {
        // console.log(res)
        if (res.success) {
          this.curBlood = res.response.curBlood
          this.getDate()


          let ls = [];
          for (let index = 0; index < res.response.day0.length; index++) {
            let element = res.response.day0[index];
            ls.push(element.date_time)
          }
          for (let index = 0; index < res.response.day1.length; index++) {
            let element = res.response.day1[index];
            ls.push(element.date_time)
          }
          for (let index = 0; index < res.response.day2.length; index++) {
            let element = res.response.day2[index];
            ls.push(element.date_time)
          }
          ls = [...new Set(ls)];
          ls = ls.sort();
          // console.info("ls", ls)
          this.xList = ls;
          let lsDay0 = []
          for (let index = 0; index < ls.length; index++) {
            let element = ls[index];
            let findRow = res.response.day0.find(t => t.date_time === element)
            if (findRow) {
              lsDay0.push(findRow)
            } else {
              lsDay0.push({ date_time: element, sgv_str: null })
            }
          }

          let lsDay1 = []
          for (let index = 0; index < ls.length; index++) {
            let element = ls[index];
            let findRow = res.response.day1.find(t => t.date_time === element)
            if (findRow) {
              lsDay1.push(findRow)
            } else {
              lsDay1.push({ date_time: element, sgv_str: null })
            }
          }

          let lsDay2 = []
          for (let index = 0; index < ls.length; index++) {
            let element = ls[index];
            let findRow = res.response.day2.find(t => t.date_time === element)
            if (findRow) {
              lsDay2.push(findRow)
            } else {
              lsDay2.push({ date_time: element, sgv_str: null })
            }
          }



          this.day0 = lsDay0;
          this.day1 = lsDay1;
          this.day2 = lsDay2;

          // this.day0 = res.response.day0
          // this.day1 = res.response.day1
          // this.day2 = res.response.day2

          this.show()

        } else {

        }
      }).catch(err => {
        this.$alert(err)
      })


    },
    initMapChart() {
      this.el = this.$refs.mapChart;
      // console.info("this.el", this.el)
      this.echarts = require("echarts");
      this.myChart = this.echarts.init(this.el);




    },
    show() {
      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          // formatter: function (params) {
          //   console.log(params)
          //   return params;
          // }
        },
        legend: {
          selected: this.selectLegend,
          data: ['今天', '昨天', '前天']
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
        // dataZoom: [
        //   {
        //     type: 'slider',//inside
        //     start: 0,
        //     end: 300
        //   },
        //   {
        //     start: 0,
        //     end: 300
        //   }
        // ],
        xAxis: [
          {
            type: 'category',
            data: this.xList,
            axisLabel: {
              // formatter: '{value}',
              // splitNumber: 5,
              // nameGap: 50,
              interval: function (index, value) {
                // 根据某几个数据划分间隔宽度
                // console.info("value", value, "index", index)
                let sub = value;//.substring(11, 16);
                if (sub === '00:00:00' || sub === '03:00:00' || sub === '06:00:00' || sub === '09:00:00' || sub === '12:00:00' || sub === '15:00:00' || sub === '18:00:00' || sub === '21:00:00' || sub === '23:59:59') {
                  return true;
                } else {
                  return false;
                }
              },
              formatter: function (params, index) {
                // 判断索引是否为2或4，如果是则显示标签
                // console.info("params", params, "index", index)
                let sub = params;//.substring(11, 16);
                if (sub === '00:00:00' || sub === '03:00:00' || sub === '06:00:00' || sub === '09:00:00' || sub === '12:00:00' || sub === '15:00:00' || sub === '18:00:00' || sub === '21:00:00' || sub === '23:59:59') {
                  return sub.substring(0, 5);
                } else {
                  return null;
                }

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
              show: false //隐藏或显示
            }
          }
        ],
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
          max: 20,
          // max 是最大的值
          splitNumber: 5,
        },
        series: [
          {
            name: '今天',
            data: this.day0.map(t => t.sgv_str),
            type: 'line',
            smooth: true,
            symbol: "none",
            xAxisIndex: 0,
            markLine: {
              symbol: "none", //标线箭头取消
              data: [
                {
                  yAxis: 3.9,
                  name: "低",
                  lineStyle: { color: "blue" },
                  label: { formatter: "低(3.9)" },
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
          {
            name: '昨天',
            type: 'line',
            data: this.day1.map(t => t.sgv_str),
            type: 'line',
            smooth: true,
            symbol: "none",
            xAxisIndex: 0,
          },
          {
            name: '前天',
            type: 'line',
            data: this.day2.map(t => t.sgv_str),
            type: 'line',
            smooth: true,
            symbol: "none",
            xAxisIndex: 0,
          },
          // {
          //   name: '高低线',
          //   type: 'line',
          //   data: [],
          //   smooth: true,

          // },


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




      // console.log("加载中...")
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
