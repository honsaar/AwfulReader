<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>


<script>


export default {
  
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,400i,600,600i,700,700i&display=swap');

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

li {
  list-style-type: none;
}

img {
  max-width: 100%;
}



/* Something Awful-specific CSS overrides */
.bbc-block {
  padding: 1em;
  background: #f6f5f5;
  border-radius: 1em;
}
</style>
