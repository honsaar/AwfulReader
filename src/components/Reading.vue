<template>
    <div id="reading" class="item">
        <h1>{{title}}</h1>
        <p class="author">{{author}}</p> 
        <span class="parted" v-if="part != 'Index'"> {{part}}</span>
    </div>
</template>

<script>
export default {
props: ["title", "author", "part", "total"],
 mounted: function() {
     console.log(this);
     console.log(this.title);
     //TODO: grab images from the API and save them
    //  var vgdb = axios
    //   .get(
    //     "https://api.rawg.io/api/games?search=" + this.title
    //   )
    //   .then(function(e) {
    //    console.log(e);
    //   });

 }
}
</script>

<style>
.item {
    padding: 2em;
    border-radius: 5px;
    box-shadow: 0 4px 6px #32325d1c,0 1px 3px #00000014;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    width: 200px;
  max-height: 300px;
  min-height: 170px;
}

.dark .item {
    background: #3b4252;
    color: #eceff4;
}

.light .item {
    background: #2e3440;
    color: #eceff4;
}

.item:hover {
 transform: translateY(-2px);
  box-shadow: 0 15px 15px #32325d33,0 5px 10px #0000001a !important;
}

.author {
    transition: all .5s ease;
}

.light .author {
    color: #4c566a;
}

.dark .author {
    color: #eceff4;
    
}

.parted {
    font-size: 0.7em;
    font-weight: 600;
    text-transform: uppercase;
}
</style>