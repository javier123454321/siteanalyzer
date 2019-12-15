<template>
  <div class="home">
    <OptionsMenu/>
    <Maps msg="OpenMaps goes Here"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Maps from '@/components/Maps.vue';
import OptionsMenu from '@/components/OptionsMenu.vue'

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
        {value: 'dark_all', text: 'dark'},
        {value: 'light_all', text:'light'}
      ],
      mapStyle: '',
      
    }
  }
}
</script>
