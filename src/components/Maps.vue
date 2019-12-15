<template>
    <div class="mapArea" id="map">
      <div id="mapid"></div>
    </div>

</template>


<script>
// import Vue2Leaflet from 'vue2-leaflet';
import L from 'leaflet';

export default {
  name: 'Maps',
  props: {
    msg: String
  } ,
  data(){
    return {
        map: null,
        mapStyles: {
          dark: 'dark_all',
          light: 'light_all'
        },
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        mapStyle: '',
        tileLayer: '',
        layers: [],
        }
  },
  mounted(){
    this.mountTileLayer();
    this.initLayers();
    },
  methods: {
    mountTileLayer(){
      this.mapStyle = this.mapStyles.light;
      this.tileLayer = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/'+ this.mapStyle + '/{z}/{x}/{y}.png';
      this.initMap()
    },
    initMap() {
      this.map = L.map('mapid', {
        center: [51.505, -0.09],
        zoom: 13,
        zoomControl: true,
        preferCanvas: false
      }
      );
      },
    initLayers() {
      L.tileLayer(this.tileLayer, {
      attribution: this.attribution,
      maxZoom: 18,
         }).addTo(this.map);
     },
    },
  components: {
    // 'l-map': leaflet.Map,
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
    }
    #mapid { 
      height: 100%; 
      }
</style>