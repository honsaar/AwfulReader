<template>
  <div class="home">

    <b-container>
      <div class="lp-list">
        <ul>
          <li v-for="(lp, index) in LPList" v-bind:key="index">
           <router-link :to="'lp' + lp.u"> {{lp.t}} </router-link>
            </li>
        </ul>
      </div>
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
      LPList: []
    };
  },
  mounted: function() {
    var list = LPLIST;
    list.sort(function(a, b) {
      if (a.t < b.t) return -1;
      if (a.t > b.t) return 1;

      return 0;
    });
    this.LPList = list;
    console.log(list);
  }
};
</script>
