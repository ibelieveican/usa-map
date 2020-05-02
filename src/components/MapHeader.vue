<template>
  <header class="header-content">
    <img src="../assets/img/logo.png" alt="">
    <span>Covid-19 Reopening Readiness and Public Perception</span>
  </header>
</template>

<script>
export default {
  name: 'MapHeader'
}
</script>

<style lang="less" scoped>
  .header-content{
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    width: 100%;
    background: #000000;
    box-sizing: border-box;
    img{
      display: inline-flex;
      height: 44px;
    }
    span{
      font-size: 16px;
      color: #CBD0DB;
    }
  }
</style>