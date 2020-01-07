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
    var LPSrc = LPName.replace(/\s+/g, '-');
    var vueInstance = this;
    var testing = axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://lparchive.org/" + LPSrc + "/"
      )
      .then(function(e) {
        var dataDom = e.data;
        var doc = new DOMParser().parseFromString(dataDom, "text/html");
        console.log("parsed", doc);
        document.title = doc.title;
        var content = doc.getElementById('content');
        console.log("content", content);        
        var HTMLmassage = content.outerHTML;
        console.log(HTMLmassage);
        //adjust the returned content and turn it into Vue syntax for links
        var tag = "toc";
        // GET NUMBER OF UPDATES
        var upNum = 0;

        HTMLmassage = content.getElementsByClassName('toc');
        if(HTMLmassage.length == 0){
          HTMLmassage = content.getElementsByClassName('map');
          tag = "map";
          if(HTMLmassage.length == 0) {
            tag = "edge";
          }
        }
        if(tag == "toc") {
        HTMLmassage.forEach(element => {
          
          element.children.forEach(e => {
            upNum++;
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

        }
        console.log(upNum);
  
        // fix the images
        var image = content.getElementsByTagName('img');
        // image.getElementsByTagName('img');
        image.forEach(element => {
           element.src="https://lparchive.org/" + LPSrc + "/" + element.attributes.src.value;
        });




        vueInstance.dom = content.outerHTML;
        
        //LOCAL STORAGE

        //GET NAME OF LP
       var lp = LPName;
       lp = lp.replace(/-/g, ' ');


      



      //PUSH THIS

        console.log(localStorage);
        if (localStorage.readingList.length != 0 && localStorage.readingList != "" || localStorage.readingList != undefined){
        var readingList = JSON.parse(localStorage.readingList);
        } else {
          console.log("Empty", readingList);
        var readingList = [];
        
        }


        var found = false;
        for(var i = 0; i < readingList.length; i++){
          var element = readingList[i];
          if(element.title == lp){
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
            //else push everything
            readingList.push({"title": lp, "part": "Index", "total":upNum});
          
        }
        localStorage.readingList = JSON.stringify(readingList);
        console.log(readingList);


      });
  }
}
</script>

<style>

</style>