<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import TournamentComponent from "@/components/TournamentComponent.vue";
export default {
  name: 'App',
  components: {TournamentComponent}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  margin: 0;
  padding: 0;
  background: #00000020;
  box-sizing: border-box;
}
</style>
