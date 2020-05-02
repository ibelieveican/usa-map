<template>
  <div class="panel-box">
    <p class="title">
      <span v-if="title">{{ title }}</span>
      <slot name="title"></slot>
    </p>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelTemp',
  props: {
    title: {
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="less">
.panel-box{
  .info-list{
    li{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      color: #131926;
      min-height: 20px;
      padding-right: 14px;
      + li{
        margin-top: 10px;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.panel-box{
  padding: 0 20px;
  min-height: 80px;
  .title{
    font-size: 18px;
    color: #131926;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 1px solid #5C5D64;
    margin-bottom: 20px;
  }
  .content{
    height: calc(100% - 36px);
  }
  .info-list{
    li{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      color: #131926;
      min-height: 20px;
      + li{
        margin-top: 10px;
      }
    }
  }
}
</style>