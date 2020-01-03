<template>
  <div class="home">
    <OptionsMenu  @change-style="updateStyle"/>
    <Maps @search-query="searchMap"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Maps from '@/components/Maps.vue';
import OptionsMenu from '@/components/OptionsMenu.vue'
import L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

export default {
  name: 'home',
  components: {
    Maps,
    OptionsMenu
  },
  data(){
    return {
      options: [],
      mapStyles: [
        {value: 'light_all', text:'light'},
        {value: 'dark_all', text: 'dark'}
      ],
      mapStyle: '', 
      tileLayer: '',
      mapCenter: [51.505, -0.09], // default center is London
      currentZoom: 13,
      searchResults: null,
      point: {
        isOn: false, 
      }
    }
  },
  methods: {
    mountTileLayer: function(){
      if (this.mapStyle == ''){
        this.mapStyle = this.mapStyles[0].value;
      }
      this.tileLayer = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/'+ this.mapStyle + '/{z}/{x}/{y}.png';
      this.initMap()
    },
    initMap: function() {
      this.map = L.map('mapid', {
        center: this.mapCenter,
        zoom: this.currentZoom,
        zoomControl: true,
        preferCanvas: false
         }
        );
      },
    initLayers: function() {
      L.tileLayer(this.tileLayer, {
      attribution: this.attribution,
      maxZoom: 18,
         }).addTo(this.map);
     },
    mountMap: function() {
      this.mountTileLayer();
      this.initLayers();
     },
    searchMap: async function(search){
      const searchProvier = new OpenStreetMapProvider();
      this.searchResults = await searchProvier.search({ query: search });
     },
    updateStyle: function(style){
      this.mapStyle = style;
      this.mapCenter = this.map.getCenter();
      this.currentZoom = this.map.getZoom();
      this.resetMap();
     },
    resetMap: function(){
      this.map.remove();
      this.mountMap();
      },
    addMarker: function(coordinates){
      //TODO: figure out how to make a custom icon
      // let myIcon = L.icon({
      //   iconUrl: '@/assets/Marker.png',
      //   iconRetinaUrl: '@/assets/Marker.png',
      // iconSize: [56,56],
      // iconAnchor: [28, 56],
      // popupAnchor: [-3, -76],
      // shadowSize: [68, 95],
      // shadowAnchor: [22, 94]
      // });
      // L.marker(coordinates, {icon: myIcon}).addTo(this.map);
      L.marker(coordinates).addTo(this.map);
    },
    addMarkerCenter: function(){
      const center = this.mapCenter = this.map.getCenter();
      this.addMarker(center);
    },
  }
}
</script>