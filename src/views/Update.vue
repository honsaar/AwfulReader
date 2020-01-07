<template>
  <div class="update">
    <b-container>
    <v-runtime-template :key="$route.fullPath" :template="dom" ref="dom"></v-runtime-template>
    <div id="nav">

    </div>
    </b-container>
  </div>
</template>

<script>
import VRuntimeTemplate from "v-runtime-template";
export default {
  name: "LP",
   components: {
    VRuntimeTemplate
  },
  data: function(){
    return {
      dom: '',
    }
  },
  mounted: function() {
    console.log(this);
    console.log("Route", this.$route);
    var lp = this.$route.params.name;
    var update = this.$route.params.update;

    console.log(lp);
    console.log(update);


    var LPSrc = lp.replace(/\s+/g, '-');
    var UpdateSrc = update.replace(/\s+/g, '%20');
    var remoteURL = "https://cors-anywhere.herokuapp.com/https://lparchive.org/" + LPSrc + "/" + UpdateSrc + "/";
    var vueInstance = this;
    this.dom = '';

    var testing = axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://lparchive.org/" + LPSrc + "/" + UpdateSrc + "/"
      )
      .then(function(e) {
        var dataDom = e.data;
        console.log(dataDom);
        var doc = new DOMParser().parseFromString(dataDom, "text/html");
        console.log("parsed", doc);
        document.title = doc.title;
        //update content
        var content = doc.getElementById('content');
        console.log("content", content);   
        
        
        
        //navigation
        var nav = doc.getElementById('nav_bottom');
        console.log("nav", nav);

        //fix the links
        //TODO: change this so the absolute path is created - the current implementation doesn't work on mobile
        
        nav.children.forEach(element => {
          console.log(element);
          console.log(vueInstance.$route);
          if(element.className == "return"){
            element.outerHTML = "<router-link to='../'>" + element.innerText + "</router-link>";
          } else {
          element.outerHTML = "<router-link to='" + element.pathname + "'>" + element.innerText + "</router-link>";
          }
        });

        
        //fix the images
        var image = content.getElementsByTagName('img');
  
        image.forEach(element => {
           element.src="https://lparchive.org/" + LPSrc + "/" + UpdateSrc + "/" + element.attributes.src.value;
           console.log(element);
        });

        vueInstance.dom = "<div>" + content.outerHTML + nav.outerHTML + "</div>";

        //LOCAL STORAGE BIZ

        //fix name to remove any dashes in the LP url
        lp = lp.replace(/-/g, ' ');

        //add LP Update to the localStorage for reading lists -- if a user clicks on an update, then it's worth counting it as being part of their reading list.
        console.log(localStorage);
        var readingList = JSON.parse(localStorage.readingList);

        //check to see if the current LP exists
        var found = false;
        for(var i = 0; i < readingList.length; i++){
          var element = readingList[i];
          console.log(element);
          if(element.title == lp){
            //if the lp exists
            if(element.part){
              //if the lp and the part exists
              if (element.part != update){
                element.part = update;
                //new update, move this to the top of the list
                readingList.splice(i, 1);
                readingList.unshift(element);
              }
              found = true;
              break;

            } else {
              element.part = update;
              found = true;
              break;
            }
          }
        }

        if(!found){
          //only way I can think of someone getting here would be to 
            //else push everything
            readingList.push({"title": lp, "part": update});
          
        }
        
        //send it to LocalStorage
        localStorage.readingList = JSON.stringify(readingList);
    
        
  });

  }
}
</script>

<style>

</style>