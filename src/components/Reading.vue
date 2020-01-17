<template>
<div class="item">
     <div class="bg-img" v-bind:style="{ backgroundImage: 'url(' + image + ')'} ">
    <div id="reading" class="readItem">
        <p class="remover" @click="removeItem"><i class="las la-trash-alt"></i></p>
            <div class="item-content">
                 
        <h1>{{title}}</h1>
        <p class="author">{{author}}</p> 
        <span class="parted" v-if="part != 'Index'"> {{part}}</span>
        
        </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
props: ["index", "title", "author", "part", "total", "image","removeFunction"],
methods:{
    removeItem(e){
        e.preventDefault();
        console.log("Clicked in child");
        this.removeFunction(this.title,this.index);
    }
},
}
</script>

<style>
.item {
    border-radius: 5px;
    /* box-shadow: 0 4px 6px #32325d1c,0 1px 3px #00000014; */
    -webkit-transition: all .5s ease;
    transition: all .2s ease;
    width: 200px;
  max-height: 300px;
  min-height: 170px;
}



.item-content {
        padding: 2em;
        opacity: 1 !important;
        border-radius: 5px;
        padding-top: 10%;
        padding-bottom: 10%;
}

.bg-img {
    background-size: auto;
    border-radius: 5px;
    background-position: 50%; 
}





.dark .readItem {
    background: rgba(59, 66, 82, 0.9);
    color: #eceff4;
}

.light .readItem {
    background: rgba(46, 52, 64, 0.9);
    color: #eceff4;
}

.readItem {
    border-radius: 5px;
    min-height: 240px;
    transition: all .5s ease;
}

.author {
    transition: all .5s ease;
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
  text-align:right;
  padding-right: 0.3em;
  padding-top:0;
}


.remover:hover {
  color: #4c566a;
  cursor: pointer;
  z-index: 1;
}
</style>