<template>
  <div class="update">
    <b-container>
    <v-runtime-template :key="$route.fullPath" :template="dom" ref="dom"></v-runtime-template>
    
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


    //for future ID use
    var id = lp;

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
            element.outerHTML = "<a class='return' href='../'>" + element.innerText + "</a>";
          } else {
          element.outerHTML = "<router-link class='" + element.className + "' to='" + element.pathname + "'>" + element.innerText + "</router-link>";
          }
        });

        
        //fix the images
        var image = content.getElementsByTagName('img');
  
        image.forEach(element => {
           element.src="https://lparchive.org/" + LPSrc + "/" + UpdateSrc + "/" + element.attributes.src.value;
        });

        vueInstance.dom = "<div>" + content.outerHTML  + nav.outerHTML + "</div>";

        //LOCAL STORAGE BIZ

        //fix name to remove any dashes in the LP url
        lp = lp.replace(/-/g, ' ');
        console.log(lp);
        //add LP Update to the localStorage for reading lists -- if a user clicks on an update, then it's worth counting it as being part of their reading list.
        console.log(localStorage);
        var readingList = JSON.parse(localStorage.readingList);
        var saveTitle;
        //check to see if the current LP exists
        var found = false;
        for(var i = 0; i < readingList.length; i++){
          var element = readingList[i];

          //comparison
          if(element.title == undefined){
            //TODO: change this to look up in the master list
            element.title = lp;
          }
         

          var compID = element.link.split("/");
          //get the second element in the array, it's the same for new LPs and existing ones


          if(compID[2] == id){
            console.log("exists");
            //if the lp exists
            saveTitle = element.title;
            if(element.part != undefined){
              if(element.author == undefined){
                 var author = doc.head.querySelector("[name~=author][content]").content;
                element.author = author;
              }
              //if the lp and the part exists
              if (element.part != update){
                element.part = update;
                element.link = vueInstance.$route.path;
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

          //end comparison
        }
        if(!found){
            //else push everything
            var author = doc.head.querySelector("[name~=author][content]").content;
            var upNum = 0; //Not sure how to grab the number of updates from this page if you come straight here -- maybe rethink this plan
            if(saveTitle == undefined){
              saveTitle = lp;
            }
            readingList.unshift({"title": saveTitle, "author":author, "part": update, "total":upNum, "link":vueInstance.$route.path});
          
        }
        
        //send it to LocalStorage
        localStorage.readingList = JSON.stringify(readingList);
    
        
  });

  }
}
</script>

<style>
.next {
 float: right;
}

.prev {
  float: left;
}

.return {
  text-align: center;
  margin: auto;
  width: 100%;
  display: block;
}

#nav_bottom {
  margin-top: 2em;
}
</style>