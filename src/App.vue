<template>
  <div id="app">
    <router-view @toPageFunc="toPageFunc"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    toPageFunc (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less">
  #app{
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width:100%;
    height:100%;
  }
</style>
