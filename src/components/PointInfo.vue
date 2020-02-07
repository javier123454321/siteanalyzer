<template>
    <div class="PointInfo">
        <b-button v-b-toggle.my-collapse @click="getCoordinateData()">
            <span class="when-opened">Hide</span> <span class="when-closed">Show</span> Point Info
        </b-button>
        <b-collapse id="my-collapse">
            <b-card> 
                <b-card-text>
                    <strong>Sunrise:</strong> {{this.sunrise}} <br>
                    <strong>Sunset:</strong> {{this.sunset}}<br>
                    <strong>Solar Noon:</strong> {{this.solarNoon}}<br>
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
            sunrise: '',
            sunset: '',
            solarNoon: ''
            }
        },
    methods:{
        getCoordinateData: function(){
            let lat = this.$store.state.pointInfo.coordinates.lat;
            let long = this.$store.state.pointInfo.coordinates.lng;
            axios.get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}`).then(Response=>(
                this.sunrise = Response.data.results.sunrise,
                this.sunset = Response.data.results.sunset,
                this.solarNoon = Response.data.results.solar_noon))
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