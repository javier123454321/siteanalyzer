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
        <div>
        <b-dropdown id="choose style" text="Select Map Style" 
        ref="dropdown" class="m-2"
        block variant="light">
            <b-dropdown-item :styles='mapStyles' :key='style' v-for='style in mapStyles'>
                {{ style.text }}
            </b-dropdown-item>
        </b-dropdown>
        </div>
        <ul>
            <div :features='feature' :key='feature' v-for='feature in features' class="menuItem">
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

export default {
  name: 'OptionsMenu',
  data(){
      return {
        mapStyles: [
            {value: 'light_all', text:'light'},
            {value: 'dark_all', text: 'dark'}
            ],
        features:
        [
            {id: 0, title: 'Sun Path', isOn: true},
            {id: 1, title: 'Area', isOn: true}
        ],
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
    methods: {
        // reInitMap: this.$root.$on('mountTitleLayer')
        }
};

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
</style>