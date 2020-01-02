<template>
    <div class="mapArea" id="map" @click="hideSearchResults">
      <div id="mapid"></div>

    <div class='pointer'>
      <form id="searchForm" placeholder="Search Map" method="post" @submit.prevent>
        <input type="search" name="searchQuery" id="searchMap" placeholder="Search Map" @keyup="searchQuery" @click="showSearchResults" autocomplete="off">
        <button class="magLogo" id="magGlass" type="submit" @click="searchQuery">
          <img class="magLogo" src="@/assets/magnifying-glass-icon-transparent-11.png">
        </button>
      </form>

      <div>
        <b-list-group class="searchResults">
          <b-list-group-item button 
          class="searchResultList"
          v-for='searchResult in this.$parent.searchResults'
          v-bind:key='searchResult' @click="searchCoordinates(searchResult)">
           {{ searchResult.label }} 
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>

    
  </div>

</template>


<script>
// import Vue2Leaflet from 'vue2-leaflet';
// import L from 'leaflet';

export default {
  name: 'Maps',
  props: {
    msg: String
  } ,
  data(){
    return {
        }
  },
  mounted(){
    this.$parent.mountMap();
    },
  components: {
  },
  methods: {
    searchQuery: function(){
      const searchValue = document.getElementById("searchMap").value;
      this.sendQueryToParent(searchValue);
      this.showSearchResults();
    },
    sendQueryToParent: function(query){ 
      this.$emit('search-query', query);
      },
    showSearchResults: function(){
      document.getElementsByClassName("searchResults")[0].style.display = 'block';
    },
    hideSearchResults: function(){
      document.getElementsByClassName("searchResults")[0].style.display = 'none';
    },
    searchCoordinates: function(searchResult){
      //TODO find Zoom Level based on bounds
      this.$parent.mapCenter = [parseFloat(searchResult.y), parseFloat(searchResult.x)];
      this.$parent.resetMap();
      document.getElementById("searchMap").value = '';
      this.hideSearchResults();
    },
    },
}
</script>

<style>
    .mapArea {
        border: 1px solid black;
        background-color: lightblue;
        width: 80%;
        height: 90vh;
        position: fixed;
        bottom: 0;
        right: 0;
        overflow: hidden;
        z-index: 0;
    }
    #mapid { 
      height: 100%; 
      }
    #searchMap {
      z-index: 9999;
    }
    
    .pointer{
      position:absolute;
      top:86px;
      left:10px;
      z-index:9995;
      max-width: 210px;
      overflow: hidden;
      box-shadow: -1px 1px 3px;
    }
    .pointer:hover{
      cursor: pointer;
    }
    .searchResults{
      z-index: 9999;
      display: none;
      max-height: 50vh;
      overflow-y: scroll;
    }
    .searchResultList{
      height: 10%;
      max-height: 60px;
      overflow: hidden;
    }
    .magLogo{
      padding: 2px;
      height: 30px;
      width: 30px;
      overflow: hidden;
    }
    .magLogo > img{
      height: 25px;
      width: 25px;
    }

</style>