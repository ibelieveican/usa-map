<template>
  <header class="header-content">
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
    justify-content: center;
    padding: 0 20px;
    width: 100%;
    background: #000000;
    box-sizing: border-box;
    background-image: url('../assets/img/logo.png');
    background-position: 20px center;
    background-repeat: no-repeat;
    img{
      display: inline-flex;
      height: 44px;
    }
    span{
      font-size: 19px;
      color: #CBD0DB;
    }
  }
</style>