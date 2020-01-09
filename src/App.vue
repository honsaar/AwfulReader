<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><i class="las la-frog"></i></router-link>
    </div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>


<script>
export default {};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Rubik:400,400i,600,600i,700,700i&display=swap");
@import url("https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css");

#app {
  background: #fff;
  font-family: "Rubik", sans-serif;
  color: #2e3440;
  font-size: 1em;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

#nav i {
  font-size: 1.5em;
}
a {
  color: #5e81ac;
}

a:hover {
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #2e3440;
}

li {
  list-style-type: none;
}

img {
  max-width: 100%;
}
/* @media only screen and (max-width: 767px) {
  img {
    width: 100%;
  }
} */

/* Something Awful-specific CSS overrides */
.bbc-block {
  padding: 1em;
  background: #eceff4;
  border-radius: 3px;
}
</style>
