<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><i class="las la-frog"></i></router-link>
      <a @click="changeMode()"><i class="las la-moon"></i></a>
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
@import url("https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,400i,500,600,600i,700,700i&display=swap");
@import url("https://fonts.googleapis.com/css?family=Work+Sans:400,400i,500,600,600i,700,700i&display=swap");
@import url("https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css");
/* https://coolors.co/fffcf2-ccc5b9-403d39-252422-eb5e28 */
/* https://coolors.co/fcfeff-eef2f3-885a89-252422-6c89ff */


#app {
  font-family: "IBM Plex Sans", sans-serif;
  transition: all 1s ease-in-out;
  font-size: 1.1em;
  line-height: 1.8;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  min-height: 100vh;
}

.light {
  background: #FCFEFF;
  color: #586069;
  transition: all 1s ease-in-out;
}

.dark {
  background: #2E3440;
  color: #FCFEFF;
  transition: all 1s ease-in-out;
}

.dark a {
  color: #d8dee9;
}


.dark .lp-item{
  color: white;
  background: #222835;
}

.dark .lp-author {
  color: #d8dee9;
}

.dark .lp-tag {
  background: #4c566a !important;
  color: #2e3440;
}

#nav {
  width: 100%;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgb(34, 40, 66);
  display: block;
}

#nav i {
  font-size: 1.5em;
}

a {
  color: #262730;
  font-weight: 700;
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
  font-size: 0.9em;
}

.light .bbc-block {
  padding: 2em;
  background: #eceff4;
  border-radius: 8px;
  margin-bottom: 2em;
}

.dark .bbc-block {
  padding: 2em;
  background: #434C5E;
  border-radius: 8px;
  margin-bottom: 2em;
}

.LPbutts {
  background: #222835;
  color: #eceff4;
  border-radius: 30px;
  border: 3px solid #222835;
  padding: 1em;
  min-width: 200px;
  margin-bottom: 2em;
}

.LPbutts:hover {
  background: #2E3440;
  border: 3px solid #222835;
}

.LPbutts:focus {
  border: none;
}

.LPbutts:active {
    background: #2E3440;
  border: 3px solid #222835;
}

.la-moon {
  position: relative;
  float: right;
  top: 3%;
  right: 5%;
  color: #d8dee9;
}

.la-frog {
  position: relative;
  float: left;
  top: 3%;
  left: 5%;
  color: #d8dee9;
}

</style>
