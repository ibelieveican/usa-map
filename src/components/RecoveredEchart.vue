<template>
  <div class="recovered-chart" ref="chart"></div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      chart: null
    }
  },
  methods: {
    getHistoricalFunc () {
      let sendData = {}
      let successCallBack = (res) => {
        let resObj = res.data
        this.drawChart(resObj)
      }
      this.$api.historical({
        data: sendData,
        success: successCallBack
      })
    },
    drawChart (resObj) {
      let recoveredObj = resObj.timeline.recovered
      let xAxis = Object.keys(recoveredObj).map(item => {
        return item
      }).sort(function(a,b){return recoveredObj[a]-recoveredObj[b]})
      let series = Object.values(recoveredObj).map(item => {
        return Math.round(item / 1000 )
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
            return params[x].name + '<br/>' +params[x].value + 'k'
           }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: xAxis.map(item => {
            return item.replace('/20', '')
          }),
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
            formatter: '{value}k'
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
  .recovered-chart{
    height: 100%;
    width: 100%;
  }
</style>