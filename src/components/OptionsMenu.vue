<template>
    <div class="menuArea">
        <ul>
            <div :options='option' :key='option' v-for='option in options' class="menuItem">
            <li >{{ option.title }} 
                <toggle-button @click="toggle(option)"
                class="toggleButton"
                :value="option.isOn"
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
        options:[
        {id: 0, title: 'Sun Path', isOn: true},
        {id: 1, title: 'Area', isOn: true}
      ],
        }
  },
  methods: {
      toggle: function(option){
          (option.isOn?  option.isOn = false : option.isOn = true)
      }
  }
  
}
</script>

<style>
    .menuArea{
        background-color: grey;
        width: 20%;
        height: 100vh;
        padding: 20px 10px;
        text-align: left;
    }
    .menuArea > ul{
        list-style: none;
    }
    .menuItem{
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
</style>