import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
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
})