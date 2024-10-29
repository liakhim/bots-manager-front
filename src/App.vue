<template>
  <router-view></router-view>
</template>

<script>

import TournamentComponent from "@/components/TournamentComponent.vue";
export default {
  name: 'App',
  components: {TournamentComponent}
}
</script>

<style lang="scss">
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("src/assets/3333.webp");
  background-size: cover;
  height: 100vh;
  margin: 0!important;
  &::before {
      content: '';
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      backdrop-filter: blur(10px);
  }
  //.mask {

  //}
}
body {
  margin: 0;
  padding: 0;
  background: #00000020;
  box-sizing: border-box;
}
</style>
