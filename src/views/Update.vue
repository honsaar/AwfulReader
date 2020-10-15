<template>
  <div class="update">
    <b-container>
      <div style="padding-top: 5em;padding-bottom: 5em;" v-if="dom.length <= 0">
        <div class="fulfilling-square-spinner" style="margin: auto;">
          <div class="spinner-inner"></div>
        </div>
      </div>
    <v-runtime-template :key="$route.fullPath" :template="dom" ref="dom"></v-runtime-template>
    
    </b-container>
  </div>
</template>

<script>
import VRuntimeTemplate from "v-runtime-template";
import LPLIST from "../assets/tocdata.json";

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
    // console.log(this);
    // console.log("Route", this.$route);
    var lp = this.$route.params.name;
    var update = this.$route.params.update;
    var updateImage;
    
    

    


    //for future ID use
    var id = lp;

    // console.log(lp);
    // console.log(update);


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

        setTimeout(function(){
          console.log("Get Image!");
          console.log(document.getElementsByTagName('img')[0].src);
          updateImage = document.getElementsByTagName('img')[0].src;
    
 
        if(localStorage.readingList){
        var readingList = JSON.parse(localStorage.readingList);
        }
        else {
          var readingList = [];
        }
        var saveTitle;
        //check to see if the current LP exists
        var found = false;
        console.log("finding");
        for(var i = 0; i < readingList.length; i++){
          var element = readingList[i];

          //comparison
          if(element.title == undefined){
            //TODO: change this to look up in the master list
              console.log("no save title");
                  var search = "/" + id + "/";
                console.log("searching", search);

                var savedTitle = LPLIST.filter(function(item){
                  if(item.u == search)
                    return item.t;
                });
                console.log("returned", savedTitle[0]);
              var saveTitle = savedTitle[0].t;

            element.title = saveTitle;
            console.log("updated:", element.title);
          }
         

          var compID = element.link.split("/");
          //get the second element in the array, it's the same for new LPs and existing ones


 
          if(compID[2] == id){
            console.log("exists");

            
                

            //if the lp exists
            if(element.part != undefined){
              if(element.author == undefined){
                 var author = doc.head.querySelector("[name~=author][content]").content;
                element.author = author;
              }
              //if the lp and the part exists
              if (element.part != update){
                element.part = update;
                element.link = vueInstance.$route.path;
               
                element.image = updateImage;
                console.log("Updating image! " + element.image);
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
            console.log("not found");
            var author = doc.head.querySelector("[name~=author][content]").content;
            var upNum = 0; //Not sure how to grab the number of updates from this page if you come straight here -- maybe rethink this plan
            if(saveTitle == undefined){
             console.log("no save title");
                  var search = "/" + id + "/";
                console.log("searching", search);

                var savedTitle = LPLIST.filter(function(item){
                  if(item.u == search)
                    return item.t;
                });
                console.log("returned", savedTitle[0]);
              var saveTitle = savedTitle[0].t;
            }
            readingList.unshift({"title": saveTitle, "author":author, "part": update, "total":upNum, "link":vueInstance.$route.path, "image": updateImage});
          
        }
        
        //send it to LocalStorage
        localStorage.readingList = JSON.stringify(readingList);
    
         }, 1000);
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
  margin-bottom: 2em;
}

.fulfilling-square-spinner , .fulfilling-square-spinner * {
        box-sizing: border-box;
      }

      .fulfilling-square-spinner {
        height: 25px;
        width: 25px;
        position: relative;
        border: 2px solid #4c566a;
        animation: fulfilling-square-spinner-animation 4s infinite ease;
      }

      .fulfilling-square-spinner .spinner-inner {
        vertical-align: top;
        display: inline-block;
        background-color: #4c566a;
        width: 100%;
        opacity: 1;
        animation: fulfilling-square-spinner-inner-animation 4s infinite ease-in;
      }

      @keyframes fulfilling-square-spinner-animation {
        0% {
          transform: rotate(0deg);
        }

        25% {
          transform: rotate(180deg);
        }

        50% {
          transform: rotate(180deg);
        }

        75% {
          transform: rotate(360deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes fulfilling-square-spinner-inner-animation {
        0% {
          height: 0%;
        }

        25% {
          height: 0%;
        }

        50% {
          height: 100%;
        }

        75% {
          height: 100%;
        }

        100% {
          height: 0%;
        }
      }
</style>