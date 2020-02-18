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
import L from 'leaflet';

export default {
  name: 'Maps',
  data(){
    return {
        }
  },
  mounted(){
    this.mountMap();
    },
  components: {
  },
  created() {
    this.$store.watch(
      (state, getters) => getters.get_mapStyle,
      () => {
        this.$store.commit('update_mapCenter', this.map.getCenter());
        this.$store.commit('update_currentZoom', this.map.getZoom());
        this.resetMap()
      })
      this.$store.watch(
        (state, getters) => getters.get_pointInfoCoordinates,
        (pointInfoCoordinates) => {
          L.marker(pointInfoCoordinates).addTo(this.map);
        })
    },

  methods: {
    mountMap: function() {
      this.mountTileLayer();
      this.initLayers();
     },
    initLayers: function() {
      L.tileLayer(this.$store.getters.get_tileLayer, {
      attribution: this.attribution,
      maxZoom: 18,
         }).addTo(this.map);
     },
    mountTileLayer: function(){
      let styles = this.$store.getters.get_mapStyles
      if (this.$store.getters.get_mapStyle == ''){
            this.$store.commit('update_mapStyle', styles[0].value)
      }
      let newTileLayer = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/'+ this.$store.getters.get_mapStyle + '/{z}/{x}/{y}.png'
      this.$store.commit('update_tileLayer', newTileLayer);
      this.initMap()
    },
    initMap: function() {
      this.map = L.map('mapid', {
        center: this.$store.getters.get_mapCenter,
        zoom: this.$store.getters.get_currentZoom,
        zoomControl: true,
        preferCanvas: false
         }
        );
        this.map.on('moveend', () => {
          this.$store.commit('update_mapCenter', this.map.getCenter())
        })
      },
    resetMap: function(){
      this.map.remove();
      this.mountMap();
      },



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
      this.mapCenter = [parseFloat(searchResult.y), parseFloat(searchResult.x)];
      this.resetMap();
      this.map.fitBounds(searchResult.bounds, true);
      this.hideSearchResults();
      },
    },
    addMarker: function(coordinates){
      //TODO: figure out how to make a custom icon
      // let myIcon = L.icon({
      // iconUrl: '@/assets/Marker.png',
      // iconRetinaUrl: '@/assets/Marker.png',
      // iconSize: [56,56],
      // iconAnchor: [28, 56],
      // popupAnchor: [-3, -76],
      // shadowSize: [68, 95],
      // shadowAnchor: [22, 94]
      // });
      // L.marker(coordinates, {icon: myIcon}).addTo(this.map);
      if(! this.$store.state.pointInfo.isOn){
        this.$store.commit('update_pointInfoMarker', L.marker(coordinates, {draggable:true}).addTo(this.map));
        this.$store.commit('update_pointInfoIsOnTrue');
        this.$store.commit('update_pointInfoCoordinates', coordinates);
      }
    },
    addMarkerCenter: function(){
      const center = this.mapCenter = this.map.getCenter();
      this.addMarker(center);
    },
    addMarkerThroughClick: function(){
      this.map.on('click', function(event){
        this.addMarker(event.latlng)
      });
    },
    removeMarker: function(){
      this.map.removeLayer(this.$store.getters.get_pointInfo.marker);
        this.$store.commit('update_pointInfoIsOnFalse');
        this.$store.commit('update_pointInfoCoordinates', []);
      }
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