<template>
    <div class="PointInfo">
        <b-button v-b-toggle.my-collapse @click="getCoordinateData()">
            <span class="when-opened">Hide</span> <span class="when-closed">Show</span> Point Info
        </b-button>
        <b-collapse id="my-collapse">
            <b-card> 
                <b-card-text>
                    <div v-if="this.isLoadingData">
                        Fetching Weather Data...
                    </div>
                    <div v-else>
                        <strong>Sunrise:</strong> {{this.coordInfo.sunrise}} <br>
                        <strong>Sunset:</strong> {{this.coordInfo.sunset}}<br>
                        <strong>Solar Noon:</strong> {{this.coordInfo.solarNoon}}<br>
                    </div>
                </b-card-text>
            </b-card>
        </b-collapse>
    </div>
</template>

<script>
import axios from 'axios'

export default {

    name: 'PointInfo',
    data(){
        return {
            isLoadingData: false,
            coordInfo:{
                sunrise: '',
                sunset: '',
                solarNoon: ''
                }
            }
        },
    methods:{
        getCoordinateData: function(){
            this.isLoadingData = true;
            let lat = this.$store.state.pointInfo.coordinates.lat;
            let long = this.$store.state.pointInfo.coordinates.lng;

            axios.get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}`).then(Response=>(
                this.isLoadingData = false,
                
                this.coordInfo.sunrise = Response.data.results.sunrise,
                this.coordInfo.sunset = Response.data.results.sunset,
                this.coordInfo.solarNoon = Response.data.results.solar_noon))
        }
    },
    mounted:{
        latLong: function(){
            this.latLong = this.$store.state.pointInfo.coordinates
        }
    }
}

</script>

<style>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>