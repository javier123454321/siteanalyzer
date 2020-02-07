<template>
    <div class="menuArea">
        <div class="date">
            <h3>Date</h3>
                <toggle-button 
                    class="toggleButton"
                    v-model: attrs.type
                    :sync="true"
                    :labels="true"/>

            <div class="row">
                <v-date-picker
                    :popover="{ visibility: 'click' }"
                    :attributes='attrs'
                    mode='single'
                    v-model='date'/>
            </div>
        </div>
        <div class="mainSettings m-2">

            <b-dropdown 
                id="choose style" 
                text="Select Map Style" 
                ref="dropdown"
                block variant="light">

                <b-dropdown-item 
                    :key='style' v-for='style in this.$store.getters.get_mapStyles' 
                    @click="$emit('change-style', style.value)">
                    {{ style.text }}
                </b-dropdown-item>
                
            </b-dropdown>

            <b-button 
                block variant="light" 
                @click="$parent.addMarkerCenter()"
                :disabled.sync="this.$store.state.pointInfo.isOn">
                Set Point in Center
            </b-button>
            
            <div v-if="this.$store.state.pointInfo.isOn">
                <b-button block pill
                    variant="danger"
                    @click="$parent.removeMarker()"
                    >
                    Remove Point
                </b-button>
                <PointInfo/> 
            </div>
        </div>
        <ul>
            <div :features='feature' 
                :key='feature' 
                v-for='feature in features' 
                class="menuItem">

                <li >{{ feature.title }} 
                    <toggle-button 
                        v-model="feature.isOn"
                        class="toggleButton"
                        :sync="true"
                        :labels="true"/>    
                </li>
            </div>
        </ul>
    </div>
</template>

<script>
import PointInfo from '@/components/PointInfo'

export default {
    name: 'OptionsMenu',
    components: {
        PointInfo
        },
    watch: {
        pointInfo() {
            alert('this.features[0]');
        }
    },
    data(){
        return {
            picker: [
                {modes: ['single', 'range']},
                {mode: 'single'}
            ],
            date: new Date(), 
            attrs: [
                {
                key: 'today',
                highlight: {
                    backgroundColor: '#bbbbbb',
                },
                contentStyle: {
                color: '#fafafa',
                    },
                }
                ],
            };
            },
    methods:{
    }
}

</script>

<style>
    .menuArea{
        background-color: grey;
        width: 20%;
        height: 100vh;
        text-align: left;
    }
    .date{
        width: 100%;
        padding: 10px 20px;
        background-image: -moz-linear-gradient(rgba(231, 231, 231, 0.815), rgba(238, 238, 238, 0.39));
        border: solid 1px black;
    }
    .menuArea > ul{
        padding: 40px 10px;
        list-style: none;
    }
    .menuItem{
        left: 0;
        width: 100%;
        margin-bottom: 4px;
        padding: 5px;
        border: solid 1px black;
        border-radius:20px;
        background-image: linear-gradient(rgb(206, 206, 206), rgb(226, 226, 226))
    }
    .toggleButton{
        float: right;
    }
    .selectStyle{
        margin: 10px, 10px;
    }
    .mainSettings > *{
        margin-top: 5px;
    }
</style>