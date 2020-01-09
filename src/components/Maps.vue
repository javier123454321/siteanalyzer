<template>
    <div class="mapArea" id="map">
      <div id="mapid" @click="hideSearchResults"></div>

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
          v-for='searchResult in this.$store.getters.get_searchResults'
          v-bind:key='searchResult' @click="searchCoordinates(searchResult)">
           {{ searchResult.label }} 
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>

    
  </div>

</template>


<script>
import { OpenStreetMapProvider } from 'leaflet-geosearch';

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
      this.searchMap(searchValue);
      this.showSearchResults();
    },
    searchMap: async function(search){
      const searchProvier = new OpenStreetMapProvider();
      const results = await searchProvier.search({ query: search });
      this.$store.commit('update_searchResults', results)
     },
    showSearchResults: function(){
      document.getElementsByClassName("searchResults")[0].style.display = 'block';
    },
    hideSearchResults: function(){
      document.getElementsByClassName("searchResults")[0].style.display = 'none';
    },
    searchCoordinates: function(searchResult){
      this.$parent.mapCenter = [parseFloat(searchResult.y), parseFloat(searchResult.x)];
      this.$parent.resetMap();
      this.$parent.map.fitBounds(searchResult.bounds, true);
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
      box-shadow: -2px 2px 6px rgb(177, 177, 177);
    }
    .pointer:hover{
      cursor: pointer;
    }
    .searchResults{
      z-index: 9999;
      display: none;
      max-height: 50vh;
      overflow-y: scroll;
      max-width: 205px;
    }
    .searchResultList{
      height: 10%;
      max-height: 60px;
      overflow: hidden;
    }
    .searchForm{
      max-width: 170px;
    }
    .magLogo{
      padding: 2px;
      height: 30px;
      width: 30px;
      overflow: hidden;
      float: right;
    }
    .magLogo > img{
      height: 25px;
      width: 25px;
    }

</style>