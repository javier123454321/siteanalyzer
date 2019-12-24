<template>
    <div class="mapArea" id="map">
      <div id="mapid"></div>
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
        map: null,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        tileLayer: '',
        layers: [],
        }
  },
  mounted(){
    this.$parent.mountMap();
    },
  components: {
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