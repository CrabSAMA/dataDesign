<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Main from './components/Main.vue'
import Login from './components/Login.vue'

export default {
  name: 'app',
  components: {
    Main,
    Login
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
