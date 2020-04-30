<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body {
  margin: 0;
  background: #f5f7f9;
  font-size: 14px;
}
#app, body, html {
  height: 100%;
  background: #f5f7f9;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
