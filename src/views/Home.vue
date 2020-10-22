<template>
  <div class="home">
    <div class="hero">


    <b-container>
      <b-row>
        <b-col>
      <h1>Let's Play <br> Archive</h1>
    <p>A minimal reader replacement for <a href="https://www.lparchive.org" target="_blank">LPArchive.org</a> 
    <br/>with Let's Play's from the Something Awful forums.</p>
        </b-col>
        <b-col>
<img src="@/assets/hero_1.svg" width="80%">
        </b-col>
      </b-row>
    </b-container>

    



    </div>
    <b-container>
      <br><br>
      <div class="search-wrapper">
        <p style="text-align: center;">
          <input type="text" v-model="search" placeholder="Find an LP" class="searchBar" />
        </p>
      </div>

      <br><br>
     
     
      <div>
        <transition-group name="list" tag="div" class="lp-list">
        <div class="lp-listing" v-for="(lp, index) in filteredList" v-if="index < limit && search.length > 0" v-bind:key="index">
          <router-link :to="'lp' + lp.u">
            <div class="lp-item">
              <p>{{lp.t}}</p>
              <p class="lp-author">{{lp.a}}</p>
              <div class="tags">
                <b-badge
                    pill
                    class="lp-tag"
                    v-for="(tag, index) in lp.tg"
                    v-bind:key="index"
                >{{tag}}</b-badge>
              </div>
              <!-- <div class="blocker">
                </div> -->
            </div>
          </router-link>
        </div>
        </transition-group>
      </div>
      <p style="text-align: center; margin-top: 3em;">
      <b-button v-if="search.length > 0 && limit < filteredList.length" @click="limit += 4" class="LPbutts">Show more</b-button>
      </p>



       <div v-if="reading.length > 0">
        <p>
          <strong>Currently Reading</strong>
        </p>
        <transition-group name="list" class="readContain" tag="div">
          <div v-for="(red, index) in reading" :key="index" class="readingItem">
            <reading
              :index="index"
              :title="red.title"
              :author="red.author"
              :part="red.part"
              :total="red.total"
              :image="red.image"
              :removeFunction="removeItem"
              :link="red.link"
            />
          </div>
        </transition-group>
      </div>

      <div v-else>
        <div v-if="search.length == 0">
        <p style="text-align: center;">
          <i class="las la-surprise" style="font-size: 3em;"></i>
          <br />Your reading list is empty! Search for an LP above and start reading!
          <br />
        </p>
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
    reading,
  },
  data: function () {
    return {
      search: "",
      limit: 12,
      LPList: [],
      reading: [],
    };
  },
  mounted: function () {
    document.title = "Awful Reader";
    var list = LPLIST;
    list.sort(function (a, b) {
      if (a.t.toLowerCase() < b.t.toLowerCase()) return -1;
      if (a.t.toLowerCase() > b.t.toLowerCase()) return 1;

      return 0;
    });
    this.LPList = list;
    console.log(list);
    //get reading list
    if (localStorage.readingList) {
      this.reading = JSON.parse(localStorage.readingList);
    }
  },
  methods: {
    removeItem(title, index) {
      console.log("AAAAA");
      console.log("remove " + title + " from list at index " + index);
      console.log(this.reading[index]);
      console.log(this.reading);

      var localItem = JSON.parse(localStorage.readingList);
      localItem.splice(index, 1);
      console.log(localItem);
      localStorage.readingList = JSON.stringify(localItem);
      this.reading.splice(index, 1);
    },
  },
  computed: {
    filteredList() {
      return this.LPList.filter((lp) => {
        return lp.t.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").includes(this.search.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
      });
    },
  },
};
</script>

<style>
.hero {
  max-height: 700px;
  padding-bottom: 5em;
  margin-bottom: 2em;
  background: #eef2f3;
  color: black;
  transition: all 1s ease-in-out;
}

.col {
  position: static;
  margin-top: 2em;
  padding: 0;
  margin-left: 1em;
}

.row {
  flex-wrap: nowrap;
}

.light .hero {
  background: #eef2f3;
}

.dark .hero {
  background: #222835;
  color: #eef2f3;
}

.hero h1 {
  font-family: "Work Sans", sans-serif;
  font-weight: 700;
  font-size: 500%;
}

.lp-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.lp-item {
  height: 250px;
  width: 230px;
  color: #4c566a;
  margin: 1em;
  padding: 1em;
  font-weight: 600;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  font-size: 0.8em;
}

.lp-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 15px #32325d33, 0 5px 10px #0000001a !important;
}

.lp-item:active {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  -webkit-transform: translateY(1px);
  transform: translateY(1px);
}

.lp-author {
  color: #d8dee9;
  font-size: 1em;
  margin-top: -1em;
  font-weight: 400;
}

.readContain {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}

.readingItem {
  transition: all 0.2s ease;
  margin: 10px;
}

.blocker {
  height: 200px;
  width: 230px;
  margin-left: -1em;
  background: #FCFEFF;
}

.readingItem:hover {
  transform: translateY(-2px);
}

.readingItem:hover {
  box-shadow: 0 15px 15px #32325d33, 0 5px 10px #0000001a !important;
}

.readingItem:active {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  -webkit-transform: translateY(2px);
  transform: translateY(2px);
}

.readingItem h1 {
  font-size: 1.2em;
}

.lp-tag {
  background: #eceff4 !important;
  color: #b0b7c5;
  margin-right: 6px;
}

.show-list {
  background: #eceff4;
  color: #4c566a;
  font-weight: 600;
  border: 0 !important;
  transition: all 0.5s ease-in-out;
}

.show-list:hover {
  background: #eceff4;
  color: #4c566a;
  transform: translateY(-2px);
  box-shadow: 0 15px 15px #32325d33, 0 5px 10px #0000001a !important;
}

.list-enter, .list-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.list-leave-active {
  position: absolute;
}

@media (max-width: 770px) {
  .item {
    min-height: 0px;
    width: 100% !important;
  }

  .readingItem {
    width: 95%;
    margin: 1em;
  }

  .readItem {
    width: 100%;
  }

  .bg-img {
    z-index: -1;
  }

  .item-content {
    padding: 1em;
    z-index: 1;
  }

  .lp-item {
    width: 100% !important;
    height: 120px;
  }

  .lp-listing{
    width: 95% !important;
    height: 120px;
    margin-bottom: 1em;
  }
}

/* .list-enter-active, .list-leave-active {
  transition: opacity 1s;
}
.list-enter, .list-leave-to  {
  opacity: 0;
}

.list-move {
  transition: all 1s;
} */

.light .searchBar {
      width: 80%;
    height: 3em;
    padding: 1em;
    border: none;
    background: #eef2f3;
    border-radius: 12px;
    color: #2E3440 !important;
    transition: all 1s;
}

.dark .searchBar {
  background: #222835;
   width: 80%;
    height: 3em;
    padding: 1em;
    border: none;
    border-radius: 12px;
    color: #eef2f3;
    transition: all 1s;
}

.searchBar:focus {
  outline: 0;
}

.searchBar::placeholder {
  color: #2E3440;
}

</style>
