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
        // console.log(e);
        var doc = new DOMParser().parseFromString(dataDom, "text/html");
        console.log("parsed", doc);
        document.title = doc.title;
        var content = doc.getElementById('content');
        console.log("content", content);        
        var HTMLmassage = content.outerHTML;

        //adjust the returned content and turn it into Vue syntax for links
        HTMLmassage = content.getElementsByClassName('toc');
        HTMLmassage.forEach(element => {
          
          element.children.forEach(e => {
            if(e.firstChild.attributes != undefined){
            e.innerHTML = "<router-link to='" + vueInstance.$route.path + "/" + e.firstChild.attributes.href.textContent + "' >" + e.innerText + "</router-link>";
            }
          })
          
        });

  
        // fix the images
        var image = content.getElementsByTagName('img');
        // image.getElementsByTagName('img');
        console.log(image);
        image.forEach(element => {
           element.src="https://lparchive.org/" + LPSrc + "/" + element.attributes.src.value;
        });




        vueInstance.dom = content.outerHTML;
        

      });
  }
}
</script>

<style>

</style>