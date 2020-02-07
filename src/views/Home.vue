<template>
  <div class="home">
    <OptionsMenu  @change-style="updateStyle"/>
    <Maps/>
  </div>
</template>

<script>
// @ is an alias to /src
// import { mapState } from 'vuex'
import Maps from '@/components/Maps.vue';
import OptionsMenu from '@/components/OptionsMenu.vue'
import L from 'leaflet';

export default {
  name: 'home',
  components: {
    Maps,
    OptionsMenu
  },
  data(){
    return {
      options: [],
    }
  },
  methods: {
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
      },
    initLayers: function() {
      L.tileLayer(this.$store.getters.get_tileLayer, {
      attribution: this.attribution,
      maxZoom: 18,
         }).addTo(this.map);
     },
    mountMap: function() {
      this.mountTileLayer();
      this.initLayers();
     },
    updateStyle: function(style){
      this.$store.commit('update_mapStyle', style);
      this.$store.commit('update_mapCenter', this.map.getCenter());
      this.$store.commit('update_currentZoom', this.map.getZoom());
      this.resetMap();
     },
    resetMap: function(){
      this.map.remove();
      this.mountMap();
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
}
</script>