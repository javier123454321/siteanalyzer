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
    updateStyle: function(style){
      this.$store.commit('update_mapStyle', style);
      this.$store.commit('update_mapCenter', this.map.getCenter());
      this.$store.commit('update_currentZoom', this.map.getZoom());
      this.resetMap();
     },
  }
}
</script>