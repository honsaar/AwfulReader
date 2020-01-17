<template>
  <div class="lp">
     <b-container>
    <!-- <div v-html="dom" ref="dom"></div> -->

      <!-- <component :is="{template: dom, ref:}"></component> -->

    <v-runtime-template :template="dom" ref="dom"></v-runtime-template>

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
    var LPName = this.$route.params.name;
    var id = LPName;
    var LPSrc = LPName.replace(/\s+/g, '-');
    var vueInstance = this;
    var testing = axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://lparchive.org/" + LPSrc + "/"
      )
      .then(function(e) {
        var dataDom = e.data;
        console.log("data", dataDom);
        
        var doc = new DOMParser().parseFromString(dataDom, "text/html");
        console.log("parsed", doc);
        document.title = doc.title;
        
        console.log(lp);
        var author = doc.head.querySelector("[name~=author][content]").content;
        console.log("author", author);
        var content = doc.getElementById('content');
        console.log("content", content);        
        var HTMLmassage = content.outerHTML;
        console.log(HTMLmassage);
        //adjust the returned content and turn it into Vue syntax for links
        var tag = "toc";
        // GET NUMBER OF UPDATES
        var upNum = 0;

        HTMLmassage = content.getElementsByClassName('toc');
        console.log(HTMLmassage);
        if(HTMLmassage.length == 0){
          HTMLmassage = content.getElementsByClassName('map');
          tag = "map";
          if(HTMLmassage.length == 0) {
            tag = "edge";
          }
        }
        if(tag == "toc") {
        HTMLmassage.forEach(element => {
          console.log(element);
          element.children.forEach(e => {
            console.log(e);
            upNum++;
            //TODO: update this so it searches for <a> tags specifically instead of the first child
            if(e.firstChild.attributes != undefined){
            e.innerHTML = "<router-link to='" + vueInstance.$route.path + e.firstChild.attributes.href.textContent + "' >" + e.innerText + "</router-link>";
            }
          })
          
        });
        } else if(tag == "map") {
          HTMLmassage["0"].children.forEach(e => {
            upNum++;
            if(e.attributes.href != undefined){
            e.innerHTML = "<router-link to='" + vueInstance.$route.path + e.attributes.href.textContent + "'>" + e.innerHTML + "</router-link>";
            }
          
        });
        } else {
          //TODO: How to handle any other ways of displaying updates?
          //TODO: Get the href and if it contains the word "update" change it to a router-link?
        }
        console.log(upNum);
  
        // fix the images
        var image = content.getElementsByTagName('img');
        //TODO: fix direct links to images
        //TODO: check the <a> tags, and if the href ends in .png/whatever, then change it to an absolute link just like embedded images


        // image.getElementsByTagName('img');
        image.forEach(element => {
           element.src="https://lparchive.org/" + LPSrc + "/" + element.attributes.src.value;
        });




        vueInstance.dom = content.outerHTML;
        
        //LOCAL STORAGE
        

        //GET NAME OF LP
       var lp = document.title;
       lp = lp.replace(/-/g, ' ');

        
        //get the second element in the array, it's the same for new LPs and existing ones


      

      



      //PUSH THIS

        console.log("LS", localStorage);
        if (localStorage.readingList != undefined){
        var readingList = JSON.parse(localStorage.readingList);
        } else {
          console.log("Empty", readingList);
        var readingList = [];
        
        }
        var found = false;
        for(var i = 0; i < readingList.length; i++){
          var element = readingList[i];
          var compID = element.link.split("/");

          if(compID[2] == id){
            //update the total number if needed
            if(element.total != upNum){
              element.total = upNum;
            }
            //if the lp exists
            if(element.part){
              //if the lp and a part exists
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
          console.log("AAA");
          var BGimage;
          console.log(lp);
              var vgdb = axios
              .get(
                "https://api.rawg.io/api/games?search=" + lp
              )
              .then(function(e) {
              BGimage = e.data.results[0].background_image;
              console.log(BGimage);
              //else push everything
            readingList.unshift({"title": lp, "author":author, "part": "Index", "total":upNum, "link":vueInstance.$route.path, "image": BGimage});
            localStorage.readingList = JSON.stringify(readingList);
            console.log(readingList);
              });
        } else {
          console.log("updating");
          localStorage.readingList = JSON.stringify(readingList);
            console.log(readingList);
        }
        


      });
  }
}
</script>

<style>

</style>