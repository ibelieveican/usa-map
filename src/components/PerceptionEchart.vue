<template>
  <div class="perception-chart" ref="chart"></div>
</template>

<script>
export default {
  name: 'PerceptionEchart',
  props: ['clientWidth'],
  data () {
    return {
      chart: null,
      chartData: {}
    }
  },
  watch: {
    clientWidth () {
      if (this.chart) {
        this.drawChart()
      }
    }
  },
  methods: {
    getHistoricalFunc () {
      let sendData = {}
      let successCallBack = (res) => {
        let resObj = res.data
        this.chartData = resObj
        this.drawChart()
      }
      this.$api.us_daily_perception({
        data: sendData,
        success: successCallBack
      })
    },
    drawChart () {
      let xAxis = []
      let series = []
      this.chartData.forEach(item => {
        xAxis.push(item.date.replace('/2020', ''))
        series.push(Math.round(item.perception * 100))
      })
      let option = {
        grid:{
          containLabel: true,
          top: 10,
          left: 10,
          right: 10,
          bottom: 20
        },
        tooltip: {
          trigger: 'axis',
          confine: true,
          formatter(params){
           for(let x in params){
            return params[x].name + '<br/>' +params[x].value + '%'
           }
          }
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
          splitNumber: 4,
          scale: true,
          min: 0,
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
            },
            formatter: '{value}%'
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
      this.chart = this.$echarts.init(this.$refs.chart, 'walden')
      this.chart.clear()
      this.chart.setOption(option)
      this.chart.resize()
    }
  },
  mounted () {
    this.getHistoricalFunc()
  }
}
</script>

<style lang="less" scoped>
  .perception-chart{
    height: 100%;
    width: 100%;
  }
</style>