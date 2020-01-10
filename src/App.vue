<template>
  <div id="app" :class="[darkMode == 'true' ? 'dark' : 'light']">
    <div id="nav">
      <router-link to="/"><i class="las la-frog"></i></router-link>
      <a style="float: right;" @click="changeMode()"><i class="las la-moon"></i></a>
    </div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>


<script>

export default {
  data: function(){
    return {
      darkMode: 'false'
    }
  },
  created(){
    this.darkMode = localStorage.darkMode;
  },
  methods: {
    changeMode(){
      //using strings to keep localStorage consistent
      if(this.darkMode == 'true'){
        this.darkMode = 'false';
      } else {
        this.darkMode = 'true';
      }
      localStorage.darkMode = this.darkMode;
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Rubik:400,400i,500,600,600i,700,700i&display=swap");
@import url("https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css");


#app {
  font-family: "Rubik", sans-serif;
  transition: all 1s ease-in-out;
  font-size: 1em;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  min-height: 100vh;
}

.light {
  background: #fff;
  color: #4c566a;
}

.dark {
  background: #2e3440;
  color: #eceff4;
}

.dark a {
  color: #4c566a;
}

.light a {
  color: #2e3440;
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
