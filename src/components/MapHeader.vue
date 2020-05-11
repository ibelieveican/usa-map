<template>
  <header class="header-content">
    <span>Covid-19 Reopening Readiness and Public Perception</span>
    <a class="home" href="javascript:void(0);" @click="toHomePageFunc">Home</a>
    <a class="about" href="javascript:void(0);" @click="toAboutPageFunc">About</a>
  </header>
</template>

<script>
export default {
  name: 'MapHeader',
  methods: {
    toAboutPageFunc () {
      this.$router.push('./about')
    },
    toHomePageFunc () {
      this.$router.push('./')
    }
  }
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
    position: relative;
    img{
      display: inline-flex;
      height: 44px;
    }
    span{
      font-size: 19px;
      color: #CBD0DB;
    }
    .about{
      position: absolute;
      right: 20px;
      // bottom: 10px;
      height: 100%;
      display: inline-flex;
      align-items: center;
      font-size: 19px;
      color: #a6acb4;
    }
    .home{
      position: absolute;
      right: 80px;
      // bottom: 10px;
      height: 100%;
      display: inline-flex;
      align-items: center;
      font-size: 19px;
      color: #a6acb4;
    }
  }
  @media screen and (max-width: 800px) {
    .header-content{
      background-image: none;
      .about{
        bottom: 10px;
        height: auto;
      }
    }
  }
</style>