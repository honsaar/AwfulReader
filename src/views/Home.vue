<template>
  <div class="home">

    <b-container>

      <p>Currently Reading</p>
      <ul>
        <li v-for="(reading, index) in reading" v-bind:key="index">
          <p v-if="reading.part != 'Index'"><router-link :to="'lp/' + reading.title +'/' + reading.part"> {{reading.title}} | {{reading.part}}</router-link></p>
          </li>
          </ul>
          <br><br><br>

      <!-- <div class="lp-list">
        <ul>
          <li v-for="(lp, index) in LPList" v-bind:key="index">
           <router-link :to="'lp' + lp.u"> {{lp.t}} </router-link>
            </li>
        </ul>
      </div> -->
    </b-container>

  </div>
</template>

<script>
// @ is an alias to /src

import LPLIST from "../assets/tocdata.json";

export default {
  name: "LetsRead",
  data: function() {
    return {
      LPList: [],
      reading: []
    };
  },
  mounted: function() {
    document.title = "Let's Read!";
    var list = LPLIST;
    list.sort(function(a, b) {
      if (a.t < b.t) return -1;
      if (a.t > b.t) return 1;

      return 0;
    });
    this.LPList = list;
    console.log(list);

    //get reading list
    if(localStorage.readingList){
    console.log(JSON.parse(localStorage.readingList));
    this.reading = JSON.parse(localStorage.readingList);
    }

     
  }
};
</script>
