<template>
  <div class="home">
  <!-- <div class="hero">

    
    <b-container>
      <h1>Reading Awful</h1>
    <p>A minimal reader replacement for <a href="https://www.lparchive.org">LPArchive.org</a> <br/>with Let's Play's from the Something Awful forums.</p>
    </b-container>



  </div> -->
    <b-container>
      
      <div v-if="reading.length > 0">
        <p>
          <strong>Currently Reading</strong>
        </p>
        <transition-group name="list" class="readContain" tag="div">
          <div v-for="(red, index) in reading" :key="index" class="readingItem">
           
            <p>
              <router-link :to="red.part == 'Index' ? red.link :  red.link">
                <reading
                  :index="index"
                  :title="red.title"
                  :author="red.author"
                  :part="red.part"
                  :total="red.total"
                  :image="red.image"
                  :removeFunction="removeItem"
                />
              </router-link>
            </p>
          </div>
        </transition-group>
      </div>

      <div v-else>
        <p style="text-align: center;">
          <i class="las la-surprise" style="font-size: 3em;"></i>
          <br />Your reading list is empty! Get started by choosing an LP from below.
          <br />
          <br />
          <i class="las la-hand-point-down" style="font-size: 2em;"></i>
        </p>
      </div>

      <div class="search-wrapper">
        <p style="text-align: center;">
    <input type="text" v-model="search" placeholder="Search title.."/>
    </p>
  </div>


        <p>
          <strong>LP Master List</strong>
        </p>
        <div class="lp-list">
          <div class="lp-listing" v-for="(lp, index) in filteredList" v-bind:key="index">
            <router-link :to="'lp' + lp.u">
              <div class="lp-item">
                <p>{{lp.t}}</p>
                <p class="lp-author">{{lp.a}}</p>
                <div class="tags">
                  <!-- <b-badge
                    pill
                    class="lp-tag"
                    v-for="(tag, index) in lp.tg"
                    v-bind:key="index"
                  >{{tag}}</b-badge> -->
                </div>
              </div>
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
      search: '',
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
    console.log(list);
    //get reading list
    if (localStorage.readingList) {
      this.reading = JSON.parse(localStorage.readingList);
    }
  },
  methods: {
    removeItem(title, index) {
      console.log("AAA");
      console.log("remove " + title + " from list at index " + index);
      console.log(this.reading[index]);
      console.log(this.reading);

      var localItem = JSON.parse(localStorage.readingList);
      localItem.splice(index, 1);
      console.log(localItem);
      localStorage.readingList = JSON.stringify(localItem);
      this.reading.splice(index, 1);
    }
  },
   computed: {
    filteredList() {
      return this.LPList.filter(lp => {
        return lp.t.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
};
</script>

<style>

.hero {
  min-height: 700px;
  padding-top: 15em;
  margin-bottom: 2em;
  background: #eef2f3;
  color: black;
  background-image: url('../assets/garbageman.png');
  background-repeat: no-repeat;
  background-position-x: 40vw;
}


.hero h1 {
  font-family: 'Crimson Text', serif;
  font-weight: 700;
  font-size: 500%;
}

.lp-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

}

.lp-listing {
  width: 210px;
  
}

.lp-item {
  border-radius: 5px;
  height: 230px;
  color: #4c566a;
  margin: 1em;
  padding: 1em;
  font-weight: 600;
  box-shadow: 0 4px 6px #32325d1c, 0 1px 3px #00000014;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
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
  justify-content: center;
}

.readingItem {
  transition: all 0.2s ease;
  margin: 10px;
  display: inline-block;
  
}

.readingItem:hover {
  transform: translateY(-2px);
}

.readingItem:hover .item {
  box-shadow: 0 15px 15px #32325d33, 0 5px 10px #0000001a !important;
}

.readingItem:active .item {
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

@media (max-width: 576px) {
  .item {
    min-height: 0px;
    width: 100% !important;
  }

  .readingItem {
    width: 95% !important;
    margin: 1em;
  }

}
</style>
