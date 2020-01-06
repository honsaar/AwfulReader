<template>
  <div class="update">
    <b-container>
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
    var lp = this.$route.params.name;
    var update = this.$route.params.update;

    console.log(lp);
    console.log(update);


    var LPSrc = lp.replace(/\s+/g, '-');
    var UpdateSrc = update.replace(/\s+/g, '%20');
    var remoteURL = "https://cors-anywhere.herokuapp.com/https://lparchive.org/" + LPSrc + "/" + UpdateSrc + "/";
    var vueInstance = this;

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
        var content = doc.getElementById('content');
        console.log("content", content);        
        var image = content.getElementsByTagName('img');
        // image.getElementsByTagName('img');
        console.log(image);
        image.forEach(element => {
           element.src="https://lparchive.org/" + LPSrc + "/" + UpdateSrc + "/" + element.attributes.src.value;
        });

        vueInstance.dom = content.outerHTML;


        //add this to the localStorage for reading lists -- if a user clicks on an update, then it's worth counting it as being part of their reading list.
        if(localStorage.readingList == undefined || localStorage.readingList.length == 0){
        var readingList = [];
        console.log("reading empty");
        readingList.push({"title": lp, "part": update});
        } else {
        var readingList = JSON.parse(localStorage.readingList);
        }
        console.log("1", readingList);

        //check to see if the current LP exists
        var found = false;
        for(var i = 0; i < readingList.length; i++){
          var element = readingList[i];
          console.log(element);
          if(element.title == lp){
            //if the lp exists
            console.log("LP exists");
            if(element.part == update){
              //if the lp and the part exists
              console.log("Current Part!");
              found = true;
              break;

            } else {
              console.log("updating part");
              element.part = update;
              found = true;
              break;
            }
          }
        }

        if(!found){
            console.log("not found");
            //else push everything
            readingList.push({"title": lp, "part": update});
          
        }
        console.log("local", readingList);
        
        //send it to LocalStorage
        localStorage.readingList = JSON.stringify(readingList);
        console.log(JSON.parse(localStorage.readingList));
        
  });

  }
}
</script>

<style>

</style>