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
    console.log(remoteURL);
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
  });

  }
}
</script>

<style>

</style>