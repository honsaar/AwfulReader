<template>
  <div class="home">
    <b-container>
    <div v-html="dom"></div>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data: function(){
    return {
      dom: ''
    }
  },
  mounted: function() {
    console.log("Hello World.");
    var vueInstance = this;
    var testing = axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://lparchive.org/Dangan-Ronpa/"
      )
      .then(function(e) {
        var dataDom = e.data;
        console.log(dataDom)
        var doc = new DOMParser().parseFromString(dataDom, "text/html");
        vueInstance.dom = doc.getElementById('content').innerHTML;

      });
  }
};
</script>
