<template>
  <div class="map-echart-box">
    <div class="map-echart" ref="mapChart"></div>
    <ul class="map-echart-legend">
      <li v-for="(item, index) in reopeningStatusColor" :key="index" :style="{background: item}">
        {{index}}
      </li>
    </ul>
    <div class="perception-trend-box" v-show="showTrendChart">
      <h3><span class="title" v-html="trendTitle"></span> <span class="close" @click="showTrendChart = false"><img src="../assets/img/close.png" alt="close"></span></h3>
      <p>Public perception on reopening</p>
      <div class="perception-trend" ref="trendChart"></div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'MapEchart',
  props: ['statesPerception', 'stateReopeningStatus'],
  data () {
    return {
      MapChatArr: [],
      mapChart: null,
      trendChart: null,
      showTrendChart: false,
      trendTitle: '',
      reopeningStatusColor: {
        'lockdown': '#353B42',
        'partial reopen': '#A6ACB3',
        'reopening': '#B5CDE9'
      }
    }
  },
  methods: {
    initMap () {
      let usaJson = require('../assets/js/USA.json')
      this.$echarts.registerMap('USA', usaJson, {
        Alaska: {              // 把阿拉斯加移到美国主大陆左下方
            left: -131,
            top: 25,
            width: 15
        },
        Hawaii: {
            left: -113,        // 夏威夷
            top: 25,
            width: 5
        },
        'Puerto Rico': {       // 波多黎各
            left: -76,
            top: 26,
            width: 2
        }
      })
      this.getStatesListFunc()
    },
    getStatesListFunc () {
      let sendData = {}
      let successCallBack = (res) => {
        let resObj = res.data
        this.MapChatArr = []
        this.MapChatArr = resObj.map(item => {
          item.name = item.state
          return item
        })
        this.statesPerception.forEach(item => {
          let stateItem = this.MapChatArr.find(v => v.state === item.state.state_name)
          if (stateItem) {
            stateItem.perception = Math.round(item.perception * 100)
            stateItem.stateInfo = item.state
          }
        })
        this.stateReopeningStatus.forEach(item => {
          let stateItem = this.MapChatArr.find(v => v.state === item.state.state_name)
          if (stateItem) {
            stateItem.reopening_status = item.reopening_status.name
            stateItem.value = item.reopening_status.name
            stateItem.itemStyle = {
              areaColor: this.reopeningStatusColor[item.reopening_status.name],
              emphasis:{
                areaColor: this.reopeningStatusColor[item.reopening_status.name],//设置为空字符串可使颜色不变
                label: {show:true}

              }
            }
          }
        })
        this.drawMapChart()
      }
      this.$api.getStates({
        data: sendData,
        success: successCallBack
      })
    },
    drawMapChart () {
      let option = {
        zoom: 0.6,
        title: {
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'transparent',
          formatter: function (params) {
            let htmlStr = ''
            if (params.data) {
              htmlStr += `<div style="background: rgba(255,255,255,0.90);border: 1px solid rgba(79,87,94,0.30);box-shadow: 0 19px 20px 0 rgba(32,43,53,0.20);border-radius: 3px; padding: 10px 10px;">
                <h3 style="font-size: 14px;color: #131926;padding-bottom: 20px;font-weight:bold;">${params.data.name}</h3>
                <ul style="width:100%;">
                  <li style="width:100%;font-size: 12px;color: #131926;display:flex;align-items: center;justify-content: space-between;">confirmed case<span style="font-weight:bold;padding-left:40px">${params.data.cases}</span></li>
                  <li style="width:100%;font-size: 12px;color: #131926;display:flex;align-items: center;justify-content: space-between;">public perception on reopening<span style="font-weight:bold;padding-left:40px">${params.data.perception ? params.data.perception + '%' : ''}</span></li>
                </ul>
              </div>`
            }
            return htmlStr
          }
        },
        toolbox: {
          show: true,
          left: 'left',
          top: 'top',
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '',
            type: 'map',
            roam: true,
            zoom: 0.6,
            map: 'USA',
            emphasis: {
                label: {
                    show: false
                }
            },
            // 文本位置修正
            textFixed: {
                Alaska: [20, -20]
            },
            data: this.MapChatArr
          }
        ]
      }
      this.mapChart = this.$echarts.init(this.$refs.mapChart, 'walden')
      this.mapChart.clear()
      this.mapChart.setOption(option)
      this.mapChart.resize()
      this.mapChart.on("click", (params) => {
        if(params.data){
          this.getTrendFunc(params.data)
        }
      })
    },
    getTrendFunc (params) {
      if (this.trendChart) this.trendChart.clear()
      let successCallBack = (res) => {
        let resObj = res.data
        this.drawTrendChart(resObj)
      }
      this.trendTitle = params.stateInfo.state_name
      this.showTrendChart = true
      this.$api.daily_perception_state_id({
        url: 'https://api.prossier.org/api/daily_perception/state_id/' + params.stateInfo.state_id,
        success: successCallBack
      })
    },
    drawTrendChart (resObj) {
      let xAxis = []
      let series = []
      resObj.forEach(item => {
        xAxis.push(item.date.replace('/2020', ''))
        series.push(item.perception * 100)
      })
      let option = {
        grid:{
          containLabel: true,
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        },
        tooltip: {
          trigger: 'axis',
          confine: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: xAxis,
          axisTick: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#D3D8E1'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            rotate: 0,
            textStyle: {
              color: '#131926'
            }
          }
        },
        yAxis: {
          type: 'value',
          splitNumber: 2,
          scale: true,
          min: 0,
          max: 100,
          axisLine: {
            show: false
          },
          axisTick: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#D3D8E1'],
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            rotate: 0,
            textStyle: {
              color: '#131926'
            }
          }
        },
        series: [{
            data: series,
            type: 'line',
            symbol: 'none',
            areaStyle: {
              normal: {
                color: 'rgba(131,167,236,0.5)'
              }
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#83A7EC'
                }
              }
            }
        }]
      }
      this.trendChart = this.$echarts.init(this.$refs.trendChart, 'walden')
      this.trendChart.clear()
      this.trendChart.setOption(option)
      this.trendChart.resize()
    }
  },
  mounted () {
    this.initMap()
  }
}
</script>

<style lang="less" scoped>
  .map-echart-box{
    width: 100%;
    height: 100%;
    position: relative;
    .map-echart{
      width: 100%;
      height: 100%;
    }
    .map-echart-legend{
      position: absolute;
      bottom: 62px;
      left: 50%;
      z-index: 11;
      transform: translate(-50%);
      display: flex;
      li{
        width: 140px;
        height: 24px;
        border: 1px solid #E6E9EC;
        padding: 0 10px;
        display: inline-flex;
        align-items: center;
        font-size: 12px;
        color: #F9F9F9;
        +li{
          margin-left: 10px;
        }
      }
    }
    .perception-trend-box{
      position: absolute;
      top: 80px;
      right: 360px;
      width: 400px;
      height: 300px;
      background: rgba(255,255,255,0.90);
      border: 1px solid rgba(79,87,94,0.30);
      box-shadow: 0 19px 20px 0 rgba(32,43,53,0.20);
      border-radius: 3px;
      padding: 10px;
      box-sizing: border-box;
      z-index: 9;
      h3{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title{
          font-size: 16px;
          color: #131926;
        }
        .close{
          cursor: pointer;
        }
      }
      p{
        padding: 30px 0 40px;
        font-size: 18px;
        color: #83A7EC;
        text-align: center;
        font-weight: bold;
      }
      .perception-trend{
        width: 100%;
        height: 170px;
      }
    }
  }

</style>