<template>
    <div class="mapArea" id="map">
      <div id="mapid"></div>
    <div class='pointer'>
        <form id="searchForm" placeholder="Search Map" method="post" @submit.prevent>
          <input type="text" name="searchQuery" id="searchMap" placeholder="Search Map">
          <button id="magGlass" type="submit" @click="searchQuery"><img src="@/assets/magnifying-glass.png"></button>
        </form>
    </div>
    <div class="searchResults">
      <b-list-group>
        <b-list-group-item button 
        v-for='searchResult in $parent.searchResult'
        v-bind:key='searchResult'>
          {{ searchResult.label }}
        </b-list-group-item>
      </b-list-group>
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
      document.getElementById("searchMap").value = '';
      this.sendQueryToParent(searchValue);
      this.showSearchResults();
    },
    sendQueryToParent: function(query){ 
      this.$emit('search-query', query);
      },
    showSearchResults: function(){
      document.getElementsByClassName("searchResults")[0].style.display = 'block';
    }
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
    }
    .pointer:hover{
      cursor: pointer;
    }
    .searchResults{
      z-index: 9999;
      display: none;
    }
    #magGlass{
      height: 30px;
      width: 30px;
      overflow: hidden;
    }
</style>