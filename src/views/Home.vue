<template>
  <div class="home">
    <OptionsMenu  @change-style="updateStyle"/>
    <Maps/>
  </div>
</template>

<script>
// @ is an alias to /src
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
        {value: 'dark_all', text: 'dark'}
      ],
      mapStyle: '', 
      tileLayer: '',
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
        center: [51.505, -0.09],
        zoom: 13,
        zoomControl: true,
        preferCanvas: false
         }
        );
      },
    initLayers: function() {
      alert();
      L.tileLayer(this.tileLayer, {
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
      this.map.remove();
      this.mountMap();
     }
    },
}
</script>
