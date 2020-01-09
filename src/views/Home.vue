<template>
  <div class="home">

    <b-container>

      <p><strong>Currently Reading</strong></p>

      

      <div class="readContain">
        <div v-for="(reading, index) in reading" v-bind:key="index" class="readingItem">
          <p><router-link :to="reading.part == 'Index' ? reading.link :  reading.link + reading.part + '/' "> 
          <reading :title="reading.title" :author="reading.author" :part="reading.part" :total="reading.total"/>
          </span>
          
          </router-link></p>
          </div>
          </div>

          <br><br><br>


<p><strong>LP Master List</strong></p>
      <div class="lp-list">
        
          <div v-for="(lp, index) in LPList" v-bind:key="index">
           <router-link :to="'lp' + lp.u"> 
             <div class="lp-item"><p>{{lp.t}}</p>
             <p class="lp-author">{{lp.a}}</p> </div>
             </router-link>
            </div>

      </div>
    </b-container>

  </div>
</template>

<script>
// @ is an alias to /src

import LPLIST from "../assets/tocdata.json";
import reading from "../components/Reading";

export default {
  name: "LetsRead",
  components: {
    reading
},
  data: function() {
    return {
      LPList: [],
      reading: []
    };
  },
  mounted: function() {
    document.title = "Awful Reader";
    var list = LPLIST;
    list.sort(function(a, b) {
      if (a.t.toLowerCase() < b.t.toLowerCase()) return -1;
      if (a.t.toLowerCase() > b.t.toLowerCase()) return 1;

      return 0;
    });
    this.LPList = list;

    //get reading list
    if(localStorage.readingList){
    this.reading = JSON.parse(localStorage.readingList);
    }
    
     
  }
};
</script>

<style>
.lp-list {
  border-radius: 5px;
}

.lp-item {
  border-radius: 5px;
  color: #2e3440;
  margin-bottom: 1em;
  padding: 1em;
box-shadow: 0 4px 6px #32325d1c,0 1px 3px #00000014;
-webkit-transition: all .5s ease;
transition: all .5s ease;
}

.lp-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 15px #32325d33,0 5px 10px #0000001a !important;
}


.lp-author {
  color: #d8dee9;
  font-size: 1em;
}

.readContain {
  display: flex;
  flex-wrap: wrap;
}

.readingItem {
  
  margin: 10px;
}
.readingItem h1 {
  font-size: 1.2em;
}
</style>
