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
    
  }
}
</script>