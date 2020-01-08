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
      mapStyles: [
        {value: 'light_all', text:'light'},
        {value: 'dark_all', text: 'dark'},
        {value: 'dad_all', text: 'test'}
      ],
      mapStyle: '', 
      tileLayer: '',
      mapCenter: [51.505, -0.09], // default center is London
      currentZoom: 13,
      point: {
        isOn: false, 
      }
    }
  },
  methods: {
    mountTileLayer: function(){
      let styles = this.$store.getters.get_mapStyles
      if (this.$store.getters.get_mapStyle == ''){
            this.$store.commit('update_mapStyle', styles[0].value)
      }
      this.$store.commit('update_tileLayer', 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/'+ this.$store.getters.get_mapStyle + '/{z}/{x}/{y}.png');
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
      // iconUrl: '@/assets/Marker.png',
      // iconRetinaUrl: '@/assets/Marker.png',
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