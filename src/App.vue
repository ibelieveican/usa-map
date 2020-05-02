<template>
  <div id="app">
    <MapHeader></MapHeader>
    <div class="map-content">
      <MapEchart :statesPerception="statesPerception" :stateReopeningStatus="stateReopeningStatus"></MapEchart>
      <div class="panel left-panel">
        <PanelTemp class="perception" :title="'Public Perception on Reopening'" style="margin-top:80px;">
          <ul class="info-list" slot="content">
            <li><span>United States</span><span>{{Math.round(perception * 100)}}%</span></li>
          </ul>
        </PanelTemp>
        <PanelTemp class="flex-grow" :title="'Top States by Public Perception'" style="margin-top:80px;">
          <div slot="content" style="height:100%;">
            <happy-scroll resize smaller-move-v="start" :min-length-v="10" color="#6E6F7D">
              <ul class="info-list">
                <li v-for="item in statesPerception" :key="item.state.state_name"><span>{{item.state.state_name}}</span><span>{{Math.round(item.perception * 100)}}%</span></li>
              </ul>
            </happy-scroll>
          </div>
        </PanelTemp>
      </div>
      <div class="panel right-panel">
        <PanelTemp class="flex-grow" :title="'Stay-at-home order expiration'" style="margin-top:80px;">
          <div slot="content" style="height:100%;">
            <happy-scroll resize smaller-move-v="start" :min-length-v="10" color="#6E6F7D">
              <ul class="info-list">
                <li v-for="item in stateReopeningStatus" :key="item.state.state_name"><span>{{item.state.state_name}}</span><span>{{item.stay_at_home_expiration || 'No end date'}}</span></li>
              </ul>
            </happy-scroll>
          </div>
        </PanelTemp>
        <PanelTemp class="" :title="'Covid-19 Pandemic'" style="margin-top:68px;max-height:166px;min-height:166px;">
          <ul class="info-list Covid-19-info" slot="content">
            <li v-for="item in allObj" :key="item.name"><span>{{item.name}}</span><span>{{item.value}}</span></li>
          </ul>
        </PanelTemp>
        <PanelTemp class="" :title="'Recovered Cases in United States'" style="margin-top:68px;max-height:166px;min-height:166px;">
          <RecoveredEchart ref="allChart" slot="content"></RecoveredEchart>
        </PanelTemp>
      </div>
    </div>
    <div class="bottom-info">Contact cui@umd.edu, Smart Construction Center, University of Maryland</div>
  </div>
</template>

<script>
import PanelTemp from './components/PanelTemp'
import MapHeader from '@components/MapHeader'
import MapEchart from '@components/MapEchart'
import RecoveredEchart from '@components/RecoveredEchart'

export default {
  name: 'App',
  components: {
    PanelTemp, MapHeader, MapEchart, RecoveredEchart
  },
  data () {
    return {
      perception: 0,
      statesPerception: [],
      stateReopeningStatus: [],
      allObj: [
        {
          name: 'Confirmed cases (US)',
          value: 0
        },
        {
          name: 'Test Conducted',
          value: 0
        },
        {
          name: 'Total Deaths',
          value: 0
        },
        {
          name: 'Recovered',
          value: 0
        }
      ]
    }
  },
  methods: {
    getStatesPerceptionFunc () {
      let sendData = {}
      let successCallBack = (res) => {
        let resObj = res.data
        this.statesPerception = resObj
      }
      this.$api.daily_perception_latest({
        data: sendData,
        success: successCallBack
      })
    },
    getStateReopeningStatusFunc () {
      let sendData = {}
      let successCallBack = (res) => {
        let resObj = res.data
        this.stateReopeningStatus = resObj
      }
      this.$api.state_reopening_status({
        data: sendData,
        success: successCallBack
      })
    },
    getAllInfoFunc () {
      let sendData = {}
      let successCallBack = (res) => {
        let resObj = res.data
        this.allObj.map(item => {
          switch (item.name) {
            case 'Confirmed cases (US)':
                item.value = resObj['cases']
              break
            case 'Test Conducted':
                item.value = resObj['tests']
              break
            case 'Total Deaths':
                item.value = resObj['deaths']
              break
            case 'Recovered':
                item.value = resObj['recovered']
              break
          }
          return item
        })
      }
      this.$api.all({
        data: sendData,
        success: successCallBack
      })
    },
    getPerceptionFunc () {
      let sendData = {}
      let successCallBack = (res) => {
        let resObj = res.data
        this.perception = resObj.find(v => v.daily_perception_id === resObj.length).perception
      }
      this.$api.us_daily_perception({
        data: sendData,
        success: successCallBack
      })
    }
  },
  beforeMount () {
    this.getStatesPerceptionFunc()
    this.getStateReopeningStatusFunc()
  },
  mounted () {
    this.getAllInfoFunc()
    this.getPerceptionFunc()
  }
}
</script>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width:100%;
    height:100%;
    .map-content{
      height: calc(100% - 70px);
      width: 100%;
      position: relative;
    }
    .bottom-info{
      position: fixed;
      bottom: 20px;
      font-size: 16px;
      color: #8C939A;
      text-align: center;
      width: 100%;
    }
    .panel{
      width: 340px;
      height: 100%;
      max-height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      background-image: linear-gradient(270deg, rgba(230,233,236,0.70) 0%, #E6E9EC 100%);
      display: flex;
      flex-flow: column nowrap;
      box-sizing: border-box;
      padding-bottom: 90px;
      flex: 1;

      .panel-box{
        flex: auto;
        overflow: hidden;
      }
      .flex-grow{
        flex-grow: 1;
      }
      &.left-panel{
        left: 0;
      }
      &.right-panel{
        right: 0;
      }
      .allChart{
        height: 120px;
        width: 100%;
      }
    }
  }
</style>
