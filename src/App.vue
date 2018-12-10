<template>
  <div id="app">
    <ul class="nav nav-tabs bg-dark">
      <li class="nav-item">
        <router-link to="/" class="nav-link">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/sale" class="nav-link">Sale</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/storage" class="nav-link">Storage</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/import" class="nav-link">Import</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/finance" class="nav-link">Finance</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/report" class="nav-link">Report</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.router-link-exact-active {
  border-color: #fff;
}
</style>
