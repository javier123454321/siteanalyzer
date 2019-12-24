<template>
    <div class="mapArea" id="map">
      <div id="mapid"></div>
    <div class='pointer'>
        <form id="searchForm" placeholder="Search Map" @submit="$emit('search-query', this.searchQuery())">
          <input type="text" name="searchQuery" id="searchMap" placeholder="Search Map">
          <button type="submit"><img src="//src/assets/magnifying-glass.png"></button>
        </form>
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
      searchResults: null
        }
  },
  mounted(){
    this.$parent.mountMap();
    },
  components: {
  },
  methods: {
    searchQuery: function(){
      let searchValue = document.getElementById("searchForm").value;
      // alert(document.getElementById("searchMap").value);
      document.getElementById("searchMap").value = '';
      return searchValue;
      
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
</style>