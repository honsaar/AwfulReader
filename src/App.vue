<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" style="float:left;"><i class="las la-frog"></i></router-link>
      <a style="float: right;" @click="changeMode()"><i class="las la-moon"></i></a>
    </div>
    <router-view  :class="[darkMode == 'true' ? 'dark' : 'light']" :key="$route.fullPath"></router-view>
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
    console.log(this.darkMode);
    //set the mode on the body on created
    if(this.darkMode == 'true'){
        document.body.classList.add('dark');
      } else {
        document.body.classList.add('light');
      }
  },
  methods: {
    changeMode(){
      //using strings to keep localStorage consistent
      if(this.darkMode == 'true'){
        this.darkMode = 'false';
        document.body.classList.remove('dark');
        document.body.classList.add('light');
      } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        this.darkMode = 'true';
      }
      localStorage.darkMode = this.darkMode;

      
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Inter:400,400i,500,600,600i,700,700i&display=swap");
@import url("https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,500,600,600i,700,700i&display=swap");
@import url("https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css");
/* https://coolors.co/fffcf2-ccc5b9-403d39-252422-eb5e28 */

#app {
  font-family: "Inter", sans-serif;
  transition: all 1s ease-in-out;
  font-size: 1em;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  min-height: 100vh;
}

.light {
  background: #FCFEFF;
  color: #252422;
  transition: all 1s ease-in-out;
}

.dark {
  background: #2E3440;
  color: #FCFEFF;
  transition: all 1s ease-in-out;
}

.dark a {
  color: #6c89ff;
}

.light a {
  color: #6c89ff;
}

.dark .lp-item{
  color: white;
}

.dark .lp-author {
  color: #d8dee9;
}

.dark .lp-tag {
  background: #4c566a !important;
  color: #2e3440;
}



#nav {
  padding: 30px;
  position: fixed;
  width: 100%;
}

#nav i {
  font-size: 1.5em;
}
a {
  color: #5e81ac;
  font-weight: 700;
}

a:hover {
  /* text-decoration: none; */
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
