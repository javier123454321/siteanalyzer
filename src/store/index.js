import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    options: [],
    mapStyles: [
      {value: 'light_all', text:'light'},
      {value: 'dark_all', text: 'dark'},
      {value: 'dark_all', text: 'teststate'}
    ],
    mapStyle: '', 
    tileLayer: '',
    mapCenter: [51.505, -0.09], // default center is London
    currentZoom: 13,
    searchResults: null,
    pointInfo: {
      isOn: false, 
      coordinates: []
    }
  },
  mutations: {
    update_options: function (state, options){
      state.options = options
    },
    update_mapStyle: function(state, style){
      state.mapStyle = style
    },
    update_tileLayer: function(state, tileLayer){
      state.tileLayer = tileLayer
    },
    update_mapCenter: function(state, coord){
      state.mapCenter = coord
    },
    update_currentZoom: function(state, zoomLevel){
      state.currentZoom = zoomLevel
    },
    update_searchResults: function(state, results) {
      state.searchResults = results
    },
    update_pointInfoIsOnTrue: function(state) {
      state.pointInfo.isOn = true
    },
    update_pointInfoIsOnFalse: function(state) {
      state.pointInfo.isOn = false
    },
    update_pointInfoIsOnToggle: function(state){
      state.pointInfo.isOn = !state.pointInfo.isOn
    },
    update_pointInfoCoordinates: function(state, coordinates) {
      state.pointInfo.coordinates = coordinates
    },
  },
  getters: {
    get_options: (state) => {
      return state.options
    },
    get_mapStyles: (state) => { 
      return state.mapStyles
    },
    get_mapStyle: (state) => { 
      return state.mapStyle
    },
    get_tileLayer: (state) => { 
      return state.tileLayer
    },
    get_mapCenter: (state) => { 
      return state.mapCenter
    },
    get_currentZoom: (state) => {
      return state.currentZoom
    },
    get_searchResults: (state) => { 
      return state.searchResults
    },
    get_pointInfo: (state) => { 
      return state.pointInfo
    },
  }
})