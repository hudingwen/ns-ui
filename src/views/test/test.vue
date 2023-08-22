<template>
  <el-row style="margin: 10px;">
    <el-col>
      <el-divider content-position="left">实时血糖</el-divider>
    </el-col>
    <el-col style="padding: 8px 5px;">
      <div style="height: 85px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-row :gutter="5" style="padding-top: 10px;">
          <el-col :span="8">
            <div>
              <el-statistic title="时间">
                <template slot="formatter">
                  <el-row>
                    <el-col style="font-size: 14px;"> {{ curBlood.date_step }}
                      分钟前</el-col>
                    <el-col style="font-size: 12px;color: silver;">
                      {{ curBlood.date_time }}
                    </el-col>
                  </el-row>
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
                <template slot="formatter">
                  <el-row>
                    <el-col> <label style="font-size: 14px;font-weight: 900;">{{ curBlood.direction_str
                    }}</label></el-col>
                    <el-col> <label style="font-size: 12px;color: silver;">{{ minutes }} 分后刷新</label></el-col>
                  </el-row>

                </template>
              </el-statistic>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col>
      <el-divider content-position="left">血糖趋势</el-divider>
    </el-col>
    <el-col>
      <div class="map" ref="mapChart"></div>
    </el-col>
    <el-col>
      <el-divider content-position="left">{{ curDate }} 今日达标率: {{ curBlood.percent }} %</el-divider>
      <p style="margin: 0 15px;text-align: center;font-size: 12px;">{{ curBlood.saying }}</p>
      <el-divider content-position="right">{{ curBlood.title }}</el-divider>
    </el-col>
  </el-row>
</template>
<script>

import request from '@/request'
var that;
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
      },
      spList: [
        '00:00:00',
        '03:00:00',
        '06:00:00',
        '09:00:00',
        '12:00:00',
        '15:00:00',
        '18:00:00',
        '21:00:00',
        '23:59:59'
      ],
      openid: '',
      ticket: '',
      minutes: 0,
      seconds: 0,
      isRequest: false

    }
  },
  mounted() {
    this.initMapChart();
    this.getData();
  },
  created() {
    that = this;
  },
  methods: {
    setWork() {
      setInterval(() => {
        if (this.seconds <= 0 && this.isRequest === false) {
          this.isRequest = true
          this.getCurBlood();
        }
        let tempSecond = this.seconds - 1
        if (tempSecond < 0) {
          this.seconds = 0
        } else {
          this.seconds = tempSecond
        }
        let tempDiff = Math.ceil(1.0 * this.seconds / 60)
        if (tempDiff !== this.minutes)
          this.curBlood.date_step += 1
        this.minutes = tempDiff
      }, 1000);
    },
    getData() {
      this.openid = this.$route.query.openid
      this.ticket = this.$route.query.ticket

      if (this.ticket) {
        //绑定
        request({
          url: "/api/Nightscout/BindQR",
          method: 'get',
          params: { openid: this.openid, ticket: this.ticket },//url参数
          data: {}//body参数,如果是get则不需要
        }).then(res => {
          if (res.success) {
            this.$message.success(res.msg)
            // this.$router.push({ path: '/mirror?openid=' + this.openid })
          } else {
            this.$message.error(res.msg)
          }
          this.setWork();
        })

      } else {
        //查看
        this.setWork();
      }
    },
    test() {
      this.$router.push({ path: '/mirror?openid=' + this.openid })
    },
    getDate() {
      if (this.curBlood.date_str)
        this.curDate = this.curBlood.date_str.substring(0, 11)
    },
    getCurBlood() {

      request({
        url: "/api/Nightscout/GetCurBloodSugar",
        method: 'get',
        params: { openid: this.openid },//url参数
        data: {}//body参数,如果是get则不需要
      }).then(res => {
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

          let curIndex = 0;
          let maxCount = 0;
          //查找填充
          for (let index = 0; index < this.spList.length; index++) {
            let row = this.spList[index];
            let tempIndex = ls.findIndex(t => t === row)


            let tempMaxCount = tempIndex - curIndex

            curIndex = tempIndex
            if (tempMaxCount > maxCount)
              maxCount = tempMaxCount
          }
          //填充数据
          for (let index = 0; index < this.spList.length; index++) {
            if (index === 0) continue;

            let row = this.spList[index];
            let tempIndex = ls.findIndex(t => t === row)

            let tempMaxCount = 0;
            let lastIndex = ls.findIndex(t => t === this.spList[index - 1])
            tempMaxCount = tempIndex - lastIndex
            if (tempMaxCount < maxCount) {
              let diffCount = maxCount - tempMaxCount
              let addLs = []
              for (let dffIdx = 0; dffIdx < diffCount; dffIdx++) {
                addLs.push('缺省')
              }
              ls.splice(tempIndex, 0, ...addLs);
            }

          }

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

          this.show()
          if (this.curBlood !== null && this.curBlood.date_step !== null) {
            let tempDiff = 5 - this.curBlood.date_step
            if (tempDiff === 0)
              this.minutes = 1;
            else if (tempDiff > 0) {
              this.minutes = tempDiff;
              this.seconds = tempDiff * 60
            } else {
              this.minutes = 1;
              this.seconds = 1 * 60
            }
          } else {
            this.minutes = 1;
            this.seconds = 1 * 60
          }
        } else {
          this.minutes = 1;
          this.seconds = 1 * 60
          this.$message.error(res.msg)
        }

      }).catch(err => {
        this.minutes = 1;
        this.seconds = 1 * 60
        this.$message.error(err)
      }).finally(() => {
        this.isRequest = false
      })
    },
    initMapChart() {
      this.el = this.$refs.mapChart;
      this.echarts = require("echarts");
      this.myChart = this.echarts.init(this.el);
      window.onresize = () => {
        this.myChart.resize();
      }
      this.myChart.on('legendselectchanged', (params) => {
        this.selectLegend = JSON.parse(JSON.stringify(params.selected))
      })
    },
    show() {
      const lineRed = '#E74C3C'
      const lineYellow = '#F4D03F'
      const lineGreen = '#2ECC71'
      const lineBlue = '#3498DB'
      const linePurple = '#9B59B6'

      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          // trigger: 'mouse',
          position: [40, 40]
          // formatter: function (params) {
          //   console.log(params)
          //   return params;
          // }
        },
        legend: {
          selected: this.selectLegend,
          data: ['今天', '昨天', '前天']
        },
        // grid: {
        //   left: '3%',
        //   right: '3%',
        //   bottom: '3%',
        //   containLabel: true
        // },
        toolbox: {
          feature: {

          }
        },
        visualMap: [
          {
            show: false,
            type: 'piecewise', // 分段型 visualMap
            pieces: [
              { min: 10, max: 100, color: lineRed },
              { min: 9, max: 9.9, color: lineYellow },
              { min: 3.9, max: 8.9, color: lineGreen },
              { min: 0, max: 3.8, color: lineRed },
            ],
            seriesIndex: 0
          },
          {
            show: false,
            type: 'piecewise', // 分段型 visualMap
            pieces: [
              { min: 10, max: 100, color: lineRed },
              { min: 9, max: 9.9, color: lineYellow },
              { min: 3.9, max: 8.9, color: lineBlue },
              { min: 0, max: 3.8, color: lineRed },
            ],
            seriesIndex: 1
          },
          {
            show: false,
            type: 'piecewise', // 分段型 visualMap
            pieces: [
              { min: 10, max: 100, color: lineRed },
              { min: 9, max: 9.9, color: lineYellow },
              { min: 3.9, max: 8.9, color: linePurple },
              { min: 0, max: 3.8, color: lineRed },
            ],
            seriesIndex: 2
          }
        ],
        dataZoom: [
          {
            type: 'slider',//inside
            start: 0,
            end: 300
          },
          {
            start: 0,
            end: 300
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: this.xList,
            axisLabel: {
              // formatter: '{value}',
              // splitNumber: 5,
              // nameGap: 50,
              interval(index, value) {
                // 根据某几个数据划分间隔宽度
                // console.info("value", value, "index", index)
                let sub = value;//.substring(11, 16);
                let findSp = that.spList.find(t => t === sub)
                if (findSp) {
                  return true
                } else {
                  return false
                }
              },
              formatter(params, index) {
                // 判断索引是否为2或4，如果是则显示标签
                // console.info("params", params, "index", index)
                let sub = params;//.substring(11, 16);
                let findSp = that.spList.find(t => t === sub)
                if (findSp) {
                  return findSp.substring(0, 2);
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
              show: true //隐藏或显示
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
          max: 18,
          // max 是最大的值
          splitNumber: 4,
        },
        series: [
          {
            name: '今天',
            data: this.day0.map(t => t.sgv_str),
            type: 'line',
            smooth: true,
            symbol: "none",
            xAxisIndex: 0,
            connectNulls: true,
            color: lineGreen
          },
          {
            name: '昨天',
            data: this.day1.map(t => t.sgv_str),
            type: 'line',
            smooth: true,
            symbol: "none",
            xAxisIndex: 0,
            connectNulls: true,
            color: lineBlue
          },
          {
            name: '前天',
            data: this.day2.map(t => t.sgv_str),
            type: 'line',
            smooth: true,
            symbol: "none",
            xAxisIndex: 0,
            connectNulls: true,
            color: linePurple
          },
          {
            type: 'line',
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
  height: calc(100vh - 450px);
}

@media screen and (max-height: 670px) {
  .map {
    height: calc(100vh - 350px);
  }
}
</style>
