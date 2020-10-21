<template>
  <div class="item">
    <router-link :to="link">
      <div
        class="bg-img"
        v-bind:style="{ backgroundImage: 'url(\'' + image + '\')'} "
        style="height: 160px;"
      ></div>
    </router-link>
    <div id="reading" class="readItem">
      <i
        class="las la-times"
        @click="removeItem"
        style="float: right;
    padding: 1em;"
      ></i>
      <div class="item-content">
        <router-link :to="link">
          <p>{{title}}</p>
        </router-link>
        <p class="author">{{author}}</p>
        <span class="parted" v-if="part != 'Index'">{{part}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "index",
    "title",
    "author",
    "part",
    "total",
    "image",
    "removeFunction",
    "link",
  ],
  methods: {
    removeItem(e) {
      e.preventDefault();
      console.log("Clicked in child");
      this.removeFunction(this.title, this.index);
    },
  },
};

</script>



<style>
.item {
  border-radius: 5px;
  /* box-shadow: 0 4px 6px #32325d1c,0 1px 3px #00000014; */
  -webkit-transition: all 0.5s ease;
  transition: all 0.2s ease;
  width: 230px;
  margin: 0em;
}

.item:hover .bg-img {
  opacity: 0.5;
}

.item-content {
  padding: 2em;
  opacity: 1 !important;
  padding-top: 20%;
  padding-bottom: 10%;
  font-size: 0.8em;
}

.bg-img {
  background-size: cover;
  background-position: 50%;
  z-index: -1000;
  transition: all 0.5s;
}

.dark .readItem {
  background: #2E3440;
  color: #eceff4;
}

.light .readItem {
  background: #fcfeff;
  color: rgba(34, 40, 53, 1);
}

.readItem {
  height: 200px;
  transition: all 0.5s ease;
  width: 230px;
  z-index: 10;
}

.author {
  transition: all 0.5s ease;
}

.light .author {
  color: #c0c3c9;
}

.dark .author {
  color: #eceff4;
}

.parted {
  font-size: 0.7em;
  font-weight: 600;
  text-transform: uppercase;
}

.remover {
  font-size: 1.8em;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  color: #fff;
  text-align: right;
  padding-right: 0.3em;
  padding-top: 0;
}

.remover i:hover {
  color: #4c566a;
  cursor: pointer;
  z-index: 1;
}
</style>